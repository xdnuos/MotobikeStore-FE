import React from "react";
import { Container, Typography, Stack, Link } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ProductForm from "../../../sections/@dashboard/products/ProductForm";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
// import
function CreateProduct() {
  // get
  const products = useSelector(
    (state) => state.products.productList.allProduct
  );
  const categories = useSelector((state) => state.categories.allCategories);
  const tags = useSelector((state) => state.tags.allTags);
  const manufacturer = useSelector(
    (state) => state.manufacturer.allManufacturer
  );
  return (
    <>
      <Helmet>
        <title>New product</title>
      </Helmet>
      <Container>
        <Stack spacing={2} marginBottom="40px">
          <Typography variant="h4" gutterBottom>
            Create New Product
          </Typography>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <Link
              underline="hover"
              color="text.primary"
              href="/dashboard/products"
            >
              Products
            </Link>
            <Typography color="inherit">New Product</Typography>
          </Breadcrumbs>
        </Stack>
        <ProductForm
          categories={categories}
          tags={tags}
          manufacturer={manufacturer}
        />
      </Container>
    </>
  );
}
export default CreateProduct;
