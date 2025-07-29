import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { format, isToday } from "date-fns";

const MealCalendarModal = ({ open, onClose, onSelectDate, memberId }) => {
  const [recordedDates, setRecordedDates] = useState([]);

  useEffect(() => {
    if (!open) return;
    axios
      .get(`/api/meals/recorded-dates/member/${memberId}`)
      .then((res) => {
        setRecordedDates(res.data);
      })
      .catch(() => setRecordedDates([]));
  }, [open, memberId]);

  // 오늘 날짜와 기록된 날짜를 구분해서 클래스 부여
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = format(date, "yyyy-MM-dd");
      if (recordedDates.includes(dateStr)) {
        if (isToday(date)) {
          return "recorded-today";
        }
        return "recorded-day";
      }
    }
    return null;
  };

  const tileContent = () => null; // 점 표시 대신 배경색으로 구분

  if (!open) return null;

  return (
    <>
      <style>{`
        .react-calendar__tile--now {
          background:rgb(221, 223, 252) !important;
          color:#6366f1 !important;
        }
        .recorded-day {
          background: #d8b4fe !important;
          color: #7c3aed !important;
          border-radius: 50% !important;
        }
        .recorded-today {
          background: #a78bfa !important;
          color: #fff !important;
          border-radius: 50% !important;
        }
      `}</style>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl relative min-w-[340px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold"> </h2>
            <button
              className="text-2xl text-gray-400 hover:text-purple-500 transition-colors"
              onClick={onClose}
              aria-label="닫기"
            >
              ×
            </button>
          </div>
          <Calendar
            onClickDay={(value) => {
              onSelectDate(format(value, "yyyy-MM-dd"));
              onClose();
            }}
            tileContent={tileContent}
            tileClassName={tileClassName}
            className="border-0 shadow-none w-full"
          />
        </div>
      </div>
    </>
  );
};

export default MealCalendarModal;
