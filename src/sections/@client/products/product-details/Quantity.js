import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Iconify from "../../../../components/iconify/Iconify";
import { Box, IconButton } from "@mui/material";
import PropTypes from "prop-types";

const QuantityWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "fit-content",
  border: "1px solid #919eab52",
  borderRadius: "4px",
  height: "32px",
  marginLeft: "24px",
});

const QuantityButton = styled(IconButton)({
  width: "24px",
  height: "24px",
  padding: "1px",
  "&:disabled": {
    color: "#919eabcc",
  },
});

Quantity.propTypes = {
  countNumber: PropTypes.number,
  handleIncrement: PropTypes.func,
  handleDecrement: PropTypes.func,
};

function Quantity({ countNumber, handleDecrement, handleIncrement }) {
  // const [count, setCount] = useState(countNumber);

  return (
    <QuantityWrapper>
      <QuantityButton
        sx={{ mr: 1 }}
        onClick={handleDecrement}
        disabled={countNumber === 1}
      >
        <Iconify icon={"iconoir:minus-1"} />
      </QuantityButton>

      <span>{countNumber}</span>

      <QuantityButton sx={{ ml: 1 }} onClick={handleIncrement}>
        <Iconify icon={"bi:plus"} />
      </QuantityButton>
    </QuantityWrapper>
  );
}

export default Quantity;
