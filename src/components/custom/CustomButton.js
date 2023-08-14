import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButtonYellow = styled(Button)(() => ({
    color: '#000',
    width: '100%',
    height: '48px',
    backgroundColor: 'rgb(255 171 0)',
    '&:hover': {
        backgroundColor: 'rgb(183, 110, 0)',
        boxShadow: 'rgba(255, 171, 0, 0.24) 0px 8px 16px 0px'
    }

}));

export const StyledButtonGreen = styled(Button)(() => ({
    color: '#fff',
    width: '100%',
    backgroundColor: 'rgb(0 171 85)',
    '&:hover': {
        backgroundColor: 'rgb(0, 123, 85)',
        boxShadow: 'rgba(0, 171, 85, 0.24) 0px 8px 16px 0px'
    },
    '&:disabled': {
        background: "#919eab3d",
        color: "#919eabcc"
    }

}));


export const StyledButtonGreenOutlined = styled(Button)(() => ({
    border: '1px solid #00ab5580',
    color: '#00ab55',
    width: '100%',
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: '#00ab5514',
        border: '1px solid #00ab55',
    }
}));


export const StyledButtonGreenText = styled(Button)(() => ({
  
    color: '#007b55',
    backgroundColor: '#00ab5529',
    '&:hover': {
        backgroundColor: '#00ab5552',
    },
    '&:disabled': {
        backgroundColor: '#aba4a429',
    }
}));