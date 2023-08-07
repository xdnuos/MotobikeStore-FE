import { localStorageService } from "../services/localStorageService";

// export const BASE_URL = "https://medicineshop-production.up.railway.app";
export const BASE_URL = "http://localhost:8080";

export const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorageService.get("accessToken")}`,
  },
});
