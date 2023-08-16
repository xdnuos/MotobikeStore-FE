import { message } from "antd";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import moment from "moment";

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableHead,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";
// components
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
// sections
import { UserListToolbar } from "../../../sections/@dashboard/user";
// mock
import { useSelector } from "react-redux";
import { orderService } from "src/services/orderService";
import { localStorageService } from "src/services/localStorageService";

message.config({
  top: 100,
  duration: 5,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
});
// ----------------------------------------------------------------------
function convertStringToDateTime(dateTimeString) {
  return moment(dateTimeString).format("HH:mm:ss DD/MM/YYYY");
}
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
  if (array != null) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.phone.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
}
function OrderItemsTable({ orderItems }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItems?.map((orderItem) => (
            <TableRow key={orderItem.orderItemID}>
              <TableCell>{orderItem.product.name}</TableCell>
              <TableCell align="center">{orderItem.quantity}</TableCell>
              <TableCell align="center">{orderItem.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function OrderInfoCard({ fullname, phone, note, address }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Buyer Information</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography>{fullname}</Typography>
            <Typography>{note}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{phone}</Typography>
            <Typography>{address}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
function ConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to confirm order?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="warning">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default function OrderStorePage() {
  const TABLE_HEAD = [
    { id: "name", label: "Purchase method", alignLeft: true },
    { id: "time", label: "Order time" },
    { id: "quantity", label: "Quantity product" },
    { id: "status", label: "Status" },
    { id: "total", label: "Total Price" },
    { id: "confirm", label: "Confirm by" },
    { id: "action", label: "Action" },
  ];
  const [orders, setOrders] = useState([]);
  const idAccount = useSelector((state) => state.auth.idAccount);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getAllOrder();
  }, []);

  const [confirmOrderRequest, setConfirmOrderRequest] = useState({
    orderID: null,
    userID: idAccount,
  });
  const compareByCreatedAt = (orderA, orderB) => {
    const dateA = new Date(orderA.orderTime);
    const dateB = new Date(orderB.orderTime);
    return dateB - dateA;
  };
  const getAllOrder = async () => {
    return new Promise((resolve, reject) => {
      orderService
        .getAllOrdersAdmin()
        .then((response) => {
          setOrders(response.sort(compareByCreatedAt));
          console.log("response", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const getAllOrderByStaff = async (staffID) => {
    return new Promise((resolve, reject) => {
      orderService
        .getOrdersByStaff(staffID)
        .then((response) => {
          setOrders(response.sort(compareByCreatedAt));
          console.log("response", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const confirmOrder = async () => {
    return new Promise((resolve, reject) => {
      orderService
        .confirmOrder({ ...confirmOrderRequest, orderID: selectedOrderID })
        .then((response) => {
          if (response.status === 200) {
            setTimeout(() => {
              message.success(response.data);
            }, 500);
            getAllOrder();
          }
          resolve();
        })
        .catch((error) => {
          setTimeout(() => {
            message.error(error.response.data);
          }, 500);
          reject(error);
        });
    });
  };

  const handleOpenDialog = (orderID) => {
    setSelectedOrderID(orderID);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = () => {
    handleCloseDialog();
    confirmOrder();
  };

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders?.length) : 0;

  const filteredUsers = applySortFilter(
    orders,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;
  return (
    <>
      <Helmet>
        <title> Store | Biker Dashboard </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Order
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <div style={{ width: "100%" }}>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "4%" }}>
                        {" "}
                        &nbsp;
                      </TableCell>
                      {TABLE_HEAD.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.alignLeft ? "left" : "center"}
                          sortDirection={
                            orderBy === headCell.id ? order : false
                          }
                          sx={{ width: "15%" }}
                        >
                          {headCell.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </div>
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        orderID,
                        orderItems,
                        orderStatus,
                        total,
                        fullname,
                        phone,
                        note,
                        address,
                        payment,
                        staffUsers,
                        orderTime,
                      } = row;
                      const selectedUser = selected.indexOf(orderItems) !== -1;

                      return (
                        <Accordion key={orderID}>
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ width: "100%" }}
                          >
                            <TableRow
                              hover
                              key={orderID}
                              tabIndex={-1}
                              sx={{ width: "100%" }}
                              role="checkbox"
                              selected={selectedUser}
                            >
                              <TableCell align="left" sx={{ width: "4%" }}>
                                {" "}
                                &nbsp;
                              </TableCell>

                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                                sx={{ width: "15%" }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Typography variant="subtitle2" noWrap>
                                    {payment === "LIVE"
                                      ? "Direct puchase"
                                      : "Shipping"}{" "}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="center" sx={{ width: "15%" }}>
                                {convertStringToDateTime(orderTime)}
                              </TableCell>
                              <TableCell align="center" sx={{ width: "15%" }}>
                                {orderItems?.length}
                              </TableCell>

                              <TableCell align="center" sx={{ width: "15%" }}>
                                <Label
                                  color={
                                    orderStatus === "SUCCESS"
                                      ? "success"
                                      : "warning"
                                  }
                                >
                                  {orderStatus}
                                </Label>
                              </TableCell>

                              <TableCell align="center" sx={{ width: "15%" }}>
                                {total}
                              </TableCell>
                              <TableCell align="center" sx={{ width: "15%" }}>
                                {staffUsers?.lastName}
                              </TableCell>
                              <TableCell align="right" sx={{ width: "15%" }}>
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={() => handleOpenDialog(orderID)}
                                >
                                  <Iconify icon={"line-md:confirm-circle"} />
                                </IconButton>
                              </TableCell>
                            </TableRow>{" "}
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={3}>
                              <Grid item xs={6}>
                                <OrderInfoCard
                                  fullname={fullname}
                                  phone={phone}
                                  note={note}
                                  address={address}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <OrderItemsTable orderItems={orderItems} />
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
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
            count={orders?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}
