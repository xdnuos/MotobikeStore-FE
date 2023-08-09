import React from 'react';
import { useState } from 'react';
import { Typography, Grid, Stack, styled, ListItem, Divider, ListItemText, List } from '@mui/material';
import PropTypes from 'prop-types';
import Quantity from './Quantity';
import OptionList from './OptionList';


ProductInfoForm.propTypes = {
  product: PropTypes.object,
  price: PropTypes.number,
  unit: PropTypes.string,


}


/**
 * This function returns a form containing information about a product.
 * @param {object} product - The product for which to display information.
 * @returns {JSX.Element} - The JSX element containing the product information.
 */
function ProductInfoForm({ product ,price,unit}) {

  const [selectedIndex, setSelectedIndex] = useState(product?.units.length - 1);
// const[price, setPrice] = useState(product?.price);
// const[unit, setUnit] = useState(product?.unit);

const [selectedIdUnit, setSelectedIdUnit] = useState(product?.units[selectedIndex].id);

   

    
  return (
    <Grid container spacing={1}>

      {/* Brand */}
      <Grid container spacing={0}>
        {product?.brand !== "" ? (
          <Grid item xs={12} >
            <Stack direction={'row'} spacing={1}>
              <Typography variant="subtitle1">Thương hiệu: </Typography>
              <Typography variant="body1">{product?.brand}</Typography>
            </Stack>
          </Grid>
        ) : null
        }

        {/* Product name */}
        <Grid item xs={12}>
          <Typography color={'#022864'} variant="h4">{product?.name}</Typography>
        </Grid>
      </Grid>

      {/* Price */}
      <Grid item xs={12} sx={{ borderTop: '1px dashed lightgrey' }}>
        <Stack direction={'row'} alignItems="center" spacing={1}>
          <Typography variant="h3">{!price ? product?.price : price}đ</Typography>
          <Typography pt={1} color={'text.secondary'} variant="h6">/&nbsp;{!unit ? product?.unit : unit}</Typography>
        </Stack>
      </Grid>

      {/* Category */}
      <Grid item xs={12} >
        <Stack direction={'row'} spacing={1}>
          <Typography variant="subtitle1">Danh mục: </Typography>
          <Typography variant="body1">
            {product?.category}
          </Typography>
        </Stack>
      </Grid>

      {product?.dosageForm !== "" ? (
        <Grid item xs={12} >
          <Stack direction={'row'} spacing={1}>
            <Typography variant="subtitle1">Dạng bào chế:</Typography>
            <Typography variant="body1">{product?.dosageForm}</Typography>
          </Stack>
        </Grid>
      ) : null
      }


      {/* Packaging */}
      {product?.specifications !== "" ? (
        <Grid item xs={12} >
          <Stack direction={'row'} spacing={1}>
            <Typography variant="subtitle1">Quy cách:</Typography>
            <Typography variant="body1">{product?.specifications}</Typography>
          </Stack>
        </Grid>

      ) : null}


      {/* Health benefits */}

      {/* Country of origin */}
      {product?.origin !== "" ? (
        <Grid item xs={12} >
          <Stack direction={'row'} spacing={1}>
            <Typography variant="subtitle1">Xuất xứ thương hiệu:</Typography>
            <Typography variant="body1">{product?.origin} </Typography>
          </Stack>
        </Grid>
      ) : null
      }

      {/* Manufacturer */}
      {product?.manufacturer !== "" ? (
        <Grid item xs={12} >
          <Stack direction={'row'} spacing={1}>
            <Typography variant="subtitle1">Nhà sản xuất:</Typography>
            <Typography variant="body1">{product?.manufacturer} </Typography>
          </Stack>
        </Grid>
      ) : null}


      {/* short_description */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          Công dụng:
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: product?.shortDescription }}>
          </Typography>
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Grid>


     

    </Grid>
  );
};


export default ProductInfoForm;
