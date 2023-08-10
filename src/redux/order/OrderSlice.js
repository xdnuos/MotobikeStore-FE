import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    idCartItems: [],
    totalPrice: 0,
    idAddress: null,
    address: null,
    customerID: null,
    fistName: "",
    lastName: "",
    phone: "",
  },
  reducers: {
    addToOrder: (state, action) => {
      const { id, price } = action.payload;
      state.idCartItems = id;
      state.totalPrice = price;
    },
    setAddress: (state, action) => {
      const { idAddress, address } = action.payload;
      state.idAddress = idAddress;
      state.address = address;
    },
    setUser: (state, action) => {
      const { firstName, lastName, phone, customerID } = action.payload;
      state.customerID = customerID;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phone = phone;
    },
  },
});

export const { addToOrder, setAddress, setUser } = OrderSlice.actions;

export default OrderSlice.reducer;
