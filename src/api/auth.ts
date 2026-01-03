import { authService } from "@/services/auth";

const login = async (username: string, password: string) => {
  return await authService.login(username, password);
};

const logout = async () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const apiAuth = {
  login,
  logout,
};