
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';
import { Style } from '@mui/icons-material';
import Iconify from '../../../components/iconify/Iconify';

const NavHeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: theme => theme.spacing(2),
});

const ListItemWrapper = styled(ListItem)({
  '&:hover': {
    backgroundColor: theme => theme.palette.primary.main,
  },
});

const PopoverContainer = styled(Collapse)({
  padding: theme => theme.spacing(2),
  '&:hover': {
    pointerEvents: 'auto',
  },
});
// const stylePopover = styled(Popover)({
    // '.MuiPopover-root' :{
        // overflow: 'auto',
        // zIndex: 9999,
      // }
      
  // });
function Navvvvvvvvvv() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
  
    return (
      <NavHeaderContainer>
        <List component="nav">
          <ListItemWrapper
            
            onMouseEnter={handlePopoverOpen}
            // onMouseLeave={handlePopoverClose}
          >
            <ListItemText primary="Cấp 1" />
            
            {open ? <Iconify icon={'eva:chevron-up-fill'} /> : <Iconify icon={'eva:chevron-down-fill'} />}
            
           
          </ListItemWrapper>
        </List>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
           
          <PopoverContainer in={open} timeout="auto" unmountOnExit onMouseLeave={handlePopoverClose}>
            <List component="nav">
              <ListItemButton>
                <ListItemText primary="Cấp 1.1" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Cấp 1.2" />
              </ListItemButton>
            </List>


          </PopoverContainer>
        </Popover>
      </NavHeaderContainer>
    );
  };
  


export default Navvvvvvvvvv