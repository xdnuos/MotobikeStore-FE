import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDiscountPrice } from "../../helper/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { useSelector } from "react-redux";
import { localStorageService } from "src/services/localStorageService";

const ProductGridListSingle = ({
  product,
  addToCart,
  cartItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const navigate = useNavigate();
  const userID = useSelector((state) => state.auth.idAccount);
  const [modalShow, setModalShow] = useState(false);
  const handleClickItem = (idProduct) => {
    if (!isLoggedIn) {
      return `/product-details/${idProduct}`;
    }

    const role = localStorageService.get("USER")?.roles;
    const hasCustomerRole = role?.includes("CUSTOMER");

    if (hasCustomerRole) {
      return `/product-details/${idProduct}`;
    } else {
      return `/dashboard/product/${idProduct}`;
    }
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleListItemClick = (event, quantity, productID) => {
    const req = {
      productID,
      quantity,
    };
    addToCart({ userID, req });
  };

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = product.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const finalDiscountedPrice = discountedPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={handleClickItem(product.productID)}>
              <div className="rect-img-container">
                {" "}
                <img
                  className="default-img rect-img"
                  src={product.images[0]}
                  alt=""
                />
                {product.images.length > 1 ? (
                  <img
                    className="hover-img rect-img"
                    src={product.images[1]}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </div>
            </Link>
            {product.discount || product.arrival ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.arrival === "NEW" ? (
                  <span className="purple">New</span>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <div className="product-action">
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a
                    href={product.affiliateLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {" "}
                    Buy now{" "}
                  </a>
                ) : product.variation?.length >= 1 ? (
                  <Link to={handleClickItem(product.productID)}>
                    Select option
                  </Link>
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={(e) =>
                      handleListItemClick(e, 1, product.productID)
                    }
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={
                      cartItem !== undefined ? "Added to cart" : "Add to cart"
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? "Added"
                      : "Add to cart"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of stock
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick view">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={handleClickItem(product.productID)}>
                {product.name}
              </Link>
            </h3>
            {product.rating && product.rating > 0 ? (
              <div className="product-rating">
                <Rating ratingValue={product.rating} />
              </div>
            ) : (
              ""
            )}
            <div className="product-price">
              {discountedPrice !== -1 ? (
                <Fragment>
                  <span>{finalDiscountedPrice}</span>{" "}
                  <span className="old">{finalProductPrice}</span>
                </Fragment>
              ) : (
                <span>{finalProductPrice} </span>
              )}
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to={handleClickItem(product.productID)}>
                    <div className="rect-img-container">
                      <img
                        className="default-img img-fluid rect-img"
                        src={product.images[0]}
                        alt=""
                      />
                      {product.images.length > 1 ? (
                        <img
                          className="hover-img img-fluid rect-img"
                          src={product.images[1]}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Link>
                  {product.discount || product.arrival ? (
                    <div className="product-img-badges">
                      {product.discount ? (
                        <span className="pink">-{product.discount}%</span>
                      ) : (
                        ""
                      )}
                      {product.arrival === "NEW" ? (
                        <span className="purple">New</span>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to={handleClickItem(product.productID)}>
                    {product.name}
                  </Link>
                </h3>
                <div className="product-list-price">
                  {discountedPrice !== -1 ? (
                    <Fragment>
                      <span>{finalDiscountedPrice}</span>{" "}
                      <span className="old">{finalProductPrice}</span>
                    </Fragment>
                  ) : (
                    <span>{finalProductPrice} </span>
                  )}
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {product.shortDescription ? (
                  <p>{product.shortDescription}</p>
                ) : (
                  ""
                )}

                {/* <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {product.affiliateLink ? (
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {" "}
                        Buy Now{" "}
                      </a>
                    ) : product.variation && product.variation.length >= 1 ? (
                      <Link
                        to={`${process.env.REACT_APP_IMAGE_SERVER}/product/${product.productID}`}
                      >
                        Select option
                      </Link>
                    ) : product.stock && product.stock > 0 ? (
                      <button
                        onClick={(e) => handleListItemClick(e)}
                        className={
                          cartItem !== undefined && cartItem.quantity > 0
                            ? "active"
                            : ""
                        }
                        disabled={
                          cartItem !== undefined && cartItem.quantity > 0
                        }
                        title={
                          cartItem !== undefined
                            ? "Added to cart"
                            : "Add to cart"
                        }
                      >
                        {" "}
                        <i className="pe-7s-cart"></i>{" "}
                        {cartItem !== undefined && cartItem.quantity > 0
                          ? "Added"
                          : "Add to cart"}
                      </button>
                    ) : (
                      <button disabled className="active">
                        "Out of stock"
                      </button>
                    )}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        userID={userID}
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        addtocart={addToCart}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  cartItem: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridListSingle;
