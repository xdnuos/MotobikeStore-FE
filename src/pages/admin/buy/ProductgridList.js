import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import ProductGridListSingle from "../../../components/product/ProductGridListSingle";
import { addToCart } from "src/redux/cart/cartSlice";

const ProductGrid = ({
  products,
  addToCart,
  cartItems,
  sliderClassName,
  spaceBottomClass,
}) => {
  console.log(cartItems);
  return (
    <Fragment>
      {products.map((product) => {
        return (
          <ProductGridListSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            addToCart={addToCart}
            cartItem={
              cartItems?.filter(
                (cartItem) => cartItem.productID === product.productID
              )[0]
            }
            key={product.productID}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: ({ userID, req }) => {
      dispatch(addToCart({ userID, req }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
