import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
// mocks_
import account from "../../../_mock/account";
import { logoutUser } from "../../../redux/auth/authSlice";

import { localStorageService } from "../../../services/localStorageService";
import { reset } from "../../../redux/cart/cartSlice";
import { customersService } from "src/services/customerService";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Profile",
    icon: "eva:person-fill",
  },
  {
    label: "My Orders",
    icon: "eva:home-fill",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [infoCustomer, setInfoCustomer] = useState({
    name: "",
    phone: "",
  });

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const Logout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    setOpen(null);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const idAccount = useSelector((state) => state.auth.idAccount);

  const getInfo = async (idAccount) => {
    return new Promise((resolve, reject) => {
      customersService
        .getInfo(idAccount)
        .then((response) => {
          setInfoCustomer({ name: response.name, phone: response.phoneNumber });
          console.log("response", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      getInfo(idAccount);
    }
  }, [isLoggedIn, idAccount]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {infoCustomer.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {infoCustomer.phone}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        {isLoggedIn && (
          <Stack sx={{ p: 1 }}>
            {MENU_OPTIONS.map((option) => (
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            ))}
          </Stack>
        )}

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={Logout}
          sx={{ m: 1 }}
          component={RouterLink}
          to="/login"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </MenuItem>
      </Popover>
    </>
  );
}
