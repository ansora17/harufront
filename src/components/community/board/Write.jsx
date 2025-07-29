import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux"; // 테스트용: Redux 의존성 제거
import PurBtn from "../../common/PurBtn";
import SubLayout from "../../../layout/SubLayout";
import { createBoard } from "../../../api/board/boardApi";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const user = useSelector((state) => state.login.user); // 테스트용: Redux 의존성 제거

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 작성해주세요.");
      return;
    }

    // 테스트용: 로그인 체크 주석처리
    // if (!user || !user.userid) {
    //   alert("로그인이 필요합니다.");
    //   return;
    // }

    try {
      setLoading(true);

      const boardData = {
        title: title.trim(),
        content: content.trim(),
      };

      // 테스트용: 하드코딩된 memberId 사용 (DB의 실제 memberId)
      const testMemberId = 9;
      console.log("게시글 작성 요청:", { memberId: testMemberId, boardData });

      // 실제 API 호출
      const response = await createBoard(testMemberId, boardData);
      console.log("게시글 작성 성공:", response);

      alert("게시글이 등록되었습니다!");
      navigate(`/community/board/writeview/${response.id}`);
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6">
      <SubLayout to="/community" menu="커뮤니티" label="자유게시판" />
      <div className="mt-6 sm:mt-10 space-y-6">
        {/* 상단 안내 섹션 */}
        <div className="bg-purple-50 rounded-lg p-4 sm:p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="font-bold text-gray-900 text-lg sm:text-xl">
              게시글 작성하기
            </h2>
          </div>
          <p className="text-purple-700 text-sm sm:text-base">
            다른 사용자들과 의견을 나누고 싶은 내용을 자유롭게 작성해주세요.
          </p>
        </div>

        {/* 입력 폼 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {/* 제목 입력 */}
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <label
              className="block text-gray-700 text-sm sm:text-base font-medium mb-2"
              htmlFor="title"
            >
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              className="w-full h-12 rounded-lg bg-gray-50 px-4 border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       placeholder-gray-400 transition-colors duration-200"
            />
          </div>

          {/* 내용 입력 */}
          <div className="p-4 sm:p-6">
            <label
              className="block text-gray-700 text-sm sm:text-base font-medium mb-2"
              htmlFor="content"
            >
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              className="w-full h-[300px] sm:h-[500px] rounded-lg bg-gray-50 p-4 border border-gray-200
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       placeholder-gray-400 transition-colors duration-200 resize-none"
            />
          </div>
        </div>

        {/* 하단 버튼 섹션 */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 
                     transition-colors duration-200 text-sm sm:text-base"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2.5 rounded-lg text-white transition-colors duration-200 text-sm sm:text-base
                     ${
                       loading
                         ? "bg-gray-400 cursor-not-allowed"
                         : "bg-purple-500 hover:bg-purple-600"
                     }`}
          >
            {loading ? "작성 중..." : "작성완료"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Write;
