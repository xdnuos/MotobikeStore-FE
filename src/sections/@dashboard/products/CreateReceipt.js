import React, { useState } from "react";
import { Input, Form, List, Button, message } from "antd";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { creatStockProduct } from "src/redux/products/productList";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Breadcrumbs,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CreateReceipt() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantityMap, setQuantityMap] = useState([]);
  const [isNotFound, SetIsNotFound] = useState(true);
  const dispatch = useDispatch();
  const idAccount = useSelector((state) => state.auth.idAccount);
  const products = useSelector(
    (state) => state.products.productList.allProduct
  );
  const handleOnSelect = (item) => {
    const isAlreadySelected = selectedProducts.some(
      (selectedItem) => selectedItem.productID === item.productID
    );

    if (!isAlreadySelected) {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        item,
      ]);
    } else {
      message.error("Product is exits");
    }
    if (!selectedProducts.length) {
      SetIsNotFound(false);
    }
  };
  const onDelete = (productID) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product.productID !== productID)
    );
    message.success("Success remove product");
    if (selectedProducts.length === 0) {
      SetIsNotFound(true);
    }
  };
  const handleFormSubmit = async () => {
    const formData = {
      userID: idAccount,
      listProduct: selectedProducts.map((product) => ({
        productID: product.productID,
        quantity: quantityMap[product.productID] || 0,
      })),
    };

    console.log(formData);
    const response = await dispatch(creatStockProduct(formData));
    console.log(response);
    if (response.payload.status === 200) {
      setSelectedProducts([]);
      SetIsNotFound(true);
    }
  };
  const formatResult = (item) => {
    return (
      <Grid container alignItems="center">
        <Grid item>
          <Avatar
            alt={item.name}
            src={item.images[0]}
            variant="rounded"
            sx={{ width: 55, height: 55, marginRight: 2 }}
          />
        </Grid>
        <Grid item>
          <Typography style={{ textAlign: "left" }} key={item.id}>
            {item.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ textAlign: "left" }} key={item.id}>
            &nbsp; SKU: {item.sku}
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ textAlign: "left" }} key={item.id}>
            &nbsp; Stock: {item.stock}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Helmet>
        <title>New product</title>
      </Helmet>
      <Container>
        <Form onFinish={handleFormSubmit}>
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Stack pb={5} pr={5}>
                <ReactSearchAutocomplete
                  items={products}
                  placeholder="Search by Name or SKU"
                  onSelect={handleOnSelect}
                  styling={{ zIndex: 4 }}
                  formatResult={formatResult}
                  autoFocus
                />
              </Stack>
            </Grid>
            <Grid item xs={1}>
              {" "}
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ảnh</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell width={"10%"}>
                      <Avatar
                        alt={product.name}
                        src={product.images[0]}
                        variant="rounded"
                        sx={{ width: 55, height: 55 }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell width={"10%"}>
                      <Input
                        type="number"
                        value={quantityMap[product.productID] || ""}
                        onChange={(e) =>
                          setQuantityMap((prevQuantityMap) => ({
                            ...prevQuantityMap,
                            [product.productID]: parseInt(e.target.value),
                          }))
                        }
                      ></Input>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => onDelete(product.productID)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Empty
                        </Typography>
                        <Typography variant="body2">
                          Please add product
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Form>
      </Container>
    </>
  );
}

export default CreateReceipt;
