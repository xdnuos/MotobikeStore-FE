import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Button,
  Container,
  CardHeader,
  CardContent,
  RadioGroup,
  Stack,
  styled,
  FormControlLabel,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import Iconify from "../../../components/iconify/Iconify";
import PropTypes from "prop-types";
import BillingAddress from "./BillingAddress";
import OrderSummary from "./OrderSummary";
import { StyledButtonGreen } from "../../../components/custom/CustomButton";
import { useSelector } from "react-redux";
import { orderService } from "../../../services/orderService";
import { CustomRadio } from "../../../components/custom/CustomRadio";

const StyledFormControlLabel = styled(FormControlLabel)(({ selected }) => ({
  border: "1px solid #919eab3d",
  borderRadius: "8px",
  padding: "20px 10px ",
  width: "100%",
  margin: 0,
  transition: selected ? "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" : "none",
  boxShadow: selected ? "0px 20px 40px -4px #919eab29" : "none",
}));

const PAYMENTOPTION = [
  { lable: "Cash on Checkout/Delivery", value: "COD" },
  { lable: "MoMo Wallet", value: "MOMO" },
  { lable: "Credit / Debit Card", value: "ATM" },
];

Payment.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
};
function Payment({ handleBack, handleNext, activeStep }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const idAccount = useSelector((state) => state.auth.idAccount);

  const totalPrice = useSelector((state) => state.order.totalPrice);
  const address = useSelector((state) => state.order.address);
  const fullName = useSelector((state) => state.order.firstName);
  const phoneNumber = useSelector((state) => state.order.phone);
  const idAddress = useSelector((state) => state.order.idAddress);
  const listIdCart = useSelector((state) => state.order.idCartItems);

  const [open, setOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState("");

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
    setOpen(false);
  };
  

  const handleComplete = async () => {
    if (paymentOption === "") {
      setOpen(true);
      return;
    }
    await orderService
      .createOrderByCustomer({
        cartProductIDs: listIdCart,
        userID: idAccount,
        addressID: idAddress,
        payment: paymentOption,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
    }
  }, [isLoggedIn, idAccount]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Payment Options" />
            <CardContent>
              <RadioGroup value={paymentOption} onChange={handleChange}>
                <Stack spacing={2}>
                  <Collapse in={open}>
                    <Alert
                     severity="warning"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <Iconify icon="eva:close-fill" />
                        </IconButton>
                      }
                      sx={{border: "1px solid #d32f2f"}}
                    >
                     Please choose a payment method !!!
                    </Alert>
                  </Collapse>
                  {PAYMENTOPTION.map((item) => {
                    return (
                      <StyledFormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<CustomRadio />}
                        label={
                          <div style={{ marginLeft: "10px" }}>{item.lable}</div>
                        }
                        labelPlacement="end"
                        selected={paymentOption === item.value}
                      />
                    );
                  })}
                </Stack>
              </RadioGroup>
            </CardContent>
          </Card>

          <Button sx={{ color: "#000", mt: 3 }} onClick={handleBack}>
            <Iconify icon="ic:outline-keyboard-arrow-left" mr={1} />
            Back
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <BillingAddress
            handleBack={handleBack}
            address={address}
            name={fullName}
            phone={phoneNumber}
          />

          <div style={{ marginTop: "24px" }}>
            {/* Order Summary  */}
            <OrderSummary activeStep={activeStep} totalPrice={totalPrice} />
          </div>
          {/* --------------------------------------- BUTTON --------------------------------------------------- */}
          <StyledButtonGreen sx={{ py: 1.3, mt: 3 }} onClick={handleComplete}>
            Complete Order
          </StyledButtonGreen>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Payment;
