import React from "react";

export default function MealCard({ meal }) {
  // 시간 포맷팅 함수
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 shadow-sm">
      <div>
        <div>
          {/* 🔥 식단기록과 완전히 동일한 이미지 로직 */}
          <div className="mb-3">
            <img
              className="w-full h-32 rounded-xl object-cover"
              src={meal.imageUrl || meal.image || "/images/food_1.jpg"}
              alt="음식 사진"
            />
          </div>
        </div>

        <div>
          
        </div>
        {/* 식사 정보 헤더 */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {meal.type}
            <span className="text-xs sm:text-sm font-normal ml-1 text-gray-600">
              {formatTime(meal.createDate)}
            </span>
          </h3>

          <div className="text-right mt-1 sm:mt-0">
            <p className="text-base sm:text-lg font-semibold">
              {meal.totalKcal || meal.kcal || meal.calories}kcal
            </p>
          </div> 
        </div>

        {meal.foods && meal.foods.length > 0 && (
          <div className="mb-2">
            <h4 className="font-semibold mb-1 text-gray-800 text-sm sm:text-base">
              섭취 음식
            </h4>
            <div className="flex flex-wrap gap-2">
              {meal.foods.map((food) => (
                <span
                  key={food.foodId}
                  className="bg-white px-2 py-1 rounded text-xs sm:text-sm"
                >
                  {food.foodName} ({food.kcal || food.calories}kcal)
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
