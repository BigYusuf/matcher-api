const bcrypt = require("bcryptjs");

const { generateToken } = require("../middleware/Auth");
const { registerAI } = require("../utils/ai");
const { performance } = require("perf_hooks"); // For measuring time taken for the matching process
const { User, RegistrationAnalytics } = require("../models");
const { getCountryFromIP, extractUserData } = require("../utils/getCountry");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { attributes } = require("../data/attributeWithoutPassword");

// Register a new user with password hashing
const registerUser = async (req, res) => {
  try {
    // Start tracking the time before the registration operation
    const startTime = performance.now();

    const aiData = await registerAI(
      req?.body?.text,
      req?.body?.type,
      req?.body?.prompt
    );
    // Capture the time after the operation is complete
    const endTime = performance.now();
    const responseTime = endTime - startTime; // Time in milliseconds
    const data = extractUserData(aiData?.content[0]?.text);

    let aiToken = aiData?.usage?.output_tokens + aiData?.usage?.output_tokens;
    let inputCost = (aiData?.usage?.input_tokens / 1000000) * 3;
    let outputCost = (aiData?.usage?.output_tokens / 1000000) * 15;

    let totalAiCost = inputCost + outputCost;
    // Validate if the role is either 'user' or 'admin'
    // if (role && !["user", "admin"].includes(role)) {
    //   return res.status(400).send({
    //     message: 'Invalid role. It must be either "user" or "admin".',
    //   });
    // }
    // Check if password is provided
    if (!data?.email) {
      return res.status(404).send({ message: "Email is required" });
    }
    // Check if password is provided
    if (!data?.password) {
      return res.status(404).send({ message: "Password is required" });
    }

    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(data?.password, 10);

    // Get the country from the user's IP address
    const userIP =
      req.ip ||
      req.connection.remoteAddress ||
      req.headers["x-forwarded-for"] ||
      "unknown";

    const userCountry = await getCountryFromIP(userIP);

    // Save registration analytics with AI cost, model, and tokens
    const regAnaly = await RegistrationAnalytics.create({
      userId: null,
      ipAddress: userIP,
      country: userCountry,
      aiCost: totalAiCost,
      aiModel: aiData.model,
      aiTokens: aiToken,
      responseTime: responseTime,
      status: "failed",
    });

    // console.log("before user");
    // Create a new user (password is automatically hashed before saving due to the hook in the model)
    const user = await User.create({
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      password: hashedPassword, // Salt rounds = 10
      country: data?.country || userCountry,
      city: data?.city,
      address: data?.address,
      work: data?.work,
      maritalStatus: data?.maritalStatus,
      rating: data?.rating ? data?.rating : null,
      age: data?.age || null,
      role: data?.role || "user", //Default to "user if no role is provided"
    });
    if (user.error) {
      console.log("no user");
    }

    await regAnaly.update({
      userId: user?.id,
      ipAddress: userIP,
      country: userCountry,
      aiCost: totalAiCost,
      aiModel: aiData.model,
      aiTokens: aiToken,
      responseTime: responseTime,
      status: "success",
    });

    const token = generateToken(user?.id);

    res.status(201).send({
      success: true,
      message: "Registered successfully!",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};

// Example login route (just for reference, if you'd like to add a login functionality)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // Check if the provided password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ success: false, error: "Invalid credentials" });
    }
    const token = generateToken(user.id);

    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// Function to get all users (Admin-only)
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database (excluding sensitive info like password)
    const users = await User.findAll({
      attributes: attributes,
    });

    res.status(200).send({
      message: "All users retrieved successfully",
      data: users,
    });
  } catch (error) {
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};

// Function to get profile
const getProfile = async (req, res) => {
  try {
    // Fetch profile from the database (excluding sensitive info like password)
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: attributes,
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Profile not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};

const getProfileAdmin = async (req, res) => {
  try {
    // Fetch one user from the database (excluding sensitive info like password)
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: attributes,
    });

    res.status(200).send({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    const errorHandler = ErrorHandler(error);
    res
      .status(errorHandler?.code)
      .send({ success: false, message: errorHandler?.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  getProfileAdmin,
};
