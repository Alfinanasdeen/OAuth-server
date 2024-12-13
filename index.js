import express from "express";
import session from "express-session"; 
import passport from "./config/passportConfig.js"; 
import mongoose from "mongoose"; 
import MongoStore from "connect-mongo"; 
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"; 

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
      mongoUrl: process.env.MONGODB_URI, 
      collectionName: "sessions", 
      ttl: 14 * 24 * 60 * 60,
    }),
    secret: "cyberwolve",
    resave: false, 
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, 
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true,
      sameSite: "none",
    },
  })
);
console.log(`${process.env.SERVER_URL}/auth/google/callback`);
console.log(process.env.CLIENT_URL);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    methods: ["GET","POST","PUT","DELETE"],
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
