import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let customerService = {
  getInfoForCustomer: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/customers/${userID}`,
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
  editInfoForCustomer: async ({ userID, req }) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/customers/${userID}`,
        req,
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
  getBasicInfoByPhoneAdmin: async (phone) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/admin/customers/phone/${phone}/basic`,
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
  getAllCustomersAdmin: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/admin/customers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getCustomersByUserIDAdmin: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/admin/customers/${userID}`,
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
  // getAllOrder: async (idAccount) => {
  //   try {
  //     const response = await axios.get(
  //       BASE_URL + `/api/v1/customers/${idAccount}/orders`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },

  // createAddress: async (CustomerAddressRequest) => {
  //   try {
  //     const response = await axios.post(
  //       BASE_URL + `/api/v1/address`,
  //       CustomerAddressRequest,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // },
  changeState: async (userID) => {
    try {
      console.log("reset pass", userID);
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/customers/${userID}/changeState`,
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
        BASE_URL + `/api/v1/admin/customers/${userID}/resetPassword`,
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
