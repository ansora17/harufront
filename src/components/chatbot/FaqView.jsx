// components/FaqView.jsx
import React from "react";

export default function FaqView({ faqList, onSelect }) {
  return (
    <div className="h-[450px] p-4 flex flex-col gap-3 overflow-y-auto">
      {faqList.map((q, i) => (
        <button
          key={i}
          onClick={() => onSelect(q)}
          className="chat-bubble chat chat-end bg-purple-200 text-black shadow border border-base-300 rounded-2xl p-2 text-xs"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
