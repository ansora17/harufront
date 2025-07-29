import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("검색어를 입력하세요.");
      return;
    }
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto my-10 flex justify-center"
    >
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="검색할 단어를 입력하세요"
          className="input input-bordered w-full pr-12"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-purple-500 px-3 py-1 rounded"
        >
          검색
        </button>
      </div>
    </form>
  );
}
