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
  Tabs,
  Tab,
  CardContent,
} from "@mui/material";
// components
import Iconify from "../../components/iconify";

import { orderService } from "../../services/orderService";
import { useSelector } from "react-redux";
import { TabContext, TabPanel } from "@mui/lab";
import OrderDetail from "src/components/product/OrderTable";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const idAccount = useSelector((state) => state.auth.idAccount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          const response = await orderService.getOrderByCustomer(idAccount);
          setOrders(response);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchData();
  }, [idAccount, isLoggedIn]);
  console.log("orders", orders);

  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const renderOrdersByStatus = (status) => {
    const filteredOrders = orders.filter(
      (order) => order.orderStatus === status
    );

    if (filteredOrders.length === 0) {
      return (
        <Card>
          <CardContent>
            <Typography variant="h5" textAlign={"center"}>
              No orders
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return filteredOrders.map((order) => (
      <OrderDetail key={order.orderID} order={order} />
    ));
  };
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
        >
          <Typography variant="h4" gutterBottom>
            My Orders
          </Typography>
        </Stack>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="disabled tabs example"
            centered
          >
            <Tab label="All" value="1" />
            <Tab label="Unconfirmation" value="2" />
            <Tab label="Confirmation" value="3" />

            <Tab label="Shipping" value="4" />
            <Tab label="Delivered" value="5" />
            <Tab label="Cancelled" value="6" />
          </Tabs>
          <TabPanel value="1">
            {orders?.map((order) => {
              return (
                <OrderDetail key={order.orderID} order={order}></OrderDetail>
              );
            })}
            {orders === null && (
              <Card>
                <CardContent>
                  <Typography variant="h5" textAlign={"center"}>
                    No pending orders
                  </Typography>
                </CardContent>
              </Card>
            )}
          </TabPanel>
          <TabPanel value="2">{renderOrdersByStatus("PENDING")}</TabPanel>
          <TabPanel value="3">{renderOrdersByStatus("CONFIRMED")}</TabPanel>
          <TabPanel value="4">{renderOrdersByStatus("SHIPPING")}</TabPanel>
          <TabPanel value="5">{renderOrdersByStatus("SUCCESS")}</TabPanel>
          <TabPanel value="6">{renderOrdersByStatus("CANCEL")}</TabPanel>
        </TabContext>
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
