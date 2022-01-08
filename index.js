require("./services/env");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("./services/passport");
require("./services/db")();
const authRouter = require("./routes/auth.router");
const billingRouter = require("./routes/billing.router");

const app = express();

app.use(express.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [process.env.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(billingRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(
		`currently connected in  ${process.env.NODE_ENV} mode on PORT:${PORT}`
	);
});
