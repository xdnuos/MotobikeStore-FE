import { message } from "antd";
import { https } from "./configAxios";

export let authService = {
  register: async (values) => {
    return await https.post("/api/v1/registration", values);
  },
  active: async (token) => {
    return await https.get(`/api/v1/registration/activate/${token}`);
  },
  forgotPassword: async (email) => {
    return await https.get(`/api/v1/auth/forgot/${email}`);
  },
  changePassword: async (values) => {
    return await https.put("/api/v1/auth/edit/password", values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  // registerStore: async (values) => {
  //   try {
  //     const response = await https.post(
  //        "/api/v1/auth/register-store",
  //       values
  //     );
  //     message.success("Register Success");
  //     return response.data;
  //   } catch (error) {
  //     message.error("Register Error");
  //     console.log(error);
  //     throw error;
  //   }
  // },
  login: async (values) => {
    try {
      const response = await https.post("/api/v1/auth/login", values);
      message.success("Login Success");
      return response.data;
    } catch (error) {
      message.error("Login Error");
      console.log(error);
      throw error;
    }
  },
};
