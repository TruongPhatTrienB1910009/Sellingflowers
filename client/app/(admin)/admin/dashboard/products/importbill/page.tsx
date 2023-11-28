"use client"
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import FormCreateProduct from '@/components/admin/FormCreateProduct';
import FormUpdateMulti from '@/components/admin/FormUpdateMulti';

const ImportBill = () => {
  const [openFormCreateProduct, setOpenFormCreateProduct] = useState(false);
  const [openFromUpdate, setOpenFromUpdate] = useState(false);


  return (
    <Box>
      <Box sx={{ padding: '10px', backgroundColor: '#fff', marginBottom: '6px'}}>
        <Button sx={{
          backgroundColor: 'blue',
          color: '#fff',
          marginRight: '20px',
          padding: '8px',
          ":hover": {
            backgroundColor: 'blue',
          }
        }}
          onClick={() => {
            setOpenFormCreateProduct(true);
            setOpenFromUpdate(false);
          }}
        >
          <AddIcon /> Tạo sản phẩm mới
        </Button>
        <Button sx={{
          backgroundColor: 'blue',
          color: '#fff',
          padding: '8px',
          ":hover": {
            backgroundColor: 'blue',
          }
        }}
          onClick={() => {
            setOpenFormCreateProduct(false);
            setOpenFromUpdate(true);
          }}
        >
          <AddTaskOutlinedIcon sx={{ marginRight: '6px' }} /> <span>Cập nhật sản phẩm hiện có</span>
        </Button>
      </Box>
      <Box>
        {openFormCreateProduct && (<FormCreateProduct />)}
        {openFromUpdate && (<FormUpdateMulti />)}
      </Box>
    </Box>
  )
}

export default ImportBill