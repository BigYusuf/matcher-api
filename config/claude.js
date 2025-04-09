require("dotenv").config();

const claudeConfig = {
  url: process.env.CLAUDE_BASE_URL,
  key: process.env.CLAUDE_API_KEY,
};


module.exports = claudeConfig;
