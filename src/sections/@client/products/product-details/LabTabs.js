import React, { useState } from 'react';
import ReactHtmlParser from "html-react-parser";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Alert, Paper } from '@mui/material';

const Root = styled(Paper)({
  flexGrow: 1,
  borderRadius: '16px'
});

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderBottom: '1px solid #e3e3e3',
  borderRadius: '16px 16px 0 0',
  paddingLeft: 24,
  '& .MuiTabs-indicator': {
    backgroundColor: 'rgb(0, 123, 85)',

    boxShadow: 'rgba(0, 171, 85, 0.24) 0px 8px 16px 0px'
    ,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',

  minWidth: 0,
  [theme.breakpoints.up('md')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.subtitle2,
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.text.primary,

  },
  '&.Mui-selected::after': {
    content: '""',
    height: '2px',
    backgroundColor: 'rgb(0, 123, 85)',

    boxShadow: 'rgba(0, 171, 85, 0.24) 0px 8px 16px 0px'
    ,
    display: 'block',
  },
}));

const TabPanel = styled('div')({
  padding: '24px',
});




TabDescriptionAndReview.propTypes = {
  product: PropTypes.object,
}

function TabDescriptionAndReview({ product }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Root elevation={2} >
      <StyledTabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="primary"
        aria-label="description and review tabs"
      >
        <StyledTab label="Mô Tả Sản Phẩm" />
        <StyledTab label="Đánh Giá & Nhận Xét" />
      </StyledTabs>

      {selectedTab === 0 && (
        <TabPanel>

          {/* This <br/>is <br/>the <br/>description <br/>tab. */}
          {/* { ReactHtmlParser(product?.utilization)} */}
          {product?.description !== "" ? (
            <div dangerouslySetInnerHTML={{ __html: product?.description }} />
          ) : null}

          {product?.ingredients !== "" ? (
            <p dangerouslySetInnerHTML={{ __html: product?.ingredients }} />
          ) : null}

          {product?.utilization !== "" ? (
            <p dangerouslySetInnerHTML={{ __html: product?.utilization }} />
          ) : null}
          
          {product?.dosage !== "" ? (
            <p dangerouslySetInnerHTML={{ __html: product?.dosage }} />
          ) : null}

          {product?.adverseEffects !== "" ? (
            <p dangerouslySetInnerHTML={{ __html: product?.adverseEffects }} />
          ) : null}

          {product?.careful !== "" ? (
            <Alert severity="warning" sx={{borderRadius:"16px"}}>
              <p dangerouslySetInnerHTML={{ __html: product?.careful }} />
            </Alert>
          ) : null}

          {product?.preservation !== "" ? (
            <p dangerouslySetInnerHTML={{ __html: product?.preservation }} />
          ) : null}

        </TabPanel>
      )}
      {selectedTab === 1 && (
        <TabPanel>

          This is the review tab.

        </TabPanel>
      )}
    </Root>
  );
};

export default TabDescriptionAndReview;
