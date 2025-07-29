// src/pages/meal/Meal.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedDate,
  setMealRecords,
  setNutritionTotals,
  setLoading,
  setError,
  clearError,
} from "../../slices/mealSlice";
import axios from "axios";
import MealPickerModal from "../../components/meal/MealPickerModal";
import MealCard from "../../components/haruReport/record/MealCard";
import SubLayout from "../../layout/SubLayout";
import { useNavigate } from "react-router-dom";
import MealCalendarModal from "../../components/meal/MealCalendarModal";

function Meal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Redux에서 상태 가져오기
  const {
    selectedDate,
    mealRecords,
    totalKcal,
    totalCarbs,
    totalProtein,
    totalFat,
    isLoading,
    error,
  } = useSelector((state) => state.meal);

  const [isMealPickerOpen, setIsMealPickerOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 목표 칼로리 (임시로 2000으로 설정)
  const calorieGoal = 2000;

  // 날짜 변경 함수
  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    const newDateString = newDate.toISOString().slice(0, 10);
    dispatch(setSelectedDate(newDateString));
  };

  // 카드 클릭 핸들러
  const handleCardClick = (record) => {
    const id = record.mealId || record.id;
    navigate(`/dashboard/result/${id}`, { state: record });
  };

  // 식사 기록 불러오기 함수
  const loadMeals = useCallback(async () => {
    const memberId = 1; // 임시로 하드코딩

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await axios.get(
        `/api/meals/modified-date/member/${memberId}?date=${selectedDate}`
      );

      if (response.data) {
        // 데이터 가공
        const processedData = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        const transformedData = processedData.map((record) => {
          // mealType → type 변환
          const convertMealType = (mealType) => {
            const typeMap = {
              BREAKFAST: "아침",
              LUNCH: "점심",
              DINNER: "저녁",
              SNACK: "간식",
            };
            return typeMap[mealType] || mealType;
          };

          // 영양소 계산
          let recordCalories = 0;
          let recordCarbs = 0;
          let recordProtein = 0;
          let recordFat = 0;

          if (record.foods && Array.isArray(record.foods)) {
            record.foods.forEach((food) => {
              recordCalories += food.calories || 0;
              recordCarbs += food.carbohydrate || 0;
              recordProtein += food.protein || 0;
              recordFat += food.fat || 0;
            });
          }

          // 🔥 modifiedAt 우선으로 날짜 필드 설정
          const dateField =
            record.modifiedAt ||
            record.createDate ||
            record.createdDate ||
            record.date;

          return {
            ...record,
            type: convertMealType(record.mealType),
            createDate: dateField,
            modifiedAt: record.modifiedAt,
            totalKcal: recordCalories,
            calories: recordCalories,
          };
        });

        // Redux에 저장
        dispatch(setMealRecords(transformedData));

        // 전체 영양소 계산
        const totalCalories = transformedData.reduce(
          (sum, record) => sum + (record.totalKcal || 0),
          0
        );
        const totalCarbsSum = transformedData.reduce((sum, record) => {
          return (
            sum +
            (record.foods
              ? record.foods.reduce(
                  (foodSum, food) => foodSum + (food.carbohydrate || 0),
                  0
                )
              : 0)
          );
        }, 0);
        const totalProteinSum = transformedData.reduce((sum, record) => {
          return (
            sum +
            (record.foods
              ? record.foods.reduce(
                  (foodSum, food) => foodSum + (food.protein || 0),
                  0
                )
              : 0)
          );
        }, 0);
        const totalFatSum = transformedData.reduce((sum, record) => {
          return (
            sum +
            (record.foods
              ? record.foods.reduce(
                  (foodSum, food) => foodSum + (food.fat || 0),
                  0
                )
              : 0)
          );
        }, 0);

        dispatch(
          setNutritionTotals({
            totalKcal: totalCalories,
            totalCarbs: totalCarbsSum,
            totalProtein: totalProteinSum,
            totalFat: totalFatSum,
          })
        );
      }
    } catch (err) {
      console.error("🚨 식사 기록 불러오기 실패:", err);
      dispatch(setError("식사 기록을 불러오는데 실패했습니다."));
    } finally {
      dispatch(setLoading(false));
    }
  }, [selectedDate, dispatch]);

  // selectedDate 변경시 식사 기록 로드
  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  const handleMealTypeClick = (mealType) => {
    setSelectedMealType(mealType);
    setIsMealPickerOpen(true);
  };

  // 식사 타입별 데이터 가져오기
  const getMealsByType = (type) => {
    return mealRecords.filter((meal) => meal.type === type);
  };

  return (
    <>
      <div className="p-4 sm:p-6 container mx-auto space-y-8 sm:w-[1020px]">
        <div className="flex gap-4 items-center justify-center">
          <div
            className="text-center text-lg sm:text-2xl font-bold cursor-pointer"
            onClick={() => changeDate(-1)}
          >
            〈
          </div>
          <div
            className="text-center text-lg sm:text-2xl font-bold cursor-pointer"
            onClick={() => setIsCalendarOpen(true)}
          >
            {new Date(selectedDate)
              .toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                weekday: "short",
              })
              .replace(/\./g, "-")
              .replace(/\s/g, " ")}
          </div>
          <div
            className="text-center text-lg sm:text-2xl font-bold cursor-pointer"
            onClick={() => changeDate(1)}
          >
            〉
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg p-4 px-0 sm:px-40">
          <div className="text-md mb-4">
            <span className="font-bold">총 섭취량</span>{" "}
            <span className="text-purple-500 font-bold">{totalKcal}</span> /{" "}
            {calorieGoal}kcal
          </div>

          {/* 전체 kcal */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-700 h-4 rounded-full"
              style={{
                width: `${Math.min((totalKcal / calorieGoal) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <div className="flex gap-10 justify-between">
            <div>
              <div className="text-md mb-4 pr-10 sm:pr-24">
                <span className="font-bold text-sm sm:text-base">
                  탄수화물 <span className="text-green">{totalCarbs}</span>g
                </span>
              </div>

              {/* 전체 progress bar */}
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-green to-green-700 h-4 rounded-full"
                  style={{
                    width: `${Math.min((totalCarbs / 300) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="text-md mb-4 pr-10 sm:pr-24">
                <span className="font-bold text-sm sm:text-base">
                  단백질 <span className="text-yellow">{totalProtein}</span>g
                </span>
              </div>

              {/* 전체 progress bar */}
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-yellow to-yellow-700 h-4 rounded-full"
                  style={{
                    width: `${Math.min((totalProtein / 60) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="text-md mb-4 pr-10 sm:pr-24">
                <span className="font-bold text-sm sm:text-base">
                  지방 <span className="text-red">{totalFat}</span>g
                </span>
              </div>

              {/* 전체 progress bar */}
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-red to-red-700 h-4 rounded-full"
                  style={{ width: `${Math.min((totalFat / 70) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 식사 기록 */}
        <h2 className="m-0 text-lg sm:text-xl font-semibold">식사기록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mealRecords.map((record) => (
            <div
              key={record.mealId || record.id}
              onClick={() => handleCardClick(record)}
            >
              <div className="card justify-between bg-base-100 w-full rounded-xl shadow-lg p-[20px] hover:bg-gray-100 transition-colors duration-200">
                <figure className="mt-4">
                  <img
                    className="rounded-xl h-[180px] w-full object-cover"
                    src={
                      record.imageUrl || record.image || "/images/food_1.jpg"
                    }
                    alt="음식 사진"
                  />
                </figure>
                <div className="card-body p-0">
                  <h2 className="card-title flex mt-2">
                    <span className="text-sm text-gray-500">
                      {record.type || record.mealType}
                    </span>
                    <span className="text-purple-500">
                      {record.totalKcal || record.kcal || record.calories}kcal
                    </span>
                  </h2>
                  <div className="text-[16px] font-semibold flex gap-4">
                    <p>
                      탄{" "}
                      <span className="text-green">
                        {record.totalcarbohydrate ||
                          record.carbohydrate ||
                          (record.foods
                            ? record.foods.reduce(
                                (sum, food) => sum + (food.carbohydrate || 0),
                                0
                              )
                            : 0)}
                      </span>
                      g
                    </p>
                    <p>
                      단{" "}
                      <span className="text-yellow">
                        {record.totalProtein ||
                          record.protein ||
                          (record.foods
                            ? record.foods.reduce(
                                (sum, food) => sum + (food.protein || 0),
                                0
                              )
                            : 0)}
                      </span>
                      g
                    </p>
                    <p>
                      지{" "}
                      <span className="text-red">
                        {record.totalFat ||
                          record.fat ||
                          (record.foods
                            ? record.foods.reduce(
                                (sum, food) => sum + (food.fat || 0),
                                0
                              )
                            : 0)}
                      </span>
                      g
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MealPickerModal />
      <MealCalendarModal
        open={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectDate={(date) => dispatch(setSelectedDate(date))}
        memberId={1}
      />
    </>
  );
}

export default Meal;
