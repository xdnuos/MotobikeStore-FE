import React, { useState } from 'react';
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

function AddressForm({ open, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
    console.log({
      name,
      phone,
      city,
      district,
      ward,
      address,
      note,
    });
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Thêm địa chỉ nhận hàng</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} mt={1}>
              <Grid item md={6}  xs={12}>
                <TextField
                  required
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
                  fullWidth
                  value={city}
                  onChange={(event, newValue) => {
                    setCity(newValue);
                  }}
                  options={['city 1', 'City 2']}
                  renderInput={(params) => (
                    <TextField {...params} label="Chọn Tỉnh" required />
                  )}
                />
               
              </Grid>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  fullWidth
                  value={district}
                  onChange={(event, newValue) => {
                    setDistrict(newValue);
                  }}
                  options={['district1', 'district2']}
                  renderInput={(params) => (
                    <TextField {...params} label="Chọn Quận/Huyện" required />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
              <Autocomplete
                  fullWidth
                  value={ward}
                  onChange={(event, newValue) => {
                    setWard(newValue);
                  }}
                  options={['phường', 'xã ']}
                  renderInput={(params) => (
                    <TextField {...params} label="Chọn Phường/Xã" required />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Nhập địa chỉ cụ thể"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Ghi chú"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" color="primary">Submit</Button>
            </DialogActions>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddressForm