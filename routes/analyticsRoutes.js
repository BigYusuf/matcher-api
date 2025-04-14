// routes/analytics.js
const express = require("express");

const { isAuth, isAdmin } = require("../middleware/Auth");
const {
  getAnalytics,
  getRegAnalytics,
  getRegAnalyticsById,
  getAnalyticById,
  getAnalyticByUserId,
} = require("../controllers/analyticsController");

const analyticRouter = express.Router();

// Matching analytics routes
// Admin-only route for accessing analytics
analyticRouter.get("/match", isAuth, isAdmin, getAnalytics); 

// Admin-only route for accessing analytics by Id
analyticRouter.get("/match/:id", isAuth, isAdmin, getAnalyticById);

// Admin-only route for accessing analytics by userId
analyticRouter.get("/match/:userId", isAuth, isAdmin, getAnalyticByUserId);

// Registration analytics routes
// Admin-only route for accessing registration analytics
analyticRouter.get("/", isAuth, isAdmin, getRegAnalytics);

analyticRouter.get("/:id", isAuth, isAdmin, getRegAnalyticsById);

module.exports = analyticRouter;
