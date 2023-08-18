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
} from "@mui/material";
import Iconify from "src/components/iconify/Iconify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../components/label";
import {
  applySortFilterByPhone,
  convertStringToDateTime,
  getComparator,
  visuallyHidden,
} from "src/helper/table";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { orderService } from "src/services/orderService";
import { Link } from "react-router-dom";
import SkeletonLoading from "src/components/skeleton/SkeletonLoading";
import { staffService } from "src/services/staffService";
import { MonthRevenue, TotalRevenue } from "src/helper/order";
function ProfileAdmin() {
  const userID = useSelector((state) => state.auth.idAccount);
  const TABLE_HEAD = [
    { id: "email", label: "Purchase method", alignLeft: true },
    { id: "fullname", label: "Order time", alignLeft: true },
    { id: "role", label: "Quantity product" },
    { id: "status", label: "Status" },
    { id: "phone", label: "Total Price" },
    { id: "birth", label: "Confirm by" },
    { id: "" },
  ];
  const [orders, setOrders] = useState([]);
  const [customerInfo, setStaffInfo] = useState([]);
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
  useEffect(() => {
    getAllOrderByStaff();
    getStaffInfo();
  }, []);
  const compareByCreatedAt = (orderA, orderB) => {
    const dateA = new Date(orderA.orderTime);
    const dateB = new Date(orderB.orderTime);
    return dateB - dateA;
  };
  const getAllOrderByStaff = async () => {
    return new Promise((resolve, reject) => {
      orderService
        .getOrderStaffByUserID(userID)
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
  const getStaffInfo = async () => {
    return new Promise((resolve, reject) => {
      staffService
        .getByID(userID)
        .then((response) => {
          setStaffInfo(response);
          console.log("customerInfo", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders?.length) : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const filteredUsers = applySortFilterByPhone(
    orders,
    getComparator(order, orderBy),
    filterName
  );
  const isNotFound = !filteredUsers.length;
  console.log("isNotFound", filterName);
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  let icon = "";

  switch (customerInfo.sex) {
    case "Male":
      icon = "ion:male";
      break;
    case "Female":
      icon = "ion:female";
      break;
    case "Other":
      icon = "healthicons:sexual-reproductive-health";
      break;
    default:
      break;
  }
  if (customerInfo.userID === undefined) {
    return <SkeletonLoading></SkeletonLoading>;
  }
  return (
    <>
      <Container>
        <Card sx={{ mb: 5 }}>
          <CardHeader
            title={
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                spacing={1}
              >
                <Typography variant="h6"></Typography>
                <Button sx={{ color: "#00ab55" }}>
                  <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                  Edit
                </Button>
              </Stack>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={2} xs={12}>
                <Avatar
                  src={customerInfo.avatarUrl}
                  sx={{ width: 128, height: 128 }}
                ></Avatar>
              </Grid>
              <Grid item md={10} xs={12}>
                <Grid container>
                  <Grid item xs={12} md={6} sm={6}>
                    <Stack direction={"row"} spacing={1}>
                      <Typography variant="h4">
                        {customerInfo.fullName}
                      </Typography>
                      <Iconify icon={icon}></Iconify>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="ic:outline-email"></Iconify>
                      <Typography variant="h7">
                        {customerInfo.email ? customerInfo.email : "Unregister"}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="iconoir:birthday-cake"></Iconify>
                      <Typography variant="h7">
                        {customerInfo.birth ? customerInfo.birth : "Unregister"}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="ph:phone"></Iconify>
                      <Typography variant="h7">{customerInfo.phone}</Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="uiw:date"></Iconify>
                      <Typography variant="h7">
                        Create:{" "}
                        {convertStringToDateTime(customerInfo.createDate)}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="eos-icons:admin-outlined"></Iconify>
                      <Typography variant="h7">
                        Manager: &nbsp;
                        {customerInfo.managerLastName}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} sm={6}>
                    <Typography variant="h4">&nbsp;</Typography>

                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="icon-park-outline:order"></Iconify>
                      <Typography>Total order: {orders?.length}</Typography>
                    </Stack>
                    {orders.length !== 0 && (
                      <Stack direction={"row"} spacing={1}>
                        <Iconify icon="material-symbols:percent"></Iconify>
                        <Typography>
                          Ratio:{" "}
                          {(
                            (orders.filter(
                              (order) => order.orderStatus !== "FAILED"
                            ).length /
                              orders?.length) *
                            100
                          ).toFixed(2)}
                          %
                        </Typography>
                      </Stack>
                    )}
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="bi:coin"></Iconify>
                      <Typography>
                        Revenue in month:{" "}
                        {MonthRevenue(orders).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Iconify icon="bi:coin"></Iconify>
                      <Typography>
                        Total Revenue:{" "}
                        {TotalRevenue(orders).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        orderID,
                        orderItems,
                        orderStatus,
                        orderTime,
                        payment,
                        total,
                        staffUsers,
                      } = row;
                      const selectedUser = selected.indexOf(orderID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={orderID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell align="left">
                            {" "}
                            <Typography
                              variant="subtitle2"
                              noWrap
                              component={Link}
                              to={`/dashboard/orders/${orderID}`}
                            >
                              {payment === "LIVE"
                                ? "Direct puchase"
                                : "Shipping"}{" "}
                            </Typography>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {convertStringToDateTime(orderTime)}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            {orderItems?.length}
                          </TableCell>
                          <TableCell align="center">
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
                          <TableCell align="center">{total}</TableCell>
                          <TableCell align="center">
                            {staffUsers.lastName}
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
                            There is no order yet
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
    </>
  );
}

export default ProfileAdmin;
