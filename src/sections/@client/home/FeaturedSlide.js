// SECTIONS SẢN PHẨM NỔI BẬT HÔM NAY (slider)
// ------------------------------------------------------------------------
import PropTypes from "prop-types";
import Slider from "react-slick";
// @mui
import {
  Button,
  Chip,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Iconify from "../../../components/iconify/Iconify";
import { ProductCard } from "../products";
import { CustomCard } from "../products/ProductCard";

// ----------------------------------------------------------------------

const customArrowStyles = {
  position: "absolute",
  zIndex: 1,
};

const CustomNextArrow = (props) => (
  <Button
    {...props}
    style={{ ...customArrowStyles, right: "-32px" }}
    aria-label="Next"
  />
);

const CustomPrevArrow = (props) => (
  <Button
    {...props}
    style={{ ...customArrowStyles, left: "-32px" }}
    aria-label="Previous"
  />
);

FeaturedSlide.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array.isRequired,
  limit: PropTypes.number,
  loading: PropTypes.bool,
};
// ------------------------------------------------------------------------

function FeaturedSlide({ title, products = [], limit, loading }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const s = matches ? 5 : 4;

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: s,
    slidesToScroll: s,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <>
      <Stack sx={{ background: "#e0edfe", pt: 2, pb: 2, borderRadius: 2 }}>
        <Typography variant="h4" mb={2}>
          <Iconify
            icon="ri:shield-star-fill"
            sx={{
              pt: 0.2,
              mr: 1.5,
              ml: 1.5,
              color: "#fff",
              background: "#1565c0",
              borderRadius: "50%",
            }}
          />{" "}
          {title}
        </Typography>
        <Slider {...settings} style={{ margin: "0 12px" }}>
          {loading
            ? Array.from(new Array(limit)).map((item, index) => (
                <CustomCard key={index}>
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "auto", height: "250px", p: "16px" }}
                  />
                  <Stack spacing={1} sx={{ p: "8px 16px 16px 16px" }}>
                    <Skeleton
                      variant="rectangular"
                      sx={{ width: "auto", height: "20px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      sx={{ pt: "4px", width: "auto", height: "20px" }}
                    />
                    <Chip
                      size="small"
                      label={
                        <Skeleton
                          variant="rectangular"
                          sx={{ width: "auto", height: "10px" }}
                        />
                      }
                    />
                  </Stack>
                </CustomCard>
              ))
            : products
                .slice(0, limit)
                .map((data) => (
                  <ProductCard
                    product={data}
                    sx={{ m: "0 10px" }}
                    key={data?.productID}
                  />
                ))}
        </Slider>
      </Stack>
    </>
  );
}
export default FeaturedSlide;
