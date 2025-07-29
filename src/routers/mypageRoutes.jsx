import { Navigate } from "react-router-dom";
import EditProfile from "../pages/mypage/EditProfile";
import MyPage from "../pages/mypage/MyPage";
import ProfileSearch from "../pages/mypage/ProfileSearch";
// import WithDrawMembership from "../pages/mypage/WithdrawMembership";

const mypageRoutes = [
  {
    path: "",
    element: <MyPage />,
  },
  {
    path: "profile",
    element: <ProfileSearch />,
  },
  {
    path: "edit",
    element: <EditProfile />,
  },
  // {
  //   path: "withdraw",
  //   element: <WithDrawMembership />,
  // },
];

export default mypageRoutes;
