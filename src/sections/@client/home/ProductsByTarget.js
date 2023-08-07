// SECTIONS SẢN PHẨM THEO ĐỐI TƯỢNG
// ---------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import Iconify from '../../../components/iconify/Iconify'
import ListChip from '../../../components/list-chip/ListChip'
import { ProductList } from '../products'
// ---------------------------------------------------------------


const filterByChip = [
    { key: 0, label: 'Trẻ em' },
    { key: 1, label: 'Người cho con bú ' },
    { key: 2, label: 'Phụ nữ cao tuổi' },
];
// ---------------------------------------------------------------

function ProductsByTarget({ title, product = [], limit }) {
    return (
        <Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2} mb={2}
            >
                <Typography variant='h4' >
                    <Iconify icon="mdi:person-multiple" sx={{ mr: 1, color: '#fff', background: '#1565c0', borderRadius: "50%" }} /> 
                    {title}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Typography variant='subtitle1' sx={{ mr: 3, color: "primary" }}>Lọc Theo: </Typography>
                    <ListChip chipData={filterByChip} setFirstChipColor={true} size="small" />
                </Stack>
            </Stack>
            <ProductList products={product} limit={limit} />
        </Stack>
    )
}

ProductsByTarget.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array.isRequired,
    limit: PropTypes.number,
}

export default ProductsByTarget
