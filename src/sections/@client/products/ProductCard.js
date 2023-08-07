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
  transition: `all 0.3s ease-in-out`,
  '&:hover': {
    transform: `scale(1.07)`,
    boxShadow: `20px 20px 50px rgba(0, 0, 0, 0.6), 
                -20px -20px 50px rgba(255, 255, 255, 0.2)`
  }
}));

const StyledProductImg = styled('img')({
  padding:16,
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
// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
  sx: PropTypes.object,
};

export default function ShopProductCard({ product = [], sx }) {
  const { id, name, asset, price, specifications, unit } = product;

  return (
    <CustomCard sx={sx} >
      <Link underline='none' component={RouterLink} to={`/product-details/${id}`}>
        <Box sx={{ pt: '100%', position: 'relative' }} >
          <StyledProductImg alt={name} src={asset} />
        </Box>
        </Link>
      <Stack spacing={1} sx={{ p: '16px' }} >

        <Link color="inherit" underline="none" component={RouterLink} to={`/product-details/${id}`}>
          <Typography  color={'text.primary'} variant="subtitle1" style={textStyle}  >
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center">
          <Typography variant="body1"
            color={'primary.main'}>
            {fCurrency(price)}đ

            <Typography
              component="span"
              variant="body1"
              color={'text.secondary'}
            >
              &nbsp;/&nbsp;{unit}
            </Typography>
          </Typography> 
        </Stack> 

       <Chip size="small" label={specifications} />
      </Stack>
     
    </CustomCard>
  );
}
