import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "src/redux/products/productAction";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Paper,
  Autocomplete,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import { UpLoadImg } from "./UpLoadImg";
function convertArray(arr) {
  if (arr == null) {
    return null;
  }
  return arr.map((item) => Object.values(item)[0]);
}
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  sku: yup.string().required("sku is required"),
  stock: yup.string().required("stock is required"),
});
function ProductForm({ categories, tags, manufacturer }) {
  const [categoryIDs, setCategoryIDs] = useState("");
  const [tagIDs, setTagIDs] = useState("");
  const [manufacturerID, setManufacturerID] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      sku: "",
      stock: 0,
      price: 0,
      shortDescription: "",
      fullDescription: "",
      arrival: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      // const isValid = await validationSchema.isValid(values);
      // if (isValid) {
      //   dispatch(
      //     addProduct({
      //       name: values.name,
      //       sku: values.sku,
      //       stock: values.stock,
      //     })
      //   );
      // } else {
      //   console.log("Form data is invalid");
      // }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ borderRadius: 2, p: 3 }}
          >
            <Stack spacing={2}>
              <TextField
                fullWidth
                name="name"
                placeholder="Enter product name"
                label="Product Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  name="sku"
                  sx={{ width: "50ch" }}
                  placeholder="SKU"
                  label="SKU"
                  variant="outlined"
                  value={formik.values.sku}
                  onChange={formik.handleChange}
                  error={formik.touched.sku && Boolean(formik.errors.sku)}
                  helperText={formik.touched.sku && formik.errors.sku}
                />
                <TextField
                  type="number"
                  sx={{ width: "50ch" }}
                  placeholder="Quantity"
                  label="Quantity"
                  variant="outlined"
                  name="stock"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  error={formik.touched.stock && Boolean(formik.errors.stock)}
                  helperText={formik.touched.stock && formik.errors.stock}
                />
              </Stack>
              <TextField
                required
                fullWidth
                placeholder="Enter short description"
                label="Short Description"
                multiline
                variant="outlined"
                name="shortDescription"
                value={formik.values.shortDescription}
                onChange={formik.handleChange}
                error={
                  formik.touched.shortDescription &&
                  Boolean(formik.errors.shortDescription)
                }
                helperText={
                  formik.touched.shortDescription &&
                  formik.errors.shortDescription
                }
              />
              <TextField
                required
                fullWidth
                placeholder="Enter full description"
                label="Full Description"
                multiline
                rows={4}
                variant="outlined"
                name="fullDescription"
                value={formik.values.fullDescription}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullDescription &&
                  Boolean(formik.errors.fullDescription)
                }
                helperText={
                  formik.touched.fullDescription &&
                  formik.errors.fullDescription
                }
              />
            </Stack>

            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Images
            </Typography>

            <UpLoadImg />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  onChange={(e, value) => setCategoryIDs(value)}
                  options={categories}
                  getOptionLabel={(categories) => categories.name}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
                <Autocomplete
                  name="tags"
                  multiple
                  id="tags-outlined"
                  options={tags}
                  getOptionLabel={(tags) => tags.name}
                  filterSelectedOptions
                  onChange={(e, value) => setTagIDs(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" />
                  )}
                />
                <FormControl fullWidth name="manufacturer">
                  <InputLabel htmlFor="grouped-native-select">
                    Manufacturer
                  </InputLabel>
                  <Select
                    id="grouped-native-select"
                    label="Grouping"
                    value={manufacturerID}
                    onChange={(e) => setManufacturerID(e.target.value)}
                  >
                    <option aria-label="None" value="" />
                    {manufacturer.map((manufacturer) => (
                      <option
                        key={manufacturer.manufacturerID}
                        value={manufacturer.manufacturerID}
                      >
                        {manufacturer.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth name="arrival">
                  <InputLabel htmlFor="grouped-native-select">
                    Arrival
                  </InputLabel>
                  <Select
                    native
                    id="grouped-native-select"
                    label="Grouping"
                    value={formik.values.arrival}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.arrival && Boolean(formik.errors.arrival)
                    }
                    helperText={formik.touched.arrival && formik.errors.arrival}
                  >
                    <option aria-label="None" value="" />
                    <option aria-label="NEW" value="NEW">
                      NEW
                    </option>
                    <option aria-label="CHEAP" value="CHEAP">
                      CHEAP
                    </option>
                  </Select>
                </FormControl>
              </Stack>
            </Paper>
            <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
              <Stack spacing={2}>
                {/* giá bán */}
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Sale Price
                  </InputLabel>
                  <OutlinedInput
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    startAdornment={
                      <InputAdornment position="start">VNĐ</InputAdornment>
                    }
                    label="Sale Price"
                  />
                </FormControl>
              </Stack>
            </Paper>
            <Button
              fullWidth
              size="large"
              variant="contained"
              color="success"
              type="submit"
            >
              Create Product
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
export default ProductForm;
