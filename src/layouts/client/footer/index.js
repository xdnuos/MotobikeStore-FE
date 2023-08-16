import React from "react";
// @mui
import { Grid, Link, Stack, Button, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// Icon
import Iconify from "../../../components/iconify/Iconify";
import Logo from "../../../components/logoHome";

const COPYRIGHT = "©2023 Biker® by Giang~Đình, lnc.";

const AboutUs = [
  { title: "Giới thiệu", href: "#" },
  { title: "Hệ thống cửa hàng", href: "#" },
  { title: "Giấy phép kinh doanh", href: "#" },
  { title: "Quy chế hoạt động", href: "#" },
  { title: "Chính sách đặt cọc", href: "#" },
  { title: "Chính sách đổi trả thuốc", href: "#" },
  { title: "Chính sách giao hàng", href: "#" },
  { title: "Chính sách bảo mật", href: "#" },
  { title: "Chính sách thanh toán", href: "#" },
  { title: "Kiểm tra hóa đơn điện tử", href: "#" },
  { title: "Tra cứu đơn hàng", href: "#" },
];

const Category = [
  { title: "Giới thiệu", href: "#" },
  { title: "Hệ thống cửa hàng", href: "#" },
  { title: "Giấy phép kinh doanh", href: "#" },
  { title: "Quy chế hoạt động", href: "#" },
  { title: "Chính sách đặt cọc", href: "#" },
  { title: "Chính sách đổi trả thuốc", href: "#" },
  { title: "Chính sách giao hàng", href: "#" },
  { title: "Chính sách bảo mật", href: "#" },
  { title: "Chính sách thanh toán", href: "#" },
  { title: "Kiểm tra hóa đơn điện tử", href: "#" },
  { title: "Tra cứu đơn hàng", href: "#" },
];

const FunctionalFoods = [
  { title: "Giới thiệu", href: "#" },
  { title: "Hệ thống cửa hàng", href: "#" },
  { title: "Giấy phép kinh doanh", href: "#" },
  { title: "Quy chế hoạt động", href: "#" },
  { title: "Chính sách đặt cọc", href: "#" },
  { title: "Chính sách đổi trả thuốc", href: "#" },
  { title: "Chính sách giao hàng", href: "#" },
  { title: "Chính sách bảo mật", href: "#" },
  { title: "Chính sách thanh toán", href: "#" },
  { title: "Kiểm tra hóa đơn điện tử", href: "#" },
  { title: "Tra cứu đơn hàng", href: "#" },
];

const StyledFooter = styled("footer")(() => ({
  position: "absolute",
  width: "100%",
  left: 0,
  marginTop: "24px",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledRoot = styled("div")(({ theme }) => ({
  width: "100%",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    width: "1200px",
  },
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

function Footer() {
  return (
    <StyledFooter>
      {/* Link hệ thống nhà thuốc toàn quốc */}
      <div
        style={{
          background: "#4c83d9",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledRoot
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
          }}
        >
          <Typography variant="h5" sx={{ color: "#fff", mt: 0.3 }}>
            {" "}
            <Iconify
              icon="material-symbols:location-on"
              sx={{ mr: 1, mb: -0.2 }}
            />
            Xem hệ thống nhà thuốc toàn quốc
          </Typography>

          <Button
            variant="filled"
            sx={{
              px: "15px",
              borderRadius: "18px",
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#ffffffbd" },
            }}
          >
            Xem danh sách nhà thuốc
          </Button>
        </StyledRoot>
      </div>

      {/* footer body */}
      <StyledRoot>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ py: 3 }}
        >
          {/* Cột đầu tiên logo + COPYRIGHT */}
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            ml={3}
            pb={2}
          >
            <Logo sx={{ width: 100, height: 100 }} />
            <Typography variant="body2" color={"text.secondary"}>
              {COPYRIGHT}
              <br />
              ĐKKD 0394366313 cấp ngày 17/09/2018 tại Sở Kế hoạch Đầu tư TPHCM
            </Typography>
          </Grid>

          {/* Cột VỀ CHÚNG TÔI */}
          <StyledGridItem item xs={12} md={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">VỀ CHÚNG TÔI</Typography>

              {AboutUs.map((data, index) => {
                return (
                  <ListItem key={index} sx={{ p: 0 }}>
                    <Link href={data.href} underline="hover">
                      <Typography variant="body2" color={"text.secondary"}>
                        {data.title}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </Stack>
          </StyledGridItem>

          {/* DANH MỤC */}
          <StyledGridItem item xs={12} md={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">DANH MỤC</Typography>
              {Category.map((data, index) => {
                return (
                  <ListItem key={index} sx={{ p: 0 }}>
                    <Link href={data.href} underline="hover">
                      <Typography variant="body2" color={"text.secondary"}>
                        {data.title}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </Stack>
          </StyledGridItem>

          {/* THỰC PHẨM CHỨC NĂNG */}
          <StyledGridItem item xs={12} md={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">THỰC PHẨM CHỨC NĂNG</Typography>
              {FunctionalFoods.map((data, index) => {
                return (
                  <ListItem key={index} sx={{ p: 0 }}>
                    <Link href={data.href} underline="hover">
                      <Typography variant="body2" color={"text.secondary"}>
                        {data.title}
                      </Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </Stack>
          </StyledGridItem>

          {/* hotline */}
          <StyledGridItem item xs={12} md={2}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">KẾT NỐI VỚI CHÚNG TÔI</Typography>

              <Stack>
                <Typography variant="body2" color={"text.secondary"}>
                  Tư vấn mua hàng (Miễn Phí)
                </Typography>
                <Link href="#" underline="none">
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"h3.fontSize"}
                    variant="body2"
                  >
                    1800 2801
                  </Typography>
                </Link>
              </Stack>
              <Stack>
                <Typography variant="body2" color={"text.secondary"}>
                  Góp ý, khiếu nại (8h00 - 22h00)
                </Typography>
                <Link href="#" underline="none">
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"h3.fontSize"}
                    variant="body2"
                  >
                    1800 0204
                  </Typography>
                </Link>
              </Stack>
              <Stack direction={"row"} spacing={3} pt={8}>
                <Iconify height={25} width={25} icon="logos:facebook" />
                <Iconify height={25} width={25} icon="skill-icons:twitter" />
                <Iconify height={25} width={25} icon="logos:linkedin-icon" />
              </Stack>
            </Stack>
          </StyledGridItem>
        </Grid>
      </StyledRoot>
    </StyledFooter>
  );
}

export default Footer;
