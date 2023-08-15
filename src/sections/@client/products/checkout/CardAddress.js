import React, { useState } from 'react'
import { Card, CardContent, Grid, IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material'
import { StyledButtonGreenOutlined } from '../../../../components/custom/CustomButton'
import Iconify from '../../../../components/iconify/Iconify'
import Label from '../../../../components/label/Label'
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress } from '../../../../redux/address/AddressSlice'
import { setAddress, setUser } from '../../../../redux/order/OrderSlice'

function CardAddress({ handleNext, address }) {
  const dispatch = useDispatch();
  const idAccount = useSelector((state) => state.auth.idAccount);

  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteAddress = async (idAddress) => {
    await dispatch(deleteAddress({
      addressID: idAddress,
      userID: idAccount
    }))
    setOpen(null);
  }
  const handleSelectedAddress = async (idAddress, address, fullName, phone) => {
    await Promise.all([
      dispatch(setAddress({ idAddress, address })),
      dispatch(setUser({ firstName: fullName, phone })),
    ]);
    handleNext();
  }

  return (
    <>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Stack spacing={1}  >
            <Stack direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction={'row'} spacing={1}>
                <Typography variant='subtitle1'> {address?.fullname} </Typography>
                <Typography color={'text.secondary'}>(Home)</Typography>
                <Label color={'info'}>Default</Label>
              </Stack>

              <IconButton size="small" sx={{ height: 26, width: 26 }} color="inherit" onClick={handleOpenMenu}>
                <Iconify icon={'eva:more-vertical-fill'} />
              </IconButton>
            </Stack>
            <Typography variant='body2'>
              {address?.address}
            </Typography>

            <Grid container alignItems={'center'}>
              <Grid item xs={12} md={9}>
                <Typography variant='body2' alignItems={'center'} color={'text.secondary'} noWrap>
                  {address?.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <StyledButtonGreenOutlined sx={{ mt: { xs: 2, md: 0 }, padding: '3px 9px' }} size='small'
                  onClick={() => handleSelectedAddress(address?.addressID, address?.address, address?.fullname, address?.phone)}>
                  Chọn địa chỉ này
                </StyledButtonGreenOutlined>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
      <Popover
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

        <MenuItem sx={{ color: "error.main" }} onClick={() => handleDeleteAddress(address?.addressID)}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>

  )
}

CardAddress.propTypes = {

  address: PropTypes.object,
  handleNext: PropTypes.func,
}

export default CardAddress