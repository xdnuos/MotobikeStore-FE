import React from "react";
import PropTypes from "prop-types";
// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

ResetPassDialog.propTypes = {
  opendialog: PropTypes.bool,
  handleClose: PropTypes.func,
  deleteProduct: PropTypes.func,
  id: PropTypes.number,
  state: PropTypes.bool,
};

export default function ResetPassDialog({
  opendialog,
  handleClose,
  deleteProduct,
  id,
}) {
  return (
    <>
      <Dialog
        open={opendialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{ borderRadius: 16 }}
      >
        <DialogTitle id="alert-dialog-title">Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to reset Password?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: 1.5, mb: 1 }}>
          <Button
            onClick={handleClose}
            sx={{ mr: 1.5 }}
            autoFocus
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteProduct(id)}
            color={"warning"}
            variant="contained"
            mr="12px"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
