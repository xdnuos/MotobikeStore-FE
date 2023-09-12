import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { addressService } from "../../services/addressService";

export const fetchAddressItems = createAsyncThunk(
  "address/fetchAddressItems",
  async (userID, { rejectWithValue }) => {
    try {
      const items = await addressService.getAddress(userID);
      console.log("addresses", items);
      return items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async ({ userID, req }) => {
    try {
      const items = await addressService.addAddress({ userID, req });
      return items;
    } catch (error) {
      message.error("An error occurred. Please try again!");
      throw error;
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userID, addressID }) => {
    try {
      const response = await addressService.deleteAddress({
        userID,
        addressID,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ userID, req }) => {
    try {
      const response = await addressService.editAddress({ userID, req });
      return response;
    } catch (error) {
      message.error("An error occurred. Please try again!");
      throw error;
    }
  }
);

export const getDefaultAddress = createAsyncThunk(
  "address/getDefaultAddress",
  async ({ userID }) => {
    try {
      const res = await addressService.getDefaultAddress({ userID });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async ({ userID, addressID }) => {
    try {
      const res = await addressService.setDefaultAddress({ userID, addressID });
      return res;
    } catch (error) {
      throw error;
    }
  }
);
const initialState = {
  address: [],
  loading: false,
  error: null,
  emptyAddress: true,
  defaultAddress: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressItems.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.emptyAddress = true;
      })
      .addCase(fetchAddressItems.fulfilled, (state, { payload }) => {
        state.address = payload.address;
        state.defaultAddress = payload.defaultAddress;
        state.loading = false;
        state.emptyAddress = state.address?.length === 0;
      })
      .addCase(fetchAddressItems.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.emptyAddress = true;
      })
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, { payload }) => {
        state.address = payload.address;
        state.loading = false;
      })
      .addCase(createAddress.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, { payload }) => {
        state.address = payload.address;
        state.loading = false;
        state.emptyAddress = payload?.length === 0;
      })
      .addCase(deleteAddress.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, { payload }) => {
        state.address = payload.address;
        state.loading = false;
      })
      .addCase(updateAddress.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, { payload }) => {
        state.address = payload.address;
        state.defaultAddress = payload.defaultAddress;
        state.loading = false;
      })
      .addCase(setDefaultAddress.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { reset } = addressSlice.actions;

export default addressSlice.reducer;
