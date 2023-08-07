// SECTIONS DANH MỤC NỔI BẬT
// ------------------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Link, Stack, Typography } from '@mui/material';

// ------------------------------------------------------------------------

const FEATURED_CATEGORY = [
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946375/asset/than_kinh_nao_level_2_b0cc93af6f_ivz7if.webp", title: "Thần kinh não", quantity: '120' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946415/asset/tpcn_vitamin_khoang_chat_level_2_91b99b5a64_xjfcc1.webp", title: "Vitamin & Khoáng chất", quantity: '53' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946446/asset/suc_khoe_tim_mach_level_2_1fc9d156fd_mdda4f.webp", title: "Sức khoẻ tim mạch", quantity: '53' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946459/asset/tang_suc_de_khang_mien_dich_level_3_0ae00ae1b9_n5qlia.webp", title: "Tăng sức đề kháng, miễn dịch", quantity: '120' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946475/asset/ho_tro_tieu_hoa_level_2_df7385ed6e_ocveox.webp", title: "Hỗ trợ tiêu hóa", quantity: '87' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946486/asset/sinh_li_noi_tiet_to_ec55ecdc29_x1nqta.webp", title: "Sinh lý - Nội tiết tố", quantity: '58' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946570/asset/dinh_duong_level_2_6b1af6b735_jwypu2.webp", title: "Dinh dưỡng", quantity: '97' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946578/asset/ho_tro_dieu_tri_level_2_00d86ca048_gdzrqg.webp", title: "Hỗ trợ điều trị", quantity: '75' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946590/asset/giai_phap_lan_da_level_2_24c57abcd0_l5ppmc.webp", title: "Giải pháp làn da ", quantity: '90' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946609/asset/cham_soc_da_mat_level_2_83d5e5f264_nib8ea.webp", title: "Chăm sóc da mặt", quantity: '120' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946619/asset/ho_tro_lam_dep_level_2_87dfb56752_xwbecn.webp", title: "Hỗ trợ làm đẹp", quantity: '66' },
    { img: "https://res.cloudinary.com/drn7nawnc/image/upload/v1684946636/asset/ho_tro_tinh_duc_level_2_d48129bdca_n8ilwm.webp", title: "Hỗ trợ tình dục", quantity: '69' },
  ];
  
const CustomCard = styled(Card)(() => ({
    transition: `all 0.3s ease-in-out`,
    '&:hover': {
      transform: `scale(1.07)`,
      boxShadow: `20px 20px 50px rgba(0, 0, 0, 0.6), 
                  -20px -20px 50px rgba(255, 255, 255, 0.2)`
    }
  }));
const StyledProductImg = styled('img')({
    // top: 8,
    width: '28px',
    height: '28px',
    // position: 'absolute',
    margin:2
  });
  const textStyle = {
    height: '50px',
    overflow: 'hidden',
    display: 'block',
    textOverflow: 'ellipsis',
    
  };
// ------------------------------------------------------------------------

function FeaturedCategory({title}) {
    return (
        <Stack spacing={1}>
            <Typography variant='h3' align='center'>{title}</Typography>

            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, md: 8 ,lg:12}}>

                {FEATURED_CATEGORY.map((data, index) => {
                    return (
                        <Grid item xs={2} sm={4} md={2} p={1} key={index} >
                            <CustomCard>
                            <Link underline='none' href='/'>
                                <Box sx={{ pt: '24px', position: 'relative', display: 'flex', justifyContent: 'center' }}>

                                    <StyledProductImg alt={data.title} src={data.img} />
                                </Box>

                                <Stack p={'14px 14px 24px 14px'} >
                                    <Typography variant="subtitle1" textAlign={'center'} color={'text.primary'} style={textStyle}  >
                                        {data.title}
                                    </Typography>
                                    <Typography textAlign={'center'} variant="body1" color={'text.secondary'}>{data.quantity}&nbsp;Sản phẩm
                                    </Typography>

                                </Stack>
                            </Link>
                            </CustomCard>
                        </Grid>
                    );
                })}
            </Grid>

        </Stack>
    )
}

FeaturedCategory.propTypes = {title: PropTypes.string}

export default FeaturedCategory
