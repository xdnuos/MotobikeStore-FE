import React, { useState } from "react";
import { List, ListItem, ListItemText, Button, Paper } from "@mui/material";
import ConfirmationDialog from "src/components/Dialog/ConfirmDialog";

const ManufacturerList = ({ Manufacturers, onEdit, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  const handleDeleteClick = (Manufacturer) => {
    setSelectedManufacturer(Manufacturer);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedManufacturer(null);
  };

  const handleConfirmDelete = (Manufacturer) => {
    onDelete(Manufacturer);
  };

  return (
    <Paper elevation={3}>
      <List>
        {Manufacturers.map((Manufacturer) => (
          <ListItem key={Manufacturer.manufacturerID}>
            <ListItemText
              primary={Manufacturer.name}
              secondary={`The number of products: ${Manufacturer.productCount}`}
            />
            <Button onClick={() => onEdit(Manufacturer)}>Edit</Button>
            {Manufacturer.productCount === 0 && (
              <Button
                onClick={() => handleDeleteClick(Manufacturer)}
                variant="outlined"
                color="error"
              >
                Delete
              </Button>
            )}
          </ListItem>
        ))}
      </List>
      <ConfirmationDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
        object={selectedManufacturer}
      />
    </Paper>
  );
};

export default ManufacturerList;
