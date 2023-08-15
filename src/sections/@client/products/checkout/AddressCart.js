import React from 'react'
import { Card, CardContent, Grid, IconButton, Stack, Typography } from '@mui/material'
import { StyledButtonGreenOutlined } from 'src/components/custom/CustomButton'
import Iconify from '../../../../components/iconify/Iconify'
import Label from '../../../../components/label/Label'
import PropTypes from "prop-types";

function AddressCart({ handleNext, handleOpenMenu }) {
  return (
    <Card>
    <CardContent>
      <Stack spacing={1}  >
        <Stack direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction={'row'} spacing={1}>
            <Typography variant='subtitle1'> Jayvion Simon </Typography>
            <Typography color={'text.secondary'}>(Home)</Typography>
            <Label color={'info'}>Default</Label>
          </Stack>

          <IconButton size="small" sx={{ height: 26, width: 26 }} color="inherit" onClick={handleOpenMenu}>
            <Iconify icon={'eva:more-vertical-fill'} />
          </IconButton>
        </Stack>
        <Typography variant='body2'>
          19034 Verna Unions Apt. 164 - Honolulu, RI / 87535
        </Typography>

        <Grid container alignItems={'center'}>
          <Grid item xs={12} md={9}>
            <Typography variant='body2' alignItems={'center'} color={'text.secondary'} noWrap>
              365-374-4961
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <StyledButtonGreenOutlined sx={{ mt: { xs: 2, md: 0 }, padding: '3px 9px' }} size='small' onClick={handleNext}>Chọn địa chỉ này</StyledButtonGreenOutlined>
          </Grid>
        </Grid>
      </Stack>
    </CardContent>
  </Card>
  )
}

AddressCart.propTypes = {

    handleOpenMenu: PropTypes.func,
    handleNext: PropTypes.func,
}

export default AddressCart