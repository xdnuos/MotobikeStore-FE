import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Avatar, Box, Drawer, Link, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import NavSection from "../../../components/nav-section";
import Scrollbar from "../../../components/scrollbar";
//
import { useSelector } from "react-redux";
import { localStorageService } from "../../../services/localStorageService";
import { navConfig, navConfigStore } from "./config";
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
      console.log("account", account);
      setAccount(storedUser);
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const role = localStorageService.get("USER")?.roles;
    const isAdminOrMaster = role?.includes("ADMIN") || role?.includes("MASTER");
    if (isAdminOrMaster) {
      setNav(navConfig);
    } else if (role?.includes("STAFF")) {
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
            <Avatar src={account.avatarUrl} alt="photoURL" />
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
