import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../redux/products/productList';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Box,
  Stack,
  Button,
  Divider,
  ListItem,
  Container,
  Typography,
  Grid,
  Paper,
  styled,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
// sections
import { SearchForm, FeaturedSlide, SimpleSlider, Bestseller, ProductsByTarget, Suggestions, BlogReview, FeaturedCategory, TopSearch } from '../../sections/@client/home';
// components
import { GlassCardComponent } from '../../components/glassmorphism-card';
import SkeletonLoading from '../../components/skeleton/SkeletonLoading';
// _mock
import POSTS from '../../_mock/blog';
import { StyledButtonGreen, StyledButtonYellow } from '../../components/custom/CustomButton';

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------


const imgStyle = {
  width: "100%",
  height: "100%",
  borderRadius: '10px',
};

const imgStyle2 = {
  width: "30px",
  height: "30px",
  flexItem: '1',

};

export default function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const limit = matches ? 10 : 8;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productList.allProduct);
  const loading = useSelector((state) => state.products.productList.loading);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  if (loading) {
    return (
    <SkeletonLoading/>
    )
  }

  return (
    <>
      {/* ------------------------------------------------------------------------------- */}
      <Helmet>
        <title>MotobikeStore</title>
      </Helmet>
      {/* ------------------------------------------------------------------------------- */}

      <Container >

        <Stack spacing={4}>

          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              {/* <Box sx={{ borderRadius: '120px', height: '100%' }}> */}

              <SimpleSlider />
              {/* </Box> */}
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={2} >
                <Grid item xs={12} sx={{ display: { xs: 'none', md: 'none', lg: 'block'} }}>

                  <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1691824374/motobike_store/Berik_Onsite_EN_03__aiaewk.jpg' alt="sss" style={imgStyle} />
                </Grid>
                <Grid item xs={12}  sx={{ display: { sm:'none',md: 'none', lg: 'block'} }}>

                  <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1691823177/motobike_store/Berik_Onsite_EN_06__vo4dlx.jpg' alt="sss" style={imgStyle} />
                </Grid>
                <Grid item xs={12} sx={{ display: { xs: 'none', sm:'block',md: 'block' } }}>

                  <StyledButtonGreen variant="contained" sx={{height: '45px'}} fullWidth>Shop now</StyledButtonGreen>
                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12} md={12} sx={{ display: { xs: 'none',  sm: 'block' } }}>
              <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={6} md={3} >
                  <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img src=' https://res.cloudinary.com/drn7nawnc/image/upload/v1684945384/asset/doi_tra_trong_30_ngay_473ff3f60b_xhnfea.webp' alt="sss" style={imgStyle2} />
                    <Typography variant='body2' align='center' ml={1}>Return within 30 days from purchase</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={6} md={3} ><Stack direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img src=' https://res.cloudinary.com/drn7nawnc/image/upload/v1684945406/asset/mien_phi_van_chuyen_617a0730bd_zklmwq.webp' alt="sss" style={imgStyle2} />
                  <Typography variant='body2' align='center' ml={1}>Free shipping to delivery</Typography>
                </Stack>
                </Grid>

                <Grid item xs={6} md={3} >
                  <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img src='https://res.cloudinary.com/drn7nawnc/image/upload/v1684945429/asset/cam_ket_thuoc_chinh_hang_52a4c343f0_ak2jyd.webp' alt="sss" style={imgStyle2} />
                    <Typography variant='body2' align='center' ml={1}>Guarantee 100% genuine products</Typography>
                  </Stack>
                </Grid>
                
              </Grid>
            </Grid>
          </Grid>

          {/* danh mục nổi bật */}
          {/* ------------------------------------------------------------------------------- */}
          <FeaturedCategory title='Pick Your Ride' />


          {/* Sản Phẩm Nổi Bật Hôm Nay */}
          {/* ------------------------------------------------------------------------------- */}
          <FeaturedSlide title='Sản Phẩm Nổi Bật Hôm Nay' products={products} limit={15} />


          {/* Sản Phẩm Theo Đối Tượng */}
          {/* ------------------------------------------------------------------------------- */}
          {/* <GlassCardComponent dataTitle={dataTitleTarget} title='BẢO VỆ' content='Sức khoẻ người thân' />
           <ProductsByTarget title='Sản Phẩm Theo Đối Tượng' product={products} limit={limit} /> */}
          

          {/* Bán Chạy Nhất  */}
          {/* ------------------------------------------------------------------------------- */}
          {/* <Bestseller title='Bán Chạy Nhất' product={products} limit={10} /> */}



          {/* Gợi Ý Hôm Nay */}
          {/* ------------------------------------------------------------------------------- */}
          {/* <Suggestions title='Sản Phẩm Theo Đối Tượng' product={products} limit={10} /> */}

          {/* Góc Sức Khỏe */}
          {/* ------------------------------------------------------------------------------- */}
          {/* <GlassCardComponent dataTitle={dataTitleHealthCheck} title='Kiểm tra sức khoẻ' content='Dựa trên đánh giá từ các chuyên gia' />
          <BlogReview title='Góc Sức Khỏe' blog={POSTS} limit={7} /> */}

          {/* Tìm Kiếm Hàng Đầu */}
          {/* ------------------------------------------------------------------------------- */}
          {/* <TopSearch title='Tìm Kiếm Hàng Đầu' chipData={TopSearchChip} /> */}
          {/* end */}
          {/* ------------------------------------------------------------------------------- */}
          

        </Stack>
      </Container>
    </>
  )
} 