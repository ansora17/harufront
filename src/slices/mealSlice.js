import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMeal: null,
  selectedDate: new Date().toISOString().slice(0, 10),
  mealRecords: [], // 특정 날짜 데이터 (Meal 페이지용)
  monthlyMealRecords: [], // 🔥 월별 전체 데이터 (Record 페이지용)
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  totalKcal: 0,
  totalCarbs: 0,
  totalProtein: 0,
  totalFat: 0,
  isLoading: false,
  isMonthlyLoading: false, // 🔥 월별 데이터 로딩 상태
  error: null,
  monthlyError: null, // 🔥 월별 데이터 에러 상태
};

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    setSelectedMeal: (state, action) => {
      state.selectedMeal = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setMealRecords: (state, action) => {
      state.mealRecords = action.payload;
    },
    // 🔥 월별 데이터 관리 리듀서들
    setMonthlyMealRecords: (state, action) => {
      state.monthlyMealRecords = action.payload;
    },
    setCurrentMonth: (state, action) => {
      state.currentMonth = action.payload.month;
      state.currentYear = action.payload.year;
    },
    setMonthlyLoading: (state, action) => {
      state.isMonthlyLoading = action.payload;
    },
    setMonthlyError: (state, action) => {
      state.monthlyError = action.payload;
    },
    clearMonthlyError: (state) => {
      state.monthlyError = null;
    },
    setNutritionTotals: (state, action) => {
      const { totalKcal, totalCarbs, totalProtein, totalFat } = action.payload;
      state.totalKcal = totalKcal;
      state.totalCarbs = totalCarbs;
      state.totalProtein = totalProtein;
      state.totalFat = totalFat;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setSelectedMeal,
  setSelectedDate,
  setMealRecords,
  setMonthlyMealRecords,
  setCurrentMonth,
  setMonthlyLoading,
  setMonthlyError,
  clearMonthlyError,
  setNutritionTotals,
  setLoading,
  setError,
  clearError,
} = mealSlice.actions;

export default mealSlice.reducer;
