const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getProfile,
  getProfileAdmin,
} = require("../controllers/userController");
const { isAuth, isAdmin } = require("../middleware/Auth");

const userRoute = express.Router();

// Route for user registration
userRoute.post("/register", registerUser);

// Route for user login
userRoute.post("/login", loginUser);

// Route for retrieving user's profile
userRoute.get("/:id", isAuth, getProfile); // Protect match results route with isAuth

// Admin-only route for getting all users
userRoute.get("/users", isAuth, isAdmin, getAllUsers);

// Route for retrieving user's profile
userRoute.get("/users/:id", isAuth, isAdmin, getProfileAdmin); // Protect match results route with isAuth

module.exports = userRoute;
