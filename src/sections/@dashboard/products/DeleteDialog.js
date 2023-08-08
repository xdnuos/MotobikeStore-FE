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

DeleteDialog.propTypes = {
  opendialog: PropTypes.bool,
  handleClose: PropTypes.func,
  deleteProduct: PropTypes.func,
  id: PropTypes.number,
  state: PropTypes.bool,
};

export default function DeleteDialog({
  opendialog,
  handleClose,
  deleteProduct,
  id,
  state,
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
        <DialogTitle id="alert-dialog-title">{"Delete "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {state
              ? "Are you sure want to disable?"
              : "Are you sure want to enable?"}
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
            color={state ? "error" : "success"}
            variant="contained"
            mr="12px"
          >
            {state ? "Disable" : "Enable"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
