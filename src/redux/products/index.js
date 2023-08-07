import { combineReducers } from "redux";
import listProductReducer from "./productList";
import productDetailSlice from "./ProductDetail";
import productActionSlice from "./productAction";
const productReducer = combineReducers({
  productList: listProductReducer,
  productDetail: productDetailSlice,
  productAction: productActionSlice,
});
export default productReducer;
