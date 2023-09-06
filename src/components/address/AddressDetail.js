import { Button, Divider, Stack, Typography } from "@mui/material";
import Label from "../label/Label";

const AddressDetail = ({ address, isDefault }) => {
  console.log(address);
  return (
    <>
      <Divider sx={{ marginTop: "12px", marginBottom: "24px" }}></Divider>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Stack spacing={1}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h6">{address.fullName}</Typography>
            &nbsp;|&nbsp;
            <Typography variant="body2" color={"text.secondary"}>
              {address.phone}
            </Typography>
          </Stack>
          <Typography variant="body2" color={"text.secondary"}>
            {address.address}
          </Typography>
          {isDefault && (
            <Label color={"info"} sx={{ width: "64px" }}>
              Default
            </Label>
          )}
        </Stack>
        <Stack>
          <Stack direction={"row"}>
            <Button size="small">Update</Button>
            <Button size="small" color="error">
              Delete
            </Button>
          </Stack>
          <Button variant="contained" color="inherit" disabled={isDefault}>
            Set default
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default AddressDetail;
