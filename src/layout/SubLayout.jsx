import React from "react";
import { Link } from "react-router-dom";

function SubLayout({ to, menu, label }) {
  return (
    <div className="w-full bg-white border-b border-gray-300 flex justify-center items-center p-3 pb-0">
      <div className="container w-[1020px] pt-2 md:pt-2 pb-1 flex flex-col items-start text-gray-600 md:flex-row md:items-start mt-4">
        <div className="breadcrumbs text-lg">
          <ul>
            <li>
              {/* <Link to={to}>
                <a className="text-gray-400">{menu}</a> */}
              <Link to={to} className="text-gray-400">
                {menu}
              </Link>
            </li>
            <li className="font-semibold">{label}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SubLayout;
