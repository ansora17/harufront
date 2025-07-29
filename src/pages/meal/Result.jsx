import React, { useState } from "react";
import SubLayout from "../../layout/SubLayout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Result() {
  const [mealRecords, setMealRecords] = useState([]);
  const location = useLocation();
  const passedRecord = location.state;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("mealRecords") || "[]");
    setMealRecords(stored);
  }, []);

  return (
    <>
      <SubLayout to={"/"} menu={"식단분석"} label={"식사요약"} />
      <div className="w-full max-w-[1020px] mx-auto px-4 py-3">
        {/* 날짜 / 시간 / 식사타입 */}
        <div className="flex flex-row sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={
              passedRecord.modifiedAt
                ? passedRecord.modifiedAt.split("T")[0]
                : ""
            }
            placeholder="날짜를 입력해 주세요"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            value={
              passedRecord.modifiedAt
                ? passedRecord.modifiedAt.split("T")[1]?.slice(0, 5)
                : ""
            }
            placeholder="시간을 입력해 주세요"
            className="input input-bordered flex-1 text-center"
          />
          <input
            type="text"
            value={
              passedRecord.mealType === "BREAKFAST"
                ? "아침"
                : passedRecord.mealType === "LUNCH"
                ? "점심"
                : passedRecord.mealType === "DINNER"
                ? "저녁"
                : passedRecord.mealType === "SNACK"
                ? "간식"
                : passedRecord.mealType
            }
            readOnly
            className="input input-bordered flex-1 text-center"
          />
        </div>

        {/* 이미지 업로드 박스 */}
        <div className="bg-gray-200 h-60 sm:h-64 md:h-72 rounded-xl flex items-center justify-center mb-6">
          <img
            src={passedRecord.imageUrl}
            alt="기록된 음식"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>

        {/* 총 섭취량 */}
        <div className="bg-gray-100 rounded-xl p-7 pb-7 mb-6">
          <div className="flex justify-between font-bold text-lg mb-4 px-10">
            <h2>총 섭취량</h2>
            <div className="flex">
              <p>{passedRecord.calories || 0}</p>
              <span className="text-purple-500">kcal</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-base">
            {[
              ["탄수화물", passedRecord.carbohydrate],
              ["단백질", passedRecord.protein],
              ["지방", passedRecord.fat],
              ["나트륨", Math.round((passedRecord.sodium ?? 0) * 10) / 10],
            ].map(([label, value], i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                  {value ?? 0}
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 기록 버튼 */}
        <div>
          <button className="btn bg-purple-500 text-white w-full rounded-lg text-base mb-2">
            기록하기
          </button>
          <button className="btn bg-red text-white w-full rounded-lg text-base">
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
}

export default Result;
