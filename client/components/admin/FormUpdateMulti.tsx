'use client'
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableItemsUpdate from './TableItemsUpdate'
import { getAllProducts } from '@/services/productService'
import FormImportMulti from './FormImportMulti'

const FormUpdateMulti = () => {
  const [listItems, setListItems] = useState<any>([]);
  const [checkedState, setCheckedState] = React.useState<any>([]);
  const [listUpdate, setListUpdate] = useState<any>([]);
  const [openFormUpdate, setOpenFormUpdate] = useState(false);

  const handleGetAllProducts = async () => {
    try {
      const products = await getAllProducts();
      if (products.EC == 0) {
        setListItems(products.DT);
        setCheckedState(new Array(products.DT.length).fill(false));
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddItemToUpdate = ({ position }: any) => {
    const updatedCheckedState = checkedState.map((item: any, index: number) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  }

  const handleGetListUpdate = () => {
    const list = listItems.filter((item: any, index: number) => {
      if (checkedState[index]) {
        return item;
      }
    })

    if (list[0]) {
      setListUpdate(list);
      setOpenFormUpdate(true);
    }
  }

  useEffect(() => {
    handleGetAllProducts();
  }, [listItems.length]);

  return (
    <Box>
      {
        (openFormUpdate) ? (
          <Box>
            <FormImportMulti listUpdate={listUpdate}/>
          </Box>
        ) : (
          <Box>
            <TableItemsUpdate listItems={listItems} checkedState={checkedState} handleAddItemToUpdate={handleAddItemToUpdate} />
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

                onClick={() => { handleGetListUpdate() }}
              >
                Cập nhật các sản phẩm trên
              </Button>
            </Box>
          </Box>
        )
      }
    </Box>
  )
}

export default FormUpdateMulti