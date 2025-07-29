import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../slices/loginSlice";
import { fetchCurrentMember } from "../../api/authIssueUserApi/memberApi";
import {
  getAccessToken,
  getRefreshToken,
  getUserData,
  removeAllAppCookies,
  removeUserData,
} from "../../utils/cookieUtils";

export default function useInitAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      // Check if we have tokens (cookie-based)
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const user = getUserData();

      console.log("🔍 Auth init - checking cookies:", {
        accessToken: accessToken ? "exists" : "none",
        refreshToken: refreshToken ? "exists" : "none",
        user: user ? "exists" : "none",
      });

      // Log the actual token values for debugging (first 20 chars)
      if (accessToken) {
        console.log(
          "🔍 Access token starts with:",
          accessToken.substring(0, 20) + "..."
        );
      }
      if (refreshToken) {
        console.log(
          "🔍 Refresh token starts with:",
          refreshToken.substring(0, 20) + "..."
        );
      }
      if (user) {
        console.log("🔍 User data:", user.nickname);
      }

      if (!accessToken || !refreshToken) {
        console.log("🔍 No tokens found, user not authenticated");
        dispatch(logout());
        return;
      }

      console.log("🔍 Tokens found, checking authentication...");

      try {
        // Check if user is authenticated
        const userData = await fetchCurrentMember();

        // Validate that we got a proper user response
        if (!userData || !userData.nickname) {
          console.log("❌ Invalid user response:", userData);
          throw new Error("Invalid user response");
        }

        console.log("✅ Authentication successful, user:", userData.nickname);
        dispatch(login(userData));
      } catch (err) {
        console.error("❌ Auth init failed:", err);
        console.log("🧹 Clearing invalid cookies...");
        // Clear any stale cookies
        removeAllAppCookies();
        removeUserData();
        dispatch(logout());
      }
    };

    initAuth();
  }, []);
}
