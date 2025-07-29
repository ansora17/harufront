import { createBrowserRouter } from "react-router-dom";
import Meal from "../pages/meal/Meal";
import Analyis from "../pages/meal/Analyis";
import RootLayout from "../layout/RootLayout";
import haruReportRoutes from "./haruReportRoutes";
import communityRoutes from "./communityRoutes";
import MyPage from "../pages/mypage/MyPage";
import memberRoutes from "./memberRoutes";
import Result from "../pages/meal/result";
import mypageRoutes from "./mypageRoutes";
import WelcomeMain from "../pages/welcome/welcomeMain";

const root = createBrowserRouter([
  // 웰컴 페이지를 루트로 설정 (비로그인 사용자용)
  {
    path: "/",
    element: <WelcomeMain />,
  },
  // 로그인된 사용자용 메인 대시보드
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Meal />,
      },
      {
        path: "analyis", // 기존 컴포넌트명에 맞춤
        element: <Analyis />,
      },
      {
        path: "result/:id",
        element: <Result />,
      },
    ],
  },
  {
    path: "/haruReport",
    element: <RootLayout />,
    children: haruReportRoutes,
  },
  {
    path: "/community",
    element: <RootLayout />,
    children: communityRoutes,
  },
  {
    path: "/member",
    element: <RootLayout />,
    children: memberRoutes,
  },
  {
    path: "/mypage",
    element: <RootLayout />,
    children: mypageRoutes,
  },
]);

export default root;
