import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { message } from "antd";
import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";
import { authService } from "src/services/authService";
import * as Yup from "yup";
export default function ChangePassword() {
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authService.changePassword({
          password: values.password,
          newPassword: values.newPassword,
        });

        if (response.status === 200) {
          message.success(response.data);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
        message.error(error.response.data);
      }
    },
  });
  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Stack pt={2}>
            <Typography variant="h5">Change Password</Typography>
            <Typography variant="subtitle2" color={"text.secondary"}>
              For account security, please do not share your password with
              others
            </Typography>
          </Stack>
          <Divider sx={{ marginTop: "12px" }}></Divider>
          <Grid
            container
            pb={4}
            pt={4}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={8}>
              <Stack spacing={2}>
                <TextField
                  label="Old Password"
                  type="password"
                  fullWidth
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  helperText={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                />

                <Button type="submit" variant="outlined" color="error">
                  Change Password
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
