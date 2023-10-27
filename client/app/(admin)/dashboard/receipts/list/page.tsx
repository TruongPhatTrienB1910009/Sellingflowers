"use client"
import TableReceipts from '@/components/admin/TableReceipts'
import { getAllReceipts } from '@/services/admin/adminReceiptsService';
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ListReceipts = () => {

  const [listReceipts, setListReceipts] = useState([]);

  const handleGetAllReceipts = async () => {
    try {
      const receipts = await getAllReceipts();
      if(receipts.EC == 0) {
        setListReceipts(receipts.DT);
        console.log(receipts.DT);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetAllReceipts();
  },[])

  return (
    <Box>
      <Box sx={{
        padding: '10px',
        backgroundColor: '#fff',
        marginBottom: '6px',
        borderRadius: '2px',
      }}>
        <h4>Danh sách hóa đơn</h4>
      </Box>
      <TableReceipts listReceipts={listReceipts}/>
    </Box>
  )
}

export default ListReceipts