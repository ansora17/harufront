import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function DebugAuthOverlay() {
  const { user, isLoggedIn } = useSelector((state) => state.login);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [isChecking, setIsChecking] = useState(false);

  // Check backend connection
  const checkBackend = async () => {
    setIsChecking(true);
    try {
      const response = await fetch("http://localhost:8080/api/health", {
        method: "GET",
        credentials: "include",
      });
      setBackendStatus(response.ok ? "connected" : "error");
    } catch (error) {
      setBackendStatus("disconnected");
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs z-50">
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
        <div className="flex items-center gap-2">
          <span className="font-bold">Backend:</span>{" "}
          <span
            className={
              backendStatus === "connected"
                ? "text-green-400"
                : backendStatus === "checking"
                ? "text-yellow-400"
                : "text-red-400"
            }
          >
            {backendStatus === "connected"
              ? "Connected"
              : backendStatus === "checking"
              ? "Checking..."
              : "Disconnected"}
          </span>
          <button
            onClick={checkBackend}
            disabled={isChecking}
            className="ml-2 px-1 py-0.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isChecking ? "..." : "Test"}
          </button>
        </div>
      </div>
    </div>
  );
}
