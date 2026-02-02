import axiosClient from "../api/axiosClient";
import { User } from "../types";

const getUser = async (username: string): Promise<User> => {
  const request = await axiosClient.get<User>(`/users/${username}`);
  return request.data;
};

export default getUser;