import express from "express";
import session from "express-session"; // Session management middleware
import passport from "./config/passportConfig.js"; // Passport for authentication
import mongoose from "mongoose"; // Mongoose to interact with MongoDB
import MongoStore from "connect-mongo"; // MongoDB session store
import cors from "cors";
import dotenv from "dotenv"; // To use .env for environment variables
import authRoutes from "./routes/authRoutes.js"; // Your auth routes

dotenv.config();

const app = express();
const hostname = "0.0.0.0";
// MongoDB Connection

mongoose
  .connect(process.env.MONGODB_URI, {
    ssl: true,
  })

  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Session Middleware
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // MongoDB URI
      collectionName: "sessions", // MongoDB collection to store sessions
      ttl: 14 * 24 * 60 * 60, // Set session expiration time (14 days in seconds)
    }),
    secret: "cyberwolve", // Session secret key
    resave: false, // Don't resave session if unchanged
    saveUninitialized: false, // Don't save session if it's uninitialized
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production", // Set to true in production
      httpOnly: true, // Prevent client-side JavaScript access to cookie
      sameSite: "none", // Allow cross-site cookies
    },
  })
);
console.log(`${process.env.SERVER_URL}/auth/google/callback`);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Define your client's URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Authentication Routes
app.use("/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://${hostname}:${PORT}`)
);
