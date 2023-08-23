import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addressService } from "../../services/addressService";

export const fetchAddressItems = createAsyncThunk(
  "address/fetchAddressItems",
  async (userID, { rejectWithValue }) => {
    try {
      const items = await addressService.getAddress(userID);
      console.log(items);
      return items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const CreateAddress = createAsyncThunk(
  "address/CreateAddress",
  async ({ userID, req }) => {
    try {
      const items = await addressService.addAddress({ userID, req });
      console.log(items.address);
      return items?.address;
    } catch (err) {
      return err.response.data.message;
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
      console.log("áaskdjlksjd kas   ", response.data?.address);
      return response.data?.address;
    } catch (error) {
      throw error;
    }
  }
);

// export const updateCart = createAsyncThunk(
//   "cart/updateCart",
//   async (updateCartRequest) => {
//     try {
//       const response = await cartService.updateToCart(updateCartRequest);
//       return response.data;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// );

const initialState = {
  address: [],
  loading: false,
  error: null,
  emptyAddress: true,
  loadOk: false,
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
        state.address = payload;
        state.loading = false;
        state.emptyAddress = state.address?.length === 0;
        state.loadOk = true;
      })
      .addCase(fetchAddressItems.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.emptyAddress = true;
      })
      .addCase(CreateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateAddress.fulfilled, (state, { payload }) => {
        state.address = payload;
        state.loading = false;
        state.loadOk = false;
      })
      .addCase(CreateAddress.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, { payload }) => {
        state.address = payload;
        state.loading = false;
        state.emptyAddress = payload?.length === 0;
      })
      .addCase(deleteAddress.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
    // .addCase(updateCart.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updateCart.fulfilled, (state, { payload }) => {
    //   state.cart = payload.cart;
    //   state.loading = false;
    //   state.loadOk = false;
    // })
    // .addCase(updateCart.rejected, (state, { error }) => {
    //   state.loading = false;
    //   state.error = error.message;
    // });
  },
});

export const { reset } = addressSlice.actions;

export default addressSlice.reducer;
