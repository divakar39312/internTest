// contextAPI.js
import React, { createContext, useRef, useState } from "react";

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState({
    products: [],
    noOfProducts: 0,
    searchItem: "",
    selectedMonth: 3,
    staticksData: {},
    barChartData: {},
    pieChartData: {},
    loading:false,
    page:0
  });
  const monthRef = useRef(null);
  // fetching products
  const productFetching = async (page, search) => {
    try {
     setData((prev)=>({
            ...prev,
            loading:true
        }))
      const response = await fetch(
        `https://roxiler-backend-ashf.onrender.com/api/transactions?page=${page}&search=${search}`
      );
      const data = await response.json();
      if (data) {
        setData((prev) => ({
          ...prev,
          products: data.products,
          noOfProducts: data.totalProductsCount,
          loading:false
        }));
      }
    } catch (error) {
      console.log("fetching error" + error);
    }
  };

  //   month based details fetching
  const monthBasedDetailsFetching = async (month) => {
    try {
      const response = await fetch(
        `https://roxiler-backend-ashf.onrender.com/api?month=${month}`
      );
      const data = await response.json();
      if (data) {
        setData((prev) => ({
          ...prev,
          staticksData: data.staticks,
          barChartData: data.barChat,
          pieChartData: data.pieChar,
        }));
      }
    
    } catch (error) {
      console.log("month based details fetching error" + error);
    }
  };

  const value = {
    data,
    setData,
    productFetching,
    monthBasedDetailsFetching,
    monthRef
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};
