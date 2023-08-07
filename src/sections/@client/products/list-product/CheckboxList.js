import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Checkbox, InputAdornment, List, ListItem, ListItemText, OutlinedInput, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


import Iconify from '../../../../components/iconify/Iconify';



const StyledSearch = styled(OutlinedInput)(() => ({
  width: '100%',
  height: '28px',
}));



CheckboxList.propTypes = {
  title: PropTypes.string,
  listItem: PropTypes.array.isRequired,
}

function CheckboxList({title, listItem = [] }) {
  const [filter, setFilter] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const allUnchecked = Object.values(checkedItems).every((value) => !value);

  const handleListItemClick = (value) => {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[value] = !newCheckedItems[value];
    setCheckedItems(newCheckedItems);
  };
  const handleMainCheckboxChange = () => {
    if (allUnchecked) {
      const newCheckedItems = {};
      filteredItems.forEach((item) => {
        newCheckedItems[item.value] = true;
      });
      setCheckedItems(newCheckedItems);
    } else {
      setCheckedItems({});
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };


  const filteredItems = listItem.filter((item) =>
    item.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <StyledSearch
        variant="outlined"
        placeholder={`Tìm ${title}`}
        value={filter}
        onChange={handleFilterChange}
        startAdornment={
          <InputAdornment position="start"  >
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <List>
        {filteredItems.length >= listItem.length ? (
          <ListItem key={'all'} dense button
            sx={{ p: 0 }}
            >

            <Checkbox
              checked={allUnchecked}
              onChange={handleMainCheckboxChange}
              sx={{ p: 0.5 }}
              size="small"
            />
            <ListItemText primary={'Tất cả'} />

          </ListItem>
        ) : (<></>)}
        {filteredItems.map((item, index) => (
          <ListItem key={item.value} dense button
            onClick={() => handleListItemClick(item.value)} sx={{ p: 0 }}>

            <Checkbox
              checked={checkedItems[item.value] || false}
              sx={{ p: 0.5 }}
              size="small"
            />
            <ListItemText primary={item.label} />

          </ListItem>
        ))}
      </List>

    </div>
  );
}

export default CheckboxList;
