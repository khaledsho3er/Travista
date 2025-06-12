import axios from "axios";

const API_URL = "https://api.travistasl.com/api/hotels";

export const getAllHotels = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};
