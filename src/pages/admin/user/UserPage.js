import { Helmet } from "react-helmet-async";
import { Link, Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
// components
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
// sections
import {
  UserListHead,
  UserListToolbar,
} from "../../../sections/@dashboard/user";
// mock
import { customersService } from "../../../services/customerService";
import ResetPassDialog from "src/sections/@dashboard/products/ResetPassDialog";
import { DeleteDialog } from "src/sections/@dashboard/products";
import { applySortFilterByPhone, getComparator } from "src/helper/table";
import { useDispatch } from "react-redux";
import { message } from "antd";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "phone", label: "Phone Number", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "order", label: "Total Order", alignRight: false },
  { id: "product", label: "Total Product Buy", alignRight: false },
  { id: "puscharsed", label: "Total Purchased", alignRight: false },
  { id: "ratio", label: "Ratio", alignRight: false },

  { id: "" },
];

// ----------------------------------------------------------------------
export default function UserPage() {
  const [users, setUsers] = useState([]);

  const getAllCustomer = async () => {
    return new Promise((resolve, reject) => {
      customersService
        .getAllCustomersAdmin()
        .then((response) => {
          setUsers(response);
          console.log("response", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    getAllCustomer();
  }, []);

  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeletedialog, setDeleteDialog] = useState(false);
  const [openResetdialog, setResetDialog] = useState(false);
  const [idRowCustomer, setIdRowCustomer] = useState(-1);
  const [stateRowCustomer, setStateRowCustomer] = useState(false);
  const dispatch = useDispatch();

  const changeState = async (userID) => {
    return new Promise((resolve, reject) => {
      customersService
        .changeState(userID)
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            setDeleteDialog(false);
            getAllCustomer();
            message.success(response.data);
          }
          resolve();
        })
        .catch((error) => {
          setDeleteDialog(false);
          message.error(error.response.data);
          reject(error);
        });
    });
  };
  const resetPassword = async (userID) => {
    return new Promise((resolve, reject) => {
      customersService
        .resetPass(userID)
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            setResetDialog(false);
            getAllCustomer();
            message.success(response.data);
          }
          resolve();
        })
        .catch((error) => {
          setResetDialog(false);
          message.error(error.response.data);
          reject(error);
        });
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users?.map((n) => n.name);
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

  const handleOpenMenu = (event, id, active) => {
    setIdRowCustomer(id);
    setStateRowCustomer(active);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const deleteCustomer = async (id) => {
    if (idRowCustomer !== -1) {
      await dispatch(changeState(id));
      setOpen(null);
      setIdRowCustomer(-1);
    } else if (selected.length !== 0) {
      // await dispatch(changeStateMulti(id));
      setSelected([]);
    }
    // loadProducts();
    setDeleteDialog(false);
  };
  const resetPass = async (id) => {
    if (idRowCustomer !== -1) {
      await dispatch(resetPassword(id));
      setOpen(null);
      setIdRowCustomer(-1);
    } else if (selected.length !== 0) {
      // await dispatch(changeStateMulti(id));
      setSelected([]);
    }
    setResetDialog(false);
  };
  // --------------------------------------------------------------------------
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users?.length) : 0;

  const filteredUsers = applySortFilterByPhone(
    users,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;
  // message.success("response.data");
  return (
    <>
      <Helmet>
        <title> User | Biker Dashboard </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
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
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        userID,
                        fullName,
                        email,
                        isActive,
                        phone,
                        createDate,
                        totalOrders,
                        totalProductBuy,
                        totalPurchased,
                        ratioOrder,
                        avatarUrl,
                      } = row;
                      const selectedUser = selected.indexOf(phone) !== -1;

                      return (
                        <TableRow
                          hover
                          key={userID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, phone)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={userID} src={avatarUrl} />
                              <Typography
                                variant="subtitle2"
                                noWrap
                                component={RouterLink}
                                to={`/dashboard/users/${userID}`}
                              >
                                {fullName}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{phone}</TableCell>

                          <TableCell align="left">
                            {email === null ? "Unregistered" : email}
                          </TableCell>

                          <TableCell align="left">
                            <Label color={isActive ? "success" : "warning"}>
                              {isActive
                                ? "Active"
                                : email !== null
                                ? "Locked"
                                : "Unregistered"}
                            </Label>
                          </TableCell>
                          <TableCell align="center">{totalOrders}</TableCell>
                          <TableCell align="center">
                            {totalProductBuy}
                          </TableCell>
                          <TableCell align="center">
                            {totalPurchased.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </TableCell>
                          <TableCell align="center">
                            {ratioOrder * 100} %
                          </TableCell>
                          <TableCell align="right">
                            {email !== null && (
                              <IconButton
                                size="large"
                                color="inherit"
                                onClick={(e) =>
                                  handleOpenMenu(e, userID, isActive)
                                }
                              >
                                <Iconify icon={"eva:more-vertical-fill"} />
                              </IconButton>
                            )}
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
            count={users?.length}
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
          onClick={handleClickResetDialog}
          // to={`/dashboard/products/edit/${idRowProduct}`}
        >
          <Iconify icon={"fluent:key-reset-20-filled"} sx={{ mr: 2 }} />
          Reset Pass
        </MenuItem>
        <MenuItem
          sx={
            stateRowCustomer
              ? { color: "error.main" }
              : { color: "success.main" }
          }
          onClick={handleClickDeleteDialog}
        >
          <Iconify
            icon={
              stateRowCustomer
                ? "eva:toggle-left-outline"
                : "eva:toggle-right-outline"
            }
            sx={{ mr: 2 }}
          />
          {stateRowCustomer ? "Locked" : "Unlock"}
        </MenuItem>
      </Popover>
      <DeleteDialog
        opendialog={openDeletedialog}
        handleClose={handleCloseDeleteDialog}
        deleteProduct={deleteCustomer}
        id={idRowCustomer}
        state={stateRowCustomer}
      />
      <ResetPassDialog
        opendialog={openResetdialog}
        handleClose={handleCloseResetDialog}
        deleteProduct={resetPass}
        id={idRowCustomer}
      />
    </>
  );
}
