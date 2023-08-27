import { Icon } from "@iconify/react";
import { Container, Grid, Paper } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import NavProfile from "src/components/nav-section/NavProfile";
export default function AccountPage() {
  const navConfig = [
    {
      title: "My profile",
      path: "/account/profile",
      icon: <Icon icon="solar:user-linear" />,
      children: [
        {
          title: "Profile",
          path: "/account/profile",
        },
        {
          title: "Address",
          path: "/account/address",
        },
        {
          title: "Change password",
          path: "/account/changePassword",
        },
      ],
    },
    {
      title: "Order",
      path: "/account/order",
      icon: <Icon icon="icon-park-outline:order" />,
    },
  ];
  return (
    <>
      <Helmet>
        <title>Motobike Store</title>
      </Helmet>
      <Container>
        <Grid container>
          <Grid item xs={2}>
            <NavProfile menuConfig={navConfig} />
          </Grid>
          <Grid item xs={10} mb={8}>
            <Paper>
              <Outlet />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
