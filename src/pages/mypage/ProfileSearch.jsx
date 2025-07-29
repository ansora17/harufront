import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubLayout from "../../layout/SubLayout";
import { searchProfiles } from "../../api/authIssueUserApi/memberApi";

export default function ProfileSearch() {
  // const user = useSelector((state) => state.login.user);
  // const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // if (!user || !user.nickname)
  //   return (
  //     <div className="p-6 text-center">
  //       <div className="animate-pulse">로딩 중...</div>
  //     </div>
  //   );

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await searchProfiles({ query: searchTerm });
      setSearchResults(response.users);
    } catch (error) {
      const message =
        error.response?.data?.message || "프로필 검색에 실패했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="p-6 sm:p-8">
    //   {/* 프로필 헤더 */}
    //   <div className="bg-purple-50 rounded-lg p-6 mb-6">
    //     <div className="flex flex-col items-center gap-4">
    //       <div className="relative">
    //         <ProfileImage nickname={user.nickname} photo={user.photo} />
    //         <button
    //           onClick={() => fileInputRef.current.click()}
    //           className="absolute -bottom-2 -right-2 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition-colors duration-200"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-4 w-4"
    //             viewBox="0 0 20 20"
    //             fill="currentColor"
    //           >
    //             <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    //           </svg>
    //         </button>
    //         <input
    //           type="file"
    //           ref={fileInputRef}
    //           className="hidden"
    //           accept="image/*"
    //           onChange={handlePhotoChange}
    //         />
    //       </div>

    //       <div className="text-center">
    //         <h2 className="text-2xl font-bold text-gray-900 mb-1">
    //           {user.nickname}
    //         </h2>
    //         <p className="text-gray-600">{user.email}</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* 사용자 정보 */}
    //   <div className="mb-8">
    //     <InfoList user={user} />
    //   </div>

    //   {/* 액션 버튼 */}
    //   <div className="flex flex-col sm:flex-row justify-center gap-3">
    //     <button
    //       onClick={() => navigate("/mypage/edit")}
    //       className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
    //     >
    //       프로필 수정
    //     </button>
    //     <button
    //       onClick={() => navigate("/")}
    //       className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
    //     >
    //       메인으로
    //     </button>
    //     <button
    //       onClick={() => navigate("/mypage/withdraw")}
    //       className="px-6 py-3 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
    //     >
    //       회원 탈퇴
    //     </button>

    <div className="w-full max-w-[1020px] mx-auto px-4">
      <SubLayout to="/mypage" menu="마이페이지" label="프로필 검색" />

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* Search Input */}
          <div className="flex gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="닉네임 또는 이메일로 검색"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "검색 중..." : "검색"}
            </button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">검색 결과</h3>
              <div className="divide-y">
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      {user.photo && (
                        <img
                          src={user.photo}
                          alt={user.nickname}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">{user.nickname}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/mypage/profile/${user.id}`)}
                      className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      프로필 보기
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : searchTerm && !isLoading ? (
            <div className="text-center py-8 text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
