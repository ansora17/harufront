import React from "react";
import { Link } from "react-router-dom";

function PurBtn({ to, label, onClick }) {
  const button = (
    <button
      onClick={onClick}
      className="btn bg-purple-500 text-white btn-sm md:btn-md"
    >
      {label}
    </button>
  );

  // to가 있으면 <Link>로 감싸고, 없으면 그냥 버튼만
  return to ? <Link to={to}>{button}</Link> : button;
}

export default PurBtn;
