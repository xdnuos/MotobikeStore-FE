import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText, Collapse, Popover } from '@mui/material';
import { StyledNavItem } from './styles';
import { useState } from 'react';

// ----------------------------------------------------------------------

NavSectionHeader.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
};

export default function NavSectionHeader({ data = [], sx, ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1, ...sx }}>
        {data.map((item, index) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, info, children } = item;
  const hasChildren = children && children.length > 0;
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

  if (hasChildren) {
    return (
      <>
        <StyledNavItem
          // onClick={handleClick}
          onMouseEnter={handlePopoverOpen}
          sx={{
            // width: '1000px',
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold', 
            },
          }}
        >
          <ListItemText disableTypography primary={title} />
          {info && info}
        </StyledNavItem>
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
        <Collapse in={open} timeout="auto" unmountOnExit onMouseLeave={handlePopoverClose}>
          <List component="nav" disablePadding >
            {children.map((child,index) => (
              <StyledNavItem
              key={index}
              component={RouterLink}
              to={child.path}
              sx={{
                '&.active': {
                  color: 'text.primary',
                  bgcolor: 'action.selected',
                  fontWeight: 'fontWeightBold',
                },
              }}
            >
              <ListItemText disableTypography primary={child.title} />
            </StyledNavItem>
//          {child.children.length > 0 ?"":<> </>}
            ))}
          </List>
        </Collapse>
        </Popover>
      </>
    );
  }

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <ListItemText disableTypography primary={title} />
      {info && info}
    </StyledNavItem>
  );
}
