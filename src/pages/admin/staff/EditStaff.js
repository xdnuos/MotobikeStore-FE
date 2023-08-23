import React, { useEffect, useState } from "react";
import { Container, Typography, Stack, Link } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StaffForm from "src/sections/@dashboard/products/StaffForm";
import { useParams } from "react-router-dom";
import { staffService } from "src/services/staffService";
import { useSelector } from "react-redux";
// import
function EditStaff() {
  const { staffUserID } = useParams();
  console.log("staffUserID", staffUserID);
  const userID = useSelector((state) => state.auth.idAccount);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStaff = await staffService.getByUserID({
          userID,
          staffUserID,
        });
        setStaff(fetchedStaff);
      } catch (error) {
        console.error("Error fetching staff data:", error);
        throw error;
      }
    };

    fetchData();
  }, [staffUserID]);
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
