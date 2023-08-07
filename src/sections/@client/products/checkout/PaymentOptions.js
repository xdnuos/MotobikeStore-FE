import React from 'react';
import { useState } from 'react';
import { RadioGroup, FormControlLabel,  Typography, styled, Stack } from '@mui/material';
import { CustomRadio } from '../../../../components/custom/CustomRadio';


const StyledFormControlLabel = styled(FormControlLabel)(({ selected }) => ({
 
    border: '1px solid #919eab3d',
    borderRadius: '8px',
    padding: '20px 10px ',
    width: '100%',  
    margin:0,
     transition: selected
        ? 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        : 'none',
    boxShadow: selected ? '0px 20px 40px -4px #919eab29' : 'none',
}));

const PaymentOptions = () => {
    const [paymentOption, setPaymentOption] = useState('');

    const handleChange = (event) => {
        setPaymentOption(event.target.value);
    };


    return (

        <RadioGroup value={paymentOption} onChange={handleChange} >
            <Stack spacing={2}>

                
                <StyledFormControlLabel
                    value="paypal"
                    control={<CustomRadio />}
                    label={
                        <>
                            Pay with Paypal
                            {/* <Typography variant="subtitle2" color="text.secondary">
                                toddayyyyyyy
                            </Typography> */}
                        </>
                    }
                    labelPlacement="end"
                    selected={paymentOption === 'paypal'}
                    
                />

                <StyledFormControlLabel
                    value="credit_card"
                    control={<CustomRadio />}
                    label={
                        <>
                            Credit / Debit Card
                            {/* <Typography variant="subtitle2" color="text.secondary">
                                toddayyyyyyy
                            </Typography> */}
                        </>
                    }
                    labelPlacement="end"
                    selected={paymentOption === 'credit_card'}
                    
                />

                <StyledFormControlLabel
                    value="cash_on_delivery"
                    control={<CustomRadio />}
                    label={
                        <>
                            Cash on Checkout/Delivery
                            {/* <Typography variant="subtitle2" color="text.secondary">
                                toddayyyyyyy
                            </Typography> */}
                        </>
                    }
                    labelPlacement="end"
                    selected={paymentOption === 'cash_on_delivery'}
                    
                />
            </Stack>
        </RadioGroup>
    );
};

export default PaymentOptions;
