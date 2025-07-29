import React, { useState } from "react";
import RequestInfoForm from "../../components/mypage/RequestInfoForm";
import ConfirmationPopup from "../../components/mypage/ConfirmationPopup";
import { useDispatch } from "react-redux";
import { setNickname } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { searchNickname } from "../../api/authIssueUserApi/memberApi";
import axios from "../../api/authIssueUserApi/axiosInstance";

export default function SearchNickname() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "" });
  const [sent, setSent] = useState(false);
  const [nickname, setLocalNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called", form);
    try {
      setIsLoading(true);
      const response = await searchNickname(form);
      setLocalNickname(response.data.nickname);
      dispatch(setNickname(response.data.nickname));

      setSent(true);
      setForm({ name: "", email: "" });
      setTimeout(() => {
        setSent(false);
        navigate("/member/login");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || "닉네임 찾기에 실패했습니다.";
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
          title="닉네임 찾기"
          submitText={isLoading ? "처리 중..." : "닉네임 받기"}
          disabled={isLoading}
        />
        {sent && (
          <div className="space-y-2">
            <ConfirmationPopup
              message={`요청하신 닉네임은 "${nickname}" 입니다.`}
              onConfirm={() => setSent(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
