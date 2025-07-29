import React from "react";

export default function ChatView({ messages }) {
  return (
    <div className=" flex-1 overflow-y-auto p-3  h-[450px] space-y-4">
      {messages.map((msg, idx) => {
        const isBot = msg.sender === "bot";
        const now = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={idx}
            className={`chat ${isBot ? "chat-start" : "chat-end"}`}
          >
            {/* 이름과 시간 */}
            <div className="chat-header">
              {isBot ? "하루칼로리" : "나"}
              <time className="text-xs opacity-50 ">{now}</time>
            </div>

            {/* 말풍선 */}
            <div className="chat-bubble whitespace-pre-wrap text-xs">
              {msg.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
