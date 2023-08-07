import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { useEffect } from "react";
import Iconify from "../../../components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/auth/authSlice";
import { localStorageService } from "../../../services/localStorageService";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

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

  useEffect(() => {
    if (isLoggedIn) {
      const role = localStorageService.get("USER")?.roles[0];
      console.log("role", role);
      if (role === "CUSTOMER") {
        navigate("/home");
      } else {
        navigate("/dashboard/app");
      }
    }
  }, [isLoggedIn, navigate]);

  // const handleClick = () => {
  // navigate('/dashboard', { replace: true });
  // };

  return (
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
        <Link variant="subtitle2" underline="hover">
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
  );
}
