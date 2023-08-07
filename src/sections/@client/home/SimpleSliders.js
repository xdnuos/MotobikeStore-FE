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
                <div style={divStyle}>
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1684945510/asset/BANNER_WEB_PC_805_X246_2_f75c7cc436_cip4mw.webp' alt="sss" style={imgStyle} />
                </div>
                <div style={divStyle} ><a href="/blog">
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1684945533/asset/Banner_Web_PC_1610x492_b976d8fc91_l9mkhw.webp' alt="sss" style={imgStyle} />
                </a></div>
                <div style={divStyle}>
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1684945555/asset/Banner_Web_PC_1610x492_388508e270_hhbfjm.webp' alt="sss" style={imgStyle} />
                </div>
                
                <div style={divStyle}>
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1684945574/asset/Banner_Destop_cb5af066c4_cfqzf3.webp' alt="sss" style={imgStyle} />
                </div>
                <div style={divStyle}>
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1684945600/asset/Banner_Destop_2d9531d01d_slwirv.webp' alt="sss" style={imgStyle} />
                </div>
            </Slider>  
        </>
    );
};

export default SimpleSlider;
