// SECTIONS DANH MỤC NỔI BẬT
// ------------------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Link, Stack, Typography } from '@mui/material';

// ------------------------------------------------------------------------

const BRAND = [
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827860/motobike_store/usedmotorcyclestore-brand-triumph_smuxcc.png", href: '/', key: 'triumph' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827859/motobike_store/usedmotorcyclestore-brand-honda_fxnzkm.png", href: '/', key: 'honda' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827859/motobike_store/usedmotorcyclestore-brand-bmw_uasllo.png", href: '/', key: 'bmw' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691828242/motobike_store/usedmotorcyclestore-brand-motoguzzi_phiqps.png", href: '/', key: 'motoguzzi' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827860/motobike_store/usedmotorcyclestore-brand-yamaha_kuvql3.png", href: '/', key: 'yamaha' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827860/motobike_store/usedmotorcyclestore-brand-kawasaki_z88rtj.png", href: '/', key: 'kawasaki' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827859/motobike_store/usedmotorcyclestore-brand-husqvarna_espvkn.png", href: '/', key: 'husqvarna' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827859/motobike_store/usedmotorcyclestore-brand-aprilia_i04vxa.png", href: '/', key: 'aprilia' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827859/motobike_store/usedmotorcyclestore-brand-suzuki_gebr6b.png", href: '/', key: 'suzuki' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827859/motobike_store/usedmotorcyclestore-brand-ducati_jgb4oy.png", href: '/', key: 'ducati' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827860/motobike_store/usedmotorcyclestore-brand-royalenfield_a9ccd0.png", href: '/', key: 'royalenfield' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1691827860/motobike_store/usedmotorcyclestore-brand-ktm_dawqkl.png", href: '/', key: 'ktm' }
];

const CustomCard = styled('div')(() => ({
    transition: `all 0.3s ease-in-out`,
    background: '#262626',
    borderRadius: '50%',
    maxWidth: '130px',
    maxHeight: '130px',
    '&:hover': {
        transform: `scale(1.07)`,
        boxShadow: `20px 20px 50px rgba(0, 0, 0, 0.6), 
                  -20px -20px 50px rgba(255, 255, 255, 0.2)`
    }
}));
const StyledProductImg = styled('img')({
    width: '70px',
    height: '70px',
    margin: '30px',
    objectFit: 'cover', // Không bị mờ
    objectFit: 'contain', // Vừa kích thước

});
// ------------------------------------------------------------------------

function FeaturedCategory({ title }) {
    return (
        <Stack spacing={1}>
            <Typography variant='h3' align='center'>{title}</Typography>

            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, md: 8, lg: 12 }}>

                {BRAND.map((data, index) => {
                    return (
                        <Grid item xs={2} sm={4} md={2} py={1} key={index} >
                            <CustomCard>
                                <Link underline='none' href={`${data.href}`}>

                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                                        <StyledProductImg alt={data.key} src={data.img} />
                                    </Box>
                                </Link>
                            </CustomCard>
                        </Grid>
                    );
                })}
            </Grid>

        </Stack>
    )
}

FeaturedCategory.propTypes = { title: PropTypes.string }

export default FeaturedCategory
