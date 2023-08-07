// SECTIONS TÌM KIẾM HÀNG ĐẦU
// ------------------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'
import Scrollbar from '../../../components/scrollbar'
import ListChip from '../../../components/list-chip'
import Iconify from '../../../components/iconify'
// ------------------------------------------------------------------------

function TopSearch({ title, chipData = [] }) {
    return (
        <Stack sx={{ borderRadius: "16px", border: "1px solid lightgrey" }}>
            <Typography variant='h4' mt={2} ml={2}>
                <Iconify icon="ph:chart-line-up-bold" sx={{ p: 0.1, mr: 1.5, color: '#fff', background: '#1565c0', borderRadius: "50%" }} />
                {title}
            </Typography>
            <Stack mx={2}>
                <Scrollbar >
                    <Stack direction="row" spacing={2} py={2}>
                        <ListChip chipData={chipData} sx={{ fontSize: 16 }} />
                    </Stack>
                </Scrollbar>
            </Stack>
        </Stack>
    )
}

TopSearch.propTypes = {
    title: PropTypes.string,
    chipData: PropTypes.array.isRequired,

}

export default TopSearch
