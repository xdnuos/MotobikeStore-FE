import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Button,
  Container,
  CardHeader,
  CardContent,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Stack,
  TableContainer,
  TableHead,
  Table,
  Typography,
} from "@mui/material";
import Iconify from "../../../../components/iconify/Iconify";
import PropTypes from "prop-types";
import OrderSummary from "./OrderSummary";
import { StyledButtonGreen } from "../../../../components/custom/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { orderService } from "../../../../services/orderService";
import { Avatar, message } from "antd";
import UserInfo from "./UserInfo";
import { setUser } from "src/redux/order/OrderSlice";
import { setInvoice } from "src/redux/order/OrderInvoice";
import { fetchCartItems } from "src/redux/cart/cartSlice";
import { getAllProduct } from "src/redux/products/productList";
Summary.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
};
function Summary({ handleBack, handleNext, activeStep, handleReset }) {
  const [request, setRequest] = useState({
    cartProductIDs: [],
    userID: null,
    customerID: null,
    firstName: "unknow",
    lastName: "unknow",
    phone: null,
  });
  const userID = useSelector((state) => state.auth.idAccount);
  const cart = useSelector((state) => state.cart.cart);
  const order = useSelector((state) => state.order);
  console.log(order);
  const data = cart?.filter((cartItem) =>
    order.idCartItems.includes(cartItem.cartProductID)
  );
  console.log(data);
  const totalPrice = useSelector((state) => state.order.totalPrice);
  useEffect(() => {
    setRequest({
      cartProductIDs: order.idCartItems,
      userID: userID,
      customerID: order.customerID,
      firstName: order.firstName,
      lastName: order.lastName,
      phone: order.phone,
    });
  }, [
    order.customerID,
    order.firstName,
    order.idCartItems,
    order.lastName,
    order.phone,
    userID,
  ]);
  const dispatch = useDispatch();
  const handleComplete = async () => {
    try {
      console.log(request);
      const response = await orderService.createOrder({ ...request });
      console.log(response);
      if (response?.status === 200) {
        dispatch(
          setInvoice({
            orderID: response.data.orderID,
          })
        );
        dispatch(
          setUser({
            firstName: "",
            lastName: "",
            phone: "",
          })
        );
        dispatch(fetchCartItems(userID));
        handleNext();
      }
    } catch (error) {
      console.log(error);
      if (error?.response.status === 404) {
        message.error(error.response.data);
      }
      throw error;
    }
  };
  console.log("Order INFO", request);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title={
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  spacing={1}
                >
                  <Typography variant="h6"> Cart Info </Typography>
                  <Button sx={{ color: "#00ab55" }} onClick={handleReset}>
                    <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                    Edit
                  </Button>
                </Stack>
              }
            />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"> </TableCell>
                    <TableCell align="left">Product name</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="left">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((cartItem, index) => {
                    return (
                      <TableRow hover key={index} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar
                              alt={cartItem.productName}
                              src={cartItem.productImages[0].imagePath}
                              shape="square"
                              sx={{ width: 55, height: 55 }}
                            />
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          {cartItem.productName}
                        </TableCell>
                        <TableCell align="left">
                          {cartItem.productPrice}
                        </TableCell>
                        <TableCell align="center">
                          {cartItem.quantity}
                        </TableCell>
                        <TableCell align="left">
                          {cartItem.productPrice}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* --------------------------------------- BUTTON --------------------------------------------------- */}
          <Button sx={{ color: "#000", mt: 3 }} onClick={handleBack}>
            <Iconify icon="ic:outline-keyboard-arrow-left" mr={1} />
            Back
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <UserInfo
            firstName={order?.firstName}
            lastName={order?.lastName}
            phone={order?.phone}
          ></UserInfo>
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
export default Summary;
