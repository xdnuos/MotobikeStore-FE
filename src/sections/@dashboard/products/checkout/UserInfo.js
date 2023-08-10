import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import Iconify from "../../../../components/iconify/Iconify";

UserInfo.propTypes = {
  handleBack: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.string,
};

function UserInfo({ handleBack, firstName, lastName, phone }) {
  return (
    <Card>
      <CardHeader
        title={
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={1}
          >
            <Typography variant="h6"> User Info </Typography>
            <Button sx={{ color: "#00ab55" }} onClick={handleBack}>
              <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
              Edit
            </Button>
          </Stack>
        }
      />

      <CardContent>
        <Stack>
          <Typography variant="h6" gutterBottom>
            {" "}
            {firstName ? firstName : "" + " " + lastName ? lastName : ""}{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {" "}
            {phone}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default UserInfo;
