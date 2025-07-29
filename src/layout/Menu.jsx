import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../slices/loginSlice";

function Menu() {
  // const email = useSelector((state) => {
  //   return state.loginSlice.email;
  // });

  const email = useSelector((state) => state.login?.email);
  const nickname = useSelector((state) => state.login?.nickname);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="flex justify-between w-full items-center mx-auto bg-purple-500">
      <div className="container flex justify-between w-[1020px] items-center mx-auto">
        <ul className="flex  items-center font-light text-white text-sm sm:text-base">
          <li>
            <Link
              to="/dashboard"
              className={`block py-4 px-8 ${
                location.pathname === "/dashboard" ||
                location.pathname.startsWith("/dashboard")
                  ? "bg-purple-700 text-white"
                  : "hover:bg-purple-700"
              }`}
            >
              식단분석
            </Link>
          </li>
          <li className="relative  group">
            <Link
              to="/haruReport"
              className={`block px-8 py-4 ${
                location.pathname.startsWith("/haruReport")
                  ? "bg-purple-700 text-white"
                  : "hover:bg-purple-700"
              }`}
            >
              리포트
            </Link>
            {/* 리포트 서브 메뉴 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-lg p-2  w-[100px]   ">
              <span className="flex flex-col text-black items-center text-center gap-2">
                <Link to="/haruReport/record">기록습관</Link>
                <Link to="/haruReport/nutrition">영양습관</Link>
              </span>
            </div>
          </li>
          <li className="relative group">
            <Link
              to="/community"
              className={`block px-8 py-4 ${
                location.pathname.startsWith("/community")
                  ? "bg-purple-700 text-white"
                  : "hover:bg-purple-700"
              }`}
            >
              커뮤니티
            </Link>
            {/* 커뮤니티 서브 메뉴 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-lg p-2  w-[100px]  ">
              <span className="flex flex-col text-[#1C1C1C] items-center text-center gap-2">
                <Link to="/community/issue">핫이슈</Link>
                <Link to="/community/board">자유게시판</Link>
              </span>
            </div>
          </li>
          {/* 로그인한 경우에만 로그아웃 보여주기
          {email && (
            <li className="ml-4 cursor-pointer" onClick={handleLogout}>
              로그아웃
            </li>
          )} */}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
