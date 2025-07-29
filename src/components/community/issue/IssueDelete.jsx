import { useNavigate } from "react-router-dom";

const IssueDetail = () => {
  // You can later fetch this data via API
  const dummyIssue = {
    title: "제목",
    nickname: "testUser01",
    createdAt: "2025-08-07 13:23",
    content:
      "살빼기 넘 어려워요살빼기 넘 어려워요살빼기 넘 어려워요살빼기 넘 어려워요 살빼기 넘 어려워요살빼기 넘 어려워요살빼기 넘 어려워요 살빼기 넘 어려워요",
    source: "핫이슈타이틀핫이슈타이틀핫이슈타이틀핫이슈타이틀",
    url: "https://example.com/article-link",
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">커뮤니티 &gt; 핫이슈</div>

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-2">{dummyIssue.title}</h2>

      {/* Meta info */}
      <p className="text-sm text-gray-500 mb-4">
        닉네임: {dummyIssue.nickname} &nbsp; | &nbsp; 작성일:{" "}
        {dummyIssue.createdAt}
      </p>

      {/* Content */}
      <div className="text-base text-gray-800 whitespace-pre-line mb-6">
        {dummyIssue.content}
      </div>

      {/* Source */}
      <div className="text-sm text-gray-500 mb-6">
        <span className="font-semibold">자료 출처:</span>{" "}
        <a
          href={dummyIssue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {dummyIssue.source}
        </a>
      </div>

      {/* Back Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/community/issue")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          목록가기
        </button>
      </div>
    </div>
  );
};

export default IssueDetail;
