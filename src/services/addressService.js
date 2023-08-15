import axios from "axios";
import { BASE_URL } from "../utils/baseURL";
import { message } from "antd";

export let addressService = {

    addAddress: async (address) => {
        try {
            const response = await axios.post(BASE_URL + `/api/v1/address/add`, address,
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
    }
};
