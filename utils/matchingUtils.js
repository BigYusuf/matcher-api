const matchUsersExample = (users, criteria) => {
  // Convert Sequelize instances to plain objects if needed
  const plainUsers = users.map((user) =>
    user.get ? user.get({ plain: true }) : user
  );

  // Function to check if a user matches the criteria
  const matchesCriteria = (user, criteria) => {
    return Object.entries(criteria).every(([key, value]) => {
      // You can add custom matching logic here
      return user[key] === value;
    });
  };
  // Filter users that match criteria
  const matchedUsers = plainUsers.filter((user) =>
    matchesCriteria(user, criteria)
  );
  return matchedUsers;
};

//1. Add fuzzy matching:
const matchUsersFuzzy = (users, criteria, fuzzyMatch = false) => {
  const plainUsers = users.map((user) =>
    user.get ? user.get({ plain: true }) : user
  );

  const matchesCriteria = (user, criteria) => {
    return Object.entries(criteria).every(([key, value]) => {
      if (fuzzyMatch && typeof user[key] === "string") {
        return user[key].toLowerCase().includes(value.toLowerCase());
      }
      return user[key] === value;
    });
  };

  return plainUsers.filter((user) => matchesCriteria(user, criteria));
};

//2. Add partial matching:

const matchUsersPartial = (users, criteria) => {
  const plainUsers = users.map((user) =>
    user.get ? user.get({ plain: true }) : user
  );

  const matchesCriteria = (user, criteria) => {
    return Object.entries(criteria).every(([key, value]) => {
      if (!user.hasOwnProperty(key)) return false;

      if (typeof value === "object") {
        return JSON.stringify(user[key]) === JSON.stringify(value);
      }

      return user[key] === value;
    });
  };

  return plainUsers.filter((user) => matchesCriteria(user, criteria));
};

// 3. Add threshold matching:
const matchUsersThreshold = (users, criteria, threshold = 0.8) => {
  const plainUsers = users.map((user) =>
    user.get ? user.get({ plain: true }) : user
  );

  const calculateSimilarity = (str1, str2) => {
    // Simple similarity calculation
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    return (
      (longer.length - levenshteinDistance(longer, shorter)) / longer.length
    );
  };

  const matchesCriteria = (user, criteria) => {
    return Object.entries(criteria).every(([key, value]) => {
      if (typeof user[key] === "string" && typeof value === "string") {
        return calculateSimilarity(user[key], value) >= threshold;
      }
      return user[key] === value;
    });
  };

  return plainUsers.filter((user) => matchesCriteria(user, criteria));
};

module.exports = {
  matchUsersExample,
  matchUsersFuzzy,
  matchUsersPartial,
  matchUsersThreshold,
};
