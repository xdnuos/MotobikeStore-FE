import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { getProductCartQuantity } from "src/helper/product";
// @mui
import {
  Alert,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Snackbar,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

// sections
import {
  ProductImg,
  ProductInfoForm,
  TabDescriptionAndReview,
  Quantity,
} from "../../sections/@client/products/product-details";
import Iconify from "../../components/iconify";

import { StyledSeparator } from "../../components/custom/CustomSpan";
import {
  StyledButtonYellow,
  StyledButtonGreen,
  StyledButtonRed,
} from "../../components/custom/CustomButton";
import SkeletonLoading from "../../components/skeleton/SkeletonLoading";
import { getProductById } from "../../redux/products/ProductDetail";
import { addToCart } from "../../redux/cart/cartSlice";
import { message } from "antd";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productDetail.product);
  const loading = useSelector((state) => state.products.productDetail.loading);
  const idAccount = useSelector((state) => state.auth.idAccount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.cart);

  const [showAlert, setShowAlert] = useState(false);
  const cartItem = cartItems?.filter(
    (cartItem) => cartItem.productID === product?.productID
  )[0];
  const productCartQty = getProductCartQuantity(cartItem, null, null, null);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const [cartRequest, setCartRequest] = useState({
    productID: id,
    quantity: 1,
  });

  const { userID, idProduct, quantity } = cartRequest;

  const handleClickAdd = async () => {
    if (isLoggedIn) {
      await dispatch(addToCart({ userID: idAccount, req: cartRequest }));
    }
  };

  const handleClickBuyNow = async () => {
    if (isLoggedIn) {
      const req = { productID: id, quantity: quantity };
      await dispatch(
        addToCart({
          userID: idAccount,
          req,
        })
      );
      setState({ ...state, open: true });
      navigate("/checkout");

      // console.log("is login = true",quantity);
    } else {
      setState({ ...state, open: true });
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  // ========== Quantity ========== //

  const totalPrice = product?.price * quantity;
  const handleIncrement = () => {
    if ((product?.stock > 0) & (product?.stock - productCartQty > quantity)) {
      setCartRequest({
        ...cartRequest,
        quantity: quantity + 1,
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setCartRequest({
        ...cartRequest,
        quantity: quantity - 1,
      });
    }
  };

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <>
      <Helmet>
        <title>Product details</title>
      </Helmet>

      <Container>
        <Grid container spacing={0}>
          {/* mục Trang chủ • Category • Category • Tên sản phẩm */}
          <Grid item xs={12} my={1}>
            <Breadcrumbs
              separator={<StyledSeparator>&nbsp;•&nbsp;</StyledSeparator>}
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                color="text.primary"
                to="/"
                component={RouterLink}
              >
                Home Page
              </Link>
              {product?.categories.map((category, index) => (
                <Link
                  key={index}
                  underline="hover"
                  color="text.primary"
                  href="#"
                  component={RouterLink}
                >
                  {category}
                </Link>
              ))}
            </Breadcrumbs>
          </Grid>

          {/* hình ảnh sản phẩm */}
          <Grid item xs={12} md={6} p={"16px 32px"}>
            <ProductImg data={product?.images} />
          </Grid>
          {/* thông tin sp */}
          <Grid item xs={12} md={6} p={"16px 32px 16px 40px"}>
            <Stack spacing={2}>
              {/* thông tin tên , giá ,... */}
              <ProductInfoForm product={product} price={totalPrice} />

              {/* option lựa số lượng */}
              {/* <Grid item xs={12}>
                <Label
                  sx={{ fontSize: "14px" }}
                  color={product?.stock > 0 ? "success" : "error"}
                >
                  {product?.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                </Label>
              </Grid> */}

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-start">
                  <Typography variant="subtitle1"> Select quantity </Typography>
                  <Quantity
                    countNumber={quantity}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                  />

                  <Typography pt={"5px"} textAlign={"right"} pl={2}>
                    {" "}
                    Availlable : {product?.stock}{" "}
                  </Typography>
                </Stack>
              </Grid>

              <Divider sx={{ borderStyle: "dashed" }} />
              {/* Hai button thêm vào giỏ hàng và mua ngay */}
              {/* ------------------------------------------------------------------------------------------- */}
              {showAlert && (
                <Alert
                  severity="warning"
                  sx={{ border: "1px solid black" }}
                  onClose={() => setShowAlert(false)}
                >
                  Bạn cần chọn đơn vị bán
                </Alert>
              )}
              <Stack direction="row" spacing={2}>
                {product?.stock <= 0 ? (
                  // Hiện nút "Out of Stock" khi sản phẩm hết hàng
                  <StyledButtonRed sx={{ color: "#fff" }}>
                    Out of Stock
                  </StyledButtonRed>
                ) : (
                  // Hiện nút "Add To Cart" và "Buy Now" khi sản phẩm còn hàng
                  <>
                    <StyledButtonYellow onClick={handleClickAdd}>
                      <Iconify icon={"ic:round-add-shopping-cart"} />
                      &nbsp;&nbsp;Add To Cart
                    </StyledButtonYellow>
                    <StyledButtonGreen onClick={handleClickBuyNow}>
                      Buy Now
                    </StyledButtonGreen>
                  </>
                )}
              </Stack>

              {/* nút share vô tri */}
              <Stack direction={"row"} justifyContent={"center"} spacing={0}>
                <IconButton>
                  <Iconify icon={"eva:facebook-fill"} />{" "}
                </IconButton>
                <IconButton>
                  <Iconify icon={"ph:instagram-logo-fill"} />{" "}
                </IconButton>
                <IconButton>
                  <Iconify icon={"eva:linkedin-fill"} />{" "}
                </IconButton>
                <IconButton>
                  <Iconify icon={"eva:twitter-fill"} />{" "}
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          {/* cam kết (ko cần quan tâm)*/}
          <Grid
            item
            xs={12}
            md={12}
            sx={{ borderTop: "1px dashed lightgrey" }}
            py={3}
          >
            <Typography variant="h5" align="center" textTransform={"uppercase"}>
              Motobike Store promises
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Stack alignItems="center" spacing={1}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "rgba(0, 171, 85, 0.08)",
                  height: "64px",
                  width: "64px",
                  borderRadius: "50%",
                }}
              >
                <Iconify
                  sx={{ height: "36px", width: "36px", color: "rgb(0 171 85)" }}
                  icon={"uiw:time"}
                />
              </Stack>
              <Typography variant="h6">100% Original</Typography>
              <Typography variant="body1" color={"text.secondary"}>
                without editing, dissection
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} md={4}>
            <Stack alignItems="center" spacing={1}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "rgba(0, 171, 85, 0.08)",
                  height: "64px",
                  width: "64px",
                  borderRadius: "50%",
                }}
              >
                <Iconify
                  sx={{ height: "36px", width: "36px", color: "rgb(0 171 85)" }}
                  icon={"bi:shield-fill-check"}
                />
              </Stack>
              <Typography variant="h6">10 Day Replacement</Typography>
              <Typography variant="body1" color={"text.secondary"}>
                if the proposal is rejected
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} md={4}>
            <Stack alignItems="center" spacing={1}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  backgroundColor: "rgba(0, 171, 85, 0.08)",
                  height: "64px",
                  width: "64px",
                  borderRadius: "50%",
                }}
              >
                <Iconify
                  sx={{ height: "38px", width: "38px", color: "rgb(0 171 85)" }}
                  icon={"material-symbols:local-shipping-rounded"}
                />
              </Stack>
              <Typography variant="h6">Year Warranty</Typography>
              <Typography variant="body1" color={"text.secondary"}>
                hungskr cuacoem thaooongannnnn
              </Typography>
            </Stack>
          </Grid>

          {/* tabs mô tả sản phẩm và quánh giá nhận xét */}
          <Grid item xs={12} md={12} pt={3}>
            <TabDescriptionAndReview product={product} />
          </Grid>

          {/* <Grid item xs={12} md={12} pt={3}>
                        <FeaturedSlide title='Sản Phẩm Nổi Bật Hôm Nay' products={PRODUCTS} limit={15} />
                    </Grid> */}
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          // autoHideDuration={3000}
          onClose={handleClose}
        >
          {isLoggedIn ? (
            <Alert onClose={handleClose} variant="filled" severity="success">
              Đã thêm sản phẩm vào giỏ hàng
            </Alert>
          ) : (
            <Alert onClose={handleClose} variant="filled" severity="error">
              Please log in to buy product
            </Alert>
          )}
        </Snackbar>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add to Cart</DialogTitle>
          <DialogContent>
            <DialogContentText>Please login to buy product.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Continue</Button>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default ProductDetailsPage;
