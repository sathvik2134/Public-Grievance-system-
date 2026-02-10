export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};


