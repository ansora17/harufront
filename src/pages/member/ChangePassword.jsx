import React, { useState } from "react";
import RequestInfoForm from "../../components/mypage/RequestInfoForm";
import ConfirmationPopup from "../../components/mypage/ConfirmationPopup";
import { requestPasswordReset } from "../../api/authIssueUserApi/memberApi";
import axios from "../../api/authIssueUserApi/axiosInstance";

export default function ChangePassword() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // await requestPasswordReset(form.email);
      await requestPasswordReset(form);
      setShowPopup(true);
      setForm({ name: "", email: "" });
    } catch (error) {
      const message =
        error.response?.data?.message || "비밀번호 재설정 요청에 실패했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <RequestInfoForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          title="본인 확인 이메일 인증"
          submitText={isLoading ? "처리 중..." : "임시비밀번호 받기"}
          disabled={isLoading}
        />
        {showPopup && (
          <ConfirmationPopup
            message="요청하신 정보를 이메일로 발송했습니다"
            onConfirm={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
}
