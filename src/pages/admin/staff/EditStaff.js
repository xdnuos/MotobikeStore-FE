import React, { useEffect, useState } from "react";
import { Container, Typography, Stack, Link } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StaffForm from "src/sections/@dashboard/products/StaffForm";
import { useParams } from "react-router-dom";
import { staffService } from "src/services/staffService";
// import
function EditStaff() {
  const { staffID } = useParams();
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStaff = await staffService.getByID(staffID);
        setStaff(fetchedStaff);
      } catch (error) {
        console.error("Error fetching staff data:", error);
        throw error;
      }
    };

    fetchData();
  }, [staffID]);
  return (
    <>
      <Helmet>
        <title>New product</title>
      </Helmet>
      <Container>
        <Stack spacing={2} marginBottom="40px">
          <Typography variant="h4" gutterBottom>
            Edit Staff Info
          </Typography>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <Link
              underline="hover"
              color="text.primary"
              href="/dashboard/staff"
            >
              Staff
            </Link>
            <Typography color="inherit">{staff?.fullName}</Typography>
          </Breadcrumbs>
        </Stack>
        <StaffForm staff={staff} />
      </Container>
    </>
  );
}
export default EditStaff;
