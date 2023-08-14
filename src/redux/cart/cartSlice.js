import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";
import { useDispatch, useSelector } from "react-redux";
import { localStorageService } from "src/services/localStorageService";


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
      console.log("AddToCartRequest", res.data);

      if (res.data === "Added to cart") {
        console.log("aloooooooooo", fetchCartItems(localStorageService.getItem("USER")?.userID));
        return fetchCartItems(localStorageService.getItem("USER")?.userID);
      }
    }).catch((err) => { return err.response.data.message });

  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (idCartItem) => {
    try {
      const response = await cartService.deleteToCart(idCartItem);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (updateCartRequest) => {
    try {
      const response = await cartService.updateToCart(updateCartRequest);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);
export const fetchCart = () => async () => {

  const dispatch = useDispatch();

  // const idAccount = useSelector((state) => state.auth.idAccount);
  try {

    console.log("sssssssssss");
    return dispatch(fetchCartItems(localStorageService.getItem("USER")?.userID));
  } catch (error) {
    return error;
  }
};
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
        if (state?.cart?.length === 0) {
          state.cart = payload;
        } else {
          const uniqueElements = new Set([...state?.cart?.cart, ...payload]);
          const mergedArray = Array.from(uniqueElements);

          state.cart = { ...state.cart, cart: mergedArray };
        }

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
        state.cart = fetchCart()?.cart;
        state.loading = false;
        state.emptyCart = fetchCart()?.cart?.length === 0;
        state.loadOk = false;
      })
      .addCase(removeFromCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, { payload }) => {
        state.cart = payload.cart;
        state.loading = false;
        state.loadOk = false;
      })
      .addCase(updateQuantity.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
    // .addCase(updateCartItem.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updateCartItem.fulfilled, (state, { payload }) => {
    //   state.cart = payload
    //   state.loading = false;
    // })
    // .addCase(updateCartItem.rejected, (state, { error }) => {
    //   state.loading = false;
    //   state.error = error.message;
    // });
  },
});

export const { reset } = cartSlice.actions;

export default cartSlice.reducer;
