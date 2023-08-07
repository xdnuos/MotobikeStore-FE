import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { manufacturerService } from "../../services/manufacturerService";

const initialState = {
  allManufacturer: [],
  loading: false,
};

export const getAllManufacturer = createAsyncThunk(
  "manufacturer/list",
  async () => {
    const response = await manufacturerService.getAllManufacturer();
    return response;
  }
);

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        allManufacturer: [],
      };
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getAllManufacturer.pending, (state) => {
        return {
          ...state,
          allManufacturer: [],
          loading: true,
        };
      })
      .addCase(getAllManufacturer.fulfilled, (state, actions) => {
        return {
          ...state,
          allManufacturer: actions.payload,
          loading: false,
        };
      })
      .addCase(getAllManufacturer.rejected, (state) => {
        return {
          ...state,
          allManufacturer: [],
          loading: false,
        };
      });
  },
});

export const { reset } = manufacturerSlice.actions;
export default manufacturerSlice.reducer;
