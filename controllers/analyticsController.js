const { User, Analytics, RegistrationAnalytics } = require("../models");
const { ErrorHandler } = require("../utils/ErrorHandler");

// Example: Analytics endpoint to get analytics data
const getAnalytics = async (req, res) => {
  try {
    // Get all match analysis data
    const analysisData = await Analytics.findAll({
      // include: [{ model: User, attributes: ["name", "email"] }],
    });

    res.status(200).json({
      message: "Analytics data retrieved successfully",
      data: analysisData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching analytics data" });
  }
};
// Example: Analytics endpoint to get analytics data
const getRegAnalytics = async (req, res) => {
  try {
    // Get all match analysis data
    const analysisData = await RegistrationAnalytics.findAll({
      // include: [{ model: User, attributes: ["name", "email"] }],
    });

    res.status(200).json({
      message: "Register Analytics retrieved successfully",
      data: analysisData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching analytics data" });
  }
};

// Example: Analytics endpoint to get analytics data
const getAnalyticByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    // Get all match analysis data

    // const analysisData = await Analytics.findAll({
    //   include: [{ model: User, attributes: ["name", "email"] }],
    // });
    const analysisData = await Analytics.findAll({
      where: { userId },
    });

    if (!analysisData) {
      res.status(404).json({
        success: false,
        message: "No Data found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Match Analytics retrieved successfully",
      data: analysisData,
    });
  } catch (error) {
    console.error(error);
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};
const getAnalyticById = async (req, res) => {
  try {
    const { id } = req.params;
    // Get all match analysis data

    // const analysisData = await Analytics.findAll({
    //   include: [{ model: User, attributes: ["name", "email"] }],
    // });
    const analysisData = await Analytics.findByPk(id);

    if (!analysisData) {
      res.status(404).json({
        success: false,
        message: "No Data found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Match Analytics retrieved successfully",
      data: analysisData,
    });
  } catch (error) {
    console.error(error);
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};

// Example: Register Analytics endpoint to get analytics data by Id
const getRegAnalyticsById = async (req, res) => {
  try {
    const { id } = req.params;
    // Get all match analysis data

    const analysisData = await RegistrationAnalytics.findByPk(id);

    if (!analysisData) {
      res.status(404).json({
        success: false,
        message: "No Data found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Match Analytics retrieved successfully",
      data: analysisData,
    });
  } catch (error) {
    console.error(error);
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};

module.exports = {
  getAnalytics,
  getAnalyticByUserId,
  getAnalyticById,
  getRegAnalytics,
  getRegAnalyticsById,
};
