import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

import Iconify from "../../../../components/iconify/Iconify";
import PropTypes from "prop-types";
import OrderSummary from "./OrderSummary";
// components
import { StyledButtonGreen } from "../../../../components/custom/CustomButton";
import Scrollbar from "../../../../components/scrollbar/Scrollbar";
import CartListHead from "./CartListHead";
import { Quantity } from "../product-details";
import SvgColor from "../../../../components/svg-color/SvgColor";
import {
  fetchCartItems,
  removeFromCart,
  updateQuantity,
} from "../../../../redux/cart/cartSlice";

import { getProductById } from "../../../../redux/products/ProductDetail";
import { productService } from "../../../../services/productService";
import { cartService } from "../../../../services/cartService";
import { map } from "lodash";
import { addToOrder } from "src/redux/order/OrderSlice";

const TABLE_HEAD = [
  { id: "price", label: "Giá thành", alignRight: false },
  { id: "quantity", label: "Số lượng", alignRight: false },
  { id: "unit", label: "Đơn vị", alignRight: false },
  { id: "" },
];

// const productEmpty = [];

Cart.propTypes = {
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
};

function Cart({ handleNext, activeStep }) {
  // const history = useHistory();

  // lấy id của sản phẩm trong bảng
  // const [idRowProduct, setIdRowProduct] = useState(-1)

  //  lấy id của sản phẩm đã checked
  const [selected, setSelected] = useState([]);
  const [units, setUnits] = useState([]);

  const [isEdited, setIsEdited] = useState(NaN);

  const [totalPrice, setTotalPrice] = useState(0);
  // const handleGoBack = () => {
  //   props.history.goBack();
  // };
  const [defaultPrice, setDefaultPrice] = useState(NaN);

  const [updateCartRequest, setUpdateCartRequest] = useState({
    idUnit: null,
    price: null,
    quantity: 1,
  });

  const { idUnit, price, quantity } = updateCartRequest;

  // load sản phẩm

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart.cartItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.cart.loading);
  const emptyCart = useSelector((state) => state.cart.emptyCart);

  const email = useSelector((state) => state.auth.email);

  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleRemoveItem = async (idCartItem) => {
    try {
      if (!!idCartItem) {
        dispatch(removeFromCart(idCartItem));
        console.log("Product deleted successfullyyyyyyyyyyyyyyyyy");
      } else {
        console.log("idCartItem is undefined", idCartItem);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const getProduct = async (idPr) => {
    setUnits([]);
    return new Promise((resolve, reject) => {
      productService
        .getUnitsByIdProduct(idPr)
        .then((response) => {
          setUnits(response);
          console.log("response", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleChange = (event, selected, price, nameUnit, idUnit) => {
    setUpdateCartRequest({
      ...updateCartRequest,
      idUnit: idUnit,
      price: price * quantity,
    });
    setDefaultPrice(price);
  };

  const handleIncrement = () => {
    setUpdateCartRequest({
      ...updateCartRequest,
      price: defaultPrice * quantity + defaultPrice,
      quantity: quantity + 1,
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setUpdateCartRequest({
        ...updateCartRequest,
        price: defaultPrice * quantity - defaultPrice,
        quantity: quantity - 1,
      });
    }
  };

  const handleEditCartItem = (idCartItem, idPr, price, quantity, unitId) => {
    setIsEdited(idCartItem);
    setDefaultPrice(price / quantity);

    getProduct(idPr);

    setUpdateCartRequest({
      idUnit: unitId,
      price: price,
      quantity: quantity,
    });

    console.log("updateCartssssssssssRequest", updateCartRequest);
  };

  const handleSaveUpdate = async () => {
    if (!isNaN(isEdited)) {
      try {
        await dispatch(
          updateQuantity({
            idItem: isEdited,
            idUnit: idUnit,
            price: price,
            quantity: quantity,
          })
        );
        setState({ ...state, open: true });
        setIsEdited(NaN);
        console.log("Cart quantity updated successfully", updateCartRequest);
        // console.log('Reponnnnnnnnnnnnnnnnnnn', response);
      } catch (error) {
        console.error("Failed to update cart quantity:", error);
      }
    } else {
      console.log("isEdited is undefined", isEdited);
    }
  };

  const handleCheckout = () => {
    handleNext();
    dispatch(addToOrder({ id: selected, price: totalPrice }));
    // console.log("checkouttt",selected);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartItems(email));
      // console.log("localStorageService",localStorageService.get("USER")?.id)
    }
  }, [dispatch, isLoggedIn, email]);

  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // if (loading) {
  //   return (
  //   <SkeletonLoading/>
  //   )
  // }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cart?.map((n) => n.cartItemId);
      setSelected(newSelecteds);

      const newTotalPrice = cart
        ?.filter((item) => newSelecteds.indexOf(item.cartItemId) !== -1)
        .map((item) => item.totalPrice)
        .reduce((total, price) => total + price, 0);
      setTotalPrice(newTotalPrice);
      return;
    }
    setTotalPrice(0);
    setSelected([]);
  };

  const handleClick = (event, id, price) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let newTotalPrice = totalPrice;
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
    setTotalPrice(newTotalPrice);
    setSelected(newSelected);
    // console.log("totalPrice",totalPrice);
    // console.log("ssssssssssssss",selected);
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
                          const selectedProduct =
                            selected.indexOf(product.cartItemId) !== -1;
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
                                      product.cartItemId,
                                      product.totalPrice
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
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Avatar
                                    alt={product.productName}
                                    src={product.asset}
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
                                    {product.productName}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              {/* Giá thành */}
                              <TableCell align="center">
                                {isEdited === product.cartItemId
                                  ? price
                                  : product.totalPrice}
                              </TableCell>

                              {/* Số lượng */}
                              <TableCell align="center">
                                {isEdited === product.cartItemId ? (
                                  <Quantity
                                    countNumber={quantity}
                                    handleDecrement={handleDecrement}
                                    handleIncrement={handleIncrement}
                                  />
                                ) : (
                                  product.quantity
                                )}
                              </TableCell>

                              {/* đơn vị */}
                              <TableCell
                                sx={{ minWidth: "80px" }}
                                align="center"
                              >
                                {isEdited === product.cartItemId ? (
                                  <FormControl>
                                    <Select
                                      sx={{ minWidth: "80px", height: "32px" }}
                                      size="small"
                                      value={units[0]}
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                    >
                                      {units.map((option) => (
                                        <MenuItem
                                          size="small"
                                          key={option.unitId}
                                          value={option}
                                          onClick={(event) =>
                                            handleChange(
                                              event,
                                              option.rank,
                                              option.priceUnit,
                                              option.name,
                                              option.unitId
                                            )
                                          }
                                          onChange={(event) =>
                                            handleChange(
                                              event,
                                              option.rank,
                                              option.priceUnit,
                                              option.name,
                                              option.unitId
                                            )
                                          }
                                        >
                                          {option.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : (
                                  product.unit
                                )}
                              </TableCell>

                              {/*button delete product */}
                              <TableCell align="right">
                                {/* 1111111111111111111111111111111111111111111 */}
                                <Stack direction={"row"} spacing={0.5}>
                                  {isEdited === product.cartItemId ? (
                                    // button save
                                    <IconButton
                                      color="inherit"
                                      size="small"
                                      onClick={() => handleSaveUpdate()}
                                    >
                                      <Iconify
                                        icon={"humbleicons:save"}
                                        sx={{ height: "18px", width: "18px" }}
                                      />
                                    </IconButton>
                                  ) : (
                                    // button edit
                                    <IconButton
                                      color="inherit"
                                      size="small"
                                      onClick={() =>
                                        handleEditCartItem(
                                          product.cartItemId,
                                          product.productId,
                                          product.totalPrice,
                                          product.quantity,
                                          product.productIDUnit
                                        )
                                      }
                                    >
                                      <Iconify
                                        icon={"eva:edit-fill"}
                                        sx={{ height: "18px", width: "18px" }}
                                      />
                                    </IconButton>
                                  )}
                                  {/* button delete */}
                                  <IconButton
                                    sx={{ color: "error.main" }}
                                    size="small"
                                    onClick={() =>
                                      handleRemoveItem(product.cartItemId)
                                    }
                                  >
                                    <Iconify
                                      icon={"eva:trash-2-outline"}
                                      sx={{ height: "18px", width: "18px" }}
                                    />
                                  </IconButton>
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

          <Button sx={{ color: "#000", mt: 3 }} href="/home">
            <Iconify icon="ic:outline-keyboard-arrow-left" mr={1} />
            Continue Shopping
          </Button>
        </Grid>

        <Grid item xs={12} md={3.5}>
          {/* Order Summary  */}
          <OrderSummary activeStep={activeStep} totalPrice={totalPrice} />

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

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity="success">
          Cập nhật giỏ hàng thành công
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default Cart;
