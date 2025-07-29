import React from "react";
import { useSelector } from "react-redux";

export default function DebugAuthOverlay() {
  const { user, isLoggedIn } = useSelector((state) => state.login);

  // Only show in development
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-25 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs z-50">
      <div className="space-y-1">
        <div>
          <span className="font-bold">Auth:</span>{" "}
          <span className={isLoggedIn ? "text-green-400" : "text-red-400"}>
            {isLoggedIn ? "Logged In" : "Not Logged In"}
          </span>
        </div>
        <div>
          <span className="font-bold">User:</span>{" "}
          <span className="text-blue-400">{user?.nickname || "None"}</span>
        </div>
      </div>
    </div>
  );
}
