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
  getStudentsByUserId: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/students/user`,
    method: "GET",
  },
  addEmail: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/emails`,
    method: "POST",
  },
  getEmails: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/emails`,
    method: "GET",
  },
  deleteEmail: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/emails/:templateId`,
    method: "DELETE",
  },
  getEmailTemplate: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/emails/template/:templateId`,
    method: "GET",
  },
  updateEmailTemplate: {
    url: `${process.env.REACT_APP_API_BASE_URL}api/emails/:templateId`,
    method: "PUT",
  },
};
