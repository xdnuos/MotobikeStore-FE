import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { withRouter } from "react-router";

import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  CardHeader,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Table,
  Checkbox,
  Avatar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";

import Iconify from "../../../components/iconify/Iconify";
import PropTypes from "prop-types";
import OrderSummary from "./OrderSummary";
// components
import { StyledButtonGreen } from "../../../components/custom/CustomButton";
import Scrollbar from "../../../components/scrollbar/Scrollbar";
import CartListHead from "./CartListHead";
import { Quantity } from "../products/product-details";
import SvgColor from "../../../components/svg-color/SvgColor";
import {
  fetchCartItems,
  removeFromCart,
  updateCart,
} from "../../../redux/cart/cartSlice";

import { getProductById } from "../../../redux/products/ProductDetail";
import { productService } from "../../../services/productService";
import { cartService } from "../../../services/cartService";
import { addToOrder } from "../../../redux/order/OrderSlice";

const TABLE_HEAD = [
  { id: "price", label: "Giá thành", alignRight: false },
  { id: "quantity", label: "Số lượng", alignRight: false },
  { id: "" },
];

Cart.propTypes = {
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
};

function Cart({ handleNext, activeStep }) {
  const [selected, setSelected] = useState([]);
  const [isEdited, setIsEdited] = useState(NaN);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceOrder, setPriceOrder] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // load sản phẩm

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const emptyCart = useSelector((state) => state.cart.emptyCart);
  const idAccount = useSelector((state) => state.auth.idAccount);
  const idProductDetail = useSelector(
    (state) => state.products?.productDetail?.product?.productID
  );

  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleRemoveItem = async (idCartItem) => {
    try {
      if (!!idCartItem) {
        await dispatch(
          removeFromCart({
            cartProductID: idCartItem,
            userID: idAccount,
          })
        );
        // dispatch(fetchCartItems(idAccount));
        setSelected([]);
        setPriceOrder(0);
        // console.log("Product deleted successfullyyyyyyyyyyyyyyyyy");
      } else {
        console.log("idCartItem is undefined", idCartItem);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      throw error;
    }
  };

  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleEditCartItem = (idCartItem, price, quantity) => {
    setIsEdited(idCartItem);
    setTotalPrice(quantity * price);
    setPrice(price);
    setQuantity(quantity);
  };

  const handleSaveUpdate = async (idCart) => {
    if (!isNaN(isEdited)) {
      try {
        await dispatch(
          updateCart({
            cartProductID: idCart,
            quantity: quantity,
            userID: idAccount,
          })
        );
        setState({ ...state, open: true });
        setIsEdited(NaN);
      } catch (error) {
        console.error("Failed to update cart quantity:", error);
      }
    } else {
      console.log("isEdited is undefined", isEdited);
    }
  };

  const handleCheckout = async () => {
    await dispatch(addToOrder({ id: selected, price: priceOrder }));
    handleNext();
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartItems(idAccount));
      // console.log("localStorageService",localStorageService.get("USER")?.id)
    }
  }, [dispatch, isLoggedIn, idAccount]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cart?.map((n) => n?.cartProductID);
      setSelected(newSelecteds);

      const newTotalPrice = cart
        ?.filter((item) => newSelecteds.indexOf(item?.cartProductID) !== -1)
        .map((item) => item?.quantity * item?.productPrice)
        .reduce((total, price) => total + price, 0);
      setPriceOrder(newTotalPrice);

      return;
    }
    setPriceOrder(0);
    setSelected([]);
  };

  const handleClick = (event, id, price) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let newTotalPrice = priceOrder;
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newTotalPrice += price;
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newTotalPrice -= price;
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newTotalPrice -= price;
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newTotalPrice -= price;
    }
    setPriceOrder(newTotalPrice);
    setSelected(newSelected);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8.5}>
          <Card>
            <CardHeader
              title={
                !cart?.length ? (
                  <></>
                ) : (
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography variant="h6">Cart</Typography>

                    <Typography variant="body1" color={"text.secondary"}>
                      ( {cart?.length} Item)
                    </Typography>
                  </Stack>
                )
              }
            />
            <CardContent sx={{ px: 0, pt: 3 }}>
              {emptyCart ? (
                <div>
                  {/* if empty cart */}
                  <Stack spacing={1} alignItems={"center"} px={2} py={8}>
                    <SvgColor
                      color={"gray"}
                      src={`/assets/illustrations/illustration_empty_cart.svg`}
                      sx={{ width: "320px", height: "240px", mb: 2 }}
                    />
                    <Typography variant="h5">Cart is empty</Typography>
                    <Typography color={"text.secondary"} variant="body2">
                      {isLoggedIn
                        ? "Look like you have no items in your shopping cart."
                        : "Please login to see your shopping cart."}
                    </Typography>
                  </Stack>
                </div>
              ) : (
                <Scrollbar>
                  {/* if non-empty cart */}
                  <TableContainer>
                    <Table sx={{ minWidth: "720px", width: "100%" }}>
                      <CartListHead
                        headLabel={TABLE_HEAD}
                        rowCount={cart?.length}
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {cart?.map((product, index) => {
                          // ========== Quantity ========== //

                          const basePrice =
                            product?.productPrice * product?.quantity;

                          const selectedProduct =
                            selected.indexOf(product?.cartProductID) !== -1;
                          return (
                            // 1 row có:
                            <TableRow
                              hover
                              key={index}
                              tabIndex={-1}
                              role="checkbox"
                              selected={selectedProduct}
                            >
                              {/* checkbox */}
                              <TableCell padding="checkbox">
                                <Checkbox
                                  size="small"
                                  checked={selectedProduct}
                                  onChange={(event) =>
                                    handleClick(
                                      event,
                                      product?.cartProductID,
                                      product?.productPrice * product?.quantity
                                    )
                                  }
                                />
                              </TableCell>

                              {/* hình + tên sản phẩm */}
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                              >
                                <Link
                                  to={`/product-details/${product?.productID}`}
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Avatar
                                      alt={product?.productName}
                                      src={product?.productImages[0]?.imagePath}
                                      variant="rounded"
                                      sx={{ width: 55, height: 55 }}
                                    />

                                    <Typography
                                      variant="subtitle2"
                                      component="div"
                                      sx={{
                                        display: "-webkit-box",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        lineHeight: 1.2,
                                        maxHeight: "3.6em", // 3 lines * line-height of 1.2
                                      }}
                                    >
                                      {product?.productName}
                                    </Typography>
                                  </Stack>
                                </Link>
                              </TableCell>

                              {/* Giá thành */}
                              <TableCell align="center">
                                {isEdited === product?.cartProductID
                                  ? totalPrice.toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })
                                  : basePrice.toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                              </TableCell>

                              {/* Số lượng */}
                              <TableCell align="center">
                                {isEdited === product?.cartProductID ? (
                                  <Quantity
                                    countNumber={quantity}
                                    handleDecrement={() => handleDecrement()}
                                    handleIncrement={() => handleIncrement()}
                                  />
                                ) : (
                                  product.quantity
                                )}
                              </TableCell>

                              <TableCell align="right">
                                <Stack direction={"row"} spacing={0.5}>
                                  {isEdited === product?.cartProductID ? (
                                    <>
                                      {/*  ================ Button save  ================ */}
                                      <IconButton
                                        color="inherit"
                                        size="small"
                                        onClick={() =>
                                          handleSaveUpdate(
                                            product?.cartProductID
                                          )
                                        }
                                      >
                                        <Iconify
                                          icon={"humbleicons:save"}
                                          sx={{ height: "18px", width: "18px" }}
                                        />
                                      </IconButton>
                                      {/* ================ Button cancel  ================ */}
                                      <IconButton
                                        sx={{ color: "error.main" }}
                                        size="small"
                                        onClick={() => setIsEdited(NaN)}
                                      >
                                        <Iconify
                                          icon={"ic:round-cancel"}
                                          sx={{ height: "18px", width: "18px" }}
                                        />
                                      </IconButton>
                                    </>
                                  ) : (
                                    <>
                                      {/* ================  Button edit  ================ */}
                                      <IconButton
                                        color="inherit"
                                        size="small"
                                        onClick={() =>
                                          handleEditCartItem(
                                            product?.cartProductID,
                                            product?.productPrice,
                                            product?.quantity
                                          )
                                        }
                                      >
                                        <Iconify
                                          icon={"eva:edit-fill"}
                                          sx={{ height: "18px", width: "18px" }}
                                        />
                                      </IconButton>
                                      {/* ================  Button delete  ================ */}
                                      <IconButton
                                        sx={{ color: "error.main" }}
                                        size="small"
                                        onClick={() =>
                                          handleRemoveItem(
                                            product?.cartProductID
                                          )
                                        }
                                      >
                                        <Iconify
                                          icon={"eva:trash-2-outline"}
                                          sx={{ height: "18px", width: "18px" }}
                                        />
                                      </IconButton>
                                    </>
                                  )}
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
              )}
            </CardContent>
          </Card>
          {/* --------------------------------------- BUTTON --------------------------------------------------- */}

          <Button
            sx={{ color: "#000", mt: 3 }}
            onClick={() =>
              navigate(
                !idProductDetail ? "/" : `/product-details/${idProductDetail}`
              )
            }
          >
            <Iconify icon="ic:outline-keyboard-arrow-left" mr={1} />
            Continue Shopping
          </Button>
        </Grid>

        <Grid item xs={12} md={3.5}>
          {/* Order Summary  */}
          <OrderSummary activeStep={activeStep} totalPrice={priceOrder} />

          {/* --------------------------------------- BUTTON --------------------------------------------------- */}
          {/* if empty cart => button is disabled */}
          <StyledButtonGreen
            sx={{ py: 1.3, mt: 3 }}
            disabled={emptyCart || selected.length === 0}
            onClick={handleCheckout}
          >
            {" "}
            Check out{" "}
          </StyledButtonGreen>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Cart;
