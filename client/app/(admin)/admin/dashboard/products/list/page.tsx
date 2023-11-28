"use client"
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableProducts from '@/components/admin/TableProducts'
import { getAllProducts } from '@/services/productService'

const AdminProducts = () => {
  const [listproducts, setListproducts] = useState([]);
  const handleGetAllProducts = async () => {
    try {
      const products = await getAllProducts();
      if(products.EC == 0) {
        setListproducts(products.DT);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetAllProducts();
  }, [listproducts.length])

  return (
    <Box>
      <Box sx={{
        padding: '10px',
        backgroundColor: '#fff',
        marginBottom: '6px',
        borderRadius: '2px',
      }}>
        <h4>Danh sách sản phẩm</h4>
      </Box>
      <TableProducts listproducts={listproducts} handleGetAllProducts={handleGetAllProducts}/>
    </Box>
  )
}

export default AdminProducts