const express = require("express");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const router = express.Router();
const Mailer = require("../services/mailer");
const auth = require("../middlewares/auth.middleware");
const creditChecker = require("../middlewares/creditschecker.middleware");
const surveyTemplate = require("../services/surveyTemplate");
const surveySchema = require("../models/survey.schema");
const Survey = mongoose.model("surveys", surveySchema);

router.get("/api/surveys", auth, async (req, res) => {
	const surveys = await Survey.find({ _user: req.user.id })
		.select("-recipients")
		.sort({ dateSent: -1 })
		.exec();
	res.send(surveys);
});

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
	res.send("thanks you for voting");
});

router.post("/api/surveys/webhooks", (req, res) => {
	console.log(req.body);
	const p = new Path("/api/surveys/:surveyId/:choice");
	_.chain(req.body)
		.map(({ email, url }) => {
			const match = p.test(new URL(url).pathname);
			if (match)
				return { email, surveyId: match.surveyId, choice: match.choice };
		})
		.compact()
		.uniqBy("email")
		.uniqBy("surveyId")
		.each(({ surveyId, email, choice }) => {
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false },
					},
				},
				{
					$inc: { [choice]: 1 },
					$set: { "recipients.$.responded": true },
				}
			).exec();
		})
		.value();
	res.send({});
});

router.post("/api/surveys", auth, creditChecker, async (req, res) => {
	const { title, subject, body, recipients } = req.body;
	const survey = new Survey({
		title,
		subject,
		body,
		recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
		_user: req.user.id,
		dateSent: Date.now(),
	});
	const mailer = new Mailer(survey, surveyTemplate(survey));
	try {
		await mailer.send();
		await survey.save();
		req.user.credits -= 1;
		const user = await req.user.save();
		res.send(user);
	} catch (e) {
		res.status(422).send(e);
	}
});

module.exports = router;
