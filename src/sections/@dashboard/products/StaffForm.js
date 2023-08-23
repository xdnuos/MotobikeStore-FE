import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import * as yup from "yup";
import { message } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { localStorageService } from "src/services/localStorageService";
import { staffService } from "src/services/staffService";
import SkeletonLoading from "src/components/skeleton/SkeletonLoading";
import dayjs from "dayjs";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);
function blobToFile(theBlob, fileName) {
  return new File([theBlob], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
}
function StaffForm({ staff }) {
  const [imageFiles, setImageFiles] = useState([]);
  const dispatch = useDispatch();
  const role = localStorageService.get("USER")?.roles[0];
  const userID = useSelector((state) => state.auth.idAccount);
  let initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    // avatar: "",
    sex: "",
    phone: "",
    birth: "",
    cccd: "",
  };

  let isEdit = false;

  if (staff?.email !== undefined) {
    isEdit = true;
    initialValues = {
      role: staff.roles[0],
      email: staff.email,
      firstName: staff.firstName,
      lastName: staff.lastName,
      sex: staff.sex,
      phone: staff.phone,
      birth: dayjs(staff.birth),
      cccd: staff.cccd,
    };
    console.log("initialValues", initialValues);
  }

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
  const addStaff = async (req) => {
    return new Promise((resolve, reject) => {
      staffService
        .create({ userID, req })
        .then((response) => {
          console.log("add staffs", response);
          message.success(response.data);
          resolve();
        })
        .catch((error) => {
          message.error(error.response.data);
          reject(error);
        });
    });
  };
  const editStaff = async ({ staffUserID, req }) => {
    return new Promise((resolve, reject) => {
      staffService
        .update({ userID, staffUserID, req })
        .then((response) => {
          console.log("update staffs", response);
          message.success(response.data);
          resolve();
        })
        .catch((error) => {
          message.error(error.response.data);
          reject(error);
        });
    });
  };
  const onSubmit = async (values, { resetForm }) => {
    const isValid = await validationSchema.isValid(values);
    if (isValid) {
      const formData = new FormData();
      console.log("imageFiles", imageFiles);
      imageFiles.forEach((file) => {
        console.log("Add image", file);
        const newFile = blobToFile(file, file.name);
        console.log(newFile);
        formData.append(`imageFiles`, newFile);
      });
      const formValues = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
        // img: values.avatar,
        sex: values.sex,
        phone: values.phone,
        birth: format(new Date(values.birth), "dd/MM/yyyy"),
        cccd: values.cccd,
      };
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });
      if (isEdit) {
        const id = staff.userID;
        // console.log("stafIDDDDD", id);
        editStaff({ staffUserID: id, req: formData });
      } else {
        // console.log("add", formValues);
        addStaff(formData);
      }
    } else {
      console.log("Form data is invalid");
    }
  };

  if ((staff?.email === undefined) & (isEdit === true)) {
    return <SkeletonLoading />;
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, handleChange, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{ borderRadius: 2, p: 3 }}
              >
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    name="email"
                    placeholder="Enter Email"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      name="firstName"
                      sx={{ width: "50ch" }}
                      placeholder="First Name"
                      label="First Name"
                      variant="outlined"
                      value={values.firstName}
                      onChange={handleChange}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                      sx={{ width: "50ch" }}
                      placeholder="Last Name"
                      label="Last Name"
                      variant="outlined"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      name="phone"
                      sx={{ width: "50ch" }}
                      placeholder="Phone"
                      label="Phone"
                      variant="outlined"
                      value={values.phone}
                      onChange={handleChange}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                    <TextField
                      sx={{ width: "50ch" }}
                      placeholder="CCCD"
                      label="CCCD"
                      variant="outlined"
                      name="cccd"
                      value={values.cccd}
                      onChange={handleChange}
                      error={touched.cccd && Boolean(errors.cccd)}
                      helperText={touched.cccd && errors.cccd}
                    />
                  </Stack>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD-MM-YYYY"
                      label="Birth"
                      name="birth"
                      value={values.birth}
                      onChange={(value) =>
                        setFieldValue("birth", new Date(value))
                      }
                      renderInput={(params) => <TextField {...params} />}
                      error={touched.birth && Boolean(errors.birth)}
                      // helperText={touched.birth && errors.birth}
                    />
                  </LocalizationProvider>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                        Sex
                      </InputLabel>
                      <Select
                        native
                        name="sex"
                        id="grouped-native-select"
                        label="Grouping"
                        value={values.sex}
                        onChange={handleChange}
                        error={touched.sex && Boolean(errors.sex)}
                        // helperText={touched.sex && errors.sex}
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
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                        Role
                      </InputLabel>
                      <Select
                        native
                        name="role"
                        id="grouped-native-select1"
                        label="Grouping"
                        value={values.role}
                        onChange={handleChange}
                        error={touched.role && Boolean(errors.role)}
                      >
                        <option value="" />
                        <option aria-label="Staff" value="STAFF">
                          Staff
                        </option>
                        {role !== "MASTER" ? null : (
                          <option value="ADMIN">ADMIN</option>
                        )}
                      </Select>
                    </FormControl>
                  </Stack>
                </Paper>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  {isEdit ? "Update Staff" : "Create Staff"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
export default StaffForm;
