import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PurBtn from "../../common/PurBtn";
import SubLayout from "../../../layout/SubLayout";

function IssueUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.login);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/member/login");
      return;
    }

    // Load issue data
    const storedIssues = JSON.parse(localStorage.getItem("issues")) || [];
    const foundIssue = storedIssues.find((i) => i.id === parseInt(id));

    if (!foundIssue) {
      alert("게시글을 찾을 수 없습니다.");
      navigate("/community/issue");
      return;
    }

    // Check permissions
    if (foundIssue.writer !== user?.nickname && user?.role !== "admin") {
      alert("수정 권한이 없습니다.");
      navigate("/community/issue");
      return;
    }

    setIssue(foundIssue);
    setTitle(foundIssue.title);
    setContent(foundIssue.content);
  }, [id, isLoggedIn, user, navigate]);

  if (!isLoggedIn || !issue) return null;

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const issues = JSON.parse(localStorage.getItem("issues")) || [];
    const updated = issues.map((item) =>
      String(item.id) === id ? { ...item, title, content } : item
    );

    localStorage.setItem("issues", JSON.stringify(updated));
    alert("수정이 완료되었습니다.");
    navigate(`/community/issue/${id}`);
  };

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6">
      <SubLayout to="/community" menu="커뮤니티" label="핫이슈 수정" />

      <div className="mt-6 sm:mt-10 space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {/* 제목 입력 */}
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-12 rounded-lg border border-gray-200 px-4 bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="제목을 입력해주세요"
            />
          </div>

          {/* 내용 입력 */}
          <div className="p-4 sm:p-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[300px] sm:h-[500px] rounded-lg p-4 border border-gray-200 bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="내용을 입력해주세요"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            수정완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default IssueUpdate;
