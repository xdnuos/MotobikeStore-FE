import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
// @mui
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableHead,
  TableSortLabel,
} from "@mui/material";
// components
import Label from "../../components/label";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
// mock
// import USERLIST from "../../_mock/user";
// import { storeService } from "../../services/storeService";
import { orderService } from "../../services/orderService";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "" },
  { id: "1", label: "Quantity Ordered", alignRight: false },
  { id: "2", label: "Name Receiver", alignRight: false },
  { id: "3", label: "Payment methods", alignRight: false },
  { id: "4", label: "Status", alignRight: false },
  { id: "5", label: "Total Price", alignRight: false },
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
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  const idAccount = useSelector((state) => state.auth.idAccount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      orderService.getOrderByCustomer(idAccount).then((response) => {
        return setOrders(response);
      }).catch((error) => {
        return error;
      });
    }
  }, [idAccount, isLoggedIn]);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
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
      const newSelecteds = orders?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
        <title> My Orders </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            My Orders
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  {/* <div style={{ width: "100%" }}> */}
                    <TableRow>
                      
                    <TableCell>{" "}</TableCell>
                    <TableCell align="left">sssssssssssssssssssssss</TableCell>
                    <TableCell>sssssssssssssssssssssss</TableCell>
                    <TableCell>sssssssssssssssssssssss</TableCell>
                      {/* {TABLE_HEAD.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.alignRight ? "right" : "left"}
                          sortDirection={
                            orderBy === headCell.id ? order : false
                          }
                          // sx={{ width: "24%" }}
                        >
                          {headCell.label}
                        </TableCell>
                      ))} */}
                    </TableRow>
                  {/* </div> */}
                </TableHead>
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { orderID, orderItems, orderStatus, total, payment ,fullname} =  row;
                      const selectedUser = selected.indexOf(orderItems) !== -1;

                      return (
                        <Accordion>
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
                                sx={{ width: "23%" }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Typography variant="subtitle2" noWrap>
                                    {orderItems?.length} sản phẩm
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left" sx={{ width: "23%" }}>
                                {fullname}
                              </TableCell>
                              <TableCell align="left" sx={{ width: "23%" }}>
                                {payment}
                              </TableCell>

                              <TableCell align="left" sx={{ width: "23%" }}>
                                <Label color={"success"}>{orderStatus}</Label>
                              </TableCell>

                              <TableCell align="center" sx={{ width: "23%" }}>
                                {total}
                              </TableCell>

                              <TableCell align="right" sx={{ width: "4%" }}>
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={handleOpenMenu}
                                >
                                  <Iconify icon={"eva:more-vertical-fill"} />
                                </IconButton>
                              </TableCell>
                            </TableRow>{" "}
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              {orderItems?.map((orderItem) => (
                                <Typography
                                  key={orderItem.itemId}
                                  variant="subtitle2"
                                >
                                  - {orderItem.productName} &nbsp;&nbsp; Số
                                  lượng: &nbsp;{orderItem.quantity} &nbsp;&nbsp;
                                  Giá: {orderItem.price} &nbsp;&nbsp;Đơn
                                  vị:&nbsp; {orderItem.unit}
                                </Typography>
                              ))}
                            </Typography>
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
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
