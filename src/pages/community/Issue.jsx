import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SubLayout from "../../layout/SubLayout";
import SearchBar from "../../components/common/SearchBar";
import ChatBot from "../../components/chatbot/ChatBot";

function Issue() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.login);

  const [issues, setIssues] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredIssues, setFilteredIssues] = useState([]);
  // const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다");
      navigate("/member/login");
      return;
    }

    // Load issues from localStorage or dummy
    const storedIssues = localStorage.getItem("issues");
    if (storedIssues) {
      const parsedIssues = JSON.parse(storedIssues);
      setIssues(parsedIssues);
      setFilteredIssues(parsedIssues);
    } else {
      const dummyIssues = [
        {
          id: 1,
          title: "사이트 버그 제보",
          content: "모바일 화면 깨짐 현상 발생",
          writer: "toby",
          date: "2025.07.15",
        },
        {
          id: 2,
          title: "기능 요청",
          content: "검색 기능이 있으면 좋겠어요",
          writer: "관리자",
          date: "2025.07.16",
        },
      ];
      localStorage.setItem("issues", JSON.stringify(dummyIssues));
      setIssues(dummyIssues);
      setFilteredIssues(dummyIssues);
    }
  }, [isLoggedIn, navigate]);

  const handleSearch = (keyword) => {
    const lowerKeyword = keyword.trim().toLowerCase();
    const filtered = issues.filter((issue) =>
      issue.title.toLowerCase().includes(lowerKeyword)
    );
    setFilteredIssues(filtered);
    setCurrentPage(1);
  };

  if (!user) return null;
  const isAdmin = user?.role === "admin";

  const sorted = [...filteredIssues].sort((a, b) => b.id - a.id);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6">
      <SubLayout to="/community" menu="커뮤니티" label="이슈" />

      <div className="mt-6 sm:mt-10 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              전체 이슈
            </h2>
            {isAdmin && (
              <Link
                to="/community/issue/write"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm sm:text-base"
              >
                글쓰기
              </Link>
            )}
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-500 text-white">
                <th className="py-4 px-6 text-left w-[50%]">제목</th>
                <th className="py-4 px-6 text-left w-[20%]">작성자</th>
                <th className="py-4 px-6 text-left w-[20%]">작성일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((issue) => (
                <tr
                  key={issue.id}
                  className="hover:bg-purple-50 transition-colors duration-150"
                >
                  <td className="py-4 px-6">
                    <Link
                      to={`/community/issue/${issue.id}`}
                      className="text-gray-900 hover:text-purple-600 line-clamp-1"
                      onClick={() =>
                        localStorage.setItem("selectedIssueId", issue.id)
                      }
                    >
                      {issue.title}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{issue.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-2">
          <button
            className="text-sm px-3 py-1 border rounded disabled:opacity-30"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            className="text-sm px-3 py-1 border rounded disabled:opacity-30"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>

      {/* 챗봇 추가 */}
      <ChatBot />
    </div>
  );
}

export default Issue;
