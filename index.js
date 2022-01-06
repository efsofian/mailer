require("./services/env");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("./services/passport");
require("./services/db")();
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [process.env.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(
		`currently connected in ${process.env.NODE_ENV} MODE on PORT:${PORT}`
	);
});
