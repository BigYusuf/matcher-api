const axios = require("axios");
const { Op } = require("sequelize");

const getCountryFromIP = async (ipAddress) => {
  try {
    if (!process.env.IPINFO_TOKEN) {
      return "";
    }
    const response = await axios.get(
      `https://ipinfo.io/${ipAddress}/json?token=${process.env.IPINFO_TOKEN}`
    );
    return response.data.country; // This will return the country from the IP address.
  } catch (error) {
    console.error("Error fetching country from IP:", error);
    return null; // Return null if there's an issue fetching the country.
  }
};

const extractUserData = (input) => {
  console.log("input", input);
  // Extract the JSON-like data from the string
  const jsonStringMatch = input.match(/{.*}/s);
  if (jsonStringMatch) {
    const jsonString = jsonStringMatch[0];

    // Parse the JSON string into an object
    const obj = JSON.parse(jsonString);
    return obj;
  } else {
    console.log("notting");
    return;
  }
};
const extractObjectsFromString = (inputString) => {
  try {
    // Parse the string as JSON to get an array of objects
    const result = JSON.parse(inputString);

    // Check if the result is an array
    if (Array.isArray(result)) {
      return result;
    } else {
      throw new Error("Parsed result is not an array.");
    }
  } catch (error) {
    console.error("Error parsing the string:", error);
    return [];
  }
};
function extractArrayFromString(inputString) {
  // Regular expression to capture the array in the string
  const arrayRegex = /\[\s*(\{[^\}]*\}\s*,?\s*)+\s*\]/;

  // Match the array portion of the string
  const match = inputString.match(arrayRegex);

  if (match && match[0]) {
    // Return the array part (remove any extra formatting)
    try {
      // Parse the array portion into a JavaScript object
      return JSON.parse(match[0]);
    } catch (error) {
      console.error("Error parsing array from string:", error);
      return [];
    }
  } else {
    console.error("No array found in the string.");
    return [];
  }
}
const cleanObject = (data) => {
  const whereConditions = [];
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
  );

  if (cleanedData.country) {
    whereConditions.push({ country: cleanedData.country }); // Add condition for country if provided
  }
  if (cleanedData.work) {
    whereConditions.push({ work: cleanedData.work }); // Add condition for work if provided
  }
  if (cleanedData.city) {
    whereConditions.push({ city: cleanedData.city }); // Add condition for city if provided
  }
  if (cleanedData.maritalStatus) {
    whereConditions.push({ maritalStatus: cleanedData.maritalStatus }); // Add condition for marital Status if provided
  }
  if (cleanedData.rating) {
    // Calculate the rating range (±2.5 from the specified rating)
    const lowerRating = cleanedData.rating - 2.5;
    const upperRating = cleanedData.rating + 2.5;

    whereConditions.push({
      rating: {
        [Op.between]: [lowerRating, upperRating], // Rating between the calculated range
      },
    });
  }
  if (cleanedData.age) {
    // Calculate the rating range (±5 from the specified rating)
    const lowerAge = cleanedData.age - 5;
    const upperAge = cleanedData.age + 5;

    whereConditions.push({
      age: {
        [Op.between]: [lowerAge, upperAge], // Rating between the calculated age
      },
    });
  }
  return {
    val: Object.keys(cleanedData).length === 0 ? null : cleanedData,
    where: whereConditions,
  };
};

module.exports = {
  getCountryFromIP,
  extractObjectsFromString,
  extractUserData,
  extractArrayFromString,
  cleanObject,
};
