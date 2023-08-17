import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
  Dialog,
  Box,
  Typography,
  useMediaQuery,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { useEffect } from "react";
import Iconify from "../../../components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/auth/authSlice";
import { localStorageService } from "../../../services/localStorageService";
import { StyledButtonGreen } from "../../../components/custom/CustomButton";
import { authService } from "src/services/authService";
import { message } from "antd";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [emailReset, setEmailReset] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
const handleChageEmailReset = (e) => {
  setErrorMessage('');
  setEmailReset(e.target.value);
}
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      console.log(values);
      dispatch(loginUser(values));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendMail = async () => {
    setLoadingButton(true);
    await authService.forgotPassword(emailReset).then((res) => {
      message.success(res.data);
      console.log(res.data);
      setLoadingButton(true);
      setConfirm(true);
      return res.data;
    }).catch((err) => {
      console.log(err);
      setLoadingButton(false);
      setErrorMessage('Email not found');

      return err;
    });
  }
  const handleReturnLogin = () => {

    setOpen(false);
    setConfirm(false);
    setEmailReset('');
    setErrorMessage('');
    setLoadingButton(false);
  }
  useEffect(() => {
    if (isLoggedIn) {
      const role = localStorageService.get("USER")?.roles;
      const hasCustomerRole = role?.includes('CUSTOMER');
      if (hasCustomerRole) {
        navigate("/");
      } else {
        navigate("/dashboard/app");
      }
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <form onSubmit={handleClick}>
        <Stack spacing={3}>
          <TextField
            id="email"
            name="email"
            type="text"
            placeholder="hello@gmail.com"
            value={email}
            onChange={handleChange}
          />

          <TextField
            id="password"
            name="password"
            placeholder="password123"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          {/* <Checkbox name="remember" label="Remember me" /> */}
          <Link variant="subtitle2" underline="hover" onClick={() => setOpen(true)}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          Login
        </LoadingButton>
      </form>



      <Dialog
        open={open}
        maxWidth={'100%'}
        fullWidth={true}
        fullScreen={true}
        PaperProps={{
          style: {
            maxWidth: '450px',
            maxHeight: '60%', textAlign: 'center',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , borderRadius: '20px'
          },
        }}
        BackdropProps={{ style: { backgroundColor: '#e3e3e3e3' } }}
      >

        <Stack justifyContent={'center'} alignItems={'center'} spacing={3} p={3} >


          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              component="img"
              src="/assets/illustrations/forgot_password.svg"
              sx={{ height: 140, }}
            />

          </div>
          <Typography variant='h3'>Forgot your password?</Typography>
          {confirm ?
            <Typography variant='h6'>Please check the email we have sent you a link to reset your password.</Typography> :
            <>
              <Typography textAlign={'center'}>
                Please enter the email address associated with your account and We will email you a link to reset your password.
              </Typography>
              <TextField
                id="email"
                name="email"
                type="text"
                disabled={loadingButton}
                placeholder="hello@gmail.com"
                fullWidth
                value={emailReset}
                onChange={handleChageEmailReset}
                error={errorMessage !== ''}
                helperText={errorMessage}
              />

              <StyledButtonGreen disabled={loadingButton} variant="contained" sx={{ mt: 3, py: 1.2 }} onClick={handleSendMail}>
                Send Request
              </StyledButtonGreen>

            </>
          }


          <Link variant="subtitle2" underline="hover" onClick={handleReturnLogin}>
            <Iconify icon="ic:outline-keyboard-arrow-left" sx={{ mr: 0.5, mt: -0.3 }} />
            Return to login
          </Link>
        </Stack>
        <Backdrop
          sx={{ color: '#000', background: '#ffffffbd', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadingButton && open && !confirm}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </>

  );
}
