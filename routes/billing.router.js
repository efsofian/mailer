const express = require("express");
const passport = require("passport");
const stripe = require("stripe")(process.env.StripeSecretKey);
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/api/stripe", auth, async (req, res) => {
	const charge = await stripe.charges.create({
		amount: 500,
		currency: "usd",
		description: "5$ for 5 credits",
		source: req.body.id,
	});

	req.user.credits += 5; // instance of User is stored on req.user
	const user = await req.user.save();
	res.send(user);
});

module.exports = router;
