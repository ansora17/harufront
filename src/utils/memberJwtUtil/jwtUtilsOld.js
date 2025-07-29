// // JWT accessToken management utilities

// const TOKEN_KEY = "accessToken";

// export const setToken = (accessToken) => {
//   localStorage.setItem(TOKEN_KEY, accessToken);
// };

// export const getToken = () => {
//   return localStorage.getItem(TOKEN_KEY);
// };

// export const removeToken = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };

// export const isAuthenticated = () => {
//   const accessToken = getToken();
//   if (!accessToken) return false;

//   // Optional: Add accessToken expiration check here if your JWT includes exp
//   try {
//     const payload = JSON.parse(atob(accessToken.split(".")[1]));
//     if (payload.exp && payload.exp * 1000 < Date.now()) {
//       removeToken();
//       return false;
//     }
//     return true;
//   } catch (e) {
//     return false;
//   }
// };
