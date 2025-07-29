// ⚠️ DEPRECATED: This file is no longer used
// Use memberApi.js instead for authentication functions
// This file is kept for reference but should not be used in new code

import api from "./axiosConfig";
import { setToken, removeToken } from "../auth/jwtUtils";

export const authApi = {
  // Sign up new user
  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    const { token, user } = response.data;
    setToken(token);
    return user;
  },

  // Logout user
  logout: () => {
    removeToken();
  },

  // Change password
  changePassword: async (data) => {
    const response = await api.post("/auth/change-password", data);
    return response.data;
  },

  // Search nickname
  searchNickname: async (data) => {
    const response = await api.post("/auth/search-nickname", data);
    return response.data;
  },

  // Check email/nickname duplication
  checkDuplication: async (type, value) => {
    const response = await api.get(
      `/auth/check-duplicate?type=${type}&value=${value}`
    );
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    const response = await api.post("/auth/request-password-reset", { email });
    return response.data;
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },
};
