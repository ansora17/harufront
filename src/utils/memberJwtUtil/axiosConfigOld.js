// import axios from "axios";
// import { getToken, removeToken } from "./jwtUtils";
// import { store } from "../../store/store";
// import { logout } from "../../slices/loginSlice";

// // Create axios instance with base configuration
// const api = axios.create({
//   baseURL: "http://localhost:8080/api", // Update this with your Spring Boot API URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add JWT token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Handle response errors globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Unauthorized - clear token and redirect to login
//       removeToken();
//       store.dispatch(logout());
//       window.location.href = "/member/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
