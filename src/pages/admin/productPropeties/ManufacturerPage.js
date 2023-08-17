import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createManufacturer,
  deleteManufacturer,
  updateManufacturer,
} from "src/redux/productProperties/manufacturerSlice";
import { getAllProductAdmin } from "src/redux/products/productList";
import ManufacturerList from "src/sections/@dashboard/products/properties/ManufacturerList";
import ManufacturerForm from "src/sections/@dashboard/products/properties/ManufacturerForm";

const ManageManufacturerPage = () => {
  const manufacturer = useSelector(
    (state) => state.manufacturer.allManufacturer
  );
  console.log("allManufacturer", manufacturer);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.products.productList.allProduct
  );

  const manufacturerCounts = {};

  products.forEach((product) => {
    const manufacturer = product.manufacturer;

    if (!manufacturerCounts[manufacturer]) {
      manufacturerCounts[manufacturer] = 1;
    } else {
      manufacturerCounts[manufacturer]++;
    }
  });

  // Gộp thông tin số lượng sản phẩm vào danh sách manufacturer
  const manufacturerWithProductCount = manufacturer.map((manufacturer) => ({
    ...manufacturer,
    productCount: manufacturerCounts[manufacturer.name] || 0,
  }));

  const handleEditManufacturer = (manufacturer) => {
    setIsEdit(true);
    setSelectedManufacturer(manufacturer);
  };

  const handleDeleteManufacturer = async (manufacturer) => {
    console.log("manufacturer", manufacturer.manufacturerID);
    await dispatch(deleteManufacturer(manufacturer.manufacturerID));
  };

  const handleFormSubmit = async (values) => {
    setIsEdit(false);
    setSelectedManufacturer(null);
    if (values.manufacturerID != null) {
      console.log("Edit", values);
      await dispatch(updateManufacturer(values));
      await dispatch(getAllProductAdmin());
    } else {
      const newManufacturer = {
        name: values.name,
      };
      console.log("add", newManufacturer);
      await dispatch(createManufacturer(newManufacturer));
    }
  };

  const initialValues = selectedManufacturer || { name: "" };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <ManufacturerList
            Manufacturers={manufacturerWithProductCount}
            onEdit={handleEditManufacturer}
            onDelete={handleDeleteManufacturer}
          />
        </Grid>
        <Grid item xs={6}>
          <ManufacturerForm
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            isEdit={isEdit}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManageManufacturerPage;
