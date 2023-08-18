import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import SkeletonLoading from "src/components/skeleton/SkeletonLoading";
import {
  getAllProduct,
  getAllProductAdmin,
} from "src/redux/products/productList";
import { getAllCategories } from "src/redux/productProperties/categorySlice";
import { getAllTags } from "src/redux/productProperties/tagSlice";
import { getAllManufacturer } from "src/redux/productProperties/manufacturerSlice";
import { fetchCartItems } from "src/redux/cart/cartSlice";
import { localStorageService } from "src/services/localStorageService";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      const role = localStorageService.get("USER")?.roles;
      const hasCustomerRole = role?.includes("CUSTOMER");
      if (hasCustomerRole) {
        navigate("/");
      }
    }
  }, [isLoggedIn, navigate]);
  // get
  const products = useSelector(
    (state) => state.products.productList.allProduct
  );
  const categories = useSelector((state) => state.categories.allCategories);
  const tags = useSelector((state) => state.tags.allTags);
  const manufacturer = useSelector(
    (state) => state.manufacturer.allManufacturer
  );
  const userID = useSelector((state) => state.auth.idAccount);
  // loading
  const loadingCategories = useSelector((state) => state.categories.loading);
  const loadingProducts = useSelector(
    (state) => state.products.productList.loading
  );
  const loadingTags = useSelector((state) => state.categories.loading);
  const loadingManufacturer = useSelector((state) => state.categories.loading);
  const getProducts = useSelector(
    (state) => state.products.productList.getProducts
  );
  const loadCart = useSelector((state) => state.cart.loading);
  console.log("loading cart", loadCart);
  useEffect(() => {
    dispatch(getAllProductAdmin());
    dispatch(getAllCategories());
    dispatch(getAllTags());
    dispatch(getAllManufacturer());
    dispatch(fetchCartItems(userID));
  }, [dispatch, getProducts, userID]);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      {loadingProducts ||
      loadingCategories ||
      loadingTags ||
      loadingManufacturer ? (
        <SkeletonLoading />
      ) : (
        <Main>
          <Outlet context={[products, categories, tags, manufacturer]} />
        </Main>
      )}
    </StyledRoot>
  );
}
export default DashboardLayout;
