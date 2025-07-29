import React, { useState, useEffect } from "react";

const TimePickerModal = ({ open, onClose, onConfirm, initialTime }) => {
  const [tempTime, setTempTime] = useState(initialTime || "");

  useEffect(() => {
    setTempTime(initialTime || "");
  }, [initialTime, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl min-w-[300px] flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">시간 선택</h2>
        <input
          type="time"
          value={tempTime}
          onChange={(e) => setTempTime(e.target.value)}
          className="input input-bordered mb-4"
        />
        <div className="flex gap-2">
          <button className="btn" onClick={onClose}>
            취소
          </button>
          <button
            className="btn bg-purple-500 text-white"
            onClick={() => {
              onConfirm(tempTime);
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

export default TimePickerModal;
