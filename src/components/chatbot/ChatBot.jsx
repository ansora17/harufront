import React, { useState } from "react";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import ChatView from "./chatview";
import FaqView from "./Faqview";
import axios from "axios";

export default function ChatBot() {
  const faqList = [
    "살 빨리빼는 법 알려줘",
    "회사에서 할만한 운동 추천해줘",
    "설탕이랑 나트륨중 머가 더 나빠?",
  ];

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `안녕하세요!\n😊 하루칼로리입니다!\n궁금한 게 있으면 물어보세요!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [faqMode, setFaqMode] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };

    // 1. 사용자 메시지 먼저 추가
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    // 2. 로딩 메시지 추가
    const loadingMsg = { sender: "bot", text: "작성중..." };
    setMessages((prev) => [...prev, loadingMsg]);

    console.log("API 호출 시작"); // 디버그용
    // axios 요청이 백엔드에 제대로 전송되지 않는 문제를 해결하기 위해 headers를 별도로 지정합니다.

    try {
      // 3. API 호출
      const res = await axios.post("http://127.0.0.1:8000/ask", {
        // header라는 key와 값을 포함하도록 요청 데이터에 추가

        question: currentInput,
      });

      console.log("API 응답:", res.data);

      // 임시로 간단하게 메시지 추가
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.answer,
        },
      ]);
    } catch (error) {
      console.error("API 호출 에러:", error);
      console.log("에러 타입:", error.code, error.message); // 디버그용

      // 로딩 메시지를 에러 메시지로 교체
      setMessages((prev) => {
        const withoutLoading = prev.slice(0, -1);
        return [
          ...withoutLoading,
          {
            sender: "bot",
            text: "에러가 발생했습니다: " + error.message,
          },
        ];
      });
    }
  };

  const handleSelectFAQ = async (question) => {
    const userMsg = { sender: "user", text: question };

    // 1. 사용자 질문 먼저 추가
    setMessages((prev) => [...prev, userMsg]);
    setFaqMode(false);

    // 2. 로딩 메시지 추가
    const loadingMsg = { sender: "bot", text: "작성중..." };
    setMessages((prev) => [...prev, loadingMsg]);

    try {
      // 3. API 호출 (handleSend와 동일한 로직)
      const res = await axios.post("http://127.0.0.1:8000/ask", {
        question: question,
      });

      console.log("FAQ API 응답:", res.data);

      // 4. 실제 응답 추가
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.answer,
        },
      ]);
    } catch (error) {
      console.error("FAQ API 호출 에러:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "에러가 발생했습니다: " + error.message,
        },
      ]);
    }
  };

  return (
    <>
      {!show && (
        <button
          className="fixed bottom-30 right-9 btn btn-circle bg-neutral text-white shadow-lg z-[9999]"
          onClick={() => setShow(true)}
        >
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
        </button>
      )}

      {show && (
        <div className="fixed bottom-4 right-4 w-[390px] bg-white shadow-xl border rounded-3xl overflow-hidden z-[9999]">
          {/* 헤더 */}
          <div className="flex justify-between items-center p-3 py-4 px-5 bg-gray-800 border-b">
            <div className="flex items-center ">
              <img src="/images/chaybot_icon.png" alt="" />
              <span className="font-bold text-sm text-white ml-2">
                하루칼로리 챗봇 입니다
              </span>
            </div>
            <div>
              <button
                onClick={() => {
                  setShow(false); // 챗봇 창 닫기
                  setFaqMode(false); // FAQ 모드 해제
                  setMessages([
                    {
                      sender: "bot",
                      text: `안녕하세요!\n😊 하루칼로리입니다!\n궁금한 게 있으면 물어보세요!`,
                    },
                  ]); // ✅ 대화 초기화
                  setInput(""); // (선택) 입력창도 초기화
                }}
                className="text-xl font-bold text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* 화면 전환 */}
          {faqMode ? (
            <FaqView faqList={faqList} onSelect={handleSelectFAQ} />
          ) : (
            <ChatView messages={messages} />
          )}

          {/* 입력창 */}
          <div className="flex p-3  gap-2 items-center">
            <button
              onClick={() => setFaqMode(true)}
              className=" text-3xl font-bold py-2"
            >
              +
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input input-bordered w-full h-[38px] input-sm"
              placeholder="질문을 입력하세요"
            />
            <button
              className="btn btn-sm btn-neutral  h-[38px]"
              onClick={handleSend}
            >
              검색
            </button>
          </div>
        </div>
      )}
    </>
  );
}
