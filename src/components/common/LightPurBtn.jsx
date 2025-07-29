import React from "react";
import { Link } from "react-router-dom";

function LightPurBtn({ label }) {
  return (
    <button className="btn bg-purple-300 text-white btn-sm md:btn-md w-full">
      {label}
    </button>
  ); //연보라색 버튼
}

export default LightPurBtn;
