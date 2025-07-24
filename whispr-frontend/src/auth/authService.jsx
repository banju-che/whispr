import client from "../api/client";

export const login = async (email, password) => {
  const response = await client.post("/auth/jwt/create/", { email, password });
  const { access, refresh } = response.data;

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("access");
};
