import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";
import { message } from "antd/es";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userID, { rejectWithValue }) => {
    try {
      const items = await cartService.getAllCart(userID);
      return items.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (AddToCartRequest) => {
    message.config({
      top: 150,
      duration: 5,
      maxCount: 3,
      rtl: true,
      prefixCls: "my-message",
    });
    try {
      const response = await cartService.addToCart(AddToCartRequest);
      console.log(response.data);
      message.success(response.data.message);
      return response.data;
    } catch (error) {
      message.error(error.response.data);
      throw new Error(error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (request) => {
    try {
      const response = await cartService.deleteToCart(request);
      message.success(response.data.message);
      return response.data;
    } catch (error) {
      message.error(error.response.data);
      throw new Error(error);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (updateCartRequest) => {
    message.config({
      top: 150,
      duration: 5,
      maxCount: 3,
      rtl: true,
      prefixCls: "my-message",
    });
    try {
      const response = await cartService.updateToCart(updateCartRequest);
      message.success(response.data.message);
      return response.data;
    } catch (error) {
      message.error(error.response.data);
      throw new Error(error);
    }
  }
);

const initialState = {
  cart: [],
  loading: true,
  error: null,
  emptyCart: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.emptyCart = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, { payload }) => {
        state.cart = payload;
        state.loading = false;
        state.emptyCart = state.cart?.length === 0;
      })
      .addCase(fetchCartItems.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.emptyCart = true;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.cart = payload.cart;
        state.loading = false;
        state.emptyCart = state.cart?.length === 0;
      })
      .addCase(addToCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.cart = payload.cart;
        state.loading = false;
        state.emptyCart = state.cart?.length === 0;
      })
      .addCase(removeFromCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, { payload }) => {
        state.cart = payload.cart;
        state.loading = false;
        state.emptyCart = state.cart?.length === 0;
      })
      .addCase(updateCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { reset } = cartSlice.actions;

export default cartSlice.reducer;
