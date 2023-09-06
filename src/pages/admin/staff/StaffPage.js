import { message } from "antd";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

// @mui
import {
  Button,
  Card,
  Checkbox,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";
import Label from "../../../components/label";
import Scrollbar from "../../../components/scrollbar";
// sections
import {
  UserListHead,
  UserListToolbar,
} from "../../../sections/@dashboard/user";
// mock
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  applySortFilterByPhone,
  convertStringToDateTime,
  getComparator,
} from "src/helper/table";
import { DeleteDialog } from "src/sections/@dashboard/products";
import ResetPassDialog from "src/sections/@dashboard/products/ResetPassDialog";
import { staffService } from "src/services/staffService";

message.config({
  top: 100,
  duration: 5,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
});
// ----------------------------------------------------------------------

export default function Staff() {
  const TABLE_HEAD = [
    { id: "email", label: "Email", alignLeft: true },
    { id: "fullName", label: "Full name" },
    { id: "role", label: "Role" },
    { id: "status", label: "Status" },
    { id: "phone", label: "Phone" },
    { id: "manager", label: "Manager" },
    { id: "create", label: "Create Date", alignLeft: true },
    { id: "" },
  ];
  const [staffs, setStaffs] = useState([]);
  const managerID = useSelector((state) => state.auth.idAccount);
  const [page, setPage] = useState(0);
  const [selectedStaffID, setSelectedStaffID] = useState(null);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [openDeletedialog, setDeleteDialog] = useState(false);
  const [openResetdialog, setResetDialog] = useState(false);
  const [open, setOpen] = useState(null);
  const [idRowStaff, setIdRowStaff] = useState(null);
  const [stateRowStaff, setStateRowStaff] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllStaff();
  }, []);
  const compareByCreatedAt = (staffA, staffB) => {
    const dateA = new Date(staffA.createDate);
    const dateB = new Date(staffB.createDate);
    return dateB - dateA;
  };
  const getAllStaff = async () => {
    return new Promise((resolve, reject) => {
      staffService
        .getAll(managerID)
        .then((response) => {
          setStaffs(response.sort(compareByCreatedAt));
          console.log("get staffs", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const changeState = async (userID) => {
    return new Promise((resolve, reject) => {
      staffService
        .changeState({ userID: managerID, staffUserID: userID })
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            setDeleteDialog(false);
            getAllStaff();
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
      staffService
        .resetPass({ userID: managerID, staffUserID: userID })
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            setResetDialog(false);
            getAllStaff();
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

  const handleOpenMenu = (event, active, staffID) => {
    setIdRowStaff(staffID);
    setSelectedStaffID(staffID);
    setStateRowStaff(active);
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

  const deleteStaff = async (id) => {
    if (idRowStaff !== null) {
      await dispatch(changeState(id));
      setOpen(null);
      setIdRowStaff(null);
    } else if (selected.length !== 0) {
      // await dispatch(changeStateMulti(id));
      setSelected([]);
    }
    // loadProducts();
    setDeleteDialog(false);
  };
  const resetPass = async (id) => {
    if (idRowStaff !== null) {
      await dispatch(resetPassword(id));
      setOpen(null);
      setIdRowStaff(null);
    } else if (selected.length !== 0) {
      // await dispatch(changeStateMulti(id));
      setSelected([]);
    }
    setResetDialog(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staffs?.length) : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = staffs?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const filteredUsers = applySortFilterByPhone(
    staffs,
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
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Staff manager
          </Typography>
          {/* button create product */}
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={Link}
            to="/dashboard/staff/new"
          >
            New Staff
          </Button>
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
                  rowCount={staffs?.length}
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
                        email,
                        fullName,
                        roles,
                        isActive,
                        phone,
                        managerLastName,
                        createDate,
                      } = row;
                      const selectedUser = selected.indexOf(userID) !== -1;

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
                              onChange={(event) => handleClick(event, userID)}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Typography
                              component={Link}
                              to={`/dashboard/staff/${userID}`}
                            >
                              {email}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{fullName}</TableCell>
                          <TableCell align="left">{roles[0]}</TableCell>
                          <TableCell align="center">
                            <Label color={isActive ? "success" : "warning"}>
                              {isActive ? "Active" : "Locked"}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell>{managerLastName}</TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {convertStringToDateTime(createDate)}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) =>
                                handleOpenMenu(event, isActive, userID)
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
            count={staffs?.length}
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
          component={Link}
          to={`/dashboard/staff/edit/${selectedStaffID}`}
        >
          <Iconify icon={"bx:edit"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem
          sx={
            stateRowStaff ? { color: "error.main" } : { color: "success.main" }
          }
          onClick={handleClickDeleteDialog}
        >
          <Iconify
            icon={
              stateRowStaff
                ? "eva:toggle-left-outline"
                : "eva:toggle-right-outline"
            }
            sx={{ mr: 2 }}
          />
          {stateRowStaff ? "Locked" : "Unlock"}
        </MenuItem>
      </Popover>
      <DeleteDialog
        opendialog={openDeletedialog}
        handleClose={handleCloseDeleteDialog}
        deleteProduct={deleteStaff}
        id={idRowStaff}
        state={stateRowStaff}
      />
      <ResetPassDialog
        opendialog={openResetdialog}
        handleClose={handleCloseResetDialog}
        deleteProduct={resetPass}
        id={idRowStaff}
      />
    </>
  );
}
