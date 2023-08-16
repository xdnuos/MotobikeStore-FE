import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Dialog, Button, useMediaQuery, useTheme, Typography, Box, Stack, Link } from '@mui/material';
import { StyledButtonGreen } from '../../components/custom/CustomButton';
import Iconify from '../../components/iconify/Iconify';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { localStorageService } from '../../services/localStorageService';
import { loginUser } from '../../redux/auth/authSlice';
import { useEffect } from 'react';
import { el } from 'date-fns/locale';
import { authService } from 'src/services/authService';
import { message } from 'antd';


function ActiveAccount() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = localStorageService.get('_tempUser');

    const { token } = useParams();

    const handleLogin = async () => {
        try {
            console.log(user);
            await dispatch(loginUser(user));
            localStorageService.remove('_tempUser');
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (isLoggedIn) {
            const role = localStorageService.get('USER').roles[0]
            if (role === "CUSTOMER") {
                navigate("/");
            } else {
                navigate("/dashboard/app")
            }
        } else {
            authService.active(token).then((res) => {
                message.success("Active Success");
                console.log(res.data);
                return res.data;
            }).catch((err) => {
                console.log(err);
                return err;
            });
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

            </div>

            <Dialog
                open={open}
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

                    <Typography variant='h4'>Thank you for activate email!</Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box
                            component="img"
                            src="/assets/illustrations/character_checked.png"
                            sx={{ position: 'absolute', left: '53%', height: 230, }}
                        />
                        <Box
                            component="img"
                            src="/assets/illustrations/active_mail.svg"
                            sx={{ position: 'absolute', right: '46%', height: 160 }}
                        />
                        <Box
                            component="img"
                            src="/assets/illustrations/active_mail_background.svg"
                            sx={{ position: 'relative', height: 250 }}
                        />
                    </div>

                    <Typography>
                        Thank you for registering an account at Motobike Store.<br />
                        We are delighted to confirm your email.
                    </Typography>
                    <Typography>Please go click button to login .</Typography>

                    <div style={{ borderTop: '1px dashed lightgrey', width: '100%' }}>

                        <StyledButtonGreen sx={{ mt: 2, py: 1 }} onClick={handleLogin}>
                            Go to Shopping
                        </StyledButtonGreen>
                    </div>
                </Stack>
            </Dialog>
        </>
    )
}

export default ActiveAccount