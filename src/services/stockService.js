import { message } from "antd";
import { https } from "./configAxios";

export let stockService = {
  get: async () => {
    try {
      const response = await https.get(`/api/v1/admin/stocks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
      throw error;
    }
  },
  create: async ({ userID, req }) => {
    try {
      const response = await https.post(
        `/api/v1/admin/user/${userID}/stocks`,
        req
      );
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
      throw error;
    }
  },
  cancel: async ({ userID, stockID }) => {
    try {
      const response = await https.delete(
        `/api/v1/admin/user/${userID}/stocks/${stockID}/cancel`
      );
      return response;
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
      throw error;
    }
  },
};
