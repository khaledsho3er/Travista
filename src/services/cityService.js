import axios from "axios";

const API_URL = "https://api.travistasl.com/api/cities";

export const getAllCities = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const getCitiesByCountry = async (countryId) => {
  try {
    const response = await axios.get(`${API_URL}/country/${countryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities by country:", error);
    throw error;
  }
};
