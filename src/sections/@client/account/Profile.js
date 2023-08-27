import {
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { message } from "antd";
import { format } from "date-fns";
import dayjs from "dayjs";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import "filepond/dist/filepond.min.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import SkeletonLoading from "src/components/skeleton/SkeletonLoading";
import { blobToFile } from "src/helper/image";
import { customerService } from "src/services/customerService";
import * as yup from "yup";
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageEdit
);
const Profile = () => {
  const useStyles = makeStyles((theme) => ({
    customFilePondRoot: {
      maxWidth: 200,
      maxHeight: 200,
    },
  }));

  const [customer, setCustomer] = useState([]);
  const classes = useStyles();
  const userID = useSelector((state) => state.auth.idAccount);
  const editCustomer = async ({ userID, req }) => {
    try {
      const response = await customerService.editInfoForCustomer({
        userID,
        req,
      });
      console.log(response);
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
    birth: yup
      .string()
      .test("valid-date", "Invalid birth date", (value) => {
        const selectedDate = new Date(value);
        return !isNaN(selectedDate.getTime()); // Kiểm tra ngày tháng hợp lệ
      })
      .required("Birth is required"),
    sex: yup.string().required("Gendel is required"),
  });
  const getInfo = async (userID) => {
    try {
      const response = await customerService.getInfoForCustomer(userID);
      console.log("customer info", response);
      setCustomer(response);
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
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      avatar: customer.avatarUrl || "",
      sex: customer.sex || "",
      phone: customer.phone || "",
      email: customer.email || "",
      birth: customer.birth ? dayjs(customer.birth) : "",
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
          email: customer.email,
          firstName: values.firstName,
          lastName: values.lastName,
          sex: values.sex,
          phone: values.phone,
          birth: format(new Date(values.birth), "dd-MM-yyyy"),
        };
        console.log("formValues", formValues);
        Object.keys(formValues).forEach((key) => {
          formData.append(key, formValues[key]);
        });
        editCustomer({ userID: userID, req: formData });
      } else {
        console.log("Form data is invalid");
      }
    },
  });
  if (customer.email === undefined) {
    return <SkeletonLoading></SkeletonLoading>;
  }
  return (
    <>
      <Helmet>
        <title>Edit Info</title>
      </Helmet>

      <Container maxWidth="md">
        <Stack pt={2}>
          <Typography variant="h5">My profile</Typography>
          <Typography variant="subtitle2" color={"text.secondary"}>
            Manage profile information for account security
          </Typography>
        </Stack>
        <Divider sx={{ marginTop: "12px", marginBottom: "24px" }}></Divider>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="center" mt={2} pb={4}>
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
                    fullWidth
                    disabled
                    name="email"
                    placeholder="Email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <Button>Change</Button>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    disabled
                    name="phone"
                    placeholder="Phone"
                    label="Phone"
                    variant="outlined"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                  <Button>Change</Button>
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
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
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

export default Profile;
