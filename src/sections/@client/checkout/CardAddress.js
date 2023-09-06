import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  StyledButtonGreen,
  StyledButtonGreenOutlined,
} from "../../../components/custom/CustomButton";
import Label from "../../../components/label/Label";
import { setAddress, setUser } from "../../../redux/order/OrderSlice";

function CardAddress({ handleClose, address, isDefault }) {
  const dispatch = useDispatch();
  console.log(address);
  // const [open, setOpen] = useState(null);
  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  // const handleDeleteAddress = async (idAddress) => {
  //   await dispatch(
  //     deleteAddress({
  //       addressID: idAddress,
  //       userID: idAccount,
  //     })
  //   );
  //   setOpen(null);
  // };
  const selectedAddress = useSelector((state) => state.order.selectedAddress);
  console.log("selectedAddress", selectedAddress);
  const handleSelectedAddress = async (idAddress, address, fullName, phone) => {
    await Promise.all([
      dispatch(setAddress({ idAddress, address, selectedAddress: idAddress })),
      dispatch(setUser({ fullName: fullName, phone })),
    ]);
    handleClose();
  };

  return (
    <>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Stack spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction={"row"} spacing={1}>
                <Typography variant="subtitle1">{address?.fullName}</Typography>
                {/* <Typography color={"text.secondary"}>(Home)</Typography> */}
                {isDefault && <Label color={"info"}>Default</Label>}
              </Stack>

              {/* <IconButton
                size="small"
                sx={{ height: 26, width: 26 }}
                color="inherit"
                onClick={handleOpenMenu}
              >
                <Iconify icon={"eva:more-vertical-fill"} />
              </IconButton> */}
            </Stack>
            <Typography variant="body2">{address?.address}</Typography>

            <Grid container alignItems={"center"}>
              <Grid item xs={12} md={9}>
                <Typography
                  variant="body2"
                  alignItems={"center"}
                  color={"text.secondary"}
                  noWrap
                >
                  {address?.phone}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {selectedAddress !== address?.addressID ? (
                  <StyledButtonGreenOutlined
                    sx={{ mt: { xs: 2, md: 1 }, padding: "3px 9px" }}
                    size="small"
                    onClick={() =>
                      handleSelectedAddress(
                        address?.addressID,
                        address?.address,
                        address?.fullName,
                        address?.phone
                      )
                    }
                  >
                    Select this address
                  </StyledButtonGreenOutlined>
                ) : (
                  <StyledButtonGreen
                    sx={{ mt: { xs: 2, md: 1 }, padding: "3px 9px" }}
                    size="small"
                    disabled
                  >
                    Selected
                  </StyledButtonGreen>
                )}
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
      {/* <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => handleDeleteAddress(address?.addressID)}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
}

CardAddress.propTypes = {
  address: PropTypes.object,
  handleNext: PropTypes.func,
};

export default CardAddress;
