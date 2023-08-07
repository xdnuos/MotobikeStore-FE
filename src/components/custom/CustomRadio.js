import { Radio } from '@mui/material';
import Iconify from '../iconify/Iconify';

    export function CustomRadio(props) {
        return (
          <Radio
            disableRipple
            color="default"
            checkedIcon={<Iconify icon={"teenyicons:tick-circle-solid"} sx={{ width: 20, height: 20 ,color: 'rgb(0 171 85)',}} />}
            icon={<Iconify icon={"fluent:radio-button-16-regular"}  sx={{ width: 25, height: 25 }}/>}
            {...props}
          />
        );
      }