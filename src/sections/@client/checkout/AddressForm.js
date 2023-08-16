import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { CreateAddress } from '../../../redux/address/AddressSlice';
import Iconify from '../../../components/iconify/Iconify';

const PROVINCES_API_URL = "https://provinces.open-api.vn/api";

function AddressForm({ open, onClose }) {

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [note, setNote] = useState('');



  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [nameProvince, setNameProvince] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWard, setNameWard] = useState("");
  const [street, setStreet] = useState("");
  // const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const loading = useSelector((state) => state.address.loading);
  const idAccount = useSelector((state) => state.auth.idAccount);


  const handleProvinceChange = (event, option) => {
    setSelectedProvince(option?.value);
    setNameProvince(option?.label);
  };

  const handleDistrictChange = (value, option) => {
    setSelectedDistrict(option?.value);
    setNameDistrict(option?.label ?? "");
  };

  const handleWardChange = (value, option) => {
    setSelectedWard(option?.value);
    setNameWard(option?.label ?? "");
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     // dispatch(fetchCartItems(idAccount));
  //     // console.log("localStorageService",localStorageService.get("USER")?.id)
  //   }
  // }, [ isLoggedIn, idAccount]);



  useEffect(() => {
    axios
      .get(`${PROVINCES_API_URL}/p`)
      .then((response) => {
        setProvince(response.data);
        console.log(response.data);
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

          console.log(response.data);
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

          console.log(response.data);
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
    // Do something with the form data
    try {
      await dispatch(CreateAddress({
        address: `${street}, ${nameWard}, ${nameDistrict}, ${nameProvince}`,
        fullname: name,
        phone: phone,
        userID: idAccount
      }));
      setName('');
      setPhone('');
      setNameDistrict('');
      setNameProvince('');
      setNameWard('');
      setStreet('');
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Thêm địa chỉ nhận hàng</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} mt={1}>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  type='phone'
                  label="Họ và tên người nhận"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  type='number'
                  label="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <Autocomplete
                  options={province.map((province) => ({
                    value: province.code,
                    label: province.name,
                  }))}
                  getOptionLabel={(option) => option.label}
                  onChange={handleProvinceChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tỉnh..."
                      placeholder="Tỉnh..."
                      required
                    />
                  )}
                />

              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  options={districts.map((district) => ({
                    value: district.code,
                    label: district.name,
                  }))}
                  getOptionLabel={(option) => option.label}
                  onChange={handleDistrictChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Huyện..."
                      placeholder="Huyện..."
                      required
                    />
                  )}
                  disabled={!selectedProvince}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={wards.map((ward) => ({
                    value: ward.code,
                    label: ward.name,
                  }))}
                  getOptionLabel={(option) => option.label}
                  onChange={handleWardChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Xã..."
                      placeholder="Xã..."
                      rules={[{ required: true }]}
                    />
                  )}
                  disabled={!selectedDistrict}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Nhập địa chỉ cụ thể"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
            <DialogActions>
              <LoadingButton disabled={loading} variant="outlined" onClick={onClose}>Cancel</LoadingButton>
              <LoadingButton
                loading={loading}
                variant="outlined" type="submit" color="primary">Submit</LoadingButton>
            </DialogActions>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddressForm