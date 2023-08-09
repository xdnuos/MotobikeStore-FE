import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
  [theme.breakpoints.down("lg")]: {
    top: theme.spacing(9),
  },
}));

// ----------------------------------------------------------------------

const CartWidget = ({ cart }) => {
  const location = useLocation();

  return location.pathname === "/dashboard/checkout" ? (
    <></>
  ) : (
    <Link to="/dashboard/checkout">
      <StyledRoot>
        <Badge
          showZero
          badgeContent={!cart?.length ? 0 : cart?.length}
          color="error"
          max={10}
        >
          <SvgColor
            src={`/assets/icons/navbar/ic_cart.svg`}
            sx={{ width: 24, height: 24 }}
          />
        </Badge>
      </StyledRoot>
    </Link>
  );
};
CartWidget.propTypes = {
  cart: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};
export default connect(mapStateToProps)(CartWidget);
