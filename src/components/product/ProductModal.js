import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import { getProductCartQuantity } from "../../helper/product";
import { Modal } from "react-bootstrap";
import Rating from "./sub-components/ProductRating";
import { connect } from "react-redux";

function ProductModal(props) {
  const { product } = props;
  // eslint-disable-next-line react/prop-types
  const { discountedprice } = props;
  // eslint-disable-next-line react/prop-types
  const { finalproductprice } = props;
  // eslint-disable-next-line react/prop-types
  const { finaldiscountedprice } = props;
  const { userID } = props;
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const addToCart = props.addtocart;

  const handleListItemClick = (event, quantity, productID) => {
    addToCart({ productID, quantity, userID });
  };
  const cartItem = props.cartitem;

  const productCartQty = getProductCartQuantity(
    cartItem,
    product,
    selectedProductColor,
    selectedProductSize
  );

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {product.images?.map((single, key) => {
                    return (
                      <div key={key}>
                        <div className="single-image rect-img-container">
                          <img
                            src={single}
                            className="img-fluid rect-img"
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {product.images?.map((single, key) => {
                    return (
                      <div key={key}>
                        <div className="single-image rect-img-container">
                          <img
                            src={single}
                            className="img-fluid rect-img"
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  {discountedprice !== -1 ? (
                    <Fragment>
                      <span>{finaldiscountedprice}</span>{" "}
                      <span className="old">{finalproductprice}</span>
                    </Fragment>
                  ) : (
                    <span>{finalproductprice} </span>
                  )}
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="pro-details-list">
                  <p>{product.shortDescription}</p>
                </div>

                {product.variation ? (
                  <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                      <span>Color</span>
                      <div className="pro-details-color-content">
                        {product.variation.map((single, key) => {
                          return (
                            <label
                              className={`pro-details-color-content--single ${single.color}`}
                              key={key}
                            >
                              <input
                                type="radio"
                                value={single.color}
                                name="product-color"
                                checked={
                                  single.color === selectedProductColor
                                    ? "checked"
                                    : ""
                                }
                                onChange={() => {
                                  setSelectedProductColor(single.color);
                                  setSelectedProductSize(single.size[0].name);
                                  setProductStock(single.size[0].stock);
                                  setQuantityCount(1);
                                }}
                              />
                              <span className="checkmark"></span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className="pro-details-size">
                      <span>Size</span>
                      <div className="pro-details-size-content">
                        {product.variation?.product.variation.map((single) => {
                          return single.color === selectedProductColor
                            ? single.size.map((singleSize, key) => {
                                return (
                                  <label
                                    className={`pro-details-size-content--single`}
                                    key={key}
                                  >
                                    <input
                                      type="radio"
                                      value={singleSize.name}
                                      checked={
                                        singleSize.name === selectedProductSize
                                          ? "checked"
                                          : ""
                                      }
                                      onChange={() => {
                                        setSelectedProductSize(singleSize.name);
                                        setProductStock(singleSize.stock);
                                        setQuantityCount(1);
                                      }}
                                    />
                                    <span className="size-name">
                                      {singleSize.name}
                                    </span>
                                  </label>
                                );
                              })
                            : "";
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {product.affiliateLink ? (
                  <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover">
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="pro-details-quality">
                    <div className="cart-plus-minus">
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount > 1 ? quantityCount - 1 : 1
                          )
                        }
                        className="dec qtybutton"
                      >
                        -
                      </button>
                      <input
                        className="cart-plus-minus-box"
                        type="text"
                        value={quantityCount}
                        readOnly
                      />
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount < productStock - productCartQty
                              ? quantityCount + 1
                              : quantityCount
                          )
                        }
                        className="inc qtybutton"
                      >
                        +
                      </button>
                    </div>
                    <div className="pro-details-cart btn-hover">
                      {productStock && productStock > 0 ? (
                        <button
                          onClick={(e) =>
                            handleListItemClick(
                              e,
                              quantityCount,
                              product.productID
                            )
                          }
                          disabled={productCartQty >= productStock}
                        >
                          {" "}
                          Add to cart{" "}
                        </button>
                      ) : (
                        <button disabled>Out of stock</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  cartitem: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.string,
  finalproductprice: PropTypes.string,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
};

// const mapStateToProps = (state) => {};

// export default connect(mapStateToProps)(ProductModal);
export default ProductModal;
