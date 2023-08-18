import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";

import { ProductCartWidget } from "../../sections/@client/products";
import ScrollTop from "../../components/scroll-to-top/ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "src/redux/products/productList";
import { localStorageService } from "src/services/localStorageService";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 40;
const APP_BAR_DESKTOP = 94;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 34,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 35,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function ClientLayout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      const role = localStorageService.get("USER")?.roles;
      const hasCustomerRole = role?.includes("CUSTOMER");
      if (!hasCustomerRole) {
        navigate("/dashboard/app");
      }
    }
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <StyledRoot>
        <Header onOpenNav={() => setOpen(true)} />

        {/* <Nav openNav={open} onCloseNav={() => setOpen(false)} /> */}

        <ProductCartWidget />

        <Main>
          {/* back to vị trí này */}
          <div id="back-to-top-anchor" />
          {/* nội dung  */}
          <Outlet />
          <Footer />
        </Main>
        {/* Button back to top */}
        <ScrollTop />
      </StyledRoot>
    </div>
  );
}
