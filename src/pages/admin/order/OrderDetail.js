import {
  Card,
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
  CardHeader,
  CardContent,
  Grid,
  TableHead,
  TableSortLabel,
  Box,
  TableFooter,
} from "@mui/material";
import Iconify from "src/components/iconify/Iconify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import Label from "../../../components/label";
import {
  applySortFilterByPhone,
  convertStringToDateTime,
  getComparator,
  visuallyHidden,
} from "src/helper/table";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { orderService } from "src/services/orderService";
import { Link, useParams } from "react-router-dom";
import { customersService } from "src/services/customerService";
import SkeletonLoading from "src/components/skeleton/SkeletonLoading";
function OrderDetail() {
  const { orderID } = useParams();
  const TABLE_HEAD = [
    { id: "email", label: "Product Name", alignLeft: true },
    { id: "fullname", label: "Price" },
    { id: "role", label: "Quantity" },
    { id: "status", label: "Amount" },
    { id: "" },
  ];
  const [orderDetail, setOrderDetail] = useState([]);
  //   const [customerInfo, setCustomerInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [openDeletedialog, setDeleteDialog] = useState(false);
  const [openResetdialog, setResetDialog] = useState(false);
  const [open, setOpen] = useState(null);
  const [idRowOrder, setIdRowOrder] = useState(-1);
  const [stateRowOrder, setStateRowOrder] = useState(false);

  const dispatch = useDispatch();

  const compareByCreatedAt = (orderA, orderB) => {
    const dateA = new Date(orderA.createDate);
    const dateB = new Date(orderB.createDate);
    return dateB - dateA;
  };
  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const response = await orderService.getOrdersID(orderID);
        console.log("response", response);
        setOrderDetail(response);
        // geCustomerInfo(response.customerID);
      } catch (error) {
        console.error("Error fetching order detail:", error);
      }
    };
    getOrderDetail();
  }, [orderID]);
  //   const geCustomerInfo = async (customerID) => {
  //     return new Promise((resolve, reject) => {
  //       customersService
  //         .getCustomersInfoByCustomerID(customerID)
  //         .then((response) => {
  //           setCustomerInfo(response);
  //           console.log("customerInfo", response);
  //           resolve();
  //         })
  //         .catch((error) => {
  //           reject(error);
  //         });
  //     });
  //   };
  const changeState = async (userID) => {
    // return new Promise((resolve, reject) => {
    //   staffService
    //     .then((response) => {
    //       console.log("response", response);
    //       if (response.status === 200) {
    //         setDeleteDialog(false);
    //         getOrderByCustomer();
    //         message.success(response.data);
    //       }
    //       resolve();
    //     })
    //     .catch((error) => {
    //       setDeleteDialog(false);
    //       message.error(error.response.data);
    //       reject(error);
    //     });
    // });
  };
  const resetPassword = async (userID) => {
    // return new Promise((resolve, reject) => {
    //   staffService
    //     .resetPass(userID)
    //     .then((response) => {
    //       console.log("response", response);
    //       if (response.status === 200) {
    //         setResetDialog(false);
    //         getAllOrder();
    //         message.success(response.data);
    //       }
    //       resolve();
    //     })
    //     .catch((error) => {
    //       setResetDialog(false);
    //       message.error(error.response.data);
    //       reject(error);
    //     });
    // });
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleClickDeleteDialog = () => {
    setOpen(false);
    setDeleteDialog(true);
  };
  const handleClickResetDialog = () => {
    setOpen(false);
    setResetDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialog(false);
  };
  const handleCloseResetDialog = () => {
    setResetDialog(false);
  };

  const handleOpenMenu = (event, id, active, orderID) => {
    setIdRowOrder(id);
    setSelectedOrderID(orderID);
    setStateRowOrder(active);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

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

  const deleteOrder = async (id) => {
    if (idRowOrder !== -1) {
      await dispatch(changeState(id));
      setOpen(null);
      setIdRowOrder(-1);
    } else if (selected.length !== 0) {
      // await dispatch(changeStateMulti(id));
      setSelected([]);
    }
    // loadProducts();
    setDeleteDialog(false);
  };
  const resetPass = async (id) => {
    if (idRowOrder !== -1) {
      await dispatch(resetPassword(id));
      setOpen(null);
      setIdRowOrder(-1);
    } else if (selected.length !== 0) {
      // await dispatch(changeStateMulti(id));
      setSelected([]);
    }
    setResetDialog(false);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - orderDetail?.orderItems?.length)
      : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderDetail?.orderItems?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const isNotFound = !orderDetail?.orderItems?.length && !!filterName;
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  let icon = "";

  //   switch (customerInfo.sex) {
  //     case "male":
  //       icon = "ion:male";
  //       break;
  //     case "female":
  //       icon = "ion:female";
  //       break;
  //     case "other":
  //       icon = "healthicons:sexual-reproductive-health";
  //       break;
  //     default:
  //       break;
  //   }
  //   if (customerInfo.userID === undefined) {
  //     return <SkeletonLoading></SkeletonLoading>;
  //   }
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <Card sx={{ mb: 5 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sm={6}>
                    <Stack direction={"row"} spacing={1}>
                      <Typography variant="h4">
                        {orderDetail.fullname}
                      </Typography>
                      <Iconify icon={icon}></Iconify>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="ph:phone"></Iconify>
                      <Typography variant="h7">{orderDetail.phone}</Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="mdi:address-marker-outline"></Iconify>
                      <Typography variant="h7">
                        {orderDetail.address
                          ? orderDetail.address
                          : "No address"}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography variant="h4">{orderDetail.note}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Card sx={{ mb: 5 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sm={6}>
                    <Stack direction={"row"} spacing={1}>
                      <Typography variant="h4">
                        {orderDetail?.staffUsers?.firstName +
                          " " +
                          orderDetail?.staffUsers?.lastName}
                      </Typography>
                      <Iconify icon={icon}></Iconify>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="zondicons:time"></Iconify>
                      <Typography variant="h7">
                        {convertStringToDateTime(orderDetail.orderTime)}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="gridicons:status"></Iconify>
                      <Typography variant="h7">
                        {/* {orderDetail.orderStatus} */}
                        <Label
                          color={
                            orderDetail.orderStatus === "SUCCESS"
                              ? "success"
                              : "warning"
                          }
                        >
                          {orderDetail.orderStatus}
                        </Label>
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="fluent:payment-32-regular"></Iconify>
                      <Typography variant="h7">
                        {orderDetail.payment}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography variant="h4">{orderDetail.note}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.alignLeft ? "left" : "center"}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        <TableSortLabel
                          hideSortIcon
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : "asc"}
                          onClick={createSortHandler(headCell.id)}
                        >
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box sx={{ ...visuallyHidden }}>
                              {order === "desc"
                                ? "sorted descending"
                                : "sorted ascending"}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail?.orderItems
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      const { orderItemID, price, product, quantity } = row;
                      const selectedUser = selected.indexOf(orderItemID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={orderItemID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell>{product.name}</TableCell>
                          <TableCell align="center">{price}</TableCell>
                          <TableCell align="center">{quantity}</TableCell>
                          <TableCell align="center">
                            {price * quantity}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              // onClick={(event) =>
                              //   handleOpenMenu(
                              //     event,
                              //     userID,
                              //     isActive,
                              //     orderID
                              //   )
                              // }
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
                      <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
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
            count={orderDetail.orderItems?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

export default OrderDetail;
