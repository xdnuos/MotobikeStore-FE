import { Button, Container, Dialog, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import AddressDetail from "src/components/address/AddressDetail";
import Iconify from "src/components/iconify/Iconify";
import {
  deleteAddress,
  fetchAddressItems,
  setDefaultAddress,
} from "src/redux/address/AddressSlice";
import AddressForm from "../checkout/AddressForm";

export default function Address() {
  const address = useSelector((state) => state.address.address);
  const userID = useSelector((state) => state.auth.idAccount);
  const defaultAddress = useSelector((state) => state.address.defaultAddress);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  useEffect(() => {
    dispatch(fetchAddressItems(userID));
  }, []);

  const handleSetDefaultAddress = (addressID) => {
    dispatch(setDefaultAddress({ userID, addressID }));
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAddress(undefined);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleSetSelectedAddress = (addressID) => {
    handleOpenDialog();
    setSelectedAddress(addressID);
  };
  const handleDelete = (addressID) => {
    dispatch(deleteAddress({ userID, addressID }));
    console.log(addressID);
  };
  return (
    <>
      <Helmet>
        <title>Address</title>
      </Helmet>
      <Container>
        <Stack pt={2} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5">My address</Typography>
          <Button variant="contained" onClick={handleOpenDialog}>
            <Iconify icon={"ic:baseline-plus"}></Iconify>&nbsp; Create new
            address
          </Button>
        </Stack>
        {address?.map((address) => {
          return (
            <AddressDetail
              address={address}
              isDefault={defaultAddress === address.addressID}
              key={address.addressID}
              setDefault={handleSetDefaultAddress}
              onUpdate={handleSetSelectedAddress}
              onDelete={handleDelete}
            ></AddressDetail>
          );
        })}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          PaperProps={{
            sx: {
              width: "50%",
              maxHeight: "75vh",
            },
          }}
        >
          <AddressForm
            onClose={handleCloseDialog}
            addressID={selectedAddress}
          />
        </Dialog>
      </Container>
    </>
  );
}
