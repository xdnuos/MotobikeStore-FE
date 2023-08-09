import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "src/redux/cart/cartSlice";
import { ProductCartWidget } from "../../sections/@dashboard/products/";
const ShopProducts = ({ products, layout }) => {
  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const userID = useSelector((state) => state.auth.idAccount);
  // const loadOk = useSelector((state) => state.cart.loadOk);

  // useEffect(() => {
  //   if (isLoggedIn | !loadOk) {
  //     dispatch(fetchCartItems(userID));
  //   }
  // }, [dispatch, isLoggedIn, loadOk, userID]);
  return (
    <div className="shop-bottom-area mt-35">
      <ProductCartWidget />
      <div className={`row ${layout || ""}`}>
        <ProductgridList products={products} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
