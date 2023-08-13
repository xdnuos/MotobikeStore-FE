// SECTIONS SẢN PHẨM NỔI BẬT HÔM NAY (slider)
// ------------------------------------------------------------------------
import React from "react";
import Slider from "react-slick";
import PropTypes from 'prop-types';
// @mui
import { Button, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';

import { ProductCard } from "../products";
import Iconify from "../../../components/iconify/Iconify";

// ----------------------------------------------------------------------

const customArrowStyles = {
    position: "absolute",
    zIndex: 1,
};

const CustomNextArrow = (props) => (
    <Button
        {...props}
        style={{ ...customArrowStyles, right: "-32px" }}
        aria-label="Next"
    />
);

const CustomPrevArrow = (props) => (
    <Button
        {...props}
        style={{ ...customArrowStyles, left: "-32px" }}
        aria-label="Previous"
    />
);

FeaturedSlide.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array.isRequired,
    limit: PropTypes.number,
    loading: PropTypes.bool,
};
// ------------------------------------------------------------------------

function FeaturedSlide({ title, products = [], limit ,loading}) {
   
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));
    const s = matches ? 5 : 4;

    const settings = {

        infinite: false,
        speed: 500,
        slidesToShow: s,    
        slidesToScroll: s,

        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };
    return (
        <>
            <Stack sx={{ background: "#e0edfe", pt: 2, pb: 2, borderRadius: 2 }} >
                <Typography variant='h4' mb={2}>
                    <Iconify icon="ri:shield-star-fill" sx={{ pt: 0.2, mr: 1.5, ml: 1.5, color: '#fff', background: '#1565c0', borderRadius: "50%" }} /> {title}</Typography>
                <Slider {...settings} style={{ margin: '0 10px' }}>
                    {products.slice(0, limit).map((data) => (
                        <ProductCard product={data} sx={{ m: '0 10px' }} loading={loading} key={data?.productID} />
                    ))}
                </Slider>
            </Stack>

        </>
    );
}
export default FeaturedSlide;