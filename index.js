import express from "express";
import session from "express-session"; // Use express-session
import passport from "./config/passportConfig.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Session Middleware
app.use(
  session({
    secret: "cyberwolve",
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Do not create session until something is stored
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production", // Secure cookies only in production
      httpOnly: true, // Prevent client-side JS from accessing cookies
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://darling-licorice-946ff7.netlify.app", // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Dynamic URL generation for GitHub OAuth
const githubAuthUrl = (req, res, next) => {
  const redirectUri =
    process.env.NODE_ENV === "production"
      ? "https://oauth-server-l3vt.onrender.com/auth/github/callback"
      : "http://localhost:8080/auth/github/callback";

  const githubUrl =
    "https://github.com/login/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Foauth-server-l3vt.onrender.com%2Fauth%2Fgithub%2Fcallback&client_id=Ov23litk3vo0DyqNqNWh";
  res.redirect(githubUrl);
};

// GitHub Authentication Routes
app.get("/auth/github", githubAuthUrl); // Redirect to GitHub OAuth page
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "https://darling-licorice-946ff7.netlify.app", // Redirect to frontend after successful login
    failureRedirect: "/login/failed", // Redirect to failure page on error
  })
);

// Initialize Routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
