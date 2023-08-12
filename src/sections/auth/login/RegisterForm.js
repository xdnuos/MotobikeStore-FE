import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Button, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useEffect } from 'react';
import Iconify from '../../../components/iconify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/auth/authSlice';
import { localStorageService } from '../../../services/localStorageService';
import { authService } from '../../../services/authService';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    try {
      const register = await authService.register({ name:fullName, username:phoneNumber, password:password });
      if ( !!register){
        dispatch(loginUser({username: phoneNumber, password: password }));
      }else{
        console.log("register error",register);
      }
    } catch (error) {
      console.log(error);
    }

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
  // const handleClick = async (event) => {
  //   event.preventDefault();
  //   try {
  //      console.log(values)
  //   dispatch(loginUser(values))
  //   } catch (error) {
  //     console.log(error)
  //   }


  // };

  useEffect(() => {
    if (isLoggedIn) {
      const role = localStorageService.get('USER').roles[0]
      if(role === "CUSTOMER"){
      navigate("/");
      }else{
        navigate("/dashboard/app")
      }
    }
    // else{
    //   navigate("/login")
    // }
  }, [isLoggedIn, navigate]);

  // const handleClick = () => {
  // navigate('/dashboard', { replace: true });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Full Name"
        variant="outlined"
        placeholder="Nguyễn Văn A"
        value={fullName}
        onChange={handleFullNameChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        value={phoneNumber}
        placeholder="0394 XXX XXX"
        onChange={handlePhoneNumberChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        placeholder="password123"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        fullWidth
        required
        margin="normal"
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
        margin="normal"
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ mt: 3 }}>
        Sign Up
      </LoadingButton>
    </form>
  );
}
