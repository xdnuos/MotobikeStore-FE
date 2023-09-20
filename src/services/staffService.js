import { message } from "antd";
import { https } from "./configAxios";

export let staffService = {
  create: async ({ userID, req }) => {
    try {
      const response = await https.post(
        `/api/v1/admin/user/${userID}/staff`,
        req,
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
    }
  },
  update: async ({ userID, staffUserID, req }) => {
    try {
      const response = await https.put(
        `/api/v1/admin/user/${userID}/staff/${staffUserID}`,
        req,
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
    }
  },
  getAll: async (userID) => {
    try {
      const response = await https.get(`/api/v1/admin/user/${userID}/staff`);
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
  getByUserID: async ({ userID, staffUserID }) => {
    try {
      const response = await https.get(
        `/api/v1/admin/user/${userID}/staff/${staffUserID}`
      );
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
  getInfo: async (userID) => {
    try {
      const response = await https.get(`/api/v1/admin/user/${userID}`);
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
  updateInfo: async ({ userID, req }) => {
    console.log("req", req);
    try {
      const response = await https.put(`/api/v1/admin/user/${userID}`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      throw error;
    }
  },
  changeState: async ({ userID, staffUserID }) => {
    try {
      const response = await https.put(
        `/api/v1/admin/user/${userID}/staff/${staffUserID}/changeState`,
        {}
      );
      return response;
    } catch (error) {
      // message.error(error.response.data);
      // console.log(error);
      throw error;
    }
  },
  resetPass: async ({ userID, staffUserID }) => {
    try {
      const response = await https.put(
        `/api/v1/admin/user/${userID}/staff/${staffUserID}/resetPassword`,
        {}
      );
      return response;
    } catch (error) {
      // message.error(error.response.data);
      // console.log(error);
      throw error;
    }
  },
};
