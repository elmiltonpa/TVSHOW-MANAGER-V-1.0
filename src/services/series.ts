import axiosClient from "../api/axiosClient";
import { Serie } from "../types";

const getSeriesByUserId = async (id: string): Promise<Serie[]> => {
  const request = await axiosClient.get<Serie[]>(`/series/${id}`);
  return request.data;
};

const createSerie = async (serie: Partial<Serie>) => {
  const request = await axiosClient.post("/series", serie);
  return request;
};

const deleteSerie = async (id: string) => {
  const request = await axiosClient.delete(`/series/${id}`);
  return request;
};

const updateSerie = async (id: string, serie: Partial<Serie> | Record<string, unknown>) => {
  const request = await axiosClient.put(`/series/${id}`, serie);
  return request;
};

export default { getSeriesByUserId, createSerie, deleteSerie, updateSerie };