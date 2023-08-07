import { combineReducers } from "redux";
import productReducer from "./products";
import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";
import OrderSlice from "./order/OrderSlice";
import categorySlice from "./productProperties/categorySlice";
import tagSlice from "./productProperties/tagSlice";
import manufacturerSlice from "./productProperties/manufacturerSlice";
// compine user
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartSlice,
  auth: authSlice,
  order: OrderSlice,
  categories: categorySlice,
  tags: tagSlice,
  manufacturer: manufacturerSlice,
});
export default rootReducer;
