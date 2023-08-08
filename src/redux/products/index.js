import { combineReducers } from "redux";
import listProductReducer from "./productList";
import productDetailSlice from "./ProductDetail";
const productReducer = combineReducers({
  productList: listProductReducer,
  productDetail: productDetailSlice,
});
export default productReducer;
