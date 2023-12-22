// TableComponent.js
import React, { useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { context } from '../contextAPI';

const TableComponent = () => {
   
 
  
    // Sample data
    const {data,setData,productFetching} = useContext(context)
  
    const handleChangePage = (event, newPage) => {
       
        setData((prev)=>({
            ...prev,
            page:newPage
        }))
        window.scrollTo({ top: 0, behavior: 'smooth' });
      productFetching(newPage+1,data.searchItem)
    };
    
  

  return (
    <div className='table'>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 10 }}>ID</TableCell>
            <TableCell style={{ minWidth: "calc(10px + 10vw)"}}>Title</TableCell>
            <TableCell style={{ minWidth: "calc(10px + 20vw)" }}>Description</TableCell>
            <TableCell style={{ minWidth: 10 }}>Price</TableCell>
            <TableCell style={{ minWidth: 10 }}> Category</TableCell>
            <TableCell style={{ minWidth: 10 }}>Sold</TableCell>
            <TableCell style={{ minWidth: 10 }}>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell >{product.id}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell >{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.sold?"true" : "false"}</TableCell>
              <TableCell><img src={product.image} alt={product.title}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data.noOfProducts}
        rowsPerPage={10}
        page={data.page}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default TableComponent;
