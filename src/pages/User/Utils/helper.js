export const getLocalStorageToken = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return token;
  } else {
    return null;
  }
};
