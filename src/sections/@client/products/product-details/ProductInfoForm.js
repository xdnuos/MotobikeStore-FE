import React from "react";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import {
  Typography,
  Grid,
  Stack,
  ListItem,
  Divider,
  ListItemText,
  List,
  Rating,
} from "@mui/material";
import PropTypes from "prop-types";
import Quantity from "./Quantity";
import OptionList from "./OptionList";
import Label from "../../../../components/label/Label";
import Iconify from "../../../../components/iconify/Iconify";
import { Rate } from "antd";

ProductInfoForm.propTypes = {
  product: PropTypes.object,
  price: PropTypes.number,
  unit: PropTypes.string,
};

/**
 * This function returns a form containing information about a product.
 * @param {object} product - The product for which to display information.
 * @returns {JSX.Element} - The JSX element containing the product information.
 */

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#faaf00',
  }
});

function ProductInfoForm({ product, price }) {
  const renderStar = (index, value) => {
    const isFilled = index + 1 <= value;
    const starColor = isFilled ? "#faaf00" : "#cad1d7";

    return (
      <span style={{ color: starColor }}>
        {isFilled ? "\u2605" : "\u2606"}
      </span>
    );
  };

  return (
    <Grid container spacing={1}>
      {/* Brand */}

      <Grid container spacing={0}>



        <Grid item xs={12}>
          <Stack direction={"row"} justifyContent={"left"} alignItems={"center"} spacing={1}>
            {product?.arrival !== "" && product?.arrival !== null && product?.arrival !== undefined &&
              <Label color="success">
                🔥 {product?.arrival}
              </Label>
            }
            <Typography color={"#022864"} variant="h4">
              {product?.name}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} py={1.5}>
          <div style={{ display: "flex", direction: "row", alignItems: "end" }}>
          <Rate allowHalf disabled  style={{ color: "#faaf00" }}   defaultValue={product?.rating} /> 
            <Typography color='#808384' variant="body2" textAlign={"end"} sx={{ ml: 1 }}>
              (9.12k reviews)
            </Typography>
            {/* <Iconify icon="bi:star-fill" sx={{ ml: 1 }} /> */}
          </div>
        </Grid>

      </Grid>

      {/* Price */}
      <Grid item xs={12} sx={{ borderTop: "1px dashed lightgrey" }}>
        <Typography variant="h3">
          {!price
            ? product?.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
            : price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}

        </Typography>

      </Grid>

      {/* Category */}
      <Grid item xs={12}>
        <Stack direction={"row"} spacing={1}>
          <Typography variant="subtitle1">Category: </Typography>
          <Typography variant="body1">
            {product?.categories.map((category, index) => (
              <span key={index}>
                {index !== 0 && " • "}
                {category}
              </span>
            ))}
          </Typography>
        </Stack>
      </Grid>

      {/* Manufacturer */}
      {product?.manufacturer !== null && product?.manufacturer !== "" &&
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={1}>
            <Typography variant="subtitle1">Manufacturer:</Typography>
            <Label sx={{ fontSize: "15px" }} color="info">{product?.manufacturer}</Label>
          </Stack>
        </Grid>}

      {/* short_description */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          Description:
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: product?.shortDescription }}
          ></Typography>
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ borderStyle: "dashed" }} />
      </Grid>
    </Grid>
  );
}

export default ProductInfoForm;
