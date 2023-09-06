import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../iconify/Iconify";

BillingAddress.propTypes = {
  handleEdit: PropTypes.func,
  address: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};

function BillingAddress({ handleEdit, address, name, phone }) {
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
            <Typography variant="subtitle1"> Billing Address </Typography>
            <Button sx={{ color: "#00ab55" }} onClick={handleEdit}>
              <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
              Edit
            </Button>
          </Stack>
        }
      />

      <CardContent>
        <Stack direction={"row"} spacing={1} sx={{ mt: -2 }}>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            (Home)
          </Typography> */}
        </Stack>
        <Typography variant="body2" color="text.secondary" pb={1}>
          {phone}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BillingAddress;
