// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) =>
          product.categories.filter((single) => single === category)[0]
      )
    : products;

  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "bestSeller") {
    return finalProducts
      .sort((a, b) => {
        return b.saleCount - a.saleCount;
      })
      .slice(0, limit ? limit : finalProducts.length);
  }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
      (single) => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : -1;
};

// get product cart quantity
export const getProductCartQuantity = (cartItem, product, color, size) => {
  // let productInCart = cartItems.filter(
  //   (single) =>
  //     single.id === product.productID &&
  //     (single.selectedProductColor
  //       ? single.selectedProductColor === color
  //       : true) &&
  //     (single.selectedProductSize ? single.selectedProductSize === size : true)
  // )[0];
  // if (cartItems.length >= 1 && productInCart) {
  //   if (product.variation) {
  //     return cartItems.filter(
  //       (single) =>
  //         single.id === product.productID &&
  //         single.selectedProductColor === color &&
  //         single.selectedProductSize === size
  //     )[0].quantity;
  //   } else {
  //     return cartItems.filter((single) => product.productID === single.id)[0]
  //       .quantity;
  //   }
  // } else {
  //   return 0;
  // }
  // console.log(cartItem);
  if (cartItem === undefined) {
    return 0;
  } else {
    return cartItem.quantity;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        (product) =>
          product.categories.filter((single) => single === sortValue)[0]
      );
    }
    if (sortType === "tag") {
      return products.filter(
        (product) => product.tags.filter((single) => single === sortValue)[0]
      );
    }
    if (sortType === "manufacturer") {
      return products.filter((product) => product.manufacturer === sortValue);
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts.sort((a, b) => {
          return b.stock - a.stock;
        });
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sortValue === "nameAZ") {
        return sortProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sortValue === "nameZA") {
        return sortProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter(function (v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products?.map((product) => {
    return product.categories?.map((single) => {
      return productCategories.push(single);
    });
  });
  const individualProductCategories = getIndividualItemArray(productCategories);
  console.log(individualProductCategories);
  return individualProductCategories;
};

export const getIndividualManufacturer = (products) => {
  let productManufacturer = [];
  products?.forEach((product) => {
    if (product.manufacturer != null) {
      productManufacturer.push(product.manufacturer);
    }
  });
  const individualProductManufacturer =
    getIndividualItemArray(productManufacturer);
  console.log(individualProductManufacturer);
  return individualProductManufacturer;
};

// get individual tags
export const getIndividualTags = (products) => {
  let productTags = [];
  products?.map((product) => {
    return product.tags?.map((single) => {
      return productTags.push(single);
    });
  });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// // get individual colors
// export const getIndividualColors = (products) => {
//   let productColors = [];
//   products &&
//     products.map((product) => {
//       return (
//         product.variation &&
//         product.variation.map((single) => {
//           return productColors.push(single.color);
//         })
//       );
//     });
//   const individualProductColors = getIndividualItemArray(productColors);
//   return individualProductColors;
// };

// // get individual sizes
// export const getProductsIndividualSizes = (products) => {
//   let productSizes = [];
//   products &&
//     products.map((product) => {
//       return (
//         product.variation &&
//         product.variation.map((single) => {
//           return single.size.map((single) => {
//             return productSizes.push(single.name);
//           });
//         })
//       );
//     });
//   const individualProductSizes = getIndividualItemArray(productSizes);
//   return individualProductSizes;
// };

// get product individual sizes
// export const getIndividualSizes = (product) => {
//   let productSizes = [];
//   product.variation &&
//     product.variation.map((singleVariation) => {
//       return (
//         singleVariation.size &&
//         singleVariation.size.map((singleSize) => {
//           return productSizes.push(singleSize.name);
//         })
//       );
//     });
//   const individualSizes = getIndividualItemArray(productSizes);
//   return individualSizes;
// };

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e) => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
