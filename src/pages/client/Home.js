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
const TopSearchChip = [
  { key: 0, label: 'Tìm kiếm nhiều', href: '#' },
  { key: 1, label: 'Mua nhiều', href: '#' },
  { key: 2, label: 'Sữa cho cả nhà', href: '#' },
  { key: 3, label: 'Da sáng dáng xinh', href: '#' },
  { key: 4, label: 'Chồng khỏe vợ vui', href: '#' },
  { key: 5, label: 'Phòng sốt xuất huyết', href: '#' },
  { key: 6, label: 'Phòng bệnh mùa hè', href: '#' },
];

const dataTitleTarget = [
  { title: 'MẸ VÀ BÉ', href: '/products', img: 'https://res.cloudinary.com/drn7nawnc/image/upload/v1684950515/asset/auijh-removebg-preview_sbi3bm.png' },
  { title: 'NGƯỜI CAO TUỔI', href: '#', img: 'https://res.cloudinary.com/drn7nawnc/image/upload/v1684950557/asset/happy-senior-couple-elderly-man-woman-smiling-flat-vector-illustration-old-people_511716-121_x0ewex.jpg' },
  { title: 'TRẺ EM', href: '#', img: 'https://res.cloudinary.com/drn7nawnc/image/upload/v1684950592/asset/teacher-holding-little-students-by-their-hands_52683-45012_uxamiz.jpg' },
]

const dataTitleHealthCheck = [
  { title: 'Khả năng trào ngược dạ dày', href: '/products', img: 'https://res.cloudinary.com/drn7nawnc/image/upload/v1684950930/asset/Daday_55938691ef_zpzsja.webp' },
  { title: 'Nguy cơ phụ thuộc bình xịt cắt cơn', href: '#', img: 'https://res.cloudinary.com/drn7nawnc/image/upload/v1684950866/asset/Phoi_0ff95eb627_acuj9v.webp' },
  { title: 'Sàng lọc nguy cơ mắc bệnh tim mạch', href: '#', img: 'https://res.cloudinary.com/drn7nawnc/image/upload/v1684950828/asset/Timmach2_c75a0affc5_rqnc9j.webp' },
]


const StyledPaper = styled(Paper)(() => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '10px',

}));
const StyledDiv = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));


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
          {/* <FeaturedSlide title='Sản Phẩm Nổi Bật Hôm Nay' products={products} limit={15} /> */}


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