import PropTypes from "prop-types";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
// @mui
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
//
import { useEffect, useState } from "react";
import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

// export function NavItem({ item }) {
//   const { title, path, icon, info } = item;

//   return (
//     <StyledNavItem
//       component={RouterLink}
//       to={path}
//       sx={{
//         "&.active": {
//           color: "text.primary",
//           bgcolor: "action.selected",
//           fontWeight: "fontWeightBold",
//         },
//       }}
//     >
//       <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

//       <ListItemText disableTypography primary={title} />

//       {info && info}
//     </StyledNavItem>
//   );
// }

export function NavItem({ item }) {
  const { title, path, icon, info, children } = item;
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    if (children) {
      toggleMenu();
    }
  };
  // Sử dụng useEffect để theo dõi thay đổi của location.pathname và isOpen
  useEffect(() => {
    if (location.pathname === path) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, path]);

  // Sử dụng useEffect để tự động mở rộng mục cha khi một mục con được chọn
  useEffect(() => {
    if (children) {
      const isChildSelected = children.some(
        (childItem) => location.pathname === childItem.path
      );
      if (isChildSelected) {
        setIsOpen(true);
      }
    }
  }, [children, location.pathname]);
  return (
    <Box>
      <StyledNavItem
        component={RouterLink}
        to={path}
        onClick={handleNavClick}
        sx={{
          "&.active": {
            color: "text.primary",
            bgcolor: "action.selected",
            fontWeight: "fontWeightBold",
          },
          display: "block",
          textDecoration: "none",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        <Box display="flex" alignItems="center">
          <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
          <ListItemText
            disableTypography
            primary={title}
            sx={{ marginLeft: 2 }}
          />
        </Box>

        {info && <Box>{info}</Box>}
      </StyledNavItem>

      {isOpen && children && (
        <List sx={{ pl: 2, mt: 1 }}>
          {children.map((childItem) => (
            <ListItem
              key={childItem.title}
              component={RouterLink}
              to={childItem.path}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  "&.child-active": {
                    color: "text.primary",
                  },
                  color: "text.secondary",
                }}
                className={
                  location.pathname === childItem.path ? "child-active" : ""
                }
              >
                {childItem.title}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
