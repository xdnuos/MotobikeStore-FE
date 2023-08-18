import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Paper, Typography, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Manufacturer name is required"),
});
const ManufacturerForm = ({ onSubmit, initialValues, isEdit }) => {
  //   console.log(initialValues);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ borderRadius: 2, p: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="h6">
                    {isEdit ? "Edit" : "Add"} Manufacturer
                  </Typography>
                  <TextField
                    fullWidth
                    name="name"
                    placeholder="Enter Manufacturer name"
                    label="Manufacturer Name"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Lưu
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default ManufacturerForm;
