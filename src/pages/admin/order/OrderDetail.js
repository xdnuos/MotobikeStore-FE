import {
  Box,
  Card,
  CardContent,
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
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Iconify from "src/components/iconify/Iconify";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import { convertStringToDateTime, visuallyHidden } from "src/helper/table";
import { orderService } from "src/services/orderService";
import Label from "../../../components/label";
function OrderDetail() {
  const { orderID } = useParams();
  const TABLE_HEAD = [
    { id: "email", label: "Product Name", alignLeft: true },
    { id: "fullName", label: "Price" },
    { id: "role", label: "Quantity" },
    { id: "status", label: "Amount" },
    { id: "" },
  ];
  const [orderDetail, setOrderDetail] = useState([]);
  //   const [customerInfo, setCustomerInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const response = await orderService.getOrderDetailAdmin(orderID);
        console.log("response", response);
        setOrderDetail(response);
        // geCustomerInfo(response.customerID);
      } catch (error) {
        console.error("Error fetching order detail:", error);
        throw error;
      }
    };
    getOrderDetail();
  }, [orderID]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
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
                        {orderDetail.fullName}
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
