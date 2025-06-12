// /api/bannerApi.js
import axios from "axios";

const API = axios.create({ baseURL: "https://api.travistasl.com/api/banners" });

export const getBanners = () => API.get("/");
export const getBannerById = (id) => API.get(`/${id}`);
export const createBanner = (data) => API.post("/", data);
export const updateBanner = (id, data) => API.put(`/${id}`, data);
export const deleteBanner = (id) => API.delete(`/${id}`);
export const toggleStatus = (id) => API.patch(`/${id}/status`);
