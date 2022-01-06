const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
	done(null, user.id); // _id
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.clientID,
			clientSecret: process.env.clientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const alreadyExist = await User.findOne({ googleId: profile.id });
			if (alreadyExist) {
				console.log("already exist, login better");
				done(null, alreadyExist);
			} else {
				const user = await new User({ googleId: profile.id }).save();
				done(null, user);
			}
		}
	)
);
