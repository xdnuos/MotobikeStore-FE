import React from "react";
import { useState } from "react";
import {
  Typography,
  Grid,
  Stack,
  styled,
  ListItem,
  Divider,
  ListItemText,
  List,
} from "@mui/material";
import PropTypes from "prop-types";
import Quantity from "./Quantity";
import OptionList from "./OptionList";
import Label from "../../../../components/label/Label";

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
function ProductInfoForm({ product, price }) {
  return (
    <Grid container spacing={1}>
      {/* Brand */}

      <Grid container spacing={0}>
      {product?.arrival !== "" && product?.arrival !== null && product?.arrival !== undefined &&
        <Grid item xs={12} sx={{mb:1}}>
          <div style={{ display: "flex", direction: "row", justifyContent: "right" }}>
            <Label color="success">
              🔥 {product?.arrival}
            </Label>
          </div>
        </Grid>
        }
        <Grid item xs={12}>
          <Typography color={"#022864"} variant="h4">
            {product?.name}
          </Typography>
        </Grid>
      </Grid>

      {/* Price */}
      <Grid item xs={12} sx={{ borderTop: "1px dashed lightgrey" }}>
        <Stack direction={"row"} alignItems="center" spacing={1}>
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
        </Stack>
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
            <Label sx={{fontSize: "15px"}} color="info">{product?.manufacturer}</Label>
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
