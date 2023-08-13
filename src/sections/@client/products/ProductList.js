import PropTypes from 'prop-types';
// @mui
import { Chip, Grid, Skeleton, Stack } from '@mui/material';
import ShopProductCard, { CustomCard } from './ProductCard';

// ----------------------------------------------------------------------
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  limit: PropTypes.number,
  loading: PropTypes.bool,
};

export default function ProductList({ products, limit, loading, ...other }) {
  if (loading) {
    return (
      <Grid container spacing={3} {...other}>

        {Array.from(new Array(limit)).map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3} lg={2.4}>
            <CustomCard>
              <Skeleton variant="rectangular" sx={{ width: "auto", height: "250px", p: "16px" }} />
              <Stack spacing={1} sx={{ p: '8px 16px 16px 16px' }} >
                <Skeleton variant="rectangular" sx={{ width: "auto", height: "20px" }} />
                <Skeleton variant="rectangular" sx={{ pt: "4px", width: "auto", height: "20px" }} />
                <Chip size="small" label={<Skeleton variant="rectangular" sx={{ width: "auto", height: "10px" }} />} />
              </Stack>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={3} {...other}>
      {products?.slice(0, limit).map((product) => (
        <Grid key={product?.productID} item xs={12} sm={6} md={3} lg={2.4}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
