import React from "react";

function MealSummary({ mealCounts }) {
  const summaryItems = [
    {
      type: "아침",
      count: mealCounts.아침 || 0,
      bgColor: "bg-yellow-300",
      textColor: "text-yellow-600",
    },
    {
      type: "점심",
      count: mealCounts.점심 || 0,
      bgColor: "bg-blue-300",
      textColor: "text-blue-600",
    },
    {
      type: "저녁",
      count: mealCounts.저녁 || 0,
      bgColor: "bg-red-300",
      textColor: "text-red-600",
    },
    {
      type: "간식",
      count: mealCounts.간식 || 0,
      bgColor: "bg-purple-300",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 bg-gray-50 rounded-2xl sm:rounded-4xl p-3 sm:p-4 shadow-sm">
      {summaryItems.map((item) => (
        <div
          key={item.type}
          className="bg-white rounded-2xl sm:rounded-4xl p-3 sm:p-4 items-center space-x-2 sm:space-x-3 justify-center flex"
        >
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${item.bgColor}`}
            />
            <div className="text-gray-600 text-sm sm:text-sm lg:text-lg   font-bold">
              {item.type}
            </div>
          </div>
          <div
            className={`text-base sm:text-sm lg:text-lg  font-bold text-gray-600`}
          >
            {item.count}건
          </div>
        </div>
      ))}
    </div>
  );
}

export default MealSummary;
