const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid"); // Import uuid for generating UUIDs

const sequelize = require("../config/sequelizeDB");

const RegistrationAnalytics = sequelize.define("RegistrationAnalytics", {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4, // Automatically generates a UUID for new records
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Users",
      key: "id",
    },
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aiCost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  aiModel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aiTokens: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Store the date
  },
});

module.exports = RegistrationAnalytics;
