import { https } from "./configAxios";

export let customerService = {
  getInfoForCustomer: async (userID) => {
    try {
      const response = await https.get(`/api/v1/customers/${userID}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  editInfoForCustomer: async ({ userID, req }) => {
    try {
      const response = await https.put(`/api/v1/customers/${userID}`, req);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getBasicInfoByPhoneAdmin: async (phone) => {
    try {
      const response = await https.get(
        `/api/v1/admin/customers/phone/${phone}/basic`
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAllCustomersAdmin: async () => {
    try {
      const response = await https.get(`/api/v1/admin/customers`, {
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
      const response = await https.get(`/api/v1/admin/customers/${userID}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // getAllOrder: async (idAccount) => {
  //   try {
  //     const response = await https.get(
  //        `/api/v1/customers/${idAccount}/orders`,
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
  //     const response = await https.post(
  //        `/api/v1/address`,
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
      const response = await https.put(
        `/api/v1/admin/customers/${userID}/changeState`,
        {}
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
      const response = await https.put(
        `/api/v1/admin/customers/${userID}/resetPassword`,
        {}
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
