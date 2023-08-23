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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
// components
import Label from "../../components/label";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
// sections
import { UserListToolbar } from "../../sections/@dashboard/user";
// mock
import { useSelector } from "react-redux";
import { stockService } from "src/services/stockService";
import { Link } from "react-router-dom";

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
      // console.log(array);
      return filter(
        array,
        (item) =>
          item.users.lastName?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
}
function StockItemsTable({ stockItems }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockItems?.map((stockItem) => (
            <TableRow key={stockItem.stockItemID}>
              <TableCell>
                {" "}
                <Avatar
                  alt={stockItem.product.name}
                  src={stockItem.product.imagesList[0].imagePath}
                  variant="rounded"
                  sx={{ width: 55, height: 55, marginRight: 2 }}
                />
              </TableCell>
              <TableCell>{stockItem.product.name}</TableCell>
              <TableCell align="center">{stockItem.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function ConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cancel Action</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to cancel ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default function InventoryManagement() {
  const TABLE_HEAD = [
    { id: "name", label: "Time", alignLeft: true },
    { id: "time", label: "Create by" },
    { id: "quantity", label: "Quantity product" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];
  const [receipts, setReceipts] = useState([]);
  const idAccount = useSelector((state) => state.auth.idAccount);
  const [page, setPage] = useState(0);
  const [receipt, setReceipt] = useState("asc");
  const [selectedStockID, setSelectedStockID] = useState(null);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getAllReceipt();
  }, []);
  const compareByCreatedAt = (receiptA, receiptB) => {
    const dateA = new Date(receiptA.createDate);
    const dateB = new Date(receiptB.createDate);
    return dateB - dateA;
  };
  const getAllReceipt = async () => {
    return new Promise((resolve, reject) => {
      stockService
        .get()
        .then((response) => {
          setReceipts(response.sort(compareByCreatedAt));
          console.log("response", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const confirmCancel = async () => {
    return new Promise((resolve, reject) => {
      stockService
        .cancel({ userID: idAccount, stockID: selectedStockID })
        .then((response) => {
          if (response.status === 200) {
            setTimeout(() => {
              message.success(response.data);
            }, 500);
            getAllReceipt();
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

  const handleOpenDialog = (stockID) => {
    setSelectedStockID(stockID);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = () => {
    handleCloseDialog();
    confirmCancel();
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - receipts?.length) : 0;

  const filteredUsers = applySortFilter(
    receipts,
    getComparator(receipt, orderBy),
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
            Warehouse Managerment
          </Typography>
          {/* button create product */}
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={Link}
            to="/dashboard/stock/new"
          >
            New Receipt
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
                            orderBy === headCell.id ? receipt : false
                          }
                          sx={{ width: "23%" }}
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
                      const { stockID, stockItems, users, createDate, status } =
                        row;
                      const selectedUser = selected.indexOf(stockItems) !== -1;

                      return (
                        <Accordion key={stockID}>
                          <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ width: "100%" }}
                          >
                            <TableRow
                              hover
                              key={stockID}
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
                                    {convertStringToDateTime(createDate)}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="center" sx={{ width: "23%" }}>
                                {users.lastName}
                              </TableCell>
                              <TableCell align="center" sx={{ width: "23%" }}>
                                {stockItems?.length}
                              </TableCell>
                              <TableCell align="center" sx={{ width: "23%" }}>
                                <Label
                                  color={
                                    status === "SUCCESS" ? "success" : "warning"
                                  }
                                >
                                  {status}
                                </Label>
                              </TableCell>
                              <TableCell align="right" sx={{ width: "23%" }}>
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={() => handleOpenDialog(stockID)}
                                >
                                  <Iconify icon={"ic:round-cancel"} />
                                </IconButton>
                              </TableCell>
                            </TableRow>{" "}
                          </AccordionSummary>
                          <AccordionDetails>
                            <StockItemsTable stockItems={stockItems} />
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
            count={receipts?.length}
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
