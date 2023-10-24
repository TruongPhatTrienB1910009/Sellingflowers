"use client"
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableCaterories from '@/components/admin/TableCategories';
import { getAllCategories } from '@/services/admin/adminProductsService';

const page = () => {
  const [openTableCategories, setOpenTableCategories] = useState(false);
  const [openTableTypeProducts, setOpenTableTypeProducts] = useState(false);

  const [listcategories, setListcategories] = useState<any>([]);

  const handleGetAllCategories = async () => {
    try {
      const result = await getAllCategories();
      if(result.EC == 0) {
        setListcategories(result.DT);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetAllCategories();
  }, listcategories.length)

  return (
    <Box>
      <Box sx={{
        padding: '10px',
        backgroundColor: '#fff',
        marginBottom: '6px',
        borderRadius: '2px',
      }}>
        <h4>Danh mục và Phân loại sản phẩm</h4>
        <Box sx={{ padding: '10px', backgroundColor: '#fff'}}>
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
              setOpenTableCategories(true);
              setOpenTableTypeProducts(false);
            }}
          >
            Danh mục sản phẩm
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
              setOpenTableTypeProducts(false);
              setOpenTableCategories(true);
            }}
          >
            <span>Các loại sản phẩm</span>
          </Button>
        </Box>
      </Box>
      <Box>
        {
          (openTableCategories) && (<TableCaterories listcategories={listcategories}/>)
        }
      </Box>
    </Box>
  )
}

export default page