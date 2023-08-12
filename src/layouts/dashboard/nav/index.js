import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//
import { navConfig, navConfigStore } from "./config";
import { useSelector } from "react-redux";
import { localStorageService } from "../../../services/localStorageService";
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const navigate = useNavigate();
  const isDesktop = useResponsive("up", "lg");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [account, setAccount] = useState([]);
  const [nav, setNav] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorageService.get("USER");
      setAccount(storedUser);
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const role = localStorageService.get("USER")?.roles[0];
    if (role === "ADMIN") {
      setNav(navConfig);
    } else if (role === "STAFF") {
      setNav(navConfigStore);
    }
  }, [account]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>
      {/* ảnh đại diện */}
      <Box sx={{ mb: 1, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar
              src="/assets/images/avatars/avatar_default.jpg"
              alt="photoURL"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {account.firstName + " " + account.lastName}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {localStorageService.get("USER")?.roles[0]}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      {/* nav header */}
      <NavSection data={nav} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
