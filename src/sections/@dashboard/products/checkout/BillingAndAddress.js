import React from "react";
import { useState } from "react";

import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import Iconify from "../../../../components/iconify/Iconify";
import PropTypes from "prop-types";

import OrderSummary from "./OrderSummary";
import UserForm from "./UserForm";
import { useSelector } from "react-redux";

BillingAndAddress.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
};

function BillingAndAddress({ handleBack, handleNext, activeStep }) {
  const totalPrice = useSelector((state) => state.order.totalPrice);
  const idAccount = useSelector((state) => state.auth.idAccount);

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8.5}>
            <Card>
              <CardContent>
                <UserForm
                  handleBack={handleBack}
                  handleNext={handleNext}
                  activeStep={activeStep}
                ></UserForm>
              </CardContent>
            </Card>

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
            </Stack>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={3.5}>
            <OrderSummary activeStep={activeStep} totalPrice={totalPrice} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default BillingAndAddress;
