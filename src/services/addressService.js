import axios from "axios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let addressService = {

    addAddress: async (value) => {
        try {
            const response = await axios.post(BASE_URL + `/api/v1/address/add`, value,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
            message.success("Address added successfully");
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getAddress: async (idUser) => {
        try {
            const response = await axios.get(BASE_URL + `/api/v1/address/get/user/${idUser}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    deleteAddress: async (idUser) => {
        try {
            const response = await axios.post(BASE_URL + `/api/v1/address/delete`,idUser,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                console.log(response.data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
