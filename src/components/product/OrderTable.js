import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "../iconify/Iconify";
import { useState } from "react";
import { Avatar } from "antd";
import Label from "../label/Label";
import { convertStringToDateTime } from "src/helper/table";
import { formatCurrencyVND } from "src/helper/price";

export default function OrderDetail({ order }) {
  return (
    <Card sx={{ mb: 5 }}>
      <CardHeader
        title={
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={1}
          >
            <Typography variant="h6">
              #{order.orderID} &nbsp;|{" "}
              {convertStringToDateTime(order.orderTime)}
            </Typography>
            <Label
              color={order?.orderStatus === "SUCCESS" ? "success" : "warning"}
            >
              {order.orderStatus}
            </Label>
          </Stack>
        }
      />

      <CardContent>
        <Divider />
        {order?.orderItems.map((orderItem) => {
          const { orderItemID, price, product, quantity } = orderItem;
          return (
            <>
              <Stack
                key={orderItemID}
                mt={2}
                mb={2}
                justifyContent={"space-between"}
                direction="row"
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    shape="square"
                    size={64}
                    src={product?.images[0]}
                  ></Avatar>
                  <Stack>
                    <Typography variant="h7">{product.name}</Typography>
                    <Typography variant="h7">x{quantity}</Typography>
                  </Stack>
                </Stack>
                <Typography variant="h7">{formatCurrencyVND(price)}</Typography>
              </Stack>
              <Divider />
            </>
          );
        })}
        <Stack justifyContent={"space-between"} direction="row" mt={2}>
          <Stack>
            <Stack direction={"row"} spacing={1}>
              <Iconify icon="ph:user"></Iconify>
              <Typography variant="h7">{order.fullname}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Iconify icon="ph:phone"></Iconify>
              <Typography variant="h7">{order.phone}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Iconify icon="mdi:address-marker-outline"></Iconify>
              <Typography variant="h7">
                {order.address !== null ? order.address : "Buy in store"}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            alignItems={"center"}
            mt={2}
            direction="row"
            justifyContent={"end"}
          >
            <Typography variant="h7">Total: &nbsp;</Typography>
            <Typography variant="h5">
              {formatCurrencyVND(order.total)}
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent={"end"} direction="row" mt={2}>
          <Button variant="outlined">Buy again</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
