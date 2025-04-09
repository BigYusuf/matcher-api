const { Op } = require("sequelize");

const { matchWithAI } = require("../utils/ai");
const { performance } = require("perf_hooks"); // For measuring time taken for the matching process
const { Analytics, MatchResult, User } = require("../models");
const {
  getCountryFromIP,
  extractArrayFromString,
  cleanObject,
} = require("../utils/getCountry");
const { ErrorHandler } = require("../utils/ErrorHandler");

// Match users based on criteria (no need to hash the password during matching, just check raw)
const matchUsers = async (req, res) => {
  try {
    const { name, work, address, country, rating, city, maritalStatus, age } =
      req.body;

    // Get the country from the user's IP address
    const userIP = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const userCountry = await getCountryFromIP(userIP);

    // get all users first
    const allUsers = await User.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "phoneNumber",
        "address",
        "city",
        "country",
        "work",
        "maritalStatus",
        "rating",
        "age",
      ],
    });
    const criteria = {
      name,
      work,
      address,
      country,
      rating,
      city,
      maritalStatus,
      age,
    };

    const plainUsers = allUsers.map((user) =>
      user.get ? user.get({ plain: true }) : user
    );
    let cleanCriteria = cleanObject(criteria);
    if (cleanCriteria.val === null) {
      return res.status(400).send({
        success: false,
        message: "please select a valid criteria",
      });
    }
    // Start tracking the time before the matching operation
    const startTime = performance.now();
    // Call Claude AI for matching
    const matchedFromAI = await matchWithAI(
      cleanCriteria.val,
      req.body.type,
      req.body.prompt,
      plainUsers
    );

    const endTime = performance.now();
    const responseTime = endTime - startTime; // Time in milliseconds

    const data = matchedFromAI?.content
      ? extractArrayFromString(matchedFromAI?.content[0]?.text)
      : [];
    // Capture the time after the operation is complete
    let aiToken =
      matchedFromAI?.usage?.output_tokens + matchedFromAI?.usage?.output_tokens;
    let inputCost = (matchedFromAI?.usage?.input_tokens / 1000000) * 3;
    let outputCost = (matchedFromAI?.usage?.output_tokens / 1000000) * 15;

    let totalAiCost = inputCost + outputCost;

    // const startTime2 = performance.now();
    // // Fall back to Sequelize search if AI fails
    const matchedUsers = await User.findAll({
      where: {
        [Op.or]: cleanCriteria?.where, // Apply the OR condition to the query
      },
    });

    // // Capture the time after the operation is complete
    const endTime2 = performance.now();
    const responseTime2 = endTime2 - startTime; // Time in milliseconds

    // Prepare the match result data to be saved
    const matchResultData = {
      userId: req?.user?.id, // The user who requested the match
      matchCriteria: {
        name,
        work,
        address,
        country,
        rating,
        city,
        maritalStatus,
        age,
      },
      matchedUsers:
        data?.length > 0
          ? data.map((user) => ({
              id: user.id,
              name: user.name,
              email: user.email,
              phoneNumber: user.phoneNumber,
              country: user.country,
              city: user.city,
              address: user.address,
              work: user.work,
              maritalStatus: user.maritalStatus,
              rating: user.rating,
              age: user.age,
            }))
          : matchedUsers?.map((user) => ({
              id: user.id,
              name: user.name,
              email: user.email,
              phoneNumber: user.phoneNumber,
              country: user.country,
              city: user.city,
              address: user.address,
              work: user.work,
              maritalStatus: user.maritalStatus,
              rating: user.rating,
              age: user.age,
            })),
      // matchDate: new Date(), // Store the date when the match was performed
    };
    // Save the match result into the database
    const matchRes = await MatchResult.create(matchResultData);

    // // Prepare the analytics data
    const analyticsData = {
      matchCriteria: {
        name,
        work,
        address,
        country,
        rating,
        city,
        maritalStatus,
        age,
      },
      userId: req?.user?.id, // The user who requested the match
      matchResultId: matchRes?.id,
      ipAddress: userIP,
      country: userCountry,
      numberOfMatches: data.length,
      responseTime: data?.length > 0 ? responseTime : responseTime2,
      cost: totalAiCost, // The estimated cost of the Claude AI request
      aiModel: matchedFromAI.model, // The AI model used for matching
      tokensProcessed: aiToken, // The number of tokens processed
    };

    // Save the analytics data into the database
    await Analytics.create(analyticsData);

    if (data.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Matched users found via AI",
        matchedUsers: data,
      });
    }
    // Send response to the client with matched users and analytics data
    res.status(200).send({
      success: true,
      message:
        matchedUsers?.length > 0 ? "Matched users found!" : "No matched User",
      matchedUsers,
    });
  } catch (error) {
    // console.error(error);
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};

// Retrieve saved match results for a user
const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve match results for the specific id
    const matchResults = await MatchResult.findByPk(id);

    if (matchResults.length === 0) {
      return res.status(404).send({ message: "No match results not found" });
    }

    res.status(200).send({
      message: "Match results found",
      matchResults,
    });
  } catch (error) {
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};

const getUserMatchResults = async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve match results for the specific user
    const matchResults = await MatchResult.findAll({
      where: { userId },
    });

    if (matchResults.length === 0) {
      return res
        .status(404)
        .send({ message: "No match results found" });
    }

    res.status(200).send({
      message: "Match results found",
      matchResults,
    });
  } catch (error) {
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};
// Function to get all users (Admin-only)
const getAllMatches = async (req, res) => {
  try {
    // Fetch all match from the database
    const matchRes = await MatchResult.findAll();

    res.status(200).send({
      message: "All match results retrieved successfully",
      data: matchRes,
    });
  } catch (error) {
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};

module.exports = {
  matchUsers,
  getUserMatchResults,
  getAllMatches,
  getMatchById,
};
