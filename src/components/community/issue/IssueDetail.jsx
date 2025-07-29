import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SubLayout from "../../../layout/SubLayout";
import PurBtn from "../../common/PurBtn";

function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.login);

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

    setIssue(foundIssue);
  }, [id, isLoggedIn, navigate]);

  if (!isLoggedIn || !issue) return null;

  const isAdmin = user?.role === "admin";
  const isWriter = issue.writer === user?.nickname;

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const storedIssues = JSON.parse(localStorage.getItem("issues")) || [];
      const updated = storedIssues.filter((item) => item.id !== Number(id));
      localStorage.setItem("issues", JSON.stringify(updated));
      alert("삭제되었습니다.");
      navigate("/community/issue");
    }
  };

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6">
      <SubLayout to="/community" menu="커뮤니티" label="이슈" />

      <div className="bg-white rounded-lg shadow-sm p-6 mt-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{issue.title}</h2>
          <p className="text-sm text-gray-500 mb-1">
            작성자: {issue.writer} | 작성일: {issue.date}
          </p>
        </div>

        <hr />

        <div className="whitespace-pre-wrap text-gray-800">{issue.content}</div>

        <hr />

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/community/issue")}
            className="text-sm px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
          >
            목록으로
          </button>

          {isAdmin && (
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/community/issue/update/${issue.id}`)}
                className="text-sm px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="text-sm px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IssueDetail;
