import React from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Stack,
  MenuItem,
  Popover,
  IconButton,
} from "@mui/material";
import Iconify from "../../../../components/iconify/Iconify";
import PropTypes from "prop-types";
import {
  StyledButtonGreen,
  StyledButtonGreenOutlined,
  StyledButtonGreenText,
} from "../../../../components/custom/CustomButton";

import Label from "../../../../components/label/Label";
import OrderSummary from "./OrderSummary";
import AddressForm from "./AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { customersService } from "../../../../services/customerService";
import { setAddress } from "src/redux/order/OrderSlice";
import { Input, Select } from "antd";
import { useEffect } from "react";
import axios from "axios";

BillingAndAddress.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
};
const PROVINCES_API_URL = "https://provinces.open-api.vn/api";

function BillingAndAddress({ handleBack, handleNext, activeStep }) {
  const dispatch = useDispatch();


  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [nameProvince, setNameProvince] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWard, setNameWard] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [location, setLocation] = useState();




  const [open, setOpen] = useState(null);

  const totalPrice = useSelector((state) => state.order.totalPrice);
  const idAccount = useSelector((state) => state.auth.idAccount);



  const handleProvinceChange = (value, option) => {
    setSelectedProvince(value);
    setNameProvince(option?.label ?? "");
  };

  const handleDistrictChange = (value, option) => {
    setSelectedDistrict(value);
    setNameDistrict(option?.label ?? "");
  };

  const handleWardChange = (value, option) => {
    setSelectedWard(value);
    setNameWard(option?.label ?? "");
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);

  };



  useEffect(() => {
    setAddress(
      street + ", " + nameWard + ", " + nameDistrict + ", " + nameProvince
    );
  }, [nameProvince, nameDistrict, nameWard, street]);

  useEffect(() => {
    axios
      .get(`${PROVINCES_API_URL}/p`)
      .then((response) => {
        setProvince(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedWard]);

  useEffect(() => {
    // Fetch the list of districts when a province is selected
    if (selectedProvince) {
      axios
        .get(`${PROVINCES_API_URL}/p/${selectedProvince}?depth=2`)
        .then((response) => {
          setDistricts(response.data.districts);
          setSelectedDistrict(null);
          setWards([]);
          setSelectedWard(null);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setDistricts([]);
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedProvince]);

  useEffect(() => {
    // Fetch the list of wards when a district is selected
    if (selectedDistrict) {
      axios
        .get(`${PROVINCES_API_URL}/d/${selectedDistrict}?depth=2`)
        .then((response) => {
          setWards(response.data.wards);
          setSelectedWard(null);
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      handleNext();
      const addAddress = await customersService.createAddress({
        idAccount: idAccount,
        address: {
          province: province,
          district: districts,
          ward: wards,
          street: street,
        },
        isDefault: true,
      });
      dispatch(
        setAddress({
          idAddress: addAddress.idAddress,
          address: addAddress.address,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8.5}>
            <Card>
              <CardContent>
                {/* <Stack spacing={1}  >
                    <Stack direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction={'row'} spacing={1}>
                        <Typography variant='subtitle1'> Jayvion Simon </Typography>
                        <Typography color={'text.secondary'}>(Home)</Typography>
                        <Label color={'info'}>Default</Label>
                      </Stack>
  
                      <IconButton size="small" sx={{ height: 26, width: 26 }} color="inherit" onClick={handleOpenMenu}>
                        <Iconify icon={'eva:more-vertical-fill'} />
                      </IconButton>
                    </Stack>
                    <Typography variant='body2'>
                      19034 Verna Unions Apt. 164 - Honolulu, RI / 87535
                    </Typography>
  
                    <Grid container alignItems={'center'}>
                      <Grid item xs={12} md={9}>
                        <Typography variant='body2' alignItems={'center'} color={'text.secondary'} noWrap>
                          365-374-4961
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                      
                        <StyledButtonGreenOutlined sx={{ mt: { xs: 2, md: 0 }, padding: '3px 9px' }} size='small' onClick={handleNext}>Chọn địa chỉ này</StyledButtonGreenOutlined>
                      </Grid>
                    </Grid>
                  </Stack> */}

                <form onSubmit={handleFormSubmit}>
                  <Grid container spacing={2} mt={1}>
                    <Grid item md={6} xs={12}>
                      <Select
                        showSearch
                        placeholder="Tỉnh..."
                        optionFilterProp="children"
                        value={selectedProvince}
                        rules={[{ required: true }]}
                        onChange={handleProvinceChange}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={province.map((province) => ({
                          value: province.code,
                          label: province.name,
                        }))}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Select
                        showSearch
                        placeholder="Huyện..."
                        optionFilterProp="children"
                        value={selectedDistrict}
                        rules={[{ required: true }]}
                        onChange={handleDistrictChange}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={districts.map((district) => ({
                          value: district.code,
                          label: district.name,
                        }))}
                        style={{ width: "100%" }}
                        disabled={!selectedProvince}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Select
                        showSearch
                        placeholder="Xã..."
                        optionFilterProp="children"
                        value={selectedWard}
                        rules={[{ required: true }]}
                        onChange={handleWardChange}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={wards.map((ward) => ({
                          value: ward.code,
                          label: ward.name,
                        }))}
                        style={{ width: "100%" }}
                        disabled={!selectedDistrict}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <Input
                  placeholder="Địa chỉ cụ thể"
                  style={{ marginTop: "15px" }}
                  value={street}
                  onChange={handleStreetChange}
                />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <StyledButtonGreenText
                      type="submit"
                      disabled={!selectedWard || !selectedDistrict || !selectedProvince || street.valueOf(0) === ""}
                      sx={{ mt: 3.5, height: "50px", width: "40%" }}
                    >
                      <Iconify
                        icon="ic:sharp-plus"
                        sx={{ height: 16, width: 16 }}
                      />
                      &nbsp; Thêm địa chỉ &nbsp;
                    </StyledButtonGreenText>
                  </Grid>
                </form>
              </CardContent>
            </Card>

            {/* --------------------------------------- BUTTON --------------------------------------------------- */}
            <Stack
              direction={"row"}
              mt={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <Button sx={{ color: "#000" }} onClick={handleBack}>
                <Iconify icon="ic:outline-keyboard-arrow-left" mr={1} />
                Back
              </Button>

              {/* <StyledButtonGreenText size='small' onClick={handleOpenDialog}>
                  <Iconify icon='ic:sharp-plus' sx={{ height: 16, width: 16 }} />
                  &nbsp; Thêm địa chỉ mới &nbsp;
                </StyledButtonGreenText> */}
            </Stack>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={3.5}>
            <OrderSummary activeStep={activeStep} totalPrice={totalPrice} />
          </Grid>
        </Grid>
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <AddressForm open={openDialog} onClose={handleCloseDialog} />
    </>
  );
}
export default BillingAndAddress;
