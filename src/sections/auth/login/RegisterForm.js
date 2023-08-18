import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Stack,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { useEffect } from "react";
import { localStorageService } from "../../../services/localStorageService";
import { authService } from "../../../services/authService";
import { message } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { format } from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const role = localStorageService.get("USER")?.roles;
      const hasCustomerRole = role?.includes("CUSTOMER");
      if (hasCustomerRole) {
        navigate("/");
      } else {
        navigate("/dashboard/app");
      }
    }
  }, [isLoggedIn, navigate]);
  const addUser = async (formValues) => {
    try {
      const response = await authService.register(formValues);
      if (response.status === 200) {
        localStorageService.set("_tempUser", {
          email: formValues.get("email"),
          password: formValues.get("password"),
        });
        // message.success(response.data);
        message.success("Please check your email to verify your account!");
        // setOpen(true);
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      console.log("ddddddd");
      message.error(error.response.data.emailError);
      console.log(error);
    }
  };
  const validationSchema = yup.object({
    firstName: yup
      .string()
      .min(4, "Too short")
      .required("First Name is required"),
    lastName: yup
      .string()
      .min(4, "Too short")
      .required("Last Name is required"),
    phone: yup
      .string()
      .matches(/^\d{10,11}$/g, "Phone number must have 10 or 11 digits") // Kiểm tra 10 hoặc 11 chữ số
      .required("Required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    address: yup.string().min(4, "Too short").required("Address is required"),
    birth: yup
      .string()
      .test("valid-date", "Invalid birth date", (value) => {
        const selectedDate = new Date(value);
        return !isNaN(selectedDate.getTime()); // Kiểm tra ngày tháng hợp lệ
      })
      .required("Birth is required"),
    sex: yup.string().required("Gendel is required"),
    password: yup
      .string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
      phone: "",
      birth: "",
      address: "",
      sex: "",
      firstName: "",
      lastName: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const isValid = await validationSchema.isValid(values);
      if (isValid) {
        const formValues = {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          sex: values.sex,
          phone: values.phone,
          birth: format(new Date(values.birth), "dd-MM-yyyy"),
          address: values.address,
          password: values.password,
        };
        const formData = new FormData();
        Object.keys(formValues).forEach((key) => {
          formData.append(key, formValues[key]);
        });
        // console.log(formData.get("email"));
        // console.log(formData.get("password"));
        addUser(formData);
      } else {
        console.log("Form data is invalid");
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={1} direction={"row"}>
          <TextField
            sx={{ width: "50ch" }}
            label="First Name"
            variant="outlined"
            placeholder="Mẫn Thị"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            sx={{ width: "50ch" }}
            label="Last Name"
            variant="outlined"
            placeholder="Nhi"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Stack>
        <Stack spacing={1} mt={1}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            placeholder="XXX@gmail.com"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phone"
            placeholder="0394 XXX XXX"
            fullWidth
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          <TextField
            label="Address"
            variant="outlined"
            name="address"
            type="text"
            placeholder="61 đường Tình Duyên,..."
            fullWidth
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD-MM-YYYY"
                label="Birth"
                name="birth"
                value={formik.values.birth}
                onChange={(value) =>
                  formik.setFieldValue("birth", value ? value : null)
                }
                renderInput={(params) => <TextField {...params} />}
                error={formik.touched.birth && Boolean(formik.errors.birth)}
              />
            </LocalizationProvider>
          </FormControl>
          {formik.touched.birth && formik.errors.birth ? (
            <Typography color={"red"}>{formik.errors.birth}</Typography>
          ) : null}

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="sex"
              value={formik.values.sex}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          {formik.touched.sex && formik.errors.sex ? (
            <Typography color={"red"}>{formik.errors.sex}</Typography>
          ) : null}

          <TextField
            label="Password"
            variant="outlined"
            placeholder="password123"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            placeholder="password123"
            type={showPassword ? "text" : "password"}
            name="passwordConfirmation"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirmation &&
              Boolean(formik.errors.passwordConfirmation)
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
            fullWidth
          />
        </Stack>
        <LoadingButton
          loading={loading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Sign Up
        </LoadingButton>
      </form>
    </>
  );
}
