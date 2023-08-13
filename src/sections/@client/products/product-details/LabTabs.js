import React, { useState } from "react";
import ReactHtmlParser from "html-react-parser";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Alert, Paper, Typography } from "@mui/material";

const Root = styled(Paper)({
  flexGrow: 1,
  borderRadius: "16px",
});

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderBottom: "1px solid #e3e3e3",
  borderRadius: "16px 16px 0 0",
  paddingLeft: 24,
  "& .MuiTabs-indicator": {
    backgroundColor: "rgb(0, 123, 85)",

    boxShadow: "rgba(0, 171, 85, 0.24) 0px 8px 16px 0px",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",

  minWidth: 0,
  [theme.breakpoints.up("md")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.subtitle2,
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  "&.Mui-selected": {
    color: theme.palette.text.primary,
  },
  "&.Mui-selected::after": {
    content: '""',
    height: "2px",
    backgroundColor: "rgb(0, 123, 85)",

    boxShadow: "rgba(0, 171, 85, 0.24) 0px 8px 16px 0px",
    display: "block",
  },
}));

const TabPanel = styled("div")({
  padding: "24px",
});

TabDescriptionAndReview.propTypes = {
  product: PropTypes.object,
};

function TabDescriptionAndReview({ product }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Root elevation={2}>
      <StyledTabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="primary"
        aria-label="description and review tabs"
      >
        <StyledTab label="Description" />
        <StyledTab label="Review product" />
      </StyledTabs>

      {selectedTab === 0 && (
        <TabPanel>
          <Typography>{product?.fullDescription}</Typography>
        </TabPanel>
      )}
      {selectedTab === 1 && <TabPanel>
        
        </TabPanel>}
    </Root>
  );
}

export default TabDescriptionAndReview;
