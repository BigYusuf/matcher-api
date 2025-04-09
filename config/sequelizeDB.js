const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

//setting up config file
dotenv.config();

// Postgres Database configuration

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
const AuthSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // In your sequelize.sync() part of the application setup
    sequelize
      .sync({ force: false }) // Avoid using force in production, you can use alter: true for migrations
      .then(() => {
        console.log("Database synchronized");
      })
      .catch((err) => {
        console.error("Error syncing database:", err);
      });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
AuthSequelize();
module.exports = sequelize;
