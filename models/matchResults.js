// models/User.js
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid"); // Import uuid for generating UUIDs

const sequelize = require("../config/sequelizeDB");

const MatchResult = sequelize.define("MatchResult", {
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
  matchCriteria: {
    type: DataTypes.JSONB, // Store the match criteria as a JSON object
    allowNull: false,
  },
  matchedUsers: {
    type: DataTypes.JSONB, // Store the matched users as a JSON array
    allowNull: false,
  },
  matchRequestTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Automatically set the current time when the record is created
  },
  matchDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Store the date the match was performed
  },
});

module.exports = MatchResult;
