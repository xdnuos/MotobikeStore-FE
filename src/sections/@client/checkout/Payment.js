import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  RadioGroup,
  Stack,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BillingAddressDialog from "src/components/order/BillingAddressDialog";
import SkeletonLoading from "src/components/skeleton/SkeletonLoading";
import { fetchAddressItems } from "src/redux/address/AddressSlice";
import { setAddress, setUser } from "src/redux/order/OrderSlice";
import { orderService } from "src/services/orderService";
import { StyledButtonGreen } from "../../../components/custom/CustomButton";
import { CustomRadio } from "../../../components/custom/CustomRadio";
import Iconify from "../../../components/iconify/Iconify";
import BillingAddress from "../../../components/order/BillingAddress";
import OrderSummary from "./OrderSummary";

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
  const idAccount = useSelector((state) => state.auth.idAccount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.address.loading);
  const totalPrice = useSelector((state) => state.order.totalPrice);
  const addresses = useSelector((state) => state.address.address);
  const defaultAddressID = useSelector((state) => state.address.defaultAddress);
  const address = useSelector((state) => state.order.address);
  const fullName = useSelector((state) => state.order.fullName);
  const phoneNumber = useSelector((state) => state.order.phone);
  const idAddress = useSelector((state) => state.order.idAddress);
  const [openDialog, setOpenDialog] = useState(false);

  const listIdCart = useSelector((state) => state.order.idCartItems);
  const [open, setOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState("");
  useEffect(() => {
    if (idAddress === null || idAddress === undefined) {
      const res = addresses.find(
        (address) => address.addressID === defaultAddressID
      );
      console.log("res", res);
      dispatch(
        setAddress({
          idAddress: res?.addressID,
          address: res?.address,
          selectedAddress: res?.addressID,
        })
      );
      dispatch(
        setUser({
          fullName: res?.fullName,
          phone: res?.phone,
          customerID: idAccount,
        })
      );
    }
  }, [addresses, defaultAddressID, dispatch, idAccount, idAddress]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAddressItems(idAccount));
    }
  }, [dispatch, isLoggedIn, idAccount]);

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
    setOpen(false);
  };

  const handleComplete = async () => {
    if (paymentOption === "") {
      setOpen(true);
      return;
    }
    const req = {
      cartProductIDs: listIdCart,
      addressID: idAddress,
      payment: paymentOption,
      address: address,
    };
    // console.log(req);
    await orderService
      .createOrderForCustomer({
        userID: idAccount,
        req,
      })
      .then((response) => {
        handleNext();
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  if (isLoading) {
    return <SkeletonLoading></SkeletonLoading>;
  }
  return (
    <>
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
                        sx={{ border: "1px solid #d32f2f" }}
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
                            <div style={{ marginLeft: "10px" }}>
                              {item.lable}
                            </div>
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
              handleEdit={handleOpenDialog}
              address={address}
              name={fullName}
              phone={phoneNumber}
            />

            <div style={{ marginTop: "24px" }}>
              {/*  Order Summary  */}
              <OrderSummary activeStep={activeStep} totalPrice={totalPrice} />
            </div>
            {/* --------------------------------------- BUTTON --------------------------------------------------- */}
            <StyledButtonGreen sx={{ py: 1.3, mt: 3 }} onClick={handleComplete}>
              Complete Order
            </StyledButtonGreen>
          </Grid>
        </Grid>
      </Container>
      <BillingAddressDialog
        open={openDialog}
        onClose={handleCloseDialog}
      ></BillingAddressDialog>
    </>
  );
}
export default Payment;
