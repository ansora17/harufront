import React, { useState, useEffect } from "react";

const mealTypeOptions = [
  { value: "아침", label: "아침" },
  { value: "점심", label: "점심" },
  { value: "저녁", label: "저녁" },
  { value: "간식", label: "간식" },
];

const MealTypeModal = ({ open, onClose, onConfirm, initialType }) => {
  const [tempType, setTempType] = useState(initialType || "");

  useEffect(() => {
    setTempType(initialType || "");
  }, [initialType, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl min-w-[300px] flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">식사 타입 선택</h2>
        <select
          className="input input-bordered mb-4"
          value={tempType}
          onChange={(e) => setTempType(e.target.value)}
        >
          <option value="" disabled>
            선택하세요
          </option>
          {mealTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="flex gap-2 mt-4">
          <button className="btn" onClick={onClose}>
            취소
          </button>
          <button
            className="btn bg-purple-500 text-white"
            onClick={() => {
              onConfirm(tempType);
              onClose();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealTypeModal;
