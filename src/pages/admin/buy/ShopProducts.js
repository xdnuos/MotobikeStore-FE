import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";
import { ProductCartWidget } from "../../../sections/@dashboard/products";
const ShopProducts = ({ products, layout }) => {
  const activeProducts = products?.filter((product) => product.active);
  return (
    <div className="shop-bottom-area mt-35">
      <ProductCartWidget />
      <div className={`row ${layout || ""}`}>
        <ProductgridList products={activeProducts} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
