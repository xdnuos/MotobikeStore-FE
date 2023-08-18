import axios from "axios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let customersService = {
  getInfo: async (idAccount) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/customers/get/${idAccount}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getInfoByPhone: async (phone) => {
    try {
      console.log("phone:", phone);
      const response = await axios.get(
        BASE_URL + `/api/v1/customers/get/phone/${phone}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllCustomers: async () => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/customers/get/admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getCustomersInfoWithStatisticByUserID: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/customers/get/admin/userID/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getCustomersInfoByCustomerID: async (customerID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/customers/get/admin/${customerID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getAllOrder: async (idAccount) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/customers/${idAccount}/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  createAddress: async (CustomerAddressRequest) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/address`,
        CustomerAddressRequest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  changeState: async (userID) => {
    try {
      console.log("reset pass", userID);
      const response = await axios.put(
        BASE_URL + `/api/v1/customers/admin/changeState/${userID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  resetPass: async (userID) => {
    try {
      console.log("reset pass", userID);
      const response = await axios.put(
        BASE_URL + `/api/v1/customers/admin/resetPassword/${userID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
