import axios from "axios";
import { https } from "./configAxios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let stockService = {
  create: async (values) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/admin/stock/add`,
        values,
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
  get: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/admin/stock/get`, {
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
  cancel: async (stockID) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/stock/cancel/${stockID}`,
        {},
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
