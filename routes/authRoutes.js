import express from "express";
import {
  loginSuccess,
  loginFailed,
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login/success", loginSuccess);
router.get("/login/failed", loginFailed);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/github", githubAuth);
router.get("/github/callback", githubCallback);
router.get("/logout", logout);

export default router;
