import React from "react";
import { Link } from "react-router-dom";

function GrayBtn({ to, label }) {
  return (
    <Link to={to}>
      <button className="btn bg-gray text-[#1C1C1C] btn-sm md:btn-md">
        {label}
      </button>
    </Link> //회색 버튼
  );
}

export default GrayBtn;
