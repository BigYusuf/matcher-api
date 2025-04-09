// routes/users.js
const express = require("express");
const {
  matchUsers,
  getUserMatchResults,
  getAllMatches,
  getMatchById,
} = require("../controllers/matchController");
const { isAuth, isAdmin } = require("../middleware/Auth");

const matchRoute = express.Router();

// Route for matching users based on criteria
matchRoute.post("/", isAuth, matchUsers); // Protect match route with isAuth

// Route for retrieving user's match results
matchRoute.get("/:userId", isAuth, getUserMatchResults); // Protect match results route with isAuth

// Admin route (accessible only to admins)
matchRoute.get("/admin/matches/:id", isAuth, isAdmin, getMatchById);

// Admin route (accessible only to admins)
matchRoute.get("/admin/matches", isAuth, isAdmin, getAllMatches);

module.exports = matchRoute;
