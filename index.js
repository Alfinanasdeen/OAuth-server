import express from "express";
import cookieSession from "cookie-session";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["alfina"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://darling-licorice-946ff7.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
