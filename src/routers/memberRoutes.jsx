import ChangePassword from "../pages/member/ChangePassword";
import Login from "../pages/member/Login";
import SearchNickname from "../pages/member/SearchNickname";
import Signup from "../pages/member/Signup";
import MyPage from "../pages/mypage/MyPage";

const memberRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "reset-password",
    element: <ChangePassword />,
  },
  {
    path: "search-nickname",
    element: <SearchNickname />,
  },
];

export default memberRoutes;
