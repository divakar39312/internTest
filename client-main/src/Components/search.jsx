import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { context } from "../contextAPI";

export const SearchBar = () => {
  const { data, setData,monthRef, productFetching ,monthBasedDetailsFetching} = useContext(context);
  const handleSearch = () => {
    productFetching(1, data.searchItem,data.selectedMonth);
  };

  const monthHandleChange = (event) =>{
    setData((prev) => ({ ...prev, selectedMonth: event.target.value }));
    monthBasedDetailsFetching(event.target.value)
    window.scrollTo({ top: monthRef.current.offsetTop, behavior: 'smooth' })

}
  const searchHandleChange = (event) =>
    setData((prev) => ({ ...prev, searchItem: event.target.value }));

  return (
    <div className="searchBar">
      {/* Searchfield */}
      <TextField
        label="Search"
        variant="outlined"
        value={data.searchItem}
        onChange={searchHandleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Month selection field */}

      <Select
        value={data.selectedMonth}
        onChange={monthHandleChange}
        displayEmpty
        inputProps={{ "aria-label": "March" }}
      >
        <MenuItem value={1}>JAN</MenuItem>
        <MenuItem value={2}>FEB</MenuItem>
        <MenuItem value={3}>MAR</MenuItem>
        <MenuItem value={4}>APR</MenuItem>
        <MenuItem value={5}>MAY</MenuItem>
        <MenuItem value={6}>JUN</MenuItem>
        <MenuItem value={7}>JUL</MenuItem>
        <MenuItem value={8}>AUG</MenuItem>
        <MenuItem value={9}>SEP</MenuItem>
        <MenuItem value={10}>OCT</MenuItem>
        <MenuItem value={11}>NOV</MenuItem>
        <MenuItem value={12}>DEC</MenuItem>
      </Select>
    </div>
  );
};
