// SECTIONS BÁN CHẠY NHẤT
// ------------------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import Iconify from '../../../components/iconify/Iconify'
import { ProductList } from '../products'
// ------------------------------------------------------------------------

function Bestseller({ title, product = [], limit }) {
    return (
        <Stack>
            <Typography variant='h4' mb={2} >
                <Iconify icon="mdi:fire" sx={{ mr: 1.5, color: '#fff', background: 'red', borderRadius: "50%" }} />
                {title}
            </Typography>
            <ProductList products={product} limit={limit} />
        </Stack>
    )
}
// ------------------------------------------------------------------------

Bestseller.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array.isRequired,
    limit: PropTypes.number,
}
// ------------------------------------------------------------------------

export default Bestseller
