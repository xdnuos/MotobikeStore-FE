import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledButtonGreen } from "../custom/CustomButton";
import Iconify from "../iconify/Iconify";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={3}>
      <Typography variant="h4">Thank you for your purchase!</Typography>
      <div>
        <Box
          component="img"
          src="/assets/illustrations/character_checked.png"
          sx={{ position: "absolute", left: "53%", height: 175 }}
        />
        <Box
          component="img"
          src="/assets/illustrations/illustration_checked_cart.svg"
          sx={{ position: "relative", height: 200 }}
        />
      </div>
      <Link color={"text.info"} underline="hover" href="#">
        <Typography>Order ID: </Typography>
      </Link>
      <Typography align={"center"}>
        We will send you a notification within 5 days when it ships.
        <br />
        If you have any question or queries then fell to get in contact us.
      </Typography>

      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          width: "100%",
          pt: 4,
          px: 1,
          borderTop: "1px dashed lightgrey",
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          sx={{ color: "#000", py: "8px" }}
          onClick={() => navigate("/")}
        >
          <Iconify icon="ic:outline-keyboard-arrow-left" mr={1} />
          Continue Shopping
        </Button>
        <StyledButtonGreen onClick={() => navigate("/account/order")}>
          <Iconify icon="icon-park-outline:order" mr={1} />
          View Order
        </StyledButtonGreen>
      </Stack>
    </Stack>
  );
};
export default OrderSuccess;
