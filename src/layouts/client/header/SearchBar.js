import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';// utils
import { bgBlur } from '../../../utils/cssStyles';

// ----------------------------------------------------------------------

// const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
//   width: '280px !important',
// });


const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  width: '600px' ,
  marginLeft: '10px',
  marginRight: '10px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
  },
}));
// ----------------------------------------------------------------------

// SearchBar.propTypes = {
//   posts: PropTypes.array.isRequired,
// };{ posts }

export default function SearchBar() {
  return (
    // <Autocomplete
    //               fullWidth
    //               // value={ward}
    //               // onChange={(event, newValue) => {
    //               //   setWard(newValue);
    //               // }}
    //               options={['iu', 'em ']}
    //               renderInput={(params) => (
    //                 <TextField {...params} label="Chọn Phường/Xã" required />
    //               )}
    //             />
    <StyledAutocomplete
      sx={{ borderRadius: '50px',}}
      autoHighlight
      options={['iu', 'em ']}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search product, manufacturer..."
          
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{   borderRadius: '50px',}}
        />
      )}
    />


  );
}
