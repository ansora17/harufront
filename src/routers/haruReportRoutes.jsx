import { Navigate } from "react-router-dom";
import Nutrition from "../pages/haruReport/Nutrition";
import Record from "../pages/haruReport/Record";

const haruReportRoutes = [
  {
    index: true,
    element: <Navigate to="record" replace />,
  },
  {
    path: "record",
    element: <Record />,
  },
  {
    path: "nutrition",
    element: <Nutrition />,
  },
];

export default haruReportRoutes;
