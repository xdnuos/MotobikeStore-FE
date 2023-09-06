import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @mui
import {
  Avatar,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// mocks_
import account from "../../../_mock/account";
import { logoutUser } from "../../../redux/auth/authSlice";

import ChangePasswordDialog from "src/components/user/ChangePassDialog";
import { reset } from "../../../redux/cart/cartSlice";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

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

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const MyOrders = () => {
    navigate("/account/order");
    handleClose();
  };
  const MyAccount = () => {
    navigate("/account");
    handleClose();
  };
  const MENU_OPTIONS = [
    {
      label: "My account",
      icon: "eva:person-fill",
      action: MyAccount,
    },
    {
      label: "My Orders",
      icon: "eva:home-fill",
      action: MyOrders,
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
        <Divider sx={{ borderStyle: "dashed" }} />
        {isLoggedIn && (
          <Stack sx={{ p: 1 }}>
            {MENU_OPTIONS.map((option) => (
              <MenuItem key={option.label} onClick={option.action}>
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
      <div>
        <ChangePasswordDialog open={dialogOpen} onClose={handleCloseDialog} />
      </div>
    </>
  );
}
