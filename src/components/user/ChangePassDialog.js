import React from "react";
import { Dialog, DialogContent, TextField, Button, Stack } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { authService } from "src/services/authService";
import { message } from "antd";

function ChangePasswordDialog({ open, onClose }) {
  const handleClose = () => {
    onClose();
  };

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
          handleClose();
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
        message.error(error.response.data);
        handleClose();
      }
    },
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Old Password"
              type="password"
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
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
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
          </Stack>
          <Stack direction="row" justifyContent="end" spacing={2} mt={2}>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
            <Button type="submit" variant="outlined" color="error">
              Change Password
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;
