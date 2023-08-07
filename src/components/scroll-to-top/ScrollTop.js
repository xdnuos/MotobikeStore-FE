import React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Iconify from "../iconify/Iconify";

const ScrollTopStyle = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  
}));

const ScrollTop = (props) => {
  const { window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (
      event.target.ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <ScrollTopStyle>
      <IconButton
        aria-label="scroll back to top"
        size="large"
        onClick={handleClick}
        sx={{
            p:1,
          display: trigger ? "flex" : "none",
          bgcolor: "#10101078",
          boxShadow: '0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05)',
          "&:hover": { 
            bgcolor: "#101010a8",
          },
        }}
      >
        <Iconify icon="mdi:arrow-top-drop-circle" color={'#fff'} sx={{height:25,width:25}}/>
      </IconButton>
    </ScrollTopStyle>
  );
};



export default ScrollTop;
