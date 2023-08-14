import passport from "passport";
import passportGoogle from "passport-google-oauth20";
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
            passReqToCallback : true,
        },
        async (request, accessToken, refreshToken, profile, done) => {
            const username = profile.displayName;

            //let player = await upsertUser(username as string);
            //upsert the user 

            const user = {
                displayName: profile.displayName,
                accessToken: accessToken
            }

            done(null, user);
        }
    )
);

// Serialization and deserialization of users
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done) {
        return done(null, user);
});