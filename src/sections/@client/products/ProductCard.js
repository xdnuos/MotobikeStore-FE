import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Chip } from '@mui/material';

import { styled } from '@mui/material/styles';

// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
// ----------------------------------------------------------------------

const CustomCard = styled(Card)(() => ({
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
const StyledChip = styled(Chip)({
  backgroundColor: 'rgb(255 171 0)',
color: '#000',
  marginBottom: '4px',
});
// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
  sx: PropTypes.object,
};

export default function ShopProductCard({ product = [], sx }) {
  const { productID, name, images, price, manufacturer, arrival } = product;

  return (
    <CustomCard sx={sx} >
      <Link underline='none' component={RouterLink} to={`/product-details/${productID}`}>
        <Box sx={{ pt: '100%', position: 'relative' }} >
          <StyledProductImg alt={name} src={"https://res.cloudinary.com/drn7nawnc/image/upload/v1691867460/motobike_store/den-pha-led-2-tang-zhipat-cho-yamaha-y125zr-yaz-products-2015_sc7g6j.jpg"} />
        </Box>
      </Link>
      <Stack spacing={1} sx={{ p: '16px' }} >

        <Link color="inherit" underline="none" component={RouterLink} to={`/product-details/${productID}`}>
          <Typography color={'text.primary'} variant="subtitle1" style={textStyle}  >
            {name}
          </Typography>
        </Link>



        <StyledChipContainer>
          {arrival !== null && <StyledChip size="small" label={arrival} />}
          {manufacturer !== null && <StyledChip size="small" label={manufacturer} />}
        </StyledChipContainer>

        <Chip size="small" label={
          <Typography variant="body1"
            textAlign="end"
            color={'primary.main'}>
            {fCurrency(price)} đ
          </Typography>} />
      </Stack>

    </CustomCard>
  );
}
