export const getToken = () => {
  return localStorage.getItem("token");
};
export const setToken = (token: string) => {
  return localStorage.setItem("token", token);
};
export const getAdmin = () => {
  return localStorage.getItem("isAdmin");
};
export const setAdmin = (data: string) => {
  return localStorage.setItem("isAdmin", data);
};
