import axios from "axios";
import type { Salon } from "../types/salon";
import { Page } from "@/types/pagination";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const getSalons = async (query: string, salonPage: Page<Salon>, sort: string) => {
  const page = salonPage.number.toString();
  const size = salonPage.size.toString();
  const params = new URLSearchParams({ query, page, size, sort });
  const response = await api.get<Page<Salon>>(`/salons?${params}`);
  return response.data;
};

export const getSalon = async (placeId: string) => {
  const response = await api.get<Salon>(`/salons/${placeId}`);
  return response.data;
};

export const updateSalon = async (
  placeId: string,
  salon: Salon
) => {
  const response = await api.put(
    `/salons/${placeId}`,
    salon
  );
  return response.data;
}
