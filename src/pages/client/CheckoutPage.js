import {
  Box,
  Button,
  Container,
  Grid,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import OrderSuccess from "src/components/order/OrderSuccess";
import Iconify from "../../components/iconify/Iconify";
import Cart from "../../sections/@client/checkout/Cart";
import Payment from "../../sections/@client/checkout/Payment";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "rgb(0 171 85)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "rgb(0 171 85)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "rgb(0 171 85)",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "rgb(0 171 85)",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify
          icon={"solar:check-circle-bold"}
          sx={{ height: "28px", width: "28px" }}
          className="QontoStepIcon-completedIcon"
        />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const steps = ["Cart", "Payment", "Success Order"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  // const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  //   navigate("/order");
  // };

  // const handleNext = () => {
  //   if (activeStep === 2) {
  //     setOpen(true);
  //   } else {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   }
  // };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Cart handleNext={handleNext} activeStep={activeStep} />;

      case 1:
        return (
          <Payment
            handleBack={handleBack}
            handleNext={handleNext}
            activeStep={activeStep}
          />
        );
      case 2:
        return <OrderSuccess />;
      default:
        return "Unknown stepIndex";
    }
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <Container>
        <Grid container spacing={3} sx={{ mt: 0 }}>
          <Grid item xs={12}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={<QontoConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>

          <Grid item xs={12}>
            {activeStep === steps.length ? (
              <Box>
                <Box>All steps completed</Box>
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            ) : (
              <Box>{getStepContent(activeStep)}</Box>
            )}
          </Grid>
        </Grid>
        {/* <OrderSuccessDialog open={open} handleClose={handleClose} /> */}
      </Container>
    </>
  );
};

export default Checkout;
