const { default: axios } = require("axios");
const deepSeek = require("../config/deekSeek");
const claudeConfig = require("../config/claude");

const analyzeData = async (text, type) => {
  try {
    if (type === 1) {
      const completion = await deepSeek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "Analyze this text for sentiment, key topics, and named entities.",
          },
          { role: "user", content: text },
        ],
        temperature: 0.1,
        max_tokens: 256,
      });
      return JSON.parse(completion.choices[0].message.content);
    } else {
      const requestData = {
        model: "claude-3-5-sonnet-20241022", // The model you're using
        max_tokens: 1024, // The maximum number of tokens for the response
        messages: [
          {
            role: "user",
            content: `Please help turn this to an objects of values with basic authentication${text}`, // The user message you want to send
          },
        ],
      };

      const response = await axios.post(claudeConfig?.url, requestData, {
        headers: {
          "x-api-key": claudeConfig?.key, // Authentication via API key
          "anthropic-version": "2023-06-01", // Version of the API
          "Content-Type": "application/json", // Content type for the request
        },
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    console.error("Analysis error:", error.message);
    throw error;
  }
};

const registerAI = async (text, type, prompt) => {
  try {
    if (type === 1) {
      const completion = await deepSeek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "Analyze this text for sentiment, key topics, and named entities.",
          },
          {
            role: "user",
            content: prompt
              ? prompt
              : `From this data ${text}, return and object of name, email, phoneNumber, password, address, country, city, work, maritalStatus, rating, age, role. if no password, use the email text before the @ as the password, role in this context can only be admin or user why profeession should be saved under work. Don't generate email, let user supply it`, // The user message you want to send
          },
        ],
        temperature: 0.1,
        max_tokens: 256,
      });
      return JSON.parse(completion.choices[0].message.content);
    } else {
      const requestData = {
        model: "claude-3-5-sonnet-20241022", // The model you're using
        max_tokens: 1024, // The maximum number of tokens for the response
        messages: [
          {
            role: "user",
            content: prompt
              ? prompt
              : `From this data ${text}, return and object of name, email, phoneNumber, password, address, country, city, work, maritalStatus, rating, age, role. if no password, use the email text before the @ as the password, role in this context can only be admin or user why profeession should be saved under work. Don't generate email, let user supply it`, // The user message you want to send
          },
        ],
      };

      const response = await axios.post(claudeConfig?.url, requestData, {
        headers: {
          "x-api-key": claudeConfig?.key, // Authentication via API key
          "anthropic-version": "2023-06-01", // Version of the API
          "Content-Type": "application/json", // Content type for the request
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Analysis error:", error.message);
    throw error;
  }
};

// Assuming Claude AI is available via an API
const matchWithAI = async (mainCriteria, type, prompt, allData) => {
  try {
    const data = JSON.stringify(allData);
    const criteria = JSON.stringify(mainCriteria);
    if (type === 1) {
      const completion = await deepSeek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "Analyze this text for sentiment, key topics, and named entities.",
          },
          {
            role: "user",
            content: prompt
              ? prompt
              : `From this data ${data}, match the users that came close to these criteria ${criteria} and return an array of matched users`, // The user message you want to send
          },
        ],
        temperature: 0.1,
        max_tokens: 256,
      });
      return JSON.parse(completion.choices[0].message.content);
    } else {
      const requestData = {
        model: "claude-3-5-sonnet-20241022", // The model you're using
        max_tokens: 1024, // The maximum number of tokens for the response
        messages: [
          {
            role: "user",
            content: prompt
              ? prompt
              : `From this array of users ${data}, match the users that came close to these criteria ${criteria} and return an array of matched users`, // The user message you want to send
          },
        ],
      };

      const response = await axios.post(claudeConfig?.url, requestData, {
        headers: {
          "x-api-key": claudeConfig?.key, // Authentication via API key
          "anthropic-version": "2023-06-01", // Version of the API
          "Content-Type": "application/json", // Content type for the request
        },
      });
      return response.data;
    }
  } catch (error) {
    // console.log(error);
    console.error("Analysis error:", error.message);
    return error
    // throw error;
  }
};

//for testing
const getAICostAndTokens = async (userData) => {
  try {
    // Call Claude AI API (replace with actual endpoint)
    const response = await axios.post("AI_API_URL", userData);

    // Extract AI cost, model name, and token usage from the response
    const aiCost = response.data.cost;
    const aiModel = response.data.model; // E.g., 'Claude-3.5-Sonnet-20241022'
    const aiTokens = response.data.tokensUsed; // Number of tokens used

    return { aiCost, aiModel, aiTokens };
  } catch (error) {
    console.error("Error with AI request:", error);
    return { aiCost: 0, aiModel: "Unknown", aiTokens: 0 };
  }
};
module.exports = { analyzeData, registerAI, matchWithAI, getAICostAndTokens };
