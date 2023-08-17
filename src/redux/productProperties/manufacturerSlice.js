import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { manufacturerService } from "../../services/manufacturerService";
import { message } from "antd";

const initialState = {
  allManufacturer: [],
  loading: false,
};

export const getAllManufacturer = createAsyncThunk(
  "manufacturer/list",
  async () => {
    const response = await manufacturerService.getAllManufacturer();
    return response.data;
  }
);
export const createManufacturer = createAsyncThunk(
  "manufacturer/create",
  async (request) => {
    try {
      const response = await manufacturerService.create(request);
      message.success(response.data.message);
      return response.data.manufacturer;
    } catch (error) {
      message.error(error.response.data);
      throw new Error(error);
    }
  }
);
export const updateManufacturer = createAsyncThunk(
  "manufacturer/update",
  async (request) => {
    try {
      const response = await manufacturerService.update(request);
      message.success(response.data.message);
      return response.data.manufacturer;
    } catch (error) {
      message.error(error.response.data);
      throw new Error(error);
    }
  }
);
export const deleteManufacturer = createAsyncThunk(
  "manufacturer/delete",
  async (manufacturerID) => {
    try {
      const response = await manufacturerService.delete(manufacturerID);
      message.success(response.data.message);
      return response.data.manufacturer;
    } catch (error) {
      message.error(error.response.data);
      throw new Error(error);
    }
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
      })
      .addCase(createManufacturer.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createManufacturer.fulfilled, (state, actions) => {
        return {
          ...state,
          allManufacturer: actions.payload,
          loading: false,
        };
      })
      .addCase(createManufacturer.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(updateManufacturer.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateManufacturer.fulfilled, (state, actions) => {
        return {
          ...state,
          allManufacturer: actions.payload,
          loading: false,
        };
      })
      .addCase(updateManufacturer.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(deleteManufacturer.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteManufacturer.fulfilled, (state, actions) => {
        return {
          ...state,
          allManufacturer: actions.payload,
          loading: false,
        };
      })
      .addCase(deleteManufacturer.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { reset } = manufacturerSlice.actions;
export default manufacturerSlice.reducer;
