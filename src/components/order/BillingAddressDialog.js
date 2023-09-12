import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import Iconify from "../iconify/Iconify";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressForm from "src/sections/@client/checkout/AddressForm";
import CardAddress from "../../sections/@client/checkout/CardAddress";
import { StyledButtonGreenText } from "../custom/CustomButton";

const BillingAddressDialog = ({ open, onClose }) => {
  const address = useSelector((state) => state.address.address);
  const defaultAddress = useSelector((state) => state.address.defaultAddress);
  const [isAddNew, setAddNew] = useState(false);
  const [editAddressID, setEditAddressID] = useState(undefined);
  const handleOpenDialog = () => {
    setAddNew(true);
  };

  const handleCloseDialog = () => {
    setAddNew(false);
  };

  useEffect(() => {
    if (address === null || address === undefined) {
      console.log("error");
    }
  });
  const handleEdit = (addressID) => {
    setEditAddressID(addressID);
    handleOpenDialog();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        PaperProps={{
          sx: {
            width: "50%",
            maxHeight: "75vh",
          },
        }}
      >
        {isAddNew ? (
          <AddressForm onClose={handleCloseDialog} addressID={editAddressID} />
        ) : (
          <>
            <DialogTitle>Select address</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {address?.map((item) => {
                    return (
                      <CardAddress
                        key={item.addressID}
                        handleClose={onClose}
                        address={item}
                        isDefault={defaultAddress === item.addressID}
                        handleEdit={handleEdit}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </DialogContent>
            {/* --------------------------------------- BUTTON --------------------------------------------------- */}
            <Stack
              direction={"row"}
              margin={3}
              mb={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Button sx={{ color: "#000" }} onClick={onClose}>
                <Iconify icon="ic:outline-keyboard-arrow-left" mr={1} />
                Back
              </Button>

              <StyledButtonGreenText size="small" onClick={handleOpenDialog}>
                <Iconify icon="ic:sharp-plus" sx={{ height: 16, width: 16 }} />
                &nbsp; Add new address &nbsp;
              </StyledButtonGreenText>
            </Stack>
          </>
        )}
      </Dialog>
    </>
  );
};
export default BillingAddressDialog;
