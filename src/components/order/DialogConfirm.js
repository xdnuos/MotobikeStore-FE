import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const ActionButtons = ({ orderID, color, children, action }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmAction = () => {
    action(orderID);
    handleCloseDialog();
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" color={color} onClick={handleOpenDialog}>
          {children}
        </Button>
      </Stack>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to perform this action for orderID {orderID}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
