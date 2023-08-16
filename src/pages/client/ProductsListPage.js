import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  OutlinedInput,
  Stack,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";

import { styled, alpha } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import ShopFilterSidebar from "../../sections/@client/products/list-product/ProductFilterSidebar";
import ShopProductSort from "../../sections/@client/products/list-product/ProductSort";
import Iconify from "../../components/iconify/Iconify";
import { ProductList } from "../../sections/@client/products";

// import PRODUCTS from '../../_mock/products-clone';
import { StyledSeparator } from "../../components/custom/CustomSpan";
import { categoryService } from "../../services/categoryService";
import SvgColor from "src/components/svg-color/SvgColor";

// import MyCarousel from '../../components/slide/MyCarousel'

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 500,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 550,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

function ProductsListPage() {
  const { id } = useParams();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const [subCategory, setSubCategory] = useState([]);

  const [limit, setLimit] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [product, setProduct] = useState([]);
  const [empty, setEmpty] = useState(true);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const getProduct = async (id) => {
    return new Promise((resolve, reject) => {
      categoryService
        .getProductByCategory(id)
        .then((response) => {
          setProduct(response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const getSubcategories = async (id) => {
    return new Promise((resolve, reject) => {
      categoryService
        .getSubcategories(id)
        .then((response) => {
          setSubCategory(response);
          console.log("response", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    getProduct(id);
    getSubcategories(id);
    setLimit(matches ? 15 : 12);
  }, [id, matches, empty]);

  return (
    <>
      <Helmet>
        <title>Danh sách sản phẩm</title>
      </Helmet>

      <Container>
        <Grid container spacing={0}>
          {/* mục Trang chủ • Category • Tên sản phẩm */}
          <Grid item xs={12} mt={1}>
            <Breadcrumbs
              separator={<StyledSeparator>&nbsp;•&nbsp;</StyledSeparator>}
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                color="text.primary"
                component={RouterLink}
                to="/"
              >
                Trang chủ
              </Link>
              <Typography color="inherit">Danh sách sản phẩm</Typography>
            </Breadcrumbs>
          </Grid>
          {!!!product | (product?.length === 0) ? (
            <Grid item xs={12}>
              <Stack spacing={1} alignItems={"center"} px={2} py={8}>
                <SvgColor
                  color={"gray"}
                  src={`/assets/illustrations/illustration_empty_cart.svg`}
                  sx={{ width: "320px", height: "240px", mb: 2 }}
                />
                <Typography variant="h5">
                  Ohh Sorry, product not found!
                </Typography>
              </Stack>
            </Grid>
          ) : (
            <Grid container spacing={0}>
              {/* <Grid item xs={12} sx={{ my: 2 }}>
                <StyledSearch
                  variant="outlined"
                  placeholder="Search product..."
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  }
                />
              </Grid> */}

              <Grid item xs={12}>
                <Grid container direction="row" spacing={2}>
                  {(subCategory?.length === 0) | !subCategory ? (
                    ""
                  ) : (
                    <Grid item xs={12} sx={{ mt: 1.5 }}>
                      <Typography variant="h5">Danh sách danh mục </Typography>
                    </Grid>
                  )}
                  {subCategory?.map((item, index) => (
                    <Grid item xs={4}>
                      <Link
                        underline="hover"
                        color="text.primary"
                        component={RouterLink}
                        to={`/list-products/${item?.id}`}
                      >
                        <Paper
                          elevation={3}
                          sx={{ p: 2, borderRadius: 2 }}
                          key={index}
                        >
                          <Typography variant="subtitle1">
                            {item?.name}
                          </Typography>
                        </Paper>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  flexShrink={0}
                  sx={{ my: 1 }}
                >
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    Danh sách sản phẩm{" "}
                  </Typography>
                  <div>
                    <ShopFilterSidebar
                      openFilter={openFilter}
                      onOpenFilter={handleOpenFilter}
                      onCloseFilter={handleCloseFilter}
                    />
                    <ShopProductSort />
                  </div>
                </Stack>

                <ProductList products={product} limit={limit} sx={{ p: 2 }} />
              </Grid>
              {product?.length - 1 - limit > 0 && (
                <Grid item xs={12}>
                  <Stack justifyContent={"center"}>
                    <Button
                      sx={{ color: "#000", mt: 3 }}
                      onClick={() => setLimit(matches ? limit + 10 : limit + 8)}
                    >
                      <Iconify icon="bxs:chevrons-down" mr={1} />
                      Xem thêm {product?.length - 1 - limit} sản phẩm
                    </Button>
                  </Stack>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default ProductsListPage;
