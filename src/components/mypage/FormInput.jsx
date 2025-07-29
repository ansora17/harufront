import React from "react";

export default function FormInput({
  name,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      id={id} // <-- fallback to name if no id is passed
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
