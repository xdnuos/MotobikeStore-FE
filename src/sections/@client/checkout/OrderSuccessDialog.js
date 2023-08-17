import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Dialog, Button, useMediaQuery, useTheme, Typography, Box, Stack, Link } from '@mui/material';
import { StyledButtonGreen } from '../../../components/custom/CustomButton';
import Iconify from '../../../components/iconify/Iconify';


const OrderSuccessDialog = ({ open }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const navigate = useNavigate();
    return (
        <Dialog
            open={open}
            maxWidth={'100%'}
            fullWidth={true}
            fullScreen={true}
            PaperProps={{
                style: {
                    maxWidth: fullScreen ? 'calc(100% - 32px)' : 'calc(100% - 48px)',
                    maxHeight: fullScreen ? '100%' : 'calc(100% - 48px)', textAlign: 'center',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'

                },
            }}
        >

            <Stack justifyContent={'center'} alignItems={'center'} spacing={3}  >

                <Typography variant='h4'>Thank you for your purchase!</Typography>
                <div>
                    <Box
                        component="img"
                        src="/assets/illustrations/character_checked.png"
                        sx={{ position: 'absolute', left: '53%', height: 230, }}
                    />
                    <Box
                        component="img"
                        src="/assets/illustrations/illustration_checked_cart.svg"
                        sx={{ position: 'relative', height: 250 }}
                    />
                </div>

                <Typography>
                    Thanks for placing order
                </Typography>
                <Link color={'text.info'} underline="hover" href='#'>
                    <Typography  >
                        01dc1370-3df6-11eb-b378-0242ac130002
                    </Typography>
                </Link>
                <Typography>
                    We will send you a notification within 5 days when it ships.<br />
                    If you have any question or queries then fell to get in contact us.

                </Typography>
                <Typography>All the best.</Typography>

                <Stack direction={'row'} spacing={2} sx={{ width: '100%', pt: 4,px:1, borderTop: '1px dashed lightgrey' }}>
                    <Button fullWidth variant="outlined" sx={{ color: '#000', py: '8px' }} onClick={()=>navigate("/order")} >
                        <Iconify icon='ic:outline-keyboard-arrow-left' mr={1} />
                        Continue Shopping
                    </Button>
                    <StyledButtonGreen onClick={()=>navigate("/order")}>
                        <Iconify icon='ant-design:file-pdf-filled' mr={1} />
                        Download As PDF
                    </StyledButtonGreen>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export default OrderSuccessDialog;
