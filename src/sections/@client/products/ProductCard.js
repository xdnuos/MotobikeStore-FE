import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Chip, Skeleton } from '@mui/material';

import { styled } from '@mui/material/styles';

// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
// ----------------------------------------------------------------------

export const CustomCard = styled(Card)(() => ({
  position: 'relative',
  transition: `all 0.3s ease-in-out`,
  '&:hover': {
    transform: `scale(1.07)`,
    boxShadow: `20px 20px 50px rgba(0, 0, 0, 0.6), 
                -20px -20px 50px rgba(255, 255, 255, 0.2)`
  }
}));

const StyledProductImg = styled('img')({
  padding: 16,
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const textStyle = {
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  lineHeight: 1.2,
  height: '2.4em', // 2 lines * line-height of 1.2
};
const StyledChipContainer = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '8px',

});
// const StyledChip = styled(Chip)({
//   backgroundColor: 'rgb(255 171 0)',
// color: '#fff',
//   marginBottom: '4px',
// });
// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
  sx: PropTypes.object,
  loading: PropTypes.bool,
};


export default function ShopProductCard({ product = [], sx, loading  }) {


  const { productID, name, images, price, manufacturer, arrival } = product;


  return (
    <CustomCard sx={sx} >
      {loading ? <Skeleton variant="rectangular" sx={{ width: "auto", height: "250px", p: "16px" }} /> :
        <Link underline='none' component={RouterLink} to={`/product-details/${productID}`}>
          <Box sx={{ pt: '100%', position: 'relative' }} >
            <StyledProductImg alt={name} src={"https://res.cloudinary.com/drn7nawnc/image/upload/v1691867460/motobike_store/den-pha-led-2-tang-zhipat-cho-yamaha-y125zr-yaz-products-2015_sc7g6j.jpg"} />
          </Box>
        </Link>
      }
      <Stack spacing={1} sx={{ p: '8px 16px 16px 16px' }} >
        {loading ?
          <>
            <Skeleton variant="rectangular" sx={{ width: "auto", height: "20px" }} />
            <Skeleton variant="rectangular" sx={{ pt: "4px", width: "auto", height: "20px" }} />
          </>
          :
          <Link color="inherit" underline="none" component={RouterLink} to={`/product-details/${productID}`}>
            <Typography color={'text.primary'} variant="subtitle1" style={textStyle}  >
              {name}
            </Typography>
          </Link>}



        <StyledChipContainer>
          {!loading && arrival !== null && <Label variant="filled" color={"warning"}>🔥 {arrival}</Label>}
          {!loading && manufacturer !== null && <Label variant="filled" color={"info"} >{manufacturer}</Label>}
        </StyledChipContainer>

        <Chip size="small" label={

          loading ?

            <Skeleton variant="rectangular" sx={{ width: "auto", height: "10px" }} />

            :
            <Typography variant="body1"
              textAlign="end"
              color={'primary.main'}>
              {fCurrency(price)} đ
            </Typography>} />
      </Stack>


    </CustomCard>
  );
}
