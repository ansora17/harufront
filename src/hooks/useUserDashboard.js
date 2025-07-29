import { useSelector } from "react-redux";
import {
  getUserDashboardData,
  getTodayCalories,
  getTodayNutrients,
  getRecommendedCalories,
  setTodayCalories,
  setTodayNutrients,
  setMealData,
  getMealData,
} from "../utils/cookieUtils";

// Hook to get comprehensive user dashboard data
export const useUserDashboard = () => {
  const { user, isLoggedIn } = useSelector((state) => state.login);

  const dashboardData = getUserDashboardData();

  return {
    // User profile data
    user: dashboardData.user,
    isLoggedIn,

    // Weight and physical data
    weight: user?.weight || 0,
    height: user?.height || 0,
    activityLevel: user?.activityLevel || "MODERATE",

    // Calorie data
    recommendedCalories: dashboardData.recommendedCalories,
    todayCalories: dashboardData.todayCalories,
    remainingCalories: dashboardData.remainingCalories,

    // Nutrient data
    todayNutrients: dashboardData.todayNutrients,
    progress: dashboardData.progress,

    // Meal data
    mealData: dashboardData.mealData,

    // Helper functions
    updateTodayCalories: (calories) => {
      setTodayCalories(calories);
    },

    updateTodayNutrients: (nutrients) => {
      setTodayNutrients(nutrients);
    },

    addMeal: (meal) => {
      const currentMeals = getMealData();
      const updatedMeals = [...currentMeals, meal];
      setMealData(updatedMeals);

      // Update total calories and nutrients
      const totalCalories = updatedMeals.reduce(
        (sum, m) => sum + (m.calories || 0),
        0
      );
      const totalNutrients = updatedMeals.reduce(
        (sum, m) => ({
          carbs: sum.carbs + (m.carbs || 0),
          protein: sum.protein + (m.protein || 0),
          fat: sum.fat + (m.fat || 0),
        }),
        { carbs: 0, protein: 0, fat: 0 }
      );

      setTodayCalories(totalCalories);
      setTodayNutrients(totalNutrients);
    },

    removeMeal: (mealId) => {
      const currentMeals = getMealData();
      const updatedMeals = currentMeals.filter((meal) => meal.id !== mealId);
      setMealData(updatedMeals);

      // Recalculate totals
      const totalCalories = updatedMeals.reduce(
        (sum, m) => sum + (m.calories || 0),
        0
      );
      const totalNutrients = updatedMeals.reduce(
        (sum, m) => ({
          carbs: sum.carbs + (m.carbs || 0),
          protein: sum.protein + (m.protein || 0),
          fat: sum.fat + (m.fat || 0),
        }),
        { carbs: 0, protein: 0, fat: 0 }
      );

      setTodayCalories(totalCalories);
      setTodayNutrients(totalNutrients);
    },

    // Progress calculations
    getCalorieProgress: () => {
      const { todayCalories, recommendedCalories } = dashboardData;
      return Math.min(
        Math.round((todayCalories / recommendedCalories) * 100),
        100
      );
    },

    getNutrientProgress: (nutrient) => {
      const { todayNutrients } = dashboardData;
      const { recommendedCalories } = dashboardData;

      // Calculate recommended nutrients based on calories
      const recommendedNutrients = {
        carbs: Math.round((recommendedCalories * 0.45) / 4), // 45% of calories from carbs
        protein: Math.round((recommendedCalories * 0.25) / 4), // 25% of calories from protein
        fat: Math.round((recommendedCalories * 0.3) / 9), // 30% of calories from fat
      };

      const current = todayNutrients[nutrient] || 0;
      const recommended = recommendedNutrients[nutrient] || 1;

      return Math.min(Math.round((current / recommended) * 100), 100);
    },

    // Weight tracking
    getWeightStatus: () => {
      if (!user?.weight) return "Not set";
      return `${user.weight}kg`;
    },

    // Activity level display
    getActivityLevelDisplay: () => {
      const levels = {
        LOW: "낮음 (Sedentary)",
        MODERATE: "보통 (Moderate)",
        HIGH: "높음 (Active)",
      };
      return levels[user?.activityLevel] || "보통 (Moderate)";
    },
  };
};
