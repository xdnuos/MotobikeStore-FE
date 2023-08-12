import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------
ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  limit: PropTypes.number,
};

export default function ProductList({ products, limit, ...other }) {
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
