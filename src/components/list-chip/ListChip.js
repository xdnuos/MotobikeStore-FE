import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material'


ListChip.propTypes = {
  chipData: PropTypes.array.isRequired
}
function ListChip({ chipData = [],  setFirstChipColor = false  }) {
  const [activeChip, setActiveChip] = useState(null);

  const handleChipClick = (chipKey) => {
    setActiveChip(chipKey);
  };
  return (
    <>
      {chipData.map((data, index) => (
        <Chip
          key={data.key}
          label={data.label}
          clickable
          onClick={() => handleChipClick(data.key)}
          color={
            activeChip === data.key || (index === 0 && setFirstChipColor && !activeChip)
              ? 'primary'
              : 'default'
          }
        />
      ))}
    </>
  );
}
export default ListChip;