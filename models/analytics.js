// models/User.js
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid"); // Import uuid for generating UUIDs

const sequelize = require("../config/sequelizeDB");

const Analytics = sequelize.define("Analytics", {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4, // Automatically generates a UUID for new records
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  matchResultId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "MatchResults", // Ensure this points to the correct model name
      key: "id",
    },
  },
  matchCriteria: {
    type: DataTypes.JSONB, // Store the match criteria as a JSON object
    allowNull: false,
  },
  numberOfMatches: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  matchRequestTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current time when the record is created
  },
  responseTime: {
    type: DataTypes.FLOAT, // Time in milliseconds for processing the match request
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT, // Estimated cost of using Claude AI for the matching process
    allowNull: false,
  },
  aiModel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tokensProcessed: {
    type: DataTypes.INTEGER, // Number of tokens processed by the model
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Store the date the user was created
  },
});

module.exports = Analytics;
