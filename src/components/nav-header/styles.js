// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  position: 'relative',
  textTransform: 'capitalize',
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'bold',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ':hover': {
    color: theme.palette.text.primary,
  }
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
