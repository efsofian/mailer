const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	googleId: String,
	credits: {
		type: Number,
		default: 0,
	},
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
