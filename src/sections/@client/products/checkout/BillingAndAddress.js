import React from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Stack,
  MenuItem,
  Popover,
  IconButton,
} from "@mui/material";
import Iconify from "../../../../components/iconify/Iconify";
import PropTypes from "prop-types";
import {
  StyledButtonGreen,
  StyledButtonGreenOutlined,
  StyledButtonGreenText,
} from "../../../../components/custom/CustomButton";

import Label from "../../../../components/label/Label";
import OrderSummary from "./OrderSummary";
import AddressForm from "./AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { customersService } from "../../../../services/customerService";
import { Input, Select } from "antd";
import { useEffect } from "react";
import axios from "axios";
import CardAddress from "./CardAddress";
import { fetchAddressItems } from "../../../../redux/address/AddressSlice";

BillingAndAddress.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
};

function BillingAndAddress({ handleBack, handleNext, activeStep }) {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);


  const totalPrice = useSelector((state) => state.order.totalPrice);
  const idAccount = useSelector((state) => state.auth.idAccount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const address = useSelector((state) => state.address.address);


  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAddressItems(idAccount));
     }
  }, [dispatch, isLoggedIn, idAccount]);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8.5}>
            {address?.map((item, index) => {
              return (
                <CardAddress key={index} handleNext={handleNext} address={item} />
              )
            })}
            {/* --------------------------------------- BUTTON --------------------------------------------------- */}
            <Stack
              direction={"row"}
              mt={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <Button sx={{ color: "#000" }} onClick={handleBack}>
                <Iconify icon="ic:outline-keyboard-arrow-left" mr={1} />
                Back
              </Button>

              <StyledButtonGreenText size='small' onClick={handleOpenDialog}>
                <Iconify icon='ic:sharp-plus' sx={{ height: 16, width: 16 }} />
                &nbsp; Thêm địa chỉ mới &nbsp;
              </StyledButtonGreenText>
            </Stack>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={3.5}>
            <OrderSummary activeStep={activeStep} totalPrice={totalPrice} />
          </Grid>
        </Grid>
      </Container>
     
      <AddressForm open={openDialog} onClose={handleCloseDialog} />
    </>
  );
}
export default BillingAndAddress;
