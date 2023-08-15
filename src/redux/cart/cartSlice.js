import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userID, { rejectWithValue }) => {
    try {
      const items = await cartService.getAllCart(userID);
      return items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (AddToCartRequest) => {
    await cartService.addToCart(AddToCartRequest).then((res) => {
      console.log("ppppppppppppp", res.data?.cart);
      return res.data;
    }).catch((err) => { return err.response.data.message });

  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (idCartItem) => {

    try {
      const response = await cartService.deleteToCart(idCartItem);
       return response.data?.cart;
    } catch (error) {

      throw new Error(error);

    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (updateCartRequest) => {
    try {
      const response = await cartService.updateToCart(updateCartRequest);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const initialState = {
  cart: [],
  loading: false,
  error: null,
  emptyCart: true,
  loadOk: false,
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
        state.loadOk = true;
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
        state.cart = payload?.cart;
        state.loading = false;
        state.loadOk = false;
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
       state.cart = payload;
        state.loading = false;
        state.emptyCart = payload?.length === 0;
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
        state.loadOk = false;
      })
      .addCase(updateCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { reset } = cartSlice.actions;

export default cartSlice.reducer;
