"use client"
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableCaterories from '@/components/admin/TableCategories';
import { deleteCategory, getAllCategories, getAllTypeCategories } from '@/services/admin/adminProductsService';
import AddIcon from '@mui/icons-material/Add';
import TableTypeCaterories from '@/components/admin/TableTypeCategories';
import DialogAddTypeCategories from '@/components/admin/DialogAddTypeCategories';
import DialogAddCategories from '@/components/admin/DialogAddCategories';

const page = () => {
  const [openTableCategories, setOpenTableCategories] = useState(false);
  const [openTableTypeCategories, setOpenTableTypeCategories] = useState(false);
  const [openDialogType, setOpenDialogType] = useState(-1);
  const [openDialogCategory, setOpenDialogCategory] = useState(-1);

  const [listcategories, setListcategories] = useState<any>([]);
  const [listTypeCategories, setListTypeCategories] = useState<any>([]);

  const handleGetAllCategories = async () => {
    try {
      const result = await getAllCategories();
      if (result.EC == 0) {
        setListcategories(result.DT);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetAllTypesCategories = async () => {
    try {
      const typecategories = await getAllTypeCategories();
      if(typecategories.EC == 0) {
        setListTypeCategories(typecategories.DT);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteCategory = async (id: any) => {
    try {
      console.log(id);
      const category = await deleteCategory(id);
      if(category.EC == 0) {
        alert("Xóa danh mục thành công");
        handleGetAllCategories();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetAllCategories();
    handleGetAllTypesCategories();
  }, [listcategories.length, listTypeCategories.length]);

  return (
    <Box>
      <Box sx={{
        padding: '10px',
        backgroundColor: '#fff',
        marginBottom: '6px',
        borderRadius: '2px',
      }}>
        <h4>Danh mục và Ngành hàng</h4>
        <Box sx={{ padding: '10px', backgroundColor: '#fff' }}>
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
              setOpenTableTypeCategories(false);
              setOpenDialogType(-1);
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
              setOpenTableTypeCategories(true);
              setOpenTableCategories(false);
              setOpenDialogCategory(-1);
            }}
          >
            <span>Các ngành hàng</span>
          </Button>
        </Box>
      </Box>
      <Box>
        {
          (openTableCategories) && (
            <Box>
              <TableCaterories 
                handleDeleteCategory={handleDeleteCategory} 
                listcategories={listcategories}
              />
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '6px'
              }}>
                <Button sx={{
                  backgroundColor: 'blue',
                  color: 'white',
                  padding: '12px',
                  ':hover': {
                    backgroundColor: 'blue',
                  }
                }}
                  onClick={() => {setOpenDialogCategory(openDialogCategory + 1)}}
                >
                  <AddIcon />Thêm Danh Mục Mới
                </Button>
              </Box>
              <DialogAddCategories handleGetAllCategories={handleGetAllCategories} listTypeCategories={listTypeCategories} openDialogCategory={openDialogCategory}/>
            </Box>
          )
        }

        {
          (openTableTypeCategories) && (
            <Box>
              <TableTypeCaterories listTypeCategories={listTypeCategories} />
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '6px'
              }}>
                <Button sx={{
                  backgroundColor: 'blue',
                  color: 'white',
                  padding: '12px',
                  ':hover': {
                    backgroundColor: 'blue',
                  }
                }}

                  onClick={() => {setOpenDialogType(openDialogType + 1)}}
                >
                  <AddIcon />Thêm Ngành Hàng Mới
                </Button>
              </Box>
              <DialogAddTypeCategories 
                handleGetAllTypesCategories={handleGetAllTypesCategories} 
                openDialogType={openDialogType}
              />
            </Box>
          )
        }
      </Box>
    </Box>
  )
}

export default page