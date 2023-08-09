
import React, { useState, useEffect } from 'react';

import Iconify from '../../../../components/iconify/Iconify';
import { styled } from '@mui/material/styles';

import Slider from "react-slick";
import { IconButton, Typography } from '@mui/material';
import { Image } from 'antd';
import { PropTypes } from 'prop-types';

const styles = {
  thumbnailSliderWrap: {

    paddingLeft: '10%',
    paddingRight: '10%',
    marginTop: '15px',
    height: '100%',
    // boxShadow: 'inset -10px 0 5px -5px black, inset 10px 0 5px -5px black',
  },
  slickSlideImg: {
    width: '100%',
    paddingLeft: '8px',
    paddingRight: '8px'
  },
};
const styleLai = {
  width: '90%',
  height: '90%',
}

const SliderWrapper = styled('div')({
  position: 'relative',
});

const ButtonWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 2,
  right: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2),
  background:'rgb(22 28 36 / 48%)',
  borderRadius:'5px'
}));


const IconButtonArrow = styled(IconButton)({
  color:'#c2c3c5',
  '&:hover': { color:'white'} 
});


// ProductImg.propTypes = {
//   slidesData: PropTypes.array
// }
export default function ProductImg( props ) {
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
    asNavFor: '.slider-nav',
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

  const settingsThumbs = {
    className: "center",
    slidesToShow: props.data?.length > 5 ? 5 : props.data?.length,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "10px",
  };

  // const slidesData = [
  //   {
  //     id: 1,
  //     img: 'https://nhathuoclongchau.com.vn/images/product/2022/06/00022782-sua-rua-mat-nghe-nano-ngua-mun-neo-cleanser-86g-1735-62ae_large.jpg'
  //   }, {
  //     id: 2,
  //     img: 'https://nhathuoclongchau.com.vn/images/product/2022/06/00017326-sebiaclear-gel-moussant-200ml-svr-7018-62ae_large.JPG'
  //   }, {
  //     id: 3,
  //     img: 'https://nhathuoclongchau.com.vn/images/product/2022/06/00028445-dao-cao-rau-gillette-super-thin-can-vang-goi-2-cai-1139-62b4_large.jpg'
  //   }, {
  //     id: 4,
  //     img: 'https://nhathuoclongchau.com.vn/images/product/2022/06/00030434-active-lung-400mg-new-nordic-2x15-5527-62af_large.jpg'
  //   }, {
  //     id: 5,
  //     img: 'https://nhathuoclongchau.com.vn/images/product/2022/05/00345910-xit-hong-xuyen-tam-lien-hai-thuong-vuong-30ml-5572-6272_large.jpg'
  //   }, {
  //     id: 6,
  //     img: 'https://nhathuoclongchau.com.vn/images/product/2022/07/00500213-bcs-safefit-freezer-max-s52-3-cai-gel-mat-lanh-sang-khoai-6230-62c3_large.jpg'
  //   },
  // ];


  return (

    <div className="slider-wrapper">
 <SliderWrapper>
      <Slider
        {...settingsMain}
        asNavFor={nav2}
        ref={slider => (setSlider1(slider))}
         
      >
        {props.data?.map((slide,index) =>
      

          <div className="slick-slide" key={index}>
            <img className="slick-slide-image" style={styles.slickSlideImg} src={`${slide.filePath}`} alt='product' />
          </div>
        

        )}

      </Slider>
      <ButtonWrapper>
        <IconButtonArrow sx={{p:'5px 6px 5px 3px '}} onClick={handlePrevClick}>
          <Iconify icon={'ic:sharp-keyboard-arrow-left'} />
        </IconButtonArrow>
        <Typography variant='subtitle2' sx={{ color: 'white', }}>
          {currentSlide} / {props.data?.length}
        </Typography>
        <IconButtonArrow sx={{p:'5px 3px 5px 6px'}} onClick={handleNextClick}>
          <Iconify icon={'ic:sharp-keyboard-arrow-right'} />
        </IconButtonArrow>
      </ButtonWrapper>
</SliderWrapper>


      <div style={styles.thumbnailSliderWrap} className="thumbnail-slider-wrap">
        <Slider
          {...settingsThumbs}
          asNavFor={nav1}
          ref={slider => (setSlider2(slider))}>

          {props.data?.map((slide,index) =>

            <div className="slick-slide" key={index}>

              <img style={styles.slickSlideImg} className="slick-slide-image" src={`${slide.filePath}`} alt='product' loading="lazy"/>
            </div>
          )}
        </Slider>
      </div>
    </div>

  );
}

// export default ProductImg;