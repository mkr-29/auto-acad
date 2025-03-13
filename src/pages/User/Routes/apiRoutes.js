export const apiRoutes = {
  register: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/users/register`,
    method: "POST",
  },
  login: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/users/login`,
    method: "POST",
  },
  getStudent: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/students`,
    method: "POST",
  },
  addStudent: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/students`,
    method: "POST",
  },
  addCollege: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/college`,
    method: "POST",
  },
  addSubject: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/subject`,
    method: "POST",
  },
  addParents: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/parents`,
    method: "POST",
  },
};
