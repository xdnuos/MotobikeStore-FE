import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    idCartItems: [],
    totalPrice: 0,
    idAddress: null,
    address: null,
    customerID: null,
    fullName: "",
    phone: "",
    selectedAddress: null,
  },
  reducers: {
    addToOrder: (state, action) => {
      const { id, price } = action.payload;
      state.idCartItems = id;
      state.totalPrice = price;
    },
    setAddress: (state, action) => {
      const { idAddress, address, selectedAddress } = action.payload;
      state.idAddress = idAddress;
      state.address = address;
      state.address = selectedAddress;
    },
    setUser: (state, action) => {
      const { fullName, phone, customerID } = action.payload;
      state.customerID = customerID;
      state.fullName = fullName;
      state.phone = phone;
    },
  },
});

export const { addToOrder, setAddress, setUser } = OrderSlice.actions;

export default OrderSlice.reducer;
