import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLogout from "../utils/memberJwtUtil/useLogout";

function Header() {
  // Use the proper logout hook
  const doLogout = useLogout();

  // Only use Redux state - no more mixed logic
  const { user, isLoggedIn } = useSelector((state) => state.login);

  const handleLogout = () => {
    // Use the proper logout function that clears everything
    doLogout();
  };

  return (
    <div className="flex justify-between w-full items-center mx-auto bg-white px-3">
      <div className="container flex justify-between w-[1020px] py-2 items-center mx-auto">
        <h1>
          <Link to="/dashboard">
            <img
              src="/images/main_icon.png"
              alt="main icon"
              className="w-full max-w-[90%] h-auto md:max-w-[600px] sm:max-w-[90%] object-contain"
            />
          </Link>
        </h1>

        <ul className="flex gap-3 items-center text-sm">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/mypage"
                  className="font-semibold text-purple-500 hover:underline"
                >
                  {user?.nickname} 님, 반갑습니다!
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:underline"
                >
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/member/login">
                <p className="text-sm text-gray-400 hover:underline">로그인</p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
