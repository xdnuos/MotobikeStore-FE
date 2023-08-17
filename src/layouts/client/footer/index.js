import React from "react";
// @mui
import { Grid, Link, Stack, Button, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// Icon
import Iconify from "../../../components/iconify/Iconify";
import Logo from "../../../components/logoHome";

const COPYRIGHT = "©2023 Biker® by xdnuos~yangdev, lnc.";

const AboutUs = [
  { title: 'Shop system', href: "/" },
  { title: 'Business license', href: "/" },
  { title: 'Operational Regulations', href: "/" },
  { title: 'Deposit policy', href: "/" },
  { title: 'Introduce', href: "/" },
  { title: 'Return policy', href: "/" },
  { title: 'Delivery policy', href: "/" },
  { title: 'Order lookup', href: "/" }];

const Category = [
  { title: 'Order lookup', href: "/" },
  { title: 'Introduce', href: "/" },
  { title: 'Operational Regulations', href: "/" },
  { title: 'Shop system', href: "/" },
  { title: 'Business license', href: "/" },
  { title: 'Deposit policy', href: "/" },
  { title: 'Return policy', href: "/" },
  { title: 'Delivery policy', href: "/" },];

const FunctionalFoods = [
  { title: 'Introduce', href: "/" },
  { title: 'Shop system', href: "/" },
  { title: 'Business license', href: "/" },
  { title: 'Deposit policy', href: "/" },
  { title: 'Return policy', href: "/" },
  { title: 'Operational Regulations', href: "/" },
  { title: 'Delivery policy', href: "/" },
  { title: 'Order lookup', href: "/" }
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
      <div style={{
        background: '#4c83d9',
        width: '100%',
        display: "flex",
        justifyContent: 'center',
      }}>
        <StyledRoot sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 1
        }}>
          <Typography variant="h5" sx={{ color: '#fff', mt: 0.3 }}> <Iconify icon="material-symbols:location-on" sx={{ mr: 1, mb: -0.2 }} />Nationwide Motobike Store system</Typography>

          <Button variant="filled" sx={{ px: '15px', borderRadius: '18px', bgcolor: '#fff', '&:hover': { bgcolor: '#ffffffbd' }, }}>View Location</Button>

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
              issued on August 18, 2023 at the DOP and Investment HCM
            </Typography>
          </Grid>

          {/* Cột VỀ CHÚNG TÔI */}
          <StyledGridItem item xs={12} md={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" >ABOUT US</Typography>

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
              <Typography variant="subtitle2">CATEGORY</Typography>
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
              <Typography variant="subtitle2">TOP PRODUCT</Typography>
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
              <Typography variant="subtitle2">CONNECT WITH US</Typography>

              <Stack>
                <Typography variant="body2" color={"text.secondary"}>
                Buying advice (Free)
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
                Feedback, complaints (8h00 - 22h00)
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
              <Stack direction={'row'} spacing={3} pt={3}>
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
