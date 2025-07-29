import { Navigate } from "react-router-dom";
import Board from "../pages/community/Board";
import Issue from "../pages/community/Issue";
import MainBoard from "../components/community/board/MainBoard";
import Write from "../components/community/board/Write";
import WriteView from "../components/community/board/WriteView";
import WriteUpdate from "../components/community/board/WriteUpdate";

import IssueDetail from "../components/community/issue/IssueDetail";
import IssueDelete from "../components/community/issue/IssueDelete";
import IssueUpdate from "../components/community/issue/IssueUpdate";
import IssueWrite from "../components/community/issue/IssueWrite";
import IssueLayout from "../components/community/issue/IssueLayout";

const communityRoutes = [
  {
    index: true,
    element: <Navigate to="issue" replace />,
  },
  {
    path: "issue",
    element: <IssueLayout />,
    children: [
      { index: true, element: <Issue /> },
      {
        path: ":id",
        element: <IssueDetail />,
      },
      {
        path: "write",
        element: <IssueWrite />,
      },
      {
        path: "update/:id",
        element: <IssueUpdate />,
      },
      {
        path: "delete/:id",
        element: <IssueDelete />,
      },
    ],
  },
  {
    path: "board",
    element: <MainBoard />,
  },
  {
    path: "board/write",
    element: <Write />,
  },
  {
    path: "board/writeview/:id",
    element: <WriteView />,
  },
  {
    path: "board/update/:id",
    element: <WriteUpdate />,
  },
];

export default communityRoutes;
