import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { message } from "antd";
import { filter } from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
// components
import Label from "../../../components/label";
import Scrollbar from "../../../components/scrollbar";
// sections
import { UserListToolbar } from "../../../sections/@dashboard/user";
// mock
import { useSelector } from "react-redux";
import {
  OrderInfoCard,
  OrderItemsTable,
} from "src/components/order/OrderInfoCard";
import { convertStringToDateTime, getComparator } from "src/helper/table";
import { orderService } from "src/services/orderService";

message.config({
  top: 100,
  duration: 5,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
});
// ----------------------------------------------------------------------
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

export default function OrderStorePage() {
  const TABLE_HEAD = [
    { id: "id", label: "OrderID", alignLeft: true },
    { id: "name", label: "Purchase method", alignLeft: true },
    { id: "time", label: "Order time" },
    { id: "quantity", label: "Quantity product" },
    { id: "status", label: "Status" },
    { id: "total", label: "Total Price" },
    { id: "confirm", label: "Confirm by" },
    { id: "" },
  ];

  const [orders, setOrders] = useState([]);
  const idAccount = useSelector((state) => state.auth.idAccount);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    getAllOrder();
  }, []);
  const confirmOrder = async (orderID) => {
    return new Promise((resolve, reject) => {
      orderService
        .confirmOrder({ userID: idAccount, orderID: orderID })
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
  const shippingOrder = async (orderID) => {
    return new Promise((resolve, reject) => {
      orderService
        .shipping({ userID: idAccount, orderID: orderID })
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
  const successOrder = async (orderID) => {
    return new Promise((resolve, reject) => {
      orderService
        .success({ userID: idAccount, orderID: orderID })
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
  const cancelOrder = async (orderID) => {
    return new Promise((resolve, reject) => {
      orderService
        .cancel({ userID: idAccount, orderID: orderID })
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
  const buttonsData = [
    { label: "Confirm", color: "warning", action: confirmOrder },
    { label: "Shipping", color: "primary", action: shippingOrder },
    { label: "Success", color: "success", action: successOrder },
    { label: "Cancel", color: "error", action: cancelOrder },
  ];
  // ------------------------------------------------------------------------------------------------
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
  // ------------------------------------------------------------------------------------------------

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

  const accordionProps = {
    sx: {
      pointerEvents: "none",
    },
    expandIcon: (
      <ExpandMoreIcon
        sx={{
          pointerEvents: "auto",
        }}
      />
    ),
  };
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
                          sx={{ width: "14%" }}
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
                          <AccordionSummary {...accordionProps}>
                            <TableRow
                              hover
                              key={orderID}
                              tabIndex={-1}
                              sx={{ width: "100%" }}
                              role="checkbox"
                              selected={selectedUser}
                            >
                              <TableCell align="center" sx={{ width: "15%" }}>
                                <Typography variant="subtitle2" noWrap>
                                  # {orderID}
                                </Typography>
                              </TableCell>
                              <TableCell align="center" sx={{ width: "15%" }}>
                                {payment === "LIVE"
                                  ? "Direct puchase"
                                  : "Shipping"}{" "}
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
                                {total.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </TableCell>
                              <TableCell align="center" sx={{ width: "15%" }}>
                                {staffUsers?.lastName}
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
                                  payment={payment}
                                  orderID={orderID}
                                  buttonsData={buttonsData}
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
    </>
  );
}
