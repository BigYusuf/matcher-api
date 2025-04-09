// const pool = require("../config/database");

// require("dotenv").config();


// const createUsersTable = async () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID PRIMARY KEY,
//       name VARCHAR(50) NOT NULL,
//       email VARCHAR(100) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       role VARCHAR(50) NOT NULL,
//       reset_token VARCHAR(255),
//       reset_token_expiry BIGINT,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//   `;
//   await pool.query(query);
// };

// createUsersTable();

