import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
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
      callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Google Profile:", profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user); 
  done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log("Deserializing user ID:", id);

  User.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    console.log("Deserialized user:", user);
    done(null, user);
  });
});

export default passport;
