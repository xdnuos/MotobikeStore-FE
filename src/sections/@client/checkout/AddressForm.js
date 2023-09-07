import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAddress } from "../../../redux/address/AddressSlice";

const PROVINCES_API_URL = "https://provinces.open-api.vn/api";

function AddressForm({ onClose }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [note, setNote] = useState("");

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
      const req = {
        address: `${street}, ${nameWard}, ${nameDistrict}, ${nameProvince}`,
        fullName: name,
        phone: phone,
      };
      await dispatch(createAddress({ userID: idAccount, req }));
      setName("");
      setPhone("");
      setNameDistrict("");
      setNameProvince("");
      setNameWard("");
      setStreet("");
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  return (
    <>
      <DialogTitle>Add new address</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2} mt={1}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                type="phone"
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                type="number"
                label="Phone number"
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
                    label="City/Province"
                    placeholder="City/Province"
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
                    label="District"
                    placeholder="District"
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
                    label="Ward"
                    placeholder="Ward"
                    rules={[{ required: true }]}
                  />
                )}
                disabled={!selectedDistrict}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
          <DialogActions>
            <LoadingButton
              disabled={loading}
              variant="outlined"
              onClick={onClose}
              color="error"
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              color="primary"
            >
              Save
            </LoadingButton>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  );
}

export default AddressForm;
