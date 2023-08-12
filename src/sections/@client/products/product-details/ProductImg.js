import React, { useState, useEffect } from "react";

import Iconify from "../../../../components/iconify/Iconify";
import { styled } from "@mui/material/styles";

import Slider from "react-slick";
import { IconButton, Typography } from "@mui/material";
import { Image } from "antd";
import { PropTypes } from "prop-types";

const styles = {
  thumbnailSliderWrap: {
    paddingLeft: "10%",
    paddingRight: "10%",
    marginTop: "15px",
    height: "100%",
  },
  slickSlideImg: {
    width: "100%", // Đảm bảo ảnh rộng 100% trong container
    height: "auto", // Đảm bảo tỷ lệ hình ảnh không bị méo
    objectFit: "cover", // Cắt và căn giữa hình ảnh
    maxHeight: "500px", // Điều chỉnh chiều cao tối đa của ảnh
  },
};

const SliderWrapper = styled("div")({
  position: "relative",
});

const ButtonWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 2,
  right: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: theme.spacing(2),
  background: "rgb(22 28 36 / 48%)",
  borderRadius: "5px",
}));

const IconButtonArrow = styled(IconButton)({
  color: "#c2c3c5",
  "&:hover": { color: "white" },
});

// ProductImg.propTypes = {
//   slidesData: PropTypes.array
// }
function ProductImg(props) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const handleAfterChange = (current) => {
    setCurrentSlide(current + 1);
  };

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    asNavFor: ".slider-nav",
    beforeChange: (current, next) => {
      setCurrentSlide(next + 1);
    },
    afterChange: handleAfterChange,
  };

  const handlePrevClick = () => {
    slider1.slickPrev();
  };

  const handleNextClick = () => {
    slider1.slickNext();
  };
  return (
    <div className="slider-wrapper">
      <SliderWrapper>
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
        >
          {props.data?.map((slide, index) => (
            <div className="rect-img-container" key={index}>
              <img
                className="rect-img"
                src={`${process.env.REACT_APP_IMAGE_SERVER + slide}`}
                alt="product"
              />
            </div>
          ))}
        </Slider>
        <ButtonWrapper>
          <IconButtonArrow
            sx={{ p: "5px 6px 5px 3px " }}
            onClick={handlePrevClick}
          >
            <Iconify icon={"ic:sharp-keyboard-arrow-left"} />
          </IconButtonArrow>
          <Typography variant="subtitle2" sx={{ color: "white" }}>
            {currentSlide} / {props.data?.length}
          </Typography>
          <IconButtonArrow
            sx={{ p: "5px 3px 5px 6px" }}
            onClick={handleNextClick}
          >
            <Iconify icon={"ic:sharp-keyboard-arrow-right"} />
          </IconButtonArrow>
        </ButtonWrapper>
      </SliderWrapper>
    </div>
  );
}

export default ProductImg;
