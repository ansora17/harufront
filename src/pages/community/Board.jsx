import React from "react";
import MainBoard from "../../components/community/board/MainBoard";
import { Route, Routes } from "react-router-dom";
import Write from "../../components/community/board/Write";
import WriteView from "../../components/community/board/WriteView";
import ChatBot from "../../components/chatbot/ChatBot";

function Board() {
  return (
    <>
      <div className="w-[1020px] mx-auto">
        <Routes>
          <Route index element={<MainBoard />} />
          <Route path="write" element={<Write />} />
          <Route path="writeview/:id" element={<WriteView />} />
        </Routes>
      </div>
      {/* 챗봇을 Routes 밖으로 빼서 항상 표시되도록 */}
      <ChatBot />
    </>
  );
}

export default Board;
