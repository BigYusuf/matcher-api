const OpenAI = require("openai");
require("dotenv").config();

const deepSeek = new OpenAI({
  baseURL: process.env.DEEPSEEK_BASE_URL,
  apiKey: process.env.DEEPSEEK_API_KEY,
});

module.exports = deepSeek;
