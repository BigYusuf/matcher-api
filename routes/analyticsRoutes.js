// routes/users.js
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

// Admin-only route for accessing analytics
analyticRouter.get("admin/match", isAuth, isAdmin, getAnalytics);

// Admin-only route for accessing analytics by Id
analyticRouter.get("admin/match/:id", isAuth, isAdmin, getAnalyticById);

// Admin-only route for accessing analytics by userId
analyticRouter.get("admin/match/:userId", isAuth, isAdmin, getAnalyticByUserId);

// Admin-only route for accessing registration analytics
analyticRouter.get("admin/register", isAuth, isAdmin, getRegAnalytics);

analyticRouter.get("admin/register/:id", isAuth, isAdmin, getRegAnalyticsById);

module.exports = analyticRouter;
