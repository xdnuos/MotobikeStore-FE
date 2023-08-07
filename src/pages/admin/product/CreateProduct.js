import React from "react";
import { Container, Typography, Stack, Link } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ProductForm from "../../../sections/@dashboard/products/ProductForm";
import { useOutletContext } from "react-router-dom";
// import
function CreateProduct() {
  const [products, categories, tags, manufacturer] = useOutletContext();
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
