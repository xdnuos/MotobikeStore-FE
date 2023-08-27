import { Grid, IconButton, TextField } from "@mui/material";
import { message } from "antd";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "src/redux/order/OrderSlice";
import { customerService } from "src/services/customerService";
import * as yup from "yup";
import { StyledButtonGreenText } from "../../../../components/custom/CustomButton";
import Iconify from "../../../../components/iconify/Iconify";
function UserForm({ handleBack, handleNext, activeStep }) {
  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state.order);
  const phoneRef = useRef(null);
  let initialValues = {
    firstName: orderInfo.firstName,
    lastName: orderInfo.lastName,
    phone: orderInfo.phone,
  };
  const validationSchema = yup.object({
    firstName: yup.string().min(2, "Too Short!").max(64, "Too Long!"),
    lastName: yup
      .string()
      .min(2, "Too Short!")
      .max(64, "Too Long!")
      .required("Sku is required"),
    phone: yup
      .string()
      .required("Phone Number is required")
      .min(9, "Phone Number must be at least 9 characters")
      .max(10, "Incorrect phone number"),
  });
  const handleGetCustomerInfo = async () => {
    try {
      const phone = phoneRef.current.value;
      const response = await customerService.getBasicInfoByPhoneAdmin(phone);
      console.log(response);
      if (response?.status === 200) {
        console.log("set info");
        dispatch(
          setUser({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phone: response.data.phone,
            customerID: response.data.customerID,
          })
        );
        initialValues = {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
        };
        console.log(orderInfo);
      }
    } catch (error) {
      console.log(error);
      if (error?.response.status === 404) {
        message.error(error.response.data);
        console.log("k có");
        dispatch(
          setUser({
            ...orderInfo,
            customerID: null,
          })
        );
      }
      throw error;
    }
  };
  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      dispatch(
        setUser({
          ...orderInfo,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
        })
      );
      console.log(orderInfo);
      handleNext();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize={true}
    >
      {({ values, touched, errors, handleChange }) => (
        <Form>
          <Grid container spacing={2} mt={1}>
            <Grid item md={6} xs={12}>
              <TextField
                name="firstName"
                label="First name"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="lastName"
                required
                label="Last name"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="phone"
                inputRef={phoneRef}
                label="Phone Number"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <IconButton
                size="large"
                // sx={{ height: 26, width: 26 }}
                color="inherrit"
                onClick={handleGetCustomerInfo}
              >
                <Iconify icon={"pajamas:question"} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <StyledButtonGreenText
              type="submit"
              sx={{ mt: 3.5, height: "50px", width: "40%" }}
            >
              Continue
            </StyledButtonGreenText>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
UserForm.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
};
export default UserForm;
