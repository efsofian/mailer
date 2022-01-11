const mongoose = require("mongoose");
const recipientSchema = require("./recipient.schema");

const surveySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	recipients: {
		type: [recipientSchema],
	},
	yes: {
		type: Number,
		default: 0,
	},
	no: {
		type: Number,
		default: 0,
	},
	_user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
	},
	dateSent: Date,
	lastResponded: Date,
});

module.exports = surveySchema;
