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
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, updateAddress } from "src/redux/address/AddressSlice";
import { addressService } from "src/services/addressService";
import * as yup from "yup";

function AddressForm({ onClose, addressID }) {
  const dispatch = useDispatch();
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const loading = useSelector((state) => state.address.loading);
  const userID = useSelector((state) => state.auth.idAccount);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/v1/address/p`)
      .then((response) => {
        console.log("Provinces", response);
        setProvince(response.data);
        setDistricts([]);
        setWards([]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const getDistrict = (selectedProvince) => {
    if (selectedProvince !== null) {
      axios
        .get(`/api/v1/address/p/${selectedProvince}/d`)
        .then((response) => {
          console.log("Districts", response);
          setDistricts(response.data);
          setWards([]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const getWard = (selectedDistrict) => {
    if (selectedDistrict !== null) {
      axios
        .get(`/api/v1/address/d/${selectedDistrict}/w`)
        .then((response) => {
          console.log("Wards", response);
          setWards(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      if (addressID !== undefined) {
        const res = await addressService.getAddressByID({ userID, addressID });
        console.log("addressFull", res);
        setAddress(res);
      }
    };
    getAddress().catch(console.error);
  }, []);
  const validationSchema = yup.object().shape({
    name: yup.string().min(4, "Too short").required("Name is required"),
    phone: yup
      .string()
      .matches(/^\d{10,11}$/g, "Phone number must have 10 or 11 digits") // Kiểm tra 10 hoặc 11 chữ số
      .required("Required"),
    street: yup.string().required("Street is required"),
    ward: yup.object().shape({
      code: yup.string().required("Ward/Commune is required"),
      name: yup.string().required("Ward/Commune is required"),
    }),
    district: yup.object().shape({
      code: yup.string().required("Country/District is required"),
      name: yup.string().required("Country/District is required"),
    }),
    province: yup.object().shape({
      code: yup.string().required("Province/City is required"),
      name: yup.string().required("Province/City is required"),
    }),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: address.fullName || "",
      phone: address.phone || "",
      street: address.street || "",
      ward: address.ward || null,
      district: address.district || null,
      province: address.province || null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const req = {
        provinceCode: values.province.code,
        districtCode: values.district.code,
        wardCode: values.ward.code,
        street: values.street,
        fullName: values.name,
        phone: values.phone,
      };
      try {
        if (addressID !== undefined) {
          const newReq = { ...req, addressID: addressID };
          await dispatch(updateAddress({ userID: userID, req: newReq }));
          console.log("edit");
        } else {
          await dispatch(createAddress({ userID: userID, req }));
          console.log("new");
        }

        console.log(req);
      } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
      }
      onClose();
    },
  });
  return (
    <>
      {!addressID ? (
        <DialogTitle>Add new address</DialogTitle>
      ) : (
        <DialogTitle>Edit address</DialogTitle>
      )}
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={1}>
            <Grid item md={6} xs={12}>
              <TextField
                label="Full name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="phone"
                label="Phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                fullWidth
              />
            </Grid>

            <Grid item md={6} xs={12}>
              {/* --------------------------Province/City-------------------------------- */}
              <Autocomplete
                name="province"
                options={province}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                value={formik.values.province}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  formik.setFieldValue("province", value ? value : null);
                  formik.setFieldValue("district", null);
                  formik.setFieldValue("ward", null);
                  getDistrict(value ? value.code : null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Province/City"
                    placeholder="Province/City"
                    error={
                      formik.touched.province && Boolean(formik.errors.province)
                    }
                    helperText={
                      formik.touched.province && formik.errors.province
                    }
                  />
                )}
              />
            </Grid>
            {/* --------------------------Country/District-------------------------------- */}
            <Grid item md={6} xs={12}>
              <Autocomplete
                name="district"
                options={districts}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  formik.setFieldValue("district", value ? value : null);
                  getWard(value ? value.code : null);
                  formik.setFieldValue("ward", null);
                }}
                value={formik.values.district}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country/District"
                    placeholder="Country/District"
                    error={
                      formik.touched.district && Boolean(formik.errors.district)
                    }
                    helperText={
                      formik.touched.district && formik.errors.district
                    }
                  />
                )}
                disabled={formik.values.province === null}
              />
            </Grid>
            {/* --------------------------Ward/Commune-------------------------------- */}
            <Grid item xs={12}>
              <Autocomplete
                name="ward"
                options={wards}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  formik.setFieldValue("ward", value ? value : null);
                }}
                value={formik.values.ward}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ward/Commune"
                    placeholder="Ward/Commune"
                    error={formik.touched.ward && Boolean(formik.errors.ward)}
                    helperText={formik.touched.ward && formik.errors.ward}
                  />
                )}
                disabled={!formik.values.district}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Street"
                name="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
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
