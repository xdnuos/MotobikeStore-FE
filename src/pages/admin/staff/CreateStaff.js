import React from "react";
import { Container, Typography, Stack, Link } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StaffForm from "src/sections/@dashboard/products/StaffForm";
// import
function CreateStaff() {
  return (
    <>
      <Helmet>
        <title>New product</title>
      </Helmet>
      <Container>
        <Stack spacing={2} marginBottom="40px">
          <Typography variant="h4" gutterBottom>
            Create New Staff
          </Typography>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <Link
              underline="hover"
              color="text.primary"
              href="/dashboard/staff"
            >
              Staff
            </Link>
            <Typography color="inherit">New Staff</Typography>
          </Breadcrumbs>
        </Stack>
        <StaffForm />
      </Container>
    </>
  );
}
export default CreateStaff;
