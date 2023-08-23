import React from "react";
import { useState } from "react";
import {
  Container,
  Typography,
  Stack,
  Link,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ProductForm from "../../../sections/@dashboard/products/ProductForm";
import { StyledButtonGreen } from "../../../components/custom/CustomButton";
import Iconify from "../../../components/iconify/Iconify";
import { authService } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
// import
export default function CreateStore() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    try {
      const register = await authService.registerStore({
        password: password,
        name: name,
        email: email,
        address: {
          province: province,
          district: district,
          ward: ward,
          street: street,
        },
      });
      if (!!register) {
        navigate("/dashboard/store");
      } else {
        console.log("register error", register);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    console.log(name, email, province, district, ward, street, password);

    setErrorMessage("");
  };

  return (
    <>
      <Helmet>
        <title>New Store</title>
      </Helmet>
      <Container>
        <Stack spacing={2} marginBottom="40px">
          <Typography variant="h4" gutterBottom>
            Create New Store
          </Typography>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <Link
              underline="hover"
              color="text.primary"
              href="/dashboard/store"
            >
              Store
            </Link>
            <Typography color="inherit">New Store</Typography>
          </Breadcrumbs>
        </Stack>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2} mt={1}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                label="Name store"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                placeholder="password123"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
                error={errorMessage !== ""}
                helperText={errorMessage}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <TextField
                required
                type='password'
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              /> */}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                type="text"
                label="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                type="text"
                label="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="text"
                label="Ward"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Specific address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <StyledButtonGreen
              type="submit"
              sx={{ mt: 3.5, height: "50px", width: "40%" }}
            >
              Submit
            </StyledButtonGreen>
          </Grid>
        </form>
      </Container>
    </>
  );
}
