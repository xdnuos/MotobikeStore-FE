import React, { useState } from "react";
import { List, ListItem, ListItemText, Button, Paper } from "@mui/material";
import ConfirmationDialog from "src/components/Dialog/ConfirmDialog";

const CategoryList = ({ categories, onEdit, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleConfirmDelete = (category) => {
    onDelete(category);
  };

  return (
    <Paper elevation={3}>
      <List>
        {categories.map((category) => (
          <ListItem key={category.categoryID}>
            <ListItemText
              primary={category.name}
              secondary={`The number of products: ${category.productCount}`}
            />
            <Button onClick={() => onEdit(category)}>Edit</Button>
            {category.productCount === 0 && (
              <Button
                onClick={() => handleDeleteClick(category)}
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
        object={selectedCategory}
      />
    </Paper>
  );
};

export default CategoryList;
