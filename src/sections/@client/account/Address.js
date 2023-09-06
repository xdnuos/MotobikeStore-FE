import { Button, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import AddressDetail from "src/components/address/AddressDetail";
import Iconify from "src/components/iconify/Iconify";

export default function Address() {
  const userAddress = [
    {
      addressID: 552,
      address:
        "65 Kon Tách Đăng, Thị trấn Đinh Văn, Huyện Lâm Hà, Tỉnh Lâm Đồng",
      phone: "0565790288",
      fullName: "Phạm Thị Hảo",
    },
    {
      addressID: 752,
      address:
        "65 Kon Tách Đăng, Thị trấn Đinh Văn, Huyện Lâm Hà, Tỉnh Lâm Đồng",
      phone: "0865307743",
      fullName: "Hoàng Huyền",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Address</title>
      </Helmet>
      <Container>
        <Stack pt={2} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5">My address</Typography>
          <Button variant="contained">
            <Iconify icon={"ic:baseline-plus"}></Iconify>&nbsp; Create new
            address
          </Button>
        </Stack>
        {userAddress.map((address) => {
          return (
            <AddressDetail
              address={address}
              isDefault={true}
              key={address.addressID}
            ></AddressDetail>
          );
        })}
      </Container>
    </>
  );
}
