import React, { useState } from "react";
import { Input, Form, List, Button } from "antd";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const mockProducts = [
  { id: 1, name: "Sản phẩm 1", sku: "SKU001" },
  { id: 2, name: "Sản phẩm 2", sku: "SKU002" },
  { id: 3, name: "Sản phẩm 3", sku: "SKU003" },
  // ...Thêm dữ liệu sản phẩm mẫu khác
];

function InventoryManagement() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSearchChange = (value) => {
    // Simulate API call here to filter search results based on value
    const filteredResults = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.sku.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleOnSearch = (string, results) => {
    // khi chọn sp
    console.log("handleOnSearch", string, results);
  };
  const handleOnClear = () => {
    // khi xóa
    console.log("Cleared");
  };
  const handleOnHover = (result) => {
    // khi hover vào
    console.log("handleOnHover", result);
  };

  const handleOnSelect = (item) => {
    // khi select
    console.log("handleOnSelect", item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleFormSubmit = (values) => {
    // Simulate API call to submit form data
    console.log("Form values:", values);
  };
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
        <span style={{ display: "block", textAlign: "left" }}>{item.sku}</span>
      </>
    );
  };

  return (
    <div>
      <div>
        <ReactSearchAutocomplete
          items={searchResults}
          placeholder="Search by Name or SKU"
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          onClear={handleOnClear}
          styling={{ zIndex: 4 }}
          formatResult={formatResult}
          autoFocus
        />
      </div>
      <Form onFinish={handleFormSubmit}>
        {/* Form fields */}
        <List
          dataSource={selectedProducts}
          renderItem={(product) => (
            <List.Item key={product.id}>
              {product.name} - {product.sku}
            </List.Item>
          )}
        />
        <Button type="primary" htmlType="submit">
          Thêm vào kho
        </Button>
      </Form>
    </div>
  );
}

export default InventoryManagement;
