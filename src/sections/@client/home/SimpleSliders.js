// SECTIONS BANNER (Đầu trang)
// ------------------------------------------------------------------------
import React from 'react';
import Slider from 'react-slick';
import { Button } from '@mui/material';
// ------------------------------------------------------------------------

const sliderStyle = {
    // position: "absolute",
    // width: "100%",
    // left: 0
    height: "100%",
    width: "100%",
}
const divStyle = {
    // position: "relative",
    width: "100%",
    height: "100%",
};

const imgStyle = {
    width: "100%",
    height: "100%",
    borderRadius: '10px',
    objectFit: "cover"
};

const customArrowStyles = {
    position: "absolute",
    zIndex: 1,
};
// ------------------------------------------------------------------------

const CustomNextArrow = (props) => (
    <button
        {...props}
        style={{ ...customArrowStyles, right: "10px" }}
        aria-label="Next"
    />
);

const CustomPrevArrow = (props) => (
    <button
        {...props}
        style={{ ...customArrowStyles, left: "10px" }}
        aria-label="Previous"
    />
);
// ------------------------------------------------------------------------

function SimpleSlider() {
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000, // thời gian trễ là 3000ms (3 giây)
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <>
            <Slider {...settings} style={sliderStyle}>
                
                <div style={divStyle} >
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1691822125/motobike_store/image-1683707958-342-Chaser_banner_r5pzmu.jpg' alt="sss" style={imgStyle} />
                </div>
                <div style={divStyle}>
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1691822125/motobike_store/image-1677487829-462-Zard_Banner_baqeql.jpg' alt="sss" style={imgStyle} />
                </div>
                <div style={divStyle}>
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1691819101/motobike_store/image-1688377867-804-BeltsPulleysSprocketsChains_banner_sqt4i4.jpg' alt="sss" style={imgStyle} />
                </div>
                <div style={divStyle}>
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1691822125/motobike_store/image-1687332544-238-Kraus_banner_q9924o.jpg' alt="sss" style={imgStyle} />
                </div>
                <div style={divStyle}>
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1691822125/motobike_store/image-1685609272-862-Air_oil_filters_banner_x2xlc1.jpg' alt="sss" style={imgStyle} />
                </div>
            </Slider>  
        </>
    );
};

export default SimpleSlider;
