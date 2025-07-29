import React from "react";

export default function InfoList({ user, items, passwordMask = true }) {
  const maskPassword = (password) =>
    !password || password.length < 2 ? "●●●●●●●" : "●".repeat(password.length);

  // If items prop is provided, render the formatted list
  if (items && Array.isArray(items)) {
    return (
      <ul className="mt-6 text-sm sm:text-base text-gray-700 space-y-2 text-left max-w-md mx-auto">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.label}</span>
            <span>{item.value ?? "-"}</span>
          </li>
        ))}
      </ul>
    );
  }

  // If user prop is provided, render the user info list
  if (user) {
    return (
      <ul className="mt-6 text-sm sm:text-base text-gray-700 space-y-2 text-left max-w-md mx-auto">
        <li className="flex justify-between">
          <span>활동량</span>
          <span>{user.activityLevel ?? "-"}</span>
        </li>
        <li className="flex justify-between">
          <span>키 (cm)</span>
          <span>{user.height ?? "-"}</span>
        </li>
        <li className="flex justify-between">
          <span>체중 (kg)</span>
          <span>{user.weight ?? "-"}</span>
        </li>
        <li className="flex justify-between">
          <span>이름</span>
          <span>{user.name ?? "-"}</span>
        </li>
        <li className="flex justify-between">
          <span>비밀번호</span>
          <span>
            {passwordMask ? maskPassword(user.password) : user.password}
          </span>
        </li>
      </ul>
    );
  }

  // Fallback if neither prop is provided
  return (
    <ul className="mt-6 text-sm sm:text-base text-gray-700 space-y-2 text-left max-w-md mx-auto">
      <li className="flex justify-between">
        <span>사용자 정보를 불러올 수 없습니다.</span>
        <span>-</span>
      </li>
    </ul>
  );
}
