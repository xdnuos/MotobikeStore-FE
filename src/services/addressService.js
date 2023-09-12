import { message } from "antd";
import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let addressService = {
  getAddress: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/user/${userID}/address`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addAddress: async ({ userID, req }) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/user/${userID}/address`,
        req,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      message.success("Address added successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  editAddress: async ({ userID, req }) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/user/${userID}/address`,
        req,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      message.success("Success");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteAddress: async ({ userID, addressID }) => {
    try {
      const response = await axios.delete(
        BASE_URL + `/api/v1/user/${userID}/address/${addressID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      message.error(error.response.data);
      throw error;
    }
  },
  getDefaultAddress: async ({ userID }) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/user/${userID}/address/default`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  setDefaultAddress: async ({ userID, addressID }) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/user/${userID}/address/default/${addressID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      message.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAddressByID: async ({ userID, addressID }) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/user/${userID}/address/${addressID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
