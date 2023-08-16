import { createSlice } from "@reduxjs/toolkit";

const OrderInvoice = createSlice({
  name: "invoice",
  initialState: {
    orderID: null,
  },
  reducers: {
    setInvoice: (state, action) => {
      const { orderID } = action.payload;
      state.orderID = orderID;
    },
  },
});

export const { setInvoice } = OrderInvoice.actions;

export default OrderInvoice.reducer;
