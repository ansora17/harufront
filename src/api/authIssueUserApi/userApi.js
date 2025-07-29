import api from "./axiosConfig";

export const userApi = {
  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  // Update profile photo
  updatePhoto: async (formData) => {
    const response = await api.post("/users/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Search user profiles (admin only)
  searchProfiles: async (searchParams) => {
    const response = await api.get("/users/search", { params: searchParams });
    return response.data;
  },

  // Delete user account
  deleteAccount: async () => {
    const response = await api.delete("/users/account");
    return response.data;
  },

  // Get user activity stats
  getActivityStats: async () => {
    const response = await api.get("/users/stats");
    return response.data;
  },
};
