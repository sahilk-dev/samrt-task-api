import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.models.js"

const configurePassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const provider = "google"
                    const providerId = profile.id;

                    let user = await User.findOne({provider, providerId})

                    if (!user) {
                        user = await User.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            provider,
                            providerId
                        });
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    )
}

export default configurePassport;