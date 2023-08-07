// import Iconify from '../iconify/Iconify';
// import { styled } from '@mui/material/styles';
// import Slider from 'react-slick';
// import { IconButton } from '@mui/material';
// import { useState } from 'react';

// const SliderWrapper = styled('div')({
//   position: 'relative',
// });


// const SlideWrapper = styled('div')(({ theme }) => ({
//   '& img': {
//     width: '100%',
//     height: 'auto',
//   },
// }));

// const ButtonWrapper = styled('div')(({ theme }) => ({
//   position: 'absolute',
//   bottom: 0,
//   right: 0,
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   margin: theme.spacing(2),
//   background:'#00000066'
// }));

// const MyCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(1);

//   const handleAfterChange = (current) => {
//     setCurrentSlide(current + 1);
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     beforeChange: (current, next) => {
//       setCurrentSlide(next + 1);
//     },
//     afterChange: handleAfterChange,
//   };

//   let slider;

//   const handlePrevClick = () => {
//     slider.slickPrev();
//   };

//   const handleNextClick = () => {
//     slider.slickNext();
//   };

//   return (
//     <SliderWrapper>
//       <Slider ref={(c) => (slider = c)} {...settings}>
//         {slidesData.map((child, index) => (
//           <SlideWrapper key={index}><img src={`${child.img}`} alt='product' /></SlideWrapper>
//         ))}

//       </Slider>

//       <ButtonWrapper>
//         <IconButton onClick={handlePrevClick}>
//           <Iconify icon={'material-symbols:arrow-back-ios-new'} />
//         </IconButton>
//         <div style={{ color: 'black', }}>
//           {currentSlide} / {slidesData.length}
//         </div>
//         <IconButton onClick={handleNextClick}>
//           <Iconify icon={'material-symbols:keyboard-arrow-right'} />
//         </IconButton>
//       </ButtonWrapper>
//     </SliderWrapper>
//   );
// };

// export default MyCarousel;

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