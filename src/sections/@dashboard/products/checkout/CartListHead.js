import PropTypes from 'prop-types';
// @mui
import {  Checkbox, TableRow, TableCell, TableHead, Typography,  } from '@mui/material';

// ----------------------------------------------------------------------

CartListHead.propTypes = {
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function CartListHead({
  rowCount,
  headLabel,
  numSelected,
  onSelectAllClick,
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox size='small'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        <TableCell>
          Đã chọn {numSelected} sản phẩm
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
          >
            <Typography variant="subtitle2" noWrap>
            {headCell.label}</Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
