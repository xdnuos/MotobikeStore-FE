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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      birth: "",
      cccd: "",
      sex: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4}>
          {" "}
          <div className={classes.customFilePondRoot}>
            {" "}
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
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  sx={{ width: "50ch" }}
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                <TextField
                  sx={{ width: "50ch" }}
                  label="Last Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
              </Stack>
              <TextField
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PersonalInfoForm;
