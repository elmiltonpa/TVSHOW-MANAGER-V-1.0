import axiosClient from "../api/axiosClient";
import { User, AuthResponse } from "../types";

const login = async (credentials: Pick<User, "username"> & { password?: string, rememberMe?: boolean }): Promise<AuthResponse> => {
  const request = await axiosClient.post<AuthResponse>("/login", credentials);
  return request.data;
};

export default login;