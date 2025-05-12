// services/countryService.js
import axios from "axios";

const API_URL = "https://158.220.96.121/api/countries";

export const getAllCountries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};
