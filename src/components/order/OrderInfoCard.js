const {
  CardContent,
  Card,
  Typography,
  Grid,
  Stack,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
  IconButton,
} = require("@mui/material");
const { default: Iconify } = require("../iconify/Iconify");
const { ActionButtons } = require("./DialogConfirm");
export function OrderInfoCard({
  fullname,
  phone,
  note,
  address,
  payment,
  orderID,
  buttonsData,
}) {
  const Print = (OrderID) => {
    window.open(`/dashboard/invoice/${OrderID}`, "_blank");
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Buyer Information</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack direction={"row"} spacing={1}>
              <Iconify icon="wpf:name"></Iconify>
              <Typography variant="h7">{fullname}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Iconify icon="fluent:payment-32-regular"></Iconify>
              <Typography variant="h7">{payment}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Iconify icon="ph:note-light"></Iconify>
              <Typography variant="h7">{note}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction={"row"} spacing={1}>
              <Iconify icon="ph:phone"></Iconify>
              <Typography variant="h7">{phone}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <Iconify icon="mdi:address-marker-outline"></Iconify>
              <Typography variant="h7">{address}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              {buttonsData?.map((button, index) => (
                <ActionButtons
                  key={index + orderID}
                  orderID={orderID}
                  color={button.color}
                  action={button.action}
                >
                  {button.label}
                </ActionButtons>
              ))}
              <IconButton onClick={() => Print(orderID)}>
                <Iconify icon="teenyicons:print-outline"></Iconify>
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function OrderItemsTable({ orderItems }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItems?.map((orderItem) => (
            <TableRow key={orderItem.orderItemID}>
              <TableCell>{orderItem.product.name}</TableCell>
              <TableCell align="center">{orderItem.quantity}</TableCell>
              <TableCell align="center">{orderItem.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
