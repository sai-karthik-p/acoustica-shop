import React, { useReducer, useEffect } from "react";
import axios from "axios";
import { getSortedData, getFilteredData } from '../../utils/sortFilterUtilities';

function sortFilterReducerFunc(state, action) {
    switch (action.type) {
      case "SORT":
        return { ...state, sortBy: action.payload };
  
      case "TOGGLE_INVENTORY":
        return { ...state, showInventoryAll: !state.showInventoryAll };
  
      case "TOGGLE_DELIVERY":
        return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };
  
      case "CHANGE_PRICE_RANGE":
        return { ...state, priceRange: action.payload };
  
      default:
        return state;
    }
}
  
function productReducerFunc(state, action) {
    switch (action.type) {
      case "INIT_PRODUCTS":
        return { ...state, productList: action.payload };
  
      case "START_LOADING":
        return { ...state, showLoading: true };
  
      case "STOP_LOADING":
        return { ...state, showLoading: false };
  
      case "SET_ERROR":
        return { ...state, isError: true };
  
      case "NOT_ERROR":
        return { ...state, isError: false };
  
      default:
        return;
    }
}


export default function Products() {

    useEffect(() => {
        (async function () {
          productDispatch({ type: "START_LOADING" });
    
          try {
            const {
              data: { products: productsFromAPI }
            } = await axios.get("/api/products");
            productDispatch({ type: "STOP_LOADING" });
            productDispatch({ type: "INIT_PRODUCTS", payload: productsFromAPI });
          } catch {
            productDispatch({ type: "SET_ERROR" });
            productDispatch({ type: "STOP_LOADING" });
          }
        })();
      }, []);

    const [
        { showInventoryAll, showFastDeliveryOnly, sortBy, priceRange },
        sortFilterDispatch
      ] = useReducer(sortFilterReducerFunc, {
        showInventoryAll: true,
        showFastDeliveryOnly: false,
        sortBy: "RELEVANCE",
        priceRange: 1000
      });
    
    const [{ productList, showLoading, isError }, productDispatch] = useReducer(
        productReducerFunc,
        {
          productList: [],
          showLoading: false,
          isError: false
        }
      );

      const sortedData = getSortedData(productList, sortBy);
      const filteredData = getFilteredData(sortedData, priceRange, {
        showInventoryAll,
        showFastDeliveryOnly
      });
    
    return (
        <div>

            <fieldset>

                <legend>Sort By</legend>

                <label>
                    <input
                        type="radio"
                        name="sort"
                        onChange={() => {
                        sortFilterDispatch({
                            type: "SORT",
                            payload: "RELEVANCE"
                        });
                        }}
                        checked={sortBy && sortBy === "RELEVANCE"}
                    ></input>
                    Relevance
                </label>

                <label>
                    <input
                        type="radio"
                        name="sort"
                        onChange={() => {
                        sortFilterDispatch({
                            type: "SORT",
                            payload: "PRICE_LOW_TO_HIGH"
                        });
                        }}
                        checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
                    ></input>
                    Price - Low to High
                </label>

                <label>
                    <input
                        type="radio"
                        name="sort"
                        onChange={() => {
                        sortFilterDispatch({
                            type: "SORT",
                            payload: "PRICE_HIGH_TO_LOW"
                        });
                        }}
                        checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
                    ></input>
                    Price - High to Low
                </label>

            </fieldset>


            <fieldset style={{ marginTop: "1rem" }}>

                <legend>Filters</legend>

                <label>
                    <input
                        type="checkbox"
                        checked={showInventoryAll}
                        onChange={() => sortFilterDispatch({ type: "TOGGLE_INVENTORY" })}
                    ></input>
                    Include Out of Stock
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={showFastDeliveryOnly}
                        onChange={() => sortFilterDispatch({ type: "TOGGLE_DELIVERY" })}
                    ></input>
                    Fast Delivery Only
                </label>

                <label style={{ display: "block", marginTop: "1rem" }}>
                    Price Under
                    <input
                        type="range"
                        min={50}
                        max={1000}
                        step={50}
                        value={priceRange}
                        onChange={(e) =>
                        sortFilterDispatch({
                            type: "CHANGE_PRICE_RANGE",
                            payload: Number(e.target.value)
                        })
                        }
                    />
                </label>

                <span>{priceRange}</span>

            </fieldset>

            {showLoading && <h3>Loading Products...</h3>}
            {isError && <span>Oops, Something went wrong!</span>}

            <div style={{ display: "flex", flexWrap: "wrap"}}>
                {filteredData.map(
                ({
                    id,
                    name,
                    image,
                    price,
                    productName,
                    inStock,
                    level,
                    fastDelivery
                }) => (
                    <div
                    key={id}
                    style={{
                        border: "1px solid #4B5563",
                        borderRadius: "0 0 0.5rem 0.5rem",
                        margin: "1rem",
                        maxWidth: "40%",
                        padding: "0 0 1rem"
                    }}
                    >
                        <img src={image} width="100%" height="auto" alt={productName} />
                        <h3> {name} </h3>
                        <div>Rs. {price}</div>
                        {inStock && <div> In Stock </div>}
                        {!inStock && <div> Out of Stock </div>}
                        <div>{level}</div>
                        {fastDelivery ? (
                            <div> Fast Delivery </div>
                        ) : (
                            <div> 3 days minimum </div>
                        )}
                    </div>

                    
                )
                )}
            </div>

        </div>
    );
}