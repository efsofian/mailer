const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.serializeUser((user, done) => {
	done(null, user.id); // _id, => saved to session => req.session.passport.user
});

passport.deserializeUser(async (id, done) => {
	// attach to req.user
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
				done(null, alreadyExist);
			} else {
				const user = await new User({ googleId: profile.id }).save();
				done(null, user);
			}
		}
	)
);
