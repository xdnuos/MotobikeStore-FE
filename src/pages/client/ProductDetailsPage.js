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
} from "../../sections/@client/products/product-details";
// import { FeaturedSlide } from '../../sections/@client/home';

// components
import Iconify from "../../components/iconify";

import { StyledSeparator } from "../../components/custom/CustomSpan";
import {
  StyledButtonYellow,
  StyledButtonGreen,
} from "../../components/custom/CustomButton";
import SkeletonLoading from "../../components/skeleton/SkeletonLoading";
import { getProductById } from "../../redux/products/ProductDetail";
import { addToCart } from "../../redux/cart/cartSlice";
import Label from "src/components/label/Label";

const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
  border: `1px solid ${selected ? theme.palette.primary.main : "gray"}`,
  borderRadius: 5,
  width: "30%",
  padding: "0 22px 0 15px",
  backgroundColor: selected ? theme.palette.primary.main : "transparent",
  color: selected ? "text.secondary" : "inherit",
  "&:hover": {
    backgroundColor: selected ? theme.palette.primary.main : "#f5f5f5",
  },
  "& .MuiListItemText-primary": {
    fontWeight: selected ? "bold" : "normal",
  },
}));

const StyledTick = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  borderRadius: "0 10% 0 100%",
  borderBottom: `28px solid transparent`,
  borderRight: `28px solid ${theme.palette.primary.main}`,
  position: "absolute",

  transformOrigin: "100% 0%",
  "&::before": {
    content: '""',
    display: "block",
    width: 5,
    height: 10,
    borderBottom: `2px solid ${theme.palette.background.default}`,
    borderRight: `2px solid ${theme.palette.background.default}`,
    transform: "rotate(45deg)",
    transformOrigin: "180% 260%",
  },
}));

function ProductDetailsPage() {
  const { id } = useParams();

  // const [aaa,setAaa] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productDetail.product);
  const loading = useSelector((state) => state.products.productDetail.loading);
  const idAcc = useSelector((state) => state.auth.idAccount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

 
  const [unit, setUnit] = useState(product?.unit);
  const [showAlert, setShowAlert] = useState(false);
  const [showPrice, setShowPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductById(id));
    console.log("product", product);
  }, [dispatch, id]);

  const [cartRequest, setCartRequest] = useState({
    idAccount: idAcc,
    idProduct: id,
    idUnit: null,
    price: null,
  });

  const { idAccount, idProduct, idUnit, price } = cartRequest;

  const handleListItemClick = (event, selected, index, unit, id) => {
   
    setUnit(unit);
    setShowAlert(false);
    setCartRequest({
      ...cartRequest,
      idUnit: id,
      price: product?.price,
      quantity: 1,
    });
    setShowPrice(product?.price);

    // console.log("selectedIndex----->", cartRequest);
  };

  // const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClickAdd = async () => {
    // if (isLoggedIn) {
    //   if (isNaN(selectedIndex)) {
    //     setShowAlert(true);
    //   } else {
    //     await dispatch(addToCart(cartRequest));
    //     setState({ ...state, open: true });
    //     console.log("cartRequestzzzzzzzzzzzzzzzzzz", cartRequest);
    //   }
    // } else {
    //   setState({ ...state, open: true });
    // }
    console.log("showPrice===> ", showPrice);
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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const handleIncrement = () => {
    console.log("show price",product?.price);
    console.log("quantity",quantity);
    
    // if (quantity === 1) {
    //   // setCartRequest({
    //   //   ...cartRequest,

    //   //   price: showPrice * 3,
     setQuantity( quantity + 1);
    //   // });

    //   showPrice(product?.price * product?.price );
      
    // } else {
    //   setCartRequest({
    //     ...cartRequest,
    //     price: showPrice * quantity + showPrice,
    //     quantity: quantity + 1,
    //   });
    //   // setTotalPrice();
    // }

    console.log("showPrice ===========>", showPrice);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
     
      
      console.log("handleDecrement===========>", quantity);
      setQuantity( quantity - 1);
    }
    // setTotalPrice(showPrice * quantity - showPrice);
  };
  const totalPrice = product?.price * quantity;

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
              <Link underline="hover" color="text.primary" href="/">
                Trang chủ
              </Link>
              {product?.categories.map((category, index) => (

                <Link key={index} underline="hover" color="text.primary" href="#">
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
              <ProductInfoForm
                product={product}
                price={totalPrice}
              />

              {/* option lựa số lượng */}
              <Grid item xs={12}>
              <Label sx={{ fontSize: "14px" }} color={product?.stock > 0 ? "success" : "error"}>
                {product?.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
              </Label>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1"> Quantity </Typography>
                  <Stack>
                    <Quantity
                      countNumber={quantity}
                      handleDecrement={handleDecrement}
                      handleIncrement={handleIncrement}
                    />

                    <Typography
                      variant="caption"
                      pt={"2px"}
                      textAlign={"right"}
                    >
                      {" "}
                      Available : {product?.stock }{" "}
                    </Typography>
                  </Stack>
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
                {/* thêm vào giỏ */}
                <StyledButtonYellow onClick={handleClickAdd}>
                  <Iconify icon={"ic:round-add-shopping-cart"} />
                  &nbsp;&nbsp;Add To Cart
                </StyledButtonYellow>
                {/* mua ngay */}
                <StyledButtonGreen onClick={handleClickBuyNow}>
                  Buy Now
                </StyledButtonGreen>
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
          autoHideDuration={3000}
          onClose={handleClose}
        >
          {isLoggedIn ? (
            <Alert onClose={handleClose} variant="filled" severity="success">
              Đã thêm sản phẩm vào giỏ hàng
            </Alert>
          ) : (
            <Alert onClose={handleClose} variant="filled" severity="error">
              Please log in to add products to the cart
            </Alert>
          )}
        </Snackbar>
      </Container>
    </>
  );
}

export default ProductDetailsPage;
