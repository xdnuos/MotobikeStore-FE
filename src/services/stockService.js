import axios from "axios";
import { https } from "./configAxios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let stockService = {
  get: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/admin/stocks`, {
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
      const response = await axios.post(
        BASE_URL + `/api/v1/admin/user/${userID}/stocks`,
        req,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
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
      const response = await axios.delete(
        BASE_URL + `/api/v1/admin/user/${userID}/stocks/${stockID}/cancel`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
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
