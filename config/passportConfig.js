import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "36402209140-hnongt502qfeguhk7p4rgnlqufh310j9.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL:
        "https://oauth-server-l3vt.onrender.com/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://oauth-server-l3vt.onrender.com/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Store only user ID in the session
});

passport.deserializeUser(async (id, done) => {
  // Fetch the user from your database using the ID
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
