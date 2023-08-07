// SECTIONS TÌM KIẾM
// ------------------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
import {
    Grid, Paper, Stack, Typography,
    OutlinedInput, Button,
} from '@mui/material'
import { styled } from "@mui/material/styles";
import Scrollbar from '../../../components/scrollbar';
import Iconify from '../../../components/iconify';
import ListChip from '../../../components/list-chip/ListChip';

// ----------------------------------------------------------------------------------
const SearchContainer = styled("div")({
    display: "flex",
    borderRadius: 20,
    overflow: "hidden",

});

const SearchInput = styled(OutlinedInput)({
    borderRadius: "50px 0 0 50px",
    flexGrow: 1,
    padding: "0 15px",

});

const SearchButton = styled(Button)({
    borderRadius: "0 50px 50px 0",
    padding: "0 40px",
});
// ----------------------------------------------------------------------------------

SearchForm.propTypes = {
    chipData: PropTypes.array.isRequired,
}

function SearchForm({ chipData = [] }) {
    return (
        <>
            <Grid
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        borderRadius: '16px',
                    },
                }}
            >

                <Paper elevation={3} >
                    <Stack spacing={2} sx={{ p: "24px 80px" }}>
                        <Typography variant="h3">Tra Cứu Thuốc, TPCN, Bệnh Lý...</Typography>

                        <SearchContainer>
                            <SearchInput variant="standard" placeholder="Nhập từ khóa..." />
                            <SearchButton variant="contained" >
                                <Iconify icon="eva:search-fill" sx={{ width: 25, height: 25 }} />
                            </SearchButton>
                        </SearchContainer>
                        <Stack >
                            <Typography variant="subtitle1"> Tra Cứu Hàng Đầu</Typography>
                            <Scrollbar
                                sx={{
                                    height: 1,
                                    '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'row' },
                                }}
                            >
                                <Stack direction={'row'} spacing={2.5} py={1}>
                                    <ListChip chipData={chipData} />
                                </Stack>
                            </Scrollbar>

                        </Stack>

                    </Stack>
                </Paper>
            </Grid>
        </>
    )
}

export default SearchForm