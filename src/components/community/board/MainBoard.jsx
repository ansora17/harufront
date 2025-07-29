import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SubLayout from "../../../layout/SubLayout";
import ChatBot from "../../chatbot/ChatBot";
import { getAllBoards } from "../../../api/board/boardApi";

function MainBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = () => {
    setSearchKeyword(searchInput.trim());
  };

  const testUser = {
    email: "tidlsld249@naver.com",
    nickname: "anra1",
    id: 9, // DB의 실제 memberId와 일치
    name: "안소라",
    height: 165.5,
    weight: 50,
    activityLevel: "MODERATE",
    role: "USER",
    profile_image_url: "",
    birth_at: "1990-11-01",
    created_at: "2027-07-22",
    updated_at: "2027-07-22",
    gender: "FEMALE",
    password: "Sora0917@",
  };

  // 게시글 목록 가져오기
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllBoards();
      console.log("API 응답:", response); // 디버깅용

      // 응답이 배열인지 확인
      if (Array.isArray(response)) {
        setPosts(response);
      } else {
        console.error("예상하지 못한 응답 형식:", response);
        setPosts([]);
      }
    } catch (error) {
      console.error("게시글 로딩 에러:", error);
      setError("게시글을 불러오는데 실패했습니다.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, ". ")
      .trim();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
  const filteredPosts = searchKeyword
    ? sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : sortedPosts;

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6">
      <SubLayout to="/community" menu="커뮤니티" label="자유게시판" />
      <div className="mt-6 sm:mt-10 space-y-6">
        {/* 상단 검색 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              전체 게시글
            </h2>
            <Link
              to="/community/board/write"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                       transition-colors duration-200 text-sm sm:text-base flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              글쓰기
            </Link>
          </div>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearch={handleSearch}
          />
        </div>

        {/* 게시글 목록 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-500 text-white">
                  <th className="hidden sm:table-cell py-4 px-6 text-left w-[10%]">
                    번호
                  </th>
                  <th className="py-4 px-6 text-left w-[50%]">제목</th>
                  <th className="py-4 px-6 text-left w-[20%]">작성자</th>
                  <th className="py-4 px-6 text-left w-[20%]">작성일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-purple-50 transition-colors duration-150"
                  >
                    <td className="hidden sm:table-cell py-4 px-6 text-gray-600">
                      {post.id}
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to={`/community/board/writeview/${post.id}`}
                        className="text-gray-900 hover:text-purple-600 transition-colors duration-150 line-clamp-1"
                        onClick={() =>
                          localStorage.setItem("selectedPostId", post.id)
                        }
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {post.memberId ? `회원${post.memberId}` : "알 수 없음"}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {formatDate(post.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center">
          <div className="join shadow-sm">
            <button className="join-item btn btn-sm bg-white hover:bg-gray-50 text-gray-600">
              «
            </button>
            <button className="join-item btn btn-sm bg-purple-500 text-white hover:bg-purple-600">
              1
            </button>
            <button className="join-item btn btn-sm bg-white hover:bg-gray-50 text-gray-600">
              2
            </button>
            <button className="join-item btn btn-sm bg-white hover:bg-gray-50 text-gray-600">
              3
            </button>
            <button className="join-item btn btn-sm bg-white hover:bg-gray-50 text-gray-600">
              »
            </button>
          </div>
        </div>
      </div>
      {/* 챗봇 추가 */}
      <ChatBot />
    </div>
  );
}

export default MainBoard;
