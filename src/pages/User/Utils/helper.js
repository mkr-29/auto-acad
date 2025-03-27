export const getLocalStorageToken = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return token;
  } else {
    return null;
  }
};

// Utility function to check if a value is filled
export const isFilled = (value) => {
    if (typeof value === "string") return value.trim() !== "";  // Non-empty string
    if (typeof value === "number") return value !== 0;          // Non-zero number
    return true; // Ignore arrays and nested objects here
};

// Recursive function to check non-array fields
export const validateFields = (data) => {
  for (const key in data) {
      if (Array.isArray(data[key])) continue; // Ignore arrays
      if (typeof data[key] === "object" && data[key] !== null) {
          if (!validateFields(data[key])) return false; // Recursive check
      } else if (!isFilled(data[key])) {
          console.log(`Empty field found: ${key}`); // Optional: Identify missing fields
          return false;
      }
  }
  return true;
};

// get user id from local storage
export const getUserId = () => {
  const uId = localStorage.getItem("user");
  return JSON.parse(uId).userId;
};
