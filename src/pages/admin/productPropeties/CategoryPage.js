import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import CategoryList from "src/sections/@dashboard/products/properties/CategoryList";
import CategoryForm from "src/sections/@dashboard/products/properties/CategoryForm";
import { categoryService } from "src/services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "src/redux/productProperties/categorySlice";
import { getAllProductAdmin } from "src/redux/products/productList";

const ManageCategoriesPage = () => {
  const categories = useSelector((state) => state.categories.allCategories);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.products.productList.allProduct
  );

  const categoryCounts = {};

  products.forEach((product) => {
    product.categories.forEach((category) => {
      if (!categoryCounts[category]) {
        categoryCounts[category] = 1;
      } else {
        categoryCounts[category]++;
      }
    });
  });

  // Gộp thông tin số lượng sản phẩm vào danh sách category
  const categoriesWithProductCount = categories.map((category) => ({
    ...category,
    productCount: categoryCounts[category.name] || 0,
  }));

  const handleEditCategory = (category) => {
    setIsEdit(true);
    setSelectedCategory(category);
  };

  const handleDeleteCategory = async (category) => {
    await dispatch(deleteCategory(category.categoryID));
  };

  const handleFormSubmit = async (values) => {
    setIsEdit(false);
    setSelectedCategory(null);
    if (values.categoryID != null) {
      console.log("Edit", values);
      await dispatch(updateCategory(values));
      await dispatch(getAllProductAdmin());
    } else {
      const newCategory = {
        name: values.name,
      };
      console.log("add", newCategory);
      await dispatch(createCategory(newCategory));
    }
  };

  const initialValues = selectedCategory || { name: "" };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CategoryList
            categories={categoriesWithProductCount}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        </Grid>
        <Grid item xs={6}>
          <CategoryForm
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            isEdit={isEdit}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManageCategoriesPage;
