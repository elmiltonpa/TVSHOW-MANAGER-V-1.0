import axiosClient from "../api/axiosClient";
import { User } from "../types";

const register = async (credentials: Pick<User, "username"> & { name?: string; password?: string }) => {
  const request = await axiosClient.post("/register", credentials);
  return request;
};

export default register;