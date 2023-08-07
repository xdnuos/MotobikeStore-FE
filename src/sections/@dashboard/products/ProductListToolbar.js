import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";

import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Autocomplete,
  Checkbox,
  TextField,
} from "@mui/material";
// component
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

// filter by status option
const status = [
  { title: "In Stock" },
  { title: "Low Stock" },
  { title: "Out Of Stock" },
  { title: "Disable" },
];

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 95,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: "72%",
  marginLeft: 5,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: "74%",
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

ProductListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  filterStatus: PropTypes.arrayOf(PropTypes.string), // Add this line
  onFilterStatus: PropTypes.func, // Add this line
  handleClickOpenDialog: PropTypes.func,
};

export default function ProductListToolbar({
  numSelected,
  filterName,
  onFilterName,
  filterStatus,
  onFilterStatus,
  handleClickOpenDialog,
}) {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {/* filter by status */}
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Autocomplete
          multiple
          options={status}
          value={filterStatus.map((value) =>
            status.find((option) => option.title === value)
          )}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                style={{ marginRight: 2, padding: 0 }}
                checked={selected}
                size="small"
              />
              {option.title}
            </li>
          )}
          limitTags={4}
          size="small"
          style={{ minWidth: 170 }}
          onChange={onFilterStatus}
          renderInput={(params) => <TextField {...params} label="Status" />}
        />
      )}

      {/* search product */}
      {numSelected > 0 ? (
        <></>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search product..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {/* Filter but do nothing  */}
      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={handleClickOpenDialog}>
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
}
