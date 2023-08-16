import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import * as yup from "yup";
import { message } from "antd";
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
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "src/redux/products/productList";
// const imageServer = process.env.REACT_APP_IMAGE_SERVER;
// -------------------------------------------------------------------
message.config({
  top: 100,
  duration: 5,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
});
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);
function convertArray(arr) {
  if (arr == null || (arr === "") | (arr.length === 0)) {
    return "";
  }
  return arr.map((item) => Object.values(item)[0]);
}
function convertValue(value) {
  if (value) {
    return value;
  } else return "";
}
// function imageMap(images) {
//   if (images == null) {
//     return;
//   }
//   return images.map((image) => image.file);
// }
function getIDByName(arr, name) {
  if (
    arr.length === 0 ||
    (arr === null) | (arr.length === 0) | (name === null)
  ) {
    return;
  }
  return Object.values(arr.find((arr) => arr.name === name))[0];
}
function getObjectByNames(arr, names) {
  if (
    arr.length === 0 ||
    (arr === null) |
      (arr.length === 0) |
      (names.length === 0) |
      (names === null) |
      (names === "")
  ) {
    return;
  }
  let objects = [];
  names.forEach((name) => {
    const foundObj = arr.find((object) => object.name === name);
    if (foundObj) {
      objects.push(foundObj);
    }
  });
  return objects;
}
// function imageUrls(images) {
//   if (images.length === 0) {
//     return;
//   }
//   return images.map((image) => imageServer + image);
// }
function blobToFile(theBlob, fileName) {
  return new File([theBlob], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
}
function ProductForm({ product, categories, tags, manufacturer }) {
  const [categoryIDs, setCategoryIDs] = useState("");
  const [tagIDs, setTagIDs] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const dispatch = useDispatch();
  let initialValues = {
    name: "",
    sku: "",
    stock: 0,
    price: 0,
    shortDescription: "",
    fullDescription: "",
    arrival: "",
    // manufacturer: "",
    // categories: "",
    // tags: "",
    imageFiles: imageFiles,
  };

  let isEdit = false;

  if (product?.name != undefined) {
    isEdit = true;
    initialValues = {
      name: product.name,
      sku: product.sku,
      stock: product.stock,
      price: product.price,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      arrival: product.arrival,
      manufacturer: getIDByName(manufacturer, product.manufacturer),
      categories: getObjectByNames(categories, product.categories),
      tags: getObjectByNames(tags, product.tags),
      imageFiles: product.images,
    };
    console.log(initialValues);
  }

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(4, "Too Short!")
      .max(128, "Too Long!")
      .required("Name is required"),

    sku: yup
      .string()
      .min(2, "Too Short!")
      .max(8, "Too Long!")
      .required("Sku is required"),
    stock: yup.number().min(0, "Invalid number!").required("Stock is required"),
    price: yup.number().min(1, "Invalid number!").required("Price is required"),
    shortDescription: yup
      .string()
      .min(20, "Too Short!")
      .max(512, "Too Long!")
      .required("Short description is required"),
    fullDescription: yup
      .string()
      .min(20, "Too Short!")
      .max(4086, "Too Long!")
      .required("Full description is required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    const isValid = await validationSchema.isValid(values);
    if (isValid) {
      const formData = new FormData();
      console.log("imageFiles", imageFiles);
      imageFiles.forEach((file) => {
        console.log("Add image", file);
        const newFile = blobToFile(file, file.name);
        console.log(newFile);
        formData.append(`imageFiles`, newFile);
      });
      let newTags;
      if (((tagIDs === "") | (tagIDs === null)) & isEdit) {
        newTags = values.tags;
      } else {
        if (tagIDs.length === 0) {
          newTags = null;
        } else {
          newTags = tagIDs;
        }
      }
      let newCategories;
      if (((categoryIDs === "") | (categoryIDs === null)) & isEdit) {
        newCategories = values.categories;
      } else {
        if (categoryIDs.length === 0) {
          newCategories = null;
        } else {
          newCategories = categoryIDs;
        }
      }

      const formValues = {
        name: values.name,
        sku: values.sku,
        stock: values.stock,
        price: values.price,
        shortDescription: values.shortDescription,
        fullDescription: values.fullDescription,
        arrival: convertValue(values.arrival),
        categoryIDs: convertArray(newCategories),
        tagIDs: convertArray(newTags),
        manufacturerID: convertValue(values.manufacturer),
      };
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });

      let response = null;

      if (isEdit) {
        const id = product.productID;
        response = await dispatch(updateProduct({ formData, id }));
      } else {
        console.log("add");
        response = await dispatch(addProduct(formData));
      }
      if (response.payload.status === 200) {
        message.success(response.payload.data);
        resetForm();
      }
    } else {
      console.log("Form data is invalid");
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, handleChange, form }) => (
        <Form>
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
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      name="sku"
                      sx={{ width: "50ch" }}
                      placeholder="SKU"
                      label="SKU"
                      variant="outlined"
                      value={values.sku}
                      onChange={handleChange}
                      error={touched.sku && Boolean(errors.sku)}
                      helperText={touched.sku && errors.sku}
                    />
                    <TextField
                      type="number"
                      sx={{ width: "50ch" }}
                      placeholder="Quantity"
                      label="Quantity"
                      variant="outlined"
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      error={touched.stock && Boolean(errors.stock)}
                      helperText={touched.stock && errors.stock}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    placeholder="Enter short description"
                    label="Short Description"
                    multiline
                    variant="outlined"
                    name="shortDescription"
                    value={values.shortDescription}
                    onChange={handleChange}
                    error={
                      touched.shortDescription &&
                      Boolean(errors.shortDescription)
                    }
                    helperText={
                      touched.shortDescription && errors.shortDescription
                    }
                  />
                  <TextField
                    fullWidth
                    placeholder="Enter full description"
                    label="Full Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    name="fullDescription"
                    value={values.fullDescription}
                    onChange={handleChange}
                    error={
                      touched.fullDescription && Boolean(errors.fullDescription)
                    }
                    helperText={
                      touched.fullDescription && errors.fullDescription
                    }
                  />
                </Stack>
              </Paper>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Images
              </Typography>
              <FilePond
                allowMultiple={true}
                allowFileTypeValidation={true}
                acceptedFileTypes={["image/png", "image/jpeg"]}
                files={values.imageFiles}
                onupdatefiles={(files) =>
                  setImageFiles(files.map((f) => f.file))
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      defaultValue={values.categories}
                      onChange={(e, value) => setCategoryIDs(value)}
                      options={categories}
                      getOptionLabel={(categories) => categories.name}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField {...params} label="Category" />
                      )}
                    />
                    <Autocomplete
                      multiple
                      name="tags"
                      options={tags}
                      defaultValue={values.tags}
                      getOptionLabel={(tags) => tags.name}
                      filterSelectedOptions
                      onChange={(e, value) => setTagIDs(value)}
                      renderInput={(params) => (
                        <TextField {...params} label="Tags" />
                      )}
                    />
                    {/*  */}
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                        Manufacturer
                      </InputLabel>
                      <Select
                        native
                        id="grouped-native-select"
                        label="Grouping"
                        name="manufacturer"
                        defaultValue={values.manufacturer}
                        onChange={handleChange}
                      >
                        <option aria-label="None" value="" />
                        {manufacturer.map((manufacturer) => (
                          <option
                            key={manufacturer.name}
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
                        name="arrival"
                        id="grouped-native-select"
                        label="Grouping"
                        defaultValue={values.arrival}
                        onChange={handleChange}
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
                        value={values.price}
                        onChange={handleChange}
                        error={touched.price && Boolean(errors.price)}
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
                  {isEdit ? "Update Product" : "Create Product"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
export default ProductForm;
