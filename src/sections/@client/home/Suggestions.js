// SECTIONS SẢN PHẨM THEO ĐỐI TƯỢNG
// ------------------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import Iconify from '../../../components/iconify/Iconify'
import Scrollbar from '../../../components/scrollbar/Scrollbar'
import ListChip from '../../../components/list-chip/ListChip'
import { ProductList } from '../products'
// ------------------------------------------------------------------------

const SuggestionsChip = [
    { key: 0, label: 'Tìm kiếm nhiều' },
    { key: 1, label: 'Mua nhiều' },
    { key: 2, label: 'Sữa cho cả nhà' },
    { key: 3, label: 'Da sáng dáng xinh' },
    { key: 4, label: 'Chồng khỏe vợ vui' },
    { key: 5, label: 'Phòng sốt xuất huyết' },
    { key: 6, label: 'Phòng bệnh mùa hè' },
  ];
// ------------------------------------------------------------------------
  
function Suggestions({ title, product = [], limit }) {
    return (
        <Stack sx={{ borderRadius: "16px", border: "1px solid lightgrey" }}>

            <Typography variant='h4' mt={2} ml={2}>
                <Iconify icon="mdi:brightness-percent" sx={{ p: 0.1, mr: 1.5, color: '#fff', background: '#1565c0', borderRadius: "50%" }} />
                {title}</Typography>
            <Scrollbar >
                <Stack direction="row" spacing={2} sx={{ p: 2 }} >
                    <ListChip chipData={SuggestionsChip} setFirstChipColor={true} size="small"  />
                </Stack>
            </Scrollbar>
            <ProductList products={product} limit={limit} sx={{ p: 2 }} />
        </Stack>
    )
}

Suggestions.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array.isRequired,
    limit: PropTypes.number,
}

export default Suggestions
