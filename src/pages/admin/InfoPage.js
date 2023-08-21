import React from "react";
import { Form, useFormik } from "formik";
import {
  TextField,
  Button,
  Container,
  Grid,
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
import { useSelector } from "react-redux";
import { staffService } from "src/services/staffService";
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import SkeletonLoading from "src/components/skeleton/SkeletonLoading";
import { message } from "antd";
import { format } from "date-fns";
import { blobToFile } from "src/helper/image";
import { Helmet } from "react-helmet-async";
import Iconify from "src/components/iconify/Iconify";
import { Link } from "react-router-dom";
import ChangePasswordDialog from "src/components/user/ChangePassDialog";
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

  const [staff, setStaff] = useState([]);
  const classes = useStyles();
  const userID = useSelector((state) => state.auth.idAccount);
  const editStaff = async (formValues) => {
    try {
      const response = await staffService.update(formValues);
      if (response.status === 200) {
        message.success(response.data);
        getInfo(userID);
      }
    } catch (error) {
      message.error(error.response.data);
      console.error("Error fetching order detail:", error);
      throw error;
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
  });
  const getInfo = async (userID) => {
    try {
      const response = await staffService.getByID(userID);
      console.log("staff info", response);
      setStaff(response);
    } catch (error) {
      console.error("Error fetching order detail:", error);
      throw error;
    }
  };
  useEffect(() => {
    getInfo(userID);
  }, [userID]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: staff.firstName,
      lastName: staff.lastName,
      avatar: staff.avatarUrl,
      sex: staff.sex,
      phone: staff.phone,
      birth: dayjs(staff.birth),
      cccd: staff.cccd,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const isValid = await validationSchema.isValid(values);
      if (isValid) {
        const formData = new FormData();
        if (values.avatar.length !== 0) {
          console.log("values.avatar", values.avatar);
          const newFile = blobToFile(
            values.avatar[0].file,
            values.avatar[0].filename
          );
          console.log("newFile", newFile);
          formData.append(`img`, newFile);
        }
        const formValues = {
          email: staff.email,
          role: staff.roles[0],
          firstName: values.firstName,
          lastName: values.lastName,
          sex: values.sex,
          phone: values.phone,
          birth: format(new Date(values.birth), "dd/MM/yyyy"),
          cccd: values.cccd,
        };
        Object.keys(formValues).forEach((key) => {
          formData.append(key, formValues[key]);
        });
        formData.append("staffID", staff.staffID);
        console.log("edit", formValues);
        editStaff(formData);
      } else {
        console.log("Form data is invalid");
      }
    },
  });
  if (staff.staffID === undefined) {
    return <SkeletonLoading></SkeletonLoading>;
  }
  return (
    <>
      <Helmet>
        <title>Edit Info</title>
      </Helmet>
      <Container maxWidth="md">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          {/* button create product */}
        </Stack>
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
                  files={formik.values.avatar}
                  onupdatefiles={(fileItem) => {
                    formik.setFieldValue("avatar", fileItem);
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
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
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
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
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
                        error={
                          formik.touched.birth && Boolean(formik.errors.birth)
                        }
                      />
                    </LocalizationProvider>
                  </FormControl>
                  {formik.touched.birth && formik.errors.birth ? (
                    <Typography color={"red"}>{formik.errors.birth}</Typography>
                  ) : null}
                  <FormControl sx={{ width: "50ch" }}>
                    <InputLabel htmlFor="grouped-native-select">Sex</InputLabel>
                    <Select
                      native
                      name="sex"
                      id="grouped-native-select"
                      label="Grouping"
                      value={formik.values.sex || ""}
                      onChange={formik.handleChange}
                      error={formik.touched.sex && Boolean(formik.errors.sex)}
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
    </>
  );
};

export default PersonalInfoForm;
