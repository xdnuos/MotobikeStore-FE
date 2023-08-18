import { message } from "antd";
import axios from "axios";
import { BASE_URL } from "../utils/baseURL";

export let authService = {
  register: async (values) => {
    return await axios.post(BASE_URL + "/api/v1/registration", values);
  },
  active: async (token) => {
    return await axios.get(BASE_URL + `/api/v1/registration/activate/${token}`);
  },
  forgotPassword: async (email) => {
    return await axios.get(BASE_URL + `/api/v1/auth/forgot/${email}`);
  },
  resetPassword: async (values) => {
    return await axios.post(BASE_URL + `/api/v1/auth/reset`, values);
  },
  registerStore: async (values) => {
    try {
      const response = await axios.post(
        BASE_URL + "/api/v1/auth/register-store",
        values
      );
      message.success("Register Success");
      return response.data;
    } catch (error) {
      message.error("Register Error");
      console.log(error);
    }
  },
  login: async (values) => {
    try {
      const response = await axios.post(
        BASE_URL + "/api/v1/auth/login",
        values
      );
      message.success("Login Success");
      return response.data;
    } catch (error) {
      message.error("Login Error");
      console.log(error);
    }
  },
};
