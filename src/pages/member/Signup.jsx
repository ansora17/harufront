import React, { useState } from "react";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "../../utils/memberJwtUtil/validatos";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/mypage/FormInput";
import FormSelect from "../../components/mypage/FormSelect";
import {
  signupMember,
  checkEmailExists,
  checkNicknameExists,
} from "../../api/authIssueUserApi/memberApi";

export default function Signup() {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [calories, setCalories] = useState(0);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
    birthAt: "",
    gender: "FEMALE",
    height: "",
    weight: "",
    activityLevel: "MODERATE",
    role: "USER",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [dupChecked, setDupChecked] = useState({
    email: false,
    nickname: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "email" || name === "nickname") {
      setDupChecked((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Duplication check for email or nickname
  const handleDupCheck = async (type) => {
    try {
      setIsLoading(true);
      if (type === "email") {
        const res = await checkEmailExists(form.email);
        if (res.data) {
          setErrors((prev) => ({
            ...prev,
            email: "이미 사용 중인 이메일입니다.",
          }));
        } else {
          setDupChecked((prev) => ({ ...prev, email: true }));
          alert("사용 가능한 이메일입니다.");
        }
      } else if (type === "nickname") {
        const res = await checkNicknameExists(form.nickname);
        if (res.data) {
          setErrors((prev) => ({
            ...prev,
            nickname: "이미 사용 중인 닉네임입니다.",
          }));
        } else {
          setDupChecked((prev) => ({ ...prev, nickname: true }));
          alert("사용 가능한 닉네임입니다.");
        }
      }
    } catch (error) {
      alert("중복 확인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!validatePassword(form.password)) {
      newErrors.password =
        "비밀번호는 영어대문자,숫자,특수문자를 포함한 4~20자입니다.";
    }
    if (form.password !== form.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (!validateNickname(form.nickname)) {
      newErrors.nickname = "닉네임은 영어 소문자 또는 숫자, 4~12자입니다.";
    }
    if (!dupChecked.email) {
      newErrors.email = "이메일 중복 확인을 해주세요.";
    }
    if (!dupChecked.nickname) {
      newErrors.nickname = "닉네임 중복 확인을 해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep(2);
  };

  const handleSubmitFinal = async (e) => {
    e.preventDefault();
    const { birthAt, gender, activityLevel, height, weight } = form;
    if (!birthAt || !gender || !activityLevel || !height || !weight) {
      return alert("모든 정보를 정확히 입력해주세요.");
    }

    try {
      setIsLoading(true);
      const { passwordConfirm, ...signupData } = form;

      // Send signup request (with profile image)
      const response = await signupMember(signupData, profileImage);

      //check for API testing
      console.log("Final signup POST request sent");
      console.log("signupData:", signupData);
      console.log("profileImage:", profileImage);
      console.log("response:", response);
      console.log("response.data:", response.data);

      setCalories(response.data.dailyCalories || 0);
      setIsComplete(true);
    } catch (error) {
      console.error("Signup failed:", error);
      const message =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-20 bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        {isComplete ? (
          <ConfirmationScreen name={form.name} calories={calories} />
        ) : step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
            <form onSubmit={handleSubmitStep1} className="space-y-4">
              <div>
                <label className="text-sm font-medium">이메일</label>
                <div className="flex gap-2">
                  <FormInput
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleDupCheck("email")}
                    disabled={isLoading || !form.email}
                  >
                    중복확인
                  </button>
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">비밀번호</label>
                <FormInput
                  name="password"
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="영어대문자,숫자,특수문자 포함 4~20자"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">비밀번호 확인</label>
                <FormInput
                  name="passwordConfirm"
                  id="passwordConfirm"
                  type="password"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  placeholder="비밀번호 확인"
                  disabled={isLoading}
                />
                {errors.passwordConfirm && (
                  <p className="text-xs text-red-500">
                    {errors.passwordConfirm}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">닉네임</label>
                <div className="flex gap-2">
                  <FormInput
                    name="nickname"
                    id="nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    placeholder="영어 소문자, 숫자, 4~12자"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => handleDupCheck("nickname")}
                    disabled={isLoading || !form.nickname}
                  >
                    중복확인
                  </button>
                </div>
                {errors.nickname && (
                  <p className="text-xs text-red-500">{errors.nickname}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">이름</label>
                <FormInput
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="이름"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  프로필 이미지 (선택)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "확인 중..." : "다음"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              추가 정보 입력
            </h2>
            <form onSubmit={handleSubmitFinal} className="space-y-4">
              <FormSelect
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={[
                  { value: "FEMALE", label: "여성" },
                  { value: "MALE", label: "남성" },
                ]}
                disabled={isLoading}
              />
              <FormInput
                name="birthAt"
                id="birthAt"
                type="date"
                value={form.birthAt}
                onChange={handleChange}
                placeholder="생년월일"
                disabled={isLoading}
              />
              <FormSelect
                name="activityLevel"
                value={form.activityLevel}
                onChange={handleChange}
                options={[
                  { value: "HIGH", label: "매우 활동적" },
                  { value: "MODERATE", label: "활동적" },
                  { value: "LOW", label: "낮음" },
                ]}
                disabled={isLoading}
              />
              <FormInput
                name="height"
                id="height"
                value={form.height}
                onChange={handleChange}
                placeholder="키 (cm)"
                disabled={isLoading}
              />
              <FormInput
                name="weight"
                id="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="몸무게 (kg)"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "처리 중..." : "저장"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const ConfirmationScreen = ({ name, calories }) => {
  const navigate = useNavigate();
  const handleStart = () => navigate("/member/login");

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl font-bold">스마트한 다이어트 시작!</h2>
      <p className="text-lg">
        안녕하세요, <strong>{name} 님</strong>
      </p>
      <div className="bg-gray-100 p-4 rounded shadow">
        <span className="text-lg">목표 kcal</span>
        <span className="text-3xl font-bold text-red-500 ml-2">{calories}</span>
      </div>
      <p>
        하루 칼로리를 통해
        <br />
        성공적인 다이어트에 도전해 보세요
      </p>
      <button
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        onClick={handleStart}
      >
        로그인하러 가기
      </button>
    </div>
  );
};
