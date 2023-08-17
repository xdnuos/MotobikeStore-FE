import axios from "axios";
import { https } from "./configAxios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let staffService = {
  create: async (values) => {
    try {
      const response = await axios.post(
        BASE_URL + `/api/v1/admin/staff/add`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      // message.error(error.response.data);
      throw error;
      console.log(error);
    }
  },
  update: async (values) => {
    try {
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/staff/edit`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      throw error;
      console.log(error);
    }
  },
  getAll: async () => {
    try {
      const response = await axios.get(BASE_URL + `/api/v1/admin/staff/get`, {
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
    }
  },
  getByID: async (staffID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/admin/staff/get/${staffID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
    }
  },
  getByUserID: async (userID) => {
    try {
      const response = await axios.get(
        BASE_URL + `/api/v1/admin/staff/getByUser/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 406) {
        message.error(error.response.data);
      } else {
        message.error("An error has occurred. Please try again");
      }
      console.log(error);
    }
  },
  changeState: async (request) => {
    try {
      console.log("reset pass", request);
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/staff/changeState`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      message.error(error.response.data);
      console.log(error);
    }
  },
  resetPass: async (userID) => {
    try {
      console.log("reset pass", userID);
      const response = await axios.put(
        BASE_URL + `/api/v1/admin/staff/resetPassword/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      message.error(error.response.data);
      console.log(error);
    }
  },
};
