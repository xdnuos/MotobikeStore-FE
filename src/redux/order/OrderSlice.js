import { createSlice } from '@reduxjs/toolkit';

const OrderSlice = createSlice({
    name: 'order',
    initialState: {
        idCartItems: [],
        totalPrice: 0,
        idAddress: null,
        address: null
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
    },
});

export const { addToOrder, setAddress } = OrderSlice.actions;

export default OrderSlice.reducer;