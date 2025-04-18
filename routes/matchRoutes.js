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

// Admin routes
// Admin route (accessible only to admins)
matchRoute.get("/admin", isAuth, isAdmin, getAllMatches);

// Admin route (accessible only to admins)
matchRoute.get("/admin/:id", isAuth, isAdmin, getMatchById);

// Authenticated user routes
// Route for matching users based on criteria
matchRoute.post("/", isAuth, matchUsers ); // Protect match route with isAuth

// Route for retrieving user's match results
matchRoute.get("/:userId", isAuth, getUserMatchResults); // Protect match results route with isAuth

// Swagger docs are in docs/matcherDocs.js

module.exports = matchRoute;
