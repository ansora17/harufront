// Cookie utility for comprehensive user data storage
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: false, // Set to true in production with HTTPS
  sameSite: "strict",
  path: "/",
};

// Store access token in cookie
export const setAccessToken = (token) => {
  if (token) {
    document.cookie = `accessToken=${token}; expires=${new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toUTCString()}; path=/; SameSite=Strict`;
  }
};

// Store refresh token in cookie
export const setRefreshToken = (token) => {
  if (token) {
    document.cookie = `refreshToken=${token}; expires=${new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toUTCString()}; path=/; SameSite=Strict`;
  }
};

// Get access token from cookie
export const getAccessToken = () => {
  const cookies = document.cookie.split(";");
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("accessToken=")
  );
  return accessTokenCookie ? accessTokenCookie.split("=")[1] : null;
};

// Get refresh token from cookie
export const getRefreshToken = () => {
  const cookies = document.cookie.split(";");
  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("refreshToken=")
  );
  return refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;
};

// Remove access token cookie
export const removeAccessToken = () => {
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// Remove refresh token cookie
export const removeRefreshToken = () => {
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// Remove all auth cookies
export const removeAllAuthCookies = () => {
  removeAccessToken();
  removeRefreshToken();
};

// Check if user has valid tokens
export const hasValidTokens = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return !!(accessToken && refreshToken);
};

// Store comprehensive user data in cookie (for persistence)
export const setUserData = (userData) => {
  if (userData) {
    const userString = JSON.stringify(userData);
    document.cookie = `userData=${encodeURIComponent(
      userString
    )}; expires=${new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toUTCString()}; path=/; SameSite=Strict`;
  }
};

// Get user data from cookie
export const getUserData = () => {
  const cookies = document.cookie.split(";");
  const userDataCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("userData=")
  );
  if (userDataCookie) {
    try {
      const userString = decodeURIComponent(userDataCookie.split("=")[1]);
      return JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user data from cookie:", error);
      return null;
    }
  }
  return null;
};

// Remove user data cookie
export const removeUserData = () => {
  document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// Store today's consumed calories in cookie
export const setTodayCalories = (calories) => {
  if (calories !== undefined) {
    document.cookie = `todayCalories=${calories}; expires=${new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toUTCString()}; path=/; SameSite=Strict`;
  }
};

// Get today's consumed calories from cookie
export const getTodayCalories = () => {
  const cookies = document.cookie.split(";");
  const todayCaloriesCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("todayCalories=")
  );
  return todayCaloriesCookie
    ? parseInt(todayCaloriesCookie.split("=")[1]) || 0
    : 0;
};

// Store today's consumed nutrients in cookie
export const setTodayNutrients = (nutrients) => {
  if (nutrients) {
    const nutrientsString = JSON.stringify(nutrients);
    document.cookie = `todayNutrients=${encodeURIComponent(
      nutrientsString
    )}; expires=${new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toUTCString()}; path=/; SameSite=Strict`;
  }
};

// Get today's consumed nutrients from cookie
export const getTodayNutrients = () => {
  const cookies = document.cookie.split(";");
  const todayNutrientsCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("todayNutrients=")
  );
  if (todayNutrientsCookie) {
    try {
      const nutrientsString = decodeURIComponent(
        todayNutrientsCookie.split("=")[1]
      );
      return JSON.parse(nutrientsString);
    } catch (error) {
      console.error("Error parsing today nutrients from cookie:", error);
      return { carbs: 0, protein: 0, fat: 0 };
    }
  }
  return { carbs: 0, protein: 0, fat: 0 };
};

// Calculate recommended calories based on user data
export const calculateRecommendedCalories = (userData) => {
  if (
    !userData ||
    !userData.weight ||
    !userData.height ||
    !userData.activityLevel
  ) {
    return 2000; // Default value
  }

  // Basic BMR calculation (Mifflin-St Jeor Equation)
  let bmr;
  if (userData.gender === "MALE") {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * 25 + 5; // Assuming age 25
  } else {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * 25 - 161; // Assuming age 25
  }

  // Activity level multipliers
  const activityMultipliers = {
    LOW: 1.2, // Sedentary
    MODERATE: 1.55, // Moderately active
    HIGH: 1.725, // Very active
  };

  const multiplier = activityMultipliers[userData.activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
};

// Get user's recommended calories
export const getRecommendedCalories = () => {
  const userData = getUserData();
  return calculateRecommendedCalories(userData);
};

// Store meal data in cookie
export const setMealData = (mealData) => {
  if (mealData) {
    const mealString = JSON.stringify(mealData);
    document.cookie = `mealData=${encodeURIComponent(
      mealString
    )}; expires=${new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toUTCString()}; path=/; SameSite=Strict`;
  }
};

// Get meal data from cookie
export const getMealData = () => {
  const cookies = document.cookie.split(";");
  const mealDataCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("mealData=")
  );
  if (mealDataCookie) {
    try {
      const mealString = decodeURIComponent(mealDataCookie.split("=")[1]);
      return JSON.parse(mealString);
    } catch (error) {
      console.error("Error parsing meal data from cookie:", error);
      return [];
    }
  }
  return [];
};

// Remove all app data cookies
export const removeAllAppCookies = () => {
  removeAllAuthCookies();
  removeUserData();
  document.cookie =
    "todayCalories=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "todayNutrients=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "mealData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// Get comprehensive user dashboard data
export const getUserDashboardData = () => {
  const userData = getUserData();
  const todayCalories = getTodayCalories();
  const todayNutrients = getTodayNutrients();
  const recommendedCalories = getRecommendedCalories();
  const mealData = getMealData();

  return {
    user: userData,
    todayCalories,
    todayNutrients,
    recommendedCalories,
    remainingCalories: recommendedCalories - todayCalories,
    mealData,
    progress: {
      calories: Math.round((todayCalories / recommendedCalories) * 100),
      carbs: todayNutrients.carbs,
      protein: todayNutrients.protein,
      fat: todayNutrients.fat,
    },
  };
};

// Debug function to check all cookies
export const debugAllCookies = () => {
  const allCookies = document.cookie.split(";");
  const cookieMap = {};

  allCookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name && value) {
      cookieMap[name] = value;
    }
  });

  console.log("🍪 All current cookies:", cookieMap);
  return cookieMap;
};
