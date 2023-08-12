import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { filter } from "lodash";
import { Link as RouterLink, useOutletContext } from "react-router-dom";
// @mui
import {
  Card,
  Link,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
// sections
import {
  ProductListToolbar,
  ProductListHead,
  DeleteDialog,
} from "../../../sections/@dashboard/products";
import { useDispatch } from "react-redux";
import {
  changeState,
  changeStateMulti,
  getAllProduct,
} from "src/redux/products/productList";
// ----------------------------------------------------------------------
// const imageServer = process.env.REACT_APP_IMAGE_SERVER;
const TABLE_HEAD = [
  { id: "name", label: "Product", alignRight: false },
  { id: "sku", label: "SKU", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "arrival", label: "Arrival", alignRight: false },
  { id: "saleCount", label: "Sale", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_product) =>
        _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

function ProductsPage() {
  const [products] = useOutletContext();
  const [opendialog, setOpenDialog] = useState(false);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idRowProduct, setIdRowProduct] = useState(-1);
  const [stateRowProduct, setStateRowProduct] = useState(false);
  //  lấy id của sản phẩm đã checked
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const deleteProduct = async (id) => {
    if (idRowProduct !== -1) {
      await dispatch(changeState(id));
      await dispatch(getAllProduct());
      setOpen(null);
      setIdRowProduct(-1);
    } else if (selected.length !== 0) {
      await dispatch(changeStateMulti(id));
      setSelected([]);
    }
    // loadProducts();
    setOpenDialog(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenMenu = (event, id, active) => {
    setIdRowProduct(id);
    setStateRowProduct(active);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.productID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  // filter by status
  const [filterStatus, setFilterStatus] = useState([]);

  const handleFilterByStatus = (event, values) => {
    setPage(0);
    setFilterStatus(values.map((value) => value.title));
  };
  // search by name
  const [filterName, setFilterName] = useState("");

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(
    products.filter((product) => {
      const isNameMatch =
        filterName.trim() === "" ||
        product.name.toLowerCase().includes(filterName.toLowerCase());
      // const isStatusMatch =
      //   filterStatus.length === 0 || filterStatus.includes(product.status);
      const isStatusMatch =
        filterStatus.length === 0 ||
        (product.active === false && filterStatus.includes("Disable")) ||
        (product.stock === 0 && filterStatus.includes("Out Of Stock")) ||
        (product.stock > 0 &&
          product.stock <= 2 &&
          filterStatus.includes("Low Stock")) ||
        (product.stock > 2 && filterStatus.includes("In Stock"));
      return isNameMatch && isStatusMatch;
    }),
    getComparator(order, orderBy),
    filterName
  );
  const isNotFound = !filteredProducts.length && !!filterName;
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          {/* button create product */}
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={RouterLink}
            to="/dashboard/products/new"
          >
            New Product
          </Button>
        </Stack>

        {/* list table product */}
        <Card>
          <ProductListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            filterStatus={filterStatus}
            onFilterStatus={handleFilterByStatus}
            handleClickOpenDialog={handleClickOpenDialog}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product, index) => {
                      const selectedProduct =
                        selected.indexOf(product.productID) !== -1;
                      return (
                        <TableRow
                          hover
                          key={index}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedProduct}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedProduct}
                              onChange={(event) =>
                                handleClick(event, product.productID)
                              }
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={product.name}
                                src={product.images[0]}
                                variant="rounded"
                                sx={{ width: 55, height: 55 }}
                              />
                              <Link
                                href={`/dashboard/products/edit/${product.productID}`}
                                underline="hover"
                                color="inherit"
                                variant="subtitle2"
                                noWrap
                              >
                                {product.name}
                              </Link>
                            </Stack>
                          </TableCell>

                          {/* <TableCell align="left">{product.usedTime}</TableCell> */}
                          <TableCell align="left">{product.sku}</TableCell>
                          <TableCell align="left">
                            <Label
                              color={
                                (product.active === false && "error") ||
                                (product.stock === 0 && "error") ||
                                (product.stock <= 2 && "warning") ||
                                "success"
                              }
                            >
                              {(product.active === false && "DISABLE") ||
                                (product.stock === 0 && "OUT OF STOCK") ||
                                (product.stock <= 2 && "LOW STOCK") ||
                                "IN STOCK"}
                            </Label>
                          </TableCell>

                          <TableCell align="left">{product.price}</TableCell>
                          <TableCell align="left">{product.arrival}</TableCell>
                          <TableCell align="left">
                            {product.saleCount}
                          </TableCell>

                          <TableCell align="right">
                            {/* <Button onClick={() => deleteProduct(product.product_id)}>Delete</Button> */}
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) =>
                                handleOpenMenu(
                                  event,
                                  product.productID,
                                  product.active
                                )
                              }
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
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
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* click to go to edit page get id product xong rồi chuyển qua trang /edit/{id} */}
        <MenuItem
          component={RouterLink}
          to={`/dashboard/products/edit/${idRowProduct}`}
        >
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        {/* click to remove product */}
        <MenuItem
          sx={
            stateRowProduct
              ? { color: "error.main" }
              : { color: "success.main" }
          }
          onClick={handleClickOpenDialog}
        >
          <Iconify
            icon={
              stateRowProduct
                ? "eva:toggle-left-outline"
                : "eva:toggle-right-outline"
            }
            sx={{ mr: 2 }}
          />
          {stateRowProduct ? "Disable" : "Enable"}
        </MenuItem>
      </Popover>
      <DeleteDialog
        opendialog={opendialog}
        handleClose={handleCloseDialog}
        deleteProduct={deleteProduct}
        id={idRowProduct}
        state={stateRowProduct}
      />
    </>
  );
}
export default ProductsPage;
