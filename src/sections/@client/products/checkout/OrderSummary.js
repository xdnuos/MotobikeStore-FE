import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, CardHeader, Divider, Stack, Typography, TextField, Button } from '@mui/material'
import Iconify from '../../../../components/iconify/Iconify'

OrderSummary.propTypes = {
    activeStep: PropTypes.number,
    totalPrice: PropTypes.number
}
function OrderSummary({ activeStep,totalPrice }) {


    return (
        <Card>
            <CardHeader title={
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={1}>
                        <Typography variant='h6'> Order Summary </Typography>

                        {activeStep === 2 && (
                            <Button sx={{ color: '#00ab55' }}  >
                                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                Edit
                            </Button>
                        )}
                    </Stack>
            } />

            <CardContent>
                <Stack spacing={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography variant='body2' color="text.secondary" gutterBottom>
                            Sub Total
                        </Typography>
                        <Typography variant='subtitle2'> {totalPrice === 0 ? 0 : totalPrice} đ</Typography>
                    </Stack>

                    {/* <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography variant='body2' color="text.secondary" gutterBottom >
                            Discount
                        </Typography>
                        <Typography variant='subtitle2'> -30.000đ </Typography>
                    </Stack> */}

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography variant='body2' color="text.secondary" >
                            Shipping
                        </Typography>
                        <Typography variant='subtitle2'> Free </Typography>
                    </Stack>

                    <Divider />

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ pt: 1 }}
                    >
                        <Typography variant='subtitle1' gutterBottom >
                            Total
                        </Typography>
                        <Stack spacing={0.5}>
                            <Typography variant='subtitle1' textAlign={'right'} color={'#ff5630'} > {totalPrice === 0 ? 0 : totalPrice}đ</Typography>
                            <Typography variant='caption' textAlign={'right'} fontStyle={'italic'}> (VAT included if applicable)</Typography>
                        </Stack>
                    </Stack>

                    {/* {activeStep === 0 && (
                        <Stack >
                            <TextField label="DISCOUNT" variant="outlined" sx={{ mt: 1 }} />
                        </Stack>
                    )} */}


                </Stack>
            </CardContent>
        </Card>
    )
}


export default OrderSummary;