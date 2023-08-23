import { useState, useEffect } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/auth/authSlice";
import { localStorageService } from "../../../services/localStorageService";
import ChangePasswordDialog from "src/components/user/ChangePassDialog";
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const Logout = () => {
    dispatch(logoutUser());
    setOpen(null);
  };

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const storedUser = localStorageService.get("USER");
      setAccount(storedUser);
    }
  }, [isLoggedIn]);

  const editInfo = () => {
    navigate("/dashboard/info");
    handleClose();
  };
  const Profile = () => {
    navigate("/dashboard/profile");
    handleClose();
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const MENU_OPTIONS = [
    {
      label: "Profile",
      icon: "eva:person-fill",
      action: Profile,
    },
    {
      label: "Edit info",
      icon: "eva:home-fill",
      action: editInfo,
    },
    {
      label: "Change Password",
      icon: "eva:settings-2-fill",
      action: handleOpenDialog,
    },
  ];

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
        <Avatar src={account.avatarUrl} alt="photoURL" />
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
            {account.firstName + " " + account.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={option.action}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={Logout}
          sx={{ m: 1 }}
          component={RouterLink}
          to="/login"
        >
          Logout
        </MenuItem>
      </Popover>
      <div>
        <ChangePasswordDialog open={dialogOpen} onClose={handleCloseDialog} />
      </div>
    </>
  );
}
