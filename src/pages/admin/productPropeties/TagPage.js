import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import TagList from "src/sections/@dashboard/products/properties/TagList";
import TagForm from "src/sections/@dashboard/products/properties/TagForm";
import { tagService } from "src/services/tagService";
import { useDispatch, useSelector } from "react-redux";
import {
  createTag,
  deleteTag,
  updateTag,
} from "src/redux/productProperties/tagSlice";
import {
  getAllProduct,
  getAllProductAdmin,
} from "src/redux/products/productList";

const ManageTagsPage = () => {
  const tags = useSelector((state) => state.tags.allTags);
  console.log("tags", tags);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.products.productList.allProduct
  );

  const tagCounts = {};

  products.forEach((product) => {
    product.tags.forEach((tag) => {
      if (!tagCounts[tag]) {
        tagCounts[tag] = 1;
      } else {
        tagCounts[tag]++;
      }
    });
  });

  // Gộp thông tin số lượng sản phẩm vào danh sách tag
  const tagsWithProductCount = tags.map((tag) => ({
    ...tag,
    productCount: tagCounts[tag.name] || 0,
  }));

  const handleEditTag = (tag) => {
    setIsEdit(true);
    setSelectedTag(tag);
  };

  const handleDeleteTag = async (tag) => {
    await dispatch(deleteTag(tag.tagID));
  };

  const handleFormSubmit = async (values) => {
    setIsEdit(false);
    setSelectedTag(null);
    if (values.tagID != null) {
      console.log("Edit", values);
      await dispatch(updateTag(values));
      await dispatch(getAllProductAdmin());
    } else {
      const newTag = {
        name: values.name,
      };
      console.log("add", newTag);
      await dispatch(createTag(newTag));
    }
  };

  const initialValues = selectedTag || { name: "" };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TagList
            tags={tagsWithProductCount}
            onEdit={handleEditTag}
            onDelete={handleDeleteTag}
          />
        </Grid>
        <Grid item xs={6}>
          <TagForm
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            isEdit={isEdit}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManageTagsPage;
