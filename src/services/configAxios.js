import axios from "axios";
import { BASE_URL } from "../utils/baseURL";
import { localStorageService } from "./localStorageService";
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

https.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      console.log("error token", error);
      localStorageService.remove("USER");
      localStorageService.remove("access_token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
