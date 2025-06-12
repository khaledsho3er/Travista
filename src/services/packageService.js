import axios from "axios";

const API_URL = "https://api.travistasl.com/api/packages"; // Update with your backend URL

export const createPackage = async (formData) => {
  try {
    console.log("Sending FormData to backend..."); // Debug log

    // Ensure travistaID is properly set in the request
    const packageData = JSON.parse(formData.get("packageData"));
    if (!packageData.travistaID) {
      throw new Error("Missing travistaID in package data");
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Backend response:", response.data); // Debug log
    return response;
  } catch (error) {
    console.error(
      "Error in createPackage:",
      error.response?.data || error.message
    ); // Debug log
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        error.response.data.message || "Failed to create package"
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server. Please try again.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || "Failed to create package");
    }
  }
};

export const getPackages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updatePackage = async (id, packageData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, packageData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deletePackage = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
