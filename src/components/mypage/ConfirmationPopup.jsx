import React from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmationPopup({ message }) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/"); // ✅ Redirect to main page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md text-center max-w-sm w-full">
        <p className="mb-4">{message}</p>
        <button
          onClick={handleConfirm}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          확인
        </button>
      </div>
    </div>
  );
}
