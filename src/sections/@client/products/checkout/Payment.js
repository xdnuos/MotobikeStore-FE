import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Button,
  Container,
  CardHeader,
  CardContent,
} from "@mui/material";
import Iconify from "../../../../components/iconify/Iconify";
import PropTypes from "prop-types";
import DeliveryOptions from "./DeliveryOptions";
import PaymentOptions from "./PaymentOptions";
import BillingAddress from "./BillingAddress";
import OrderSummary from "./OrderSummary";
import { StyledButtonGreen } from "../../../../components/custom/CustomButton";
import { useSelector } from "react-redux";
import { customersService } from "../../../../services/customerService";
import { orderService } from "../../../../services/orderService";

Payment.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
};
function Payment({ handleBack, handleNext, activeStep }) {
  const [infoCustomer, setInfoCustomer] = useState({
    name: "",
    phone: "",
  });
  const [request, setRequest] = useState({
    idAccount: null,
    idAddress: null,
    idStore: 3,
    shippingFee: 0,
    idCartItems: [],
  });

  const { idAccount, idAddress, idCartItems } = request;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const idAcc = useSelector((state) => state.auth.idAccount);

  const getInfo = async (idAccount) => {
    return new Promise((resolve, reject) => {
      customersService
        .getInfo(idAccount)
        .then((response) => {
          setInfoCustomer({ name: response.name, phone: response.phoneNumber });
          console.log("response", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const totalPrice = useSelector((state) => state.order.totalPrice);

  const address = useSelector((state) => state.order.address);
  const idAdd = useSelector((state) => state.order.idAddress);

  const idCartIt = useSelector((state) => state.order.idCartItems);

  // const create = async () => {
  //   return new Promise((resolve, reject) => {
  //     OrderService.createOrder({
  //       idAccount: idAccount,
  //       idAddress: idAddress,
  //       idStore: 3,
  //       shippingFee: 0,
  //       idCartItem: idCartItem

  //       // idAccount : 2,
  //       // idAddress : 13,
  //       // idStore: 3,
  //       // shippingFee: 0,
  //       // idCartItems :[39, 40]

  //     })
  //       .then(response => {

  //         console.log("rrrrrrrrrrrrrrrrrrrrppppppppppppppppppppppppppppppppppp", response);
  //         resolve();
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });

  //   });
  // };

  const handleComplete = async () => {
    try {
      const response = await orderService.createOrder({ ...request });
      //   idAccount: {...idAccount},
      //   idAddress: {...idAddress},
      //   idStore: 3,
      //   shippingFee: 0,
      //   idCartItem: {...idCartItem},

      //     // idAccount : 2,
      //     // idAddress : 13,
      //     // idStore: 3,
      //     // shippingFee: 0,
      //     // idCartItems :[39, 40]

      // })
      // create();
      console.log("asjikhdikjahsdlkijhaslkjdhlsjkahlkjsahlkjh", request);
      console.log(
        "rrrrrrrrrrrrrrrrrrrrppppppppppppppppppppppppppppppppppp",
        response
      );
      handleNext();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setRequest({
        ...request,
        idAccount: idAcc,
        idAddress: idAdd,
        idCartItems: idCartIt,
      });
      getInfo(idAcc);
      console.log("asjikhdikjahsdlkijhaslkjdhlsjkahlkjsahlkjh", request);
    }
  }, [isLoggedIn, idAcc]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Delivery options" />
            <CardContent>
              <DeliveryOptions />
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardHeader title="Payment Options" />
            <CardContent>
              <PaymentOptions />
            </CardContent>
          </Card>

          {/* --------------------------------------- BUTTON --------------------------------------------------- */}
          <Button sx={{ color: "#000", mt: 3 }} onClick={handleBack}>
            <Iconify icon="ic:outline-keyboard-arrow-left" mr={1} />
            Back
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <BillingAddress
            handleBack={handleBack}
            address={address}
            name={infoCustomer.name}
            phone={infoCustomer.phone}
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
