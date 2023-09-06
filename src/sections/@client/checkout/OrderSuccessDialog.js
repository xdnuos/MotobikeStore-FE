import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import OrderSuccess from "src/components/order/OrderSuccess";

const OrderSuccessDialog = ({ open }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      open={open}
      maxWidth={"100%"}
      fullWidth={true}
      fullScreen={true}
      PaperProps={{
        style: {
          maxWidth: fullScreen ? "calc(100% - 32px)" : "calc(100% - 48px)",
          maxHeight: fullScreen ? "100%" : "calc(100% - 48px)",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <OrderSuccess></OrderSuccess>
    </Dialog>
  );
};

export default OrderSuccessDialog;
