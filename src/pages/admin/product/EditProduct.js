import React, { useEffect, useState } from "react";
import { Container, Typography, Stack, Link } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ProductForm from "../../../sections/@dashboard/products/ProductForm";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, reset } from "src/redux/products/productList";
import SkeletonLoading from "src/components/skeleton/SkeletonLoading";

// import
function EditProduct() {
  const [products, categories, tags, manufacturer] = useOutletContext();
  const { productID } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products?.find(
      (item) => item.productID === parseInt(productID)
    );
    setProduct(foundProduct);
  }, [products, productID]);

  if (product === null) {
    return <SkeletonLoading />;
  }
  return (
    <>
      <Helmet>
        <title>New product</title>
      </Helmet>
      <Container>
        <Stack spacing={2} marginBottom="40px">
          <Typography variant="h4" gutterBottom>
            Edit product
          </Typography>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <Link
              underline="hover"
              color="text.primary"
              href="/dashboard/products"
            >
              Products
            </Link>
            <Typography color="inherit">{product.name}</Typography>
          </Breadcrumbs>
        </Stack>
        <ProductForm
          product={product}
          categories={categories}
          tags={tags}
          manufacturer={manufacturer}
        />
      </Container>
    </>
  );
}
export default EditProduct;
