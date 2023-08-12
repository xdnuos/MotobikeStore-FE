import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageService } from "../../services/localStorageService";
import { authService } from "../../services/authService";

const initialState = {
  accessToken: !!localStorageService.get("access_token")
    ? localStorageService.get("access_token")
    : null, 
  isLoggedIn: !!localStorageService.get("USER"),
  idAccount: !!localStorageService.get("USER")
    ? localStorageService.get("USER")?.userID
    : null,
  email: !!localStorageService.get("USER")
    ? localStorageService.get("USER")?.email
    : null,
};

//LOGIN
export const loginUser = createAsyncThunk("auth/login", async (user) => {
  try {
    const res = await authService.login(user);
    localStorageService.set("access_token", res.token);
    localStorageService.set("USER", res.user);
    console.log("login success --->", res);
    return res;
  } catch (error) {
    console.log("errrrrrrrrrrrrrrrrrro", error);
    return error;
  }
});

//LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (user, thunkAPI) => {
    try {
      localStorageService.remove("USER");
      localStorageService.remove("access_token");

      // openNotificationIcon('success', 'Success', 'Logout Success!');
      return user;
    } catch (error) {
      return error;
      // openNotificationIcon('erorr', 'Erorr', 'Login Erorr!');
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
      };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
        };
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          accessToken: payload.token,
          isLoggedIn: !!payload.token,
          idAccount: payload.user.userID,
        };
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        return {
          ...state,
          isLoggedIn: false,
          idAccount: null,
        };
      })

      .addCase(logoutUser.pending, (state) => {
        return {
          ...state,
        };
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          accessToken: null,
          isLoggedIn: false,
          idAccount: null,
        };
      });
  },
});
// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
