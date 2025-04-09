const express = require("express");
const rateLimit = require("express-rate-limit");

const { analyzeData } = require("../utils/ai");
const {
  register,
  login,
  forgotPass,
  resetPass,
} = require("../controllers/authController");

const authRouter = express.Router();

// Rate limiter middleware (max 5 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later.",
});

authRouter.use(limiter);

authRouter.post("/analyze", async (req, res) => {
  try {
    const analysis = await analyzeData(req.body.text, 2);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Signup
authRouter.post("/register", register);

// User Login
authRouter.post("/login", login);

// Forgot Password: Send reset token to user's email
authRouter.post("/forgot-password", forgotPass);

// Reset Password: Allow user to change their password
authRouter.post("/reset-password/:token", resetPass);

module.exports = authRouter;
