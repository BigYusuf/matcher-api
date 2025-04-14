const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { swaggerUi, specs } = require("./swagger");

const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/sequelizeDB");
const { userRoutes, analyticsRoutes, matchRoutes } = require("./routes");

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(cookieParser()); // For cookie parsing
app.use(cors());


// Use the user routes
// app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/matches", matchRoutes);

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
const PORT = process.env.PORT || 5100;
// Sync the Sequelize models and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });
