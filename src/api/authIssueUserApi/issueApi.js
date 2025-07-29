import api from "./axiosConfig";

export const issueApi = {
  // Get all issues with pagination
  getIssues: async (page = 1, size = 15, search = "") => {
    const response = await api.get("/issues", {
      params: { page, size, search },
    });
    return response.data;
  },

  // Get single issue by ID
  getIssue: async (id) => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  // Create new issue
  createIssue: async (issueData) => {
    const response = await api.post("/issues", issueData);
    return response.data;
  },

  // Update existing issue
  updateIssue: async (id, issueData) => {
    const response = await api.put(`/issues/${id}`, issueData);
    return response.data;
  },

  // Delete issue
  deleteIssue: async (id) => {
    const response = await api.delete(`/issues/${id}`);
    return response.data;
  },
};
