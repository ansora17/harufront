import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import useInitAuth from "./components/mypage/useInitAuth";
import DebugAuthOverlay from "./components/mypage/DebugAuthOverlay";

function App() {
  useInitAuth(); // ✅ sets user if logged in

  return (
    <>
      <RouterProvider router={router} />;
      <DebugAuthOverlay />
    </>
  );
}

export default App;
