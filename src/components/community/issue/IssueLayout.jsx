import { Outlet } from "react-router-dom";

function IssueLayout() {
  return (
    <div className="p-4 ,ax-w-4xl mx-auto">
      <Outlet />
    </div>
  );
}

export default IssueLayout;
