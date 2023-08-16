import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
// @mui
import {
  Alert,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  Snackbar,
  Stack,
  Typography,
  styled,
  ListItem,
  ListItemText,
} from "@mui/material";

// sections
import {
  ProductImg,
  ProductInfoForm,
  TabDescriptionAndReview,
  Quantity,
} from "../../../sections/@client/products/product-details";

// components
import Iconify from "../../../components/iconify";

import { StyledSeparator } from "../../../components/custom/CustomSpan";
import {
  StyledButtonYellow,
  StyledButtonGreen,
} from "../../../components/custom/CustomButton";
import SkeletonLoading from "../../../components/skeleton/SkeletonLoading";
import { getProductById } from "../../../redux/products/ProductDetail";
import { addToCart } from "../../../redux/cart/cartSlice";
import { getProductCartQuantity } from "src/helper/product";
import { message } from "antd";
import { ProductCartWidget } from "src/sections/@dashboard/products";

function AdminProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productDetail.product);
  const loading = useSelector((state) => state.products.productDetail.loading);
  const userID = useSelector((state) => state.auth.idAccount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showPrice, setShowPrice] = useState(null);
  const cartItems = useSelector((state) => state.cart.cart);
  const cartItem = cartItems?.filter(
    (cartItem) => cartItem.productID === product?.productID
  )[0];
  const productCartQty = getProductCartQuantity(cartItem, null, null, null);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const [cartRequest, setCartRequest] = useState({
    userID: userID,
    productID: id,
    quantity: 1,
  });

  const { idAccount, idProduct, price, quantity } = cartRequest;

  const handleClickAdd = async () => {
    if (isLoggedIn) {
      console.log(cartRequest);
      const response = await dispatch(addToCart(cartRequest));
      console.log("testtttttttttttt", response);
      if (response.status === 200) {
        message.success(response.data.message);
      } else {
        message.error(response.response.data);
      }
    }
  };

  const handleClickBuyNow = async () => {
    // if (isLoggedIn) {
    //   if (isNaN(selectedIndex)) {
    //     setShowAlert(true);
    //   } else {
    //     await dispatch(addToCart(cartRequest));
    //     setState({ ...state, open: true });
    //     navigate("/checkout");
    //     console.log("cartRequest", cartRequest);
    //   }
    // } else {
    //   setState({ ...state, open: true });
    // }
  };

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
        <title>Chi tiết sản phẩm</title>
      </Helmet>
      <ProductCartWidget />
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
                href="/dashboard/buy"
              >
                Trang chủ
              </Link>
              <Link underline="hover" color="text.primary" href="#">
                {product?.name}
              </Link>
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
              <ProductInfoForm product={product} price={showPrice} />

              {/* Số lượng */}
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
              <Stack direction="row" spacing={2}>
                {/* thêm vào giỏ */}
                <StyledButtonYellow onClick={handleClickAdd}>
                  <Iconify icon={"ic:round-add-shopping-cart"} />
                  &nbsp;&nbsp;Add To Cart
                </StyledButtonYellow>
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
          {/* tabs mô tả sản phẩm và quánh giá nhận xét */}
          <Grid item xs={12} md={12} pt={3}>
            <TabDescriptionAndReview product={product} />
          </Grid>

          {/* <Grid item xs={12} md={12} pt={3}>
                        <FeaturedSlide title='Sản Phẩm Nổi Bật Hôm Nay' products={PRODUCTS} limit={15} />
                    </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

export default AdminProductDetails;
