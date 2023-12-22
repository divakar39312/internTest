// App.js
import React, { useContext, useEffect } from "react";
import "./App.css";
import { context } from "./contextAPI";
import { SearchBar } from "./Components/search";
import TableComponent from "./Components/tabl";
import StaticksComponent from "./Components/staticks";
import PiechartComponent from "./Components/piechart";
import BarChartComponent from "./Components/barchart";
import { CircularProgress } from "@mui/material";

function App() {
  const { data, productFetching, monthBasedDetailsFetching } =
    useContext(context);

  useEffect(() => {
    productFetching(1, data.searchItem, data.selectedMonth);
    monthBasedDetailsFetching(data.selectedMonth);
  }, []);

  return (
    <div className="App">
      <SearchBar />
      {data.loading ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : (
        <>
          <TableComponent />
          <StaticksComponent />
          <PiechartComponent />
          <BarChartComponent />
        </>
      )}
    </div>
  );
}

export default App;
