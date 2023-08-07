import React from 'react'
import PropTypes from 'prop-types';
// @mui
import {
    Button,
    Dialog,
    DialogActions, DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

DeleteDialog.propTypes = {
    opendialog: PropTypes.bool,
    handleClose: PropTypes.func,
    deleteProduct: PropTypes.func,
    id: PropTypes.number,
};

export default function DeleteDialog ({ opendialog, handleClose, deleteProduct ,id}) {
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
                <DialogTitle id="alert-dialog-title">
                    {"Delete "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ mr: 1.5, mb: 1 }}>
                    <Button onClick={handleClose} sx={{ mr: 1.5 }} autoFocus variant="outlined">Cancel</Button>
                    <Button onClick={() => deleteProduct(id)} color='error' variant="contained" mr="12px">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
