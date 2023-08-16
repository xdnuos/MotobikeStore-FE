import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, CardHeader, Stack, Typography, Button } from '@mui/material'
import Iconify from '../../../../components/iconify/Iconify'


BillingAddress.propTypes = {
    handleBack: PropTypes.func,
    address: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.number,
  }

function BillingAddress({handleBack, address, name,phone}) {

    return (
        <Card>
            <CardHeader title={
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={1}>
                    <Typography variant='subtitle1'> Billing Address </Typography>
                    <Button sx={{ color: '#00ab55' }} onClick={handleBack} >
                        <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                        Edit
                    </Button>
                </Stack>
            } />

            <CardContent>
                    <Stack direction={'row'} spacing={1} sx={{ mt: - 2 }}>
                        <Typography variant='h5' gutterBottom> {name} </Typography>
                        <Typography variant='body2' color="text.secondary" >  (Home)</Typography>
                    </Stack>
                    <Typography variant='body2' color="text.secondary" pb={1}>  {phone}</Typography>
                    <Typography variant='body2' gutterBottom>  {address}</Typography>

            </CardContent>
        </Card>
    )
}

export default BillingAddress
