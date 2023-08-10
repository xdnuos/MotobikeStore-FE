import PropTypes from "prop-types";
import React from "react";
import {
  getIndividualCategories,
  getIndividualColors,
  getIndividualTags,
  getIndividualManufacturer,
  getProductsIndividualSizes,
} from "../../../helper/product";
import ShopSearch from "../../../components/product/ShopSearch";
import ShopCategories from "../../../components/product/ShopCategories";
import ShopTag from "../../../components/product/ShopTag";
import ShopManufacturer from "src/components/product/ShopManufacturer";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const uniqueCategories = getIndividualCategories(products);
  const uniqueManufacturer = getIndividualManufacturer(products);
  const uniqueTags = getIndividualTags(products);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />
      <ShopManufacturer
        manufacturers={uniqueManufacturer}
        getSortParams={getSortParams}
      />

      {/* filter by tag */}
      <ShopTag tags={uniqueTags} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
