import React, { useState } from "react";
import { List, ListItem, ListItemText, Button, Paper } from "@mui/material";
import ConfirmationDialog from "src/components/Dialog/ConfirmDialog";

const TagList = ({ tags, onEdit, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleDeleteClick = (Tag) => {
    setSelectedTag(Tag);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTag(null);
  };

  const handleConfirmDelete = (Tag) => {
    onDelete(Tag);
  };

  return (
    <Paper elevation={3}>
      <List>
        {tags.map((Tag) => (
          <ListItem key={Tag.tagID}>
            <ListItemText
              primary={Tag.name}
              secondary={`The number of products: ${Tag.productCount}`}
            />
            <Button onClick={() => onEdit(Tag)}>Edit</Button>
            {Tag.productCount === 0 && (
              <Button
                onClick={() => handleDeleteClick(Tag)}
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
        object={selectedTag}
      />
    </Paper>
  );
};

export default TagList;
