import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Container,
  Grid,
  Avatar,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as yup from "yup";
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageEdit
);
const PersonalInfoForm = () => {
  const useStyles = makeStyles((theme) => ({
    customFilePondRoot: {
      maxWidth: 200,
      maxHeight: 200,
    },
  }));

  const classes = useStyles();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
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
    cccd: yup
      .string()
      .matches(/^\d{9,12}$/g, "CCCD number must have 9 or 12 digits") // Kiểm tra 10 hoặc 11 chữ số
      .required("Required"),
    birth: yup
      .string()
      .test("valid-date", "Invalid birth date", (value) => {
        const selectedDate = new Date(value);
        return !isNaN(selectedDate.getTime()); // Kiểm tra ngày tháng hợp lệ
      })
      .required("Required"),
    sex: yup.string().required(),
    role: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      birth: "",
      cccd: "",
      sex: "",
      avatar: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container maxWidth="md">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <div className={classes.customFilePondRoot}>
              <FilePond
                allowImagePreview
                imagePreviewHeight={50}
                stylePanelLayout="circle"
                labelIdle="Drag & Drop your image or <span class='filepond--label-action'>Browse</span>"
                acceptedFileTypes={["image/png", "image/jpeg"]}
                onupdatefiles={(fileItems) => {
                  formik.setFieldValue(
                    "avatar",
                    fileItems.map((fileItem) => fileItem.file)[0]
                  );
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  sx={{ width: "50ch" }}
                  label="First Name"
                  name="firstName"
                  value={formik.values.className}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.className && Boolean(formik.errors.className)
                  }
                  helperText={
                    formik.touched.className && formik.errors.className
                  }
                />
                <TextField
                  sx={{ width: "50ch" }}
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  name="phone"
                  sx={{ width: "50ch" }}
                  placeholder="Phone"
                  label="Phone"
                  variant="outlined"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                  sx={{ width: "50ch" }}
                  placeholder="CCCD"
                  label="CCCD"
                  variant="outlined"
                  name="cccd"
                  value={formik.values.cccd}
                  onChange={formik.handleChange}
                  error={formik.touched.cccd && Boolean(formik.errors.cccd)}
                  helperText={formik.touched.cccd && formik.errors.cccd}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  sx={{ width: "50ch" }}
                >
                  <DatePicker
                    format="DD-MM-YYYY"
                    label="Birth"
                    name="birth"
                    value={formik.values.birth}
                    onChange={(value) =>
                      formik.setFieldValue("birth", new Date(value))
                    }
                    renderInput={(params) => <TextField {...params} />}
                    error={formik.touched.birth && Boolean(formik.errors.birth)}
                    helperText={formik.touched.birth && formik.errors.birth}
                  />
                </LocalizationProvider>
                <FormControl sx={{ width: "50ch" }}>
                  <InputLabel htmlFor="grouped-native-select">Sex</InputLabel>
                  <Select
                    native
                    name="sex"
                    id="grouped-native-select"
                    label="Grouping"
                    value={formik.values.sex}
                    onChange={formik.handleChange}
                    error={formik.touched.sex && Boolean(formik.errors.sex)}
                    helperText={formik.touched.sex && formik.errors.sex}
                  >
                    <option aria-label="None" value="" />
                    <option aria-label="Male" value="Male">
                      Male
                    </option>
                    <option aria-label="Female" value="Female">
                      Female
                    </option>
                    <option aria-label="Other" value="Other">
                      Other
                    </option>
                  </Select>
                </FormControl>
              </Stack>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PersonalInfoForm;
