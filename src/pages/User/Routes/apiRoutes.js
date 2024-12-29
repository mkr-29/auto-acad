const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5200/";

export const apiRoutes = {
  register: `${API_BASE_URL}api/users/register`,
  login: `${API_BASE_URL}api/users/login`,
};
