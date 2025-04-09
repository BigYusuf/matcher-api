// models/User.js
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid"); // Import uuid for generating UUIDs

const sequelize = require("../config/sequelizeDB");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4, // Automatically generates a UUID for new records
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Please provide a valid email address",
      },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  work: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  maritalStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "single", // Default maritalStatus is 'single'
    // validate: {
    //   isIn: [["single", "married", "divorced", "widow"]], // Ensure maritalStatus is either "single", "married", "divorced", "widow"
    // },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user", // Default role is 'user'
    validate: {
      isIn: [["user", "admin"]], // Ensure role is either 'user' or 'admin'
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active", // Default status is 'active'
    validate: {
      isIn: [["active", "disable"]], // Ensure status is either 'active' or 'disable'
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Store the date the user was created
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Store the date the user was created
  },
});

module.exports = User;
