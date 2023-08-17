import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Dialog, Button, useMediaQuery, useTheme, Typography, Box, Stack, Link, Backdrop, alpha, CircularProgress, TextField, InputAdornment, IconButton, } from '@mui/material';
import { StyledButtonGreen } from '../../components/custom/CustomButton';
import Iconify from '../../components/iconify/Iconify';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { localStorageService } from '../../services/localStorageService';
import { loginUser } from '../../redux/auth/authSlice';
import { useEffect } from 'react';
import { authService } from 'src/services/authService';
import { message } from 'antd';
import { set } from 'lodash';


function ResetPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loadingChanePassword, setLoadingChanePassword] = useState(false);
    const [loadingSuccess, setLoadingSuccess] = useState(false);

    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = localStorageService.get('_tempUser');

    const { token } = useParams();

    const handlePasswordChange = (event) => {
        setErrorMessage('');
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setErrorMessage('');
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async () => {
        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        // Check if password is at least 8 characters long
        else if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        } else {
            setLoadingChanePassword(true);
            await authService.resetPassword({
                code: token,
                password: confirmPassword
            }).then((res) => {
                message.success("Change new password Success");
                console.log(res.data);
                setOpen(true);
                setLoadingSuccess(true);
                setLoadingChanePassword(false);
                return res.data;
            }).catch((err) => {
                setOpen(false);
                setOpenError(true);
                console.log(err);
                return err;
            });
            setErrorMessage('');
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            const role = localStorageService.get('USER')?.roles
            const hasCustomerRole = role?.includes('CUSTOMER');
            if (hasCustomerRole) {
                navigate("/");
            } else {
                navigate("/dashboard/app")
            }
        }
    }, [isLoggedIn, navigate, token]);


    return (
        <>
            <div style={{
                backgroundImage: `url(/assets/overlay_4.jpg)`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
            }}>
                <Backdrop
                    sx={{ color: '#000', background: '#ffffffbd', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={!open || !openError}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>

            <Dialog
                open={openError}
                maxWidth={'100%'}
                fullWidth={true}
                fullScreen={true}
                PaperProps={{
                    style: {
                        maxWidth: fullScreen ? 'calc(100% - 32px)' : '490px',
                        maxHeight: fullScreen ? '100%' : 'calc(100% - 80px)', textAlign: 'center',
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                        , borderRadius: '20px'
                    },
                }}
                BackdropProps={{ style: { backgroundColor: '#ffffffbd' } }}
            >

                <Stack justifyContent={'center'} alignItems={'center'} spacing={3}  >

                    <Typography variant='h4'>No permission</Typography>
                    <Typography>
                        The page you're trying access has restricted access.<br />
                        Please refer to your system administrator
                    </Typography>

                    <Box
                        component="img"
                        src="/assets/illustrations/illustration_403.svg"
                        sx={{ height: 200 }}
                    />


                    <Stack direction={'row'} spacing={2} sx={{ width: '100%', pt: 4, borderTop: '1px dashed lightgrey' }}>
                        <Button fullWidth variant="outlined" sx={{ color: '#000', py: '8px' }} onClick={() => navigate('/')}>
                            <Iconify icon='ic:outline-keyboard-arrow-left' mr={0.5} />
                            Continue Shopping
                        </Button>
                        <StyledButtonGreen onClick={() => navigate('/login')}>
                            Go to Login
                            <Iconify icon='ic:outline-keyboard-arrow-right' ml={0.5} />
                        </StyledButtonGreen>
                    </Stack>
                </Stack>
            </Dialog>

            <Dialog
                open={true}
                maxWidth={'100%'}
                fullWidth={true}
                fullScreen={true}
                PaperProps={{
                    style: {
                        maxWidth: fullScreen ? 'calc(100% - 32px)' : '490px',
                        maxHeight: fullScreen ? '100%' : 'calc(100% - 80px)', textAlign: 'center',
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                        , borderRadius: '20px'
                    },
                }}
                BackdropProps={{ style: { backgroundColor: '#ffffffbd' } }}
            >

                <Stack justifyContent={'center'} alignItems={'center'} spacing={3} >
                    <Box
                        component="img"
                        src="/assets/illustrations/send_mail.svg"
                        sx={{ height: 150, mb: 4 }}
                    />

                    <Typography variant='h3'>Request sent successfully!</Typography>

                    {
                        loadingSuccess ?
                            <>
                                <Typography variant='h6' sx={{ px: 2 }}>Please check the email we have sent you a link to reset your password.</Typography>

                                <Link variant="subtitle2" underline="hover" onClick={() => navigate('/login')}>
                                    <Iconify icon="ic:outline-keyboard-arrow-left" sx={{ mr: 0.5, mt: -0.3 }} />
                                    Return to login
                                </Link>
                            </>
                            : <>
                                <Typography>Please change your new password</Typography>

                                <TextField
                                    label="New Password"
                                    variant="outlined"
                                    placeholder="password123"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    fullWidth
                                    required
                                    disabled={loadingChanePassword}
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
                                <TextField
                                    label="Confirm Password"
                                    variant="outlined"
                                    placeholder="password123"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    fullWidth
                                    required
                                    disabled={loadingChanePassword}
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
                                <div style={{ borderTop: '1px dashed lightgrey', width: '100%' }}>


                                    <StyledButtonGreen disabled={loadingChanePassword} sx={{ mt: 2, py: 1 }} onClick={handleSubmit}>
                                        Update Password
                                    </StyledButtonGreen>

                                </div>
                            </>

                    }
                </Stack>

                <Backdrop
                    sx={{ color: '#000', background: '#ffffffbd', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loadingChanePassword}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </Dialog>
        </>
    )
}

export default ResetPasswordPage