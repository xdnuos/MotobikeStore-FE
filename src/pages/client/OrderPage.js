import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import {
  Card,
  CardContent,
  Container,
  MenuItem,
  Popover,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
// components
import Iconify from "../../components/iconify";

import { TabContext, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderDetail from "src/components/product/OrderTable";
import { fetchCartItems } from "src/redux/cart/cartSlice";
import { orderService } from "../../services/orderService";
async function fetchData(idAccount, isLoggedIn, setOrders) {
  if (isLoggedIn) {
    try {
      const response = await orderService.getOrdersForCustomer(idAccount);
      setOrders(
        response?.sort((a, b) => b.orderTime.localeCompare(a.orderTime))
      );
      // console.log(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
}
export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [value, setValue] = useState("1");
  const [reload, changeReload] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const idAccount = useSelector((state) => state.auth.idAccount);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    fetchData(idAccount, isLoggedIn, setOrders);
  }, [idAccount, isLoggedIn, reload]);
  // console.log("orders", orders);

  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCancel = async (orderID) => {
    const res = await orderService.cancelForCustomer({
      userID: idAccount,
      orderID,
    });
    if (res.status === 200) {
      // fetchData(idAccount, isLoggedIn, setOrders);
      changeReload(!reload);
      console.log(reload);
    }
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
      <OrderDetail
        key={order?.orderID}
        order={order}
        onCancel={handleCancel}
        onBuyAgain={onBuyAgain}
      />
    ));
  };

  const onBuyAgain = async (orderID) => {
    try {
      await orderService.buyAgainForCustomer({ userID: idAccount, orderID });
      await dispatch(fetchCartItems(idAccount));
      navigate("/checkout");
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      <Helmet>
        <title> My Orders </title>
      </Helmet>

      <Container>
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
                <OrderDetail
                  key={order.orderID}
                  order={order}
                  onCancel={handleCancel}
                  onBuyAgain={onBuyAgain}
                ></OrderDetail>
              );
            })}
            {orders.length === 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h5" textAlign={"center"}>
                    No orders
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
          <TabPanel value="6">{renderOrdersByStatus("FAILED")}</TabPanel>
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
