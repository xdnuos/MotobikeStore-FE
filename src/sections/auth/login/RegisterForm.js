import { useState,forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Button, Checkbox, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useEffect } from 'react';
import Iconify from '../../../components/iconify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/auth/authSlice';
import { localStorageService } from '../../../services/localStorageService';
import { authService } from '../../../services/authService';
import { DatePicker, Form, message } from 'antd';
import { StyledButtonGreen, StyledButtonGreenText } from '../../../components/custom/CustomButton';

// ----------------------------------------------------------------------
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    // Check if password is at least 8 characters long
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }
      setLoading(true);
    const info = e.target;
    await authService.register({
      email: info.email.value,
      password: confirmPassword,
      phone: info.phone.value,
      birth: info.birth.value,
      address: info.address.value,
      sex: info.gender.value,
      firstName: info.firstName.value,
      lastName: info.lastName.value
    }).then((res) => {
      localStorageService.set('_tempUser', { email: info.email.value, password: confirmPassword });
      message.success("Check mail đê bạn ơi");
      console.log(res.data);
      setOpen(true);
    setLoading(false);
      return;
    }).catch((err) => {
      if (err.response.data.emailError === "Email is already in use." || err.response.data.emailError === "Phone number is already in use.") {
        message.error(err.response.data.emailError + " Please login");
        return navigate("/login");
      }
      console.log(err);
    });

    // Handle form submission logic here
    setErrorMessage('');
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


  useEffect(() => {
    if (isLoggedIn) {
      const role = localStorageService.get('USER').roles[0]
      if (role === "CUSTOMER") {
        navigate("/");
      } else {
        navigate("/dashboard/app")
      }
    }
  }, [isLoggedIn, navigate]);

  // const handleClick = () => {
  // navigate('/dashboard', { replace: true });
  // };

  return (
    <>

      <form onSubmit={handleSubmit}>

        <div>
          <TextField
            label="First Name"
            variant="outlined"
            placeholder="Mẫn Thị"
            name='firstName'
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            placeholder="Nhi"
            name='lastName'
            required
          />
        </div>
        <TextField
          label="Phone Number"
          variant="outlined"
          name='phone'
          type="number"
          placeholder="0394 XXX XXX"
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          name='email'
          type="email"
          placeholder="XXX@gmail.com"
          fullWidth
          required
        />
        <TextField
          label="Address"
          variant="outlined"
          name='address'
          type="text"
          placeholder="61 đường Tình Duyên,..."
          fullWidth
          required
        />
        <Form.Item
          className="mb-4"
          name="birth"
          wrapperCol={{ sm: 24 }}
          style={{ width: '100%', marginRight: '1rem' }}
        >
          <DatePicker className="datepicker-register w-full " format={'YYYY-MM-DD'} />
        </Form.Item>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
          >
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />

          </RadioGroup>
        </FormControl>

        <TextField
          label="Password"
          variant="outlined"
          placeholder="password123"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          placeholder="password123"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
          required
          error={errorMessage !== ''}
          helperText={errorMessage}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" sx={{ mt: 3 }}>
          Sign Up
        </LoadingButton>
      </form>


      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thank for register ❤️❤️❤️"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please check your email to verify your account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButtonGreen onClick={handleClose}>Agree</StyledButtonGreen>
        </DialogActions>
      </Dialog>
    </>
  );
}
