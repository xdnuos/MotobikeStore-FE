import { Button, Divider, Stack, Typography } from "@mui/material";
import Label from "../label/Label";

const AddressDetail = ({
  address,
  isDefault,
  setDefault,
  onUpdate,
  onDelete,
}) => {
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
            <Button size="small" onClick={() => onUpdate(address.addressID)}>
              Update
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => onDelete(address.addressID)}
            >
              Delete
            </Button>
          </Stack>
          <Button
            variant="contained"
            color="inherit"
            disabled={isDefault}
            onClick={() => setDefault(address.addressID)}
          >
            Set default
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default AddressDetail;
