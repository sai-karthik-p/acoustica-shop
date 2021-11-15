export function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "RELEVANCE") {
      return productList;
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }

    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }

    return productList;
  }

export function getFilteredData(
    productList, priceRange, 
    { showInventoryAll, showFastDeliveryOnly }
  ) {
    return productList
      .filter(
        ({ fastDelivery }) =>
          showFastDeliveryOnly
            ? fastDelivery // show fast delivery items only if checked
            : true // show all items (fast delivery + slow delivery items) if un-checked
      )
      .filter(
        ({ inStock }) =>
          showInventoryAll
            ? true // show the whole inventory if 'Include out of stock' is checked
            : inStock // show only items in stck if 'Include out of stock' is un-checked
      )
      .filter(({ price }) => price < priceRange);
  }