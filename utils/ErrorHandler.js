const ErrorHandler = (error) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    // Handle unique constraint violation (e.g., email already exists)
    return {
      code: 400,
      message: "Email is already in use. Please choose another one.",
    };
  }
  // Handle other Sequelize validation errors
  if (error.name === "SequelizeValidationError") {
    return {
      code: 400,
      message: error.errors.map((e) => e.message),
    };
  }
  if (error.name === "SequelizeDatabaseError") {
    return {
      code: 404,
      message: "Data not found",
    };
  }
  return { code: 500, message: "Internal Server Error" };
};

module.exports = { ErrorHandler };
