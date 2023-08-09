import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helper/product";

const ShopManufacturer = ({ manufacturers, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Manufacturers</h4>
      <div className="sidebar-widget-manufacturer mt-25">
        {manufacturers ? (
          <ul>
            {manufacturers.map((manufacturer, key) => {
              return (
                <li key={key}>
                  <button
                    onClick={(e) => {
                      getSortParams("manufacturer", manufacturer);
                      setActiveSort(e);
                    }}
                  >
                    {manufacturer}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          "No manufacturers found"
        )}
      </div>
    </div>
  );
};

ShopManufacturer.propTypes = {
  getSortParams: PropTypes.func,
  manufacturers: PropTypes.array,
};

export default ShopManufacturer;
