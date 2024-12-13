import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "./apiInstance";

const handleError = (error) => {
  toast.error(
    error?.response?.data?.messsage ||
      error?.response?.data?.error ||
      error?.message ||
      error?.error?.error ||
      "Something went wrong"
  );
};

export const loginApi = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const registerUser = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const getQuestions = async () => {
  try {
    const response = await axiosInstance.get("/questions");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getBloodCenters = async (params) => {
  try {
    const response = await axiosInstance.get("/donationcenters/list", {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getBloodCamps = async (params) => {
  console.log("camps->", params);
  try {
    const response = await axiosInstance.get("/donationcamps/list", { params });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getAdminOrgs = async () => {
  try {
    const response = await axiosInstance.get("/organizations");
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const acceptOrRejectOrg = async (id, data = {}) => {
  try {
    const response = await axiosInstance.put(`/organization/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getDonors = async () => {
  try {
    const response = await axiosInstance.get("/donors/list");
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const addDonation = async (data) => {
  try {
    const response = await axiosInstance.post("/donations/add", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const bloodEligibility = async (data) => {
  try {
    const response = await axiosInstance.post("/eligibility", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getDonation = async (params) => {
  try {
    const response = await axiosInstance.get("/donations/list", { params });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getBloodRequestsList = async (params) => {
  try {
    const response = await axiosInstance.get("/donations/list", { params });
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const requestBlood = async (data) => {
  try {
    const response = await axiosInstance.post("/donors/request-blood", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createCamps = async (data) => {
  try {
    const response = await axiosInstance.post("/donationcamps/add", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};
export const editCamps = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/donationcamps/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const deleteCamps = async (id) => {
  try {
    const response = await axiosInstance.delete(`/donationcamps/remove/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const deleteCenter = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/donationcenters/remove/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

export const createCenter = async (data) => {
  try {
    const response = await axiosInstance.post("/donationcenters/add", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};
export const editCenter = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/donationcenters/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    handleError(error);
    throw error;
  }
};

// export const deleteCenter = async (id) => {
//   try {
//     const response = await axiosInstance.delete(`/donationcamps/update/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     handleError(error);
//     throw error;
//   }
// };
