"use client"
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DialogAddDiscount from '@/components/admin/DialogAddDiscount';
import TableDiscounts from '@/components/admin/TableDiscounts';
import { getAllDiscounts } from '@/services/admin/adminDiscountService';

const page = () => {
    const [openDialog, setOpenDialog] = useState(-1);
    const [listDiscounts, setListDiscounts] = useState<any>([])

    const handleGetAllDiscounts = async () => {
        try {
            const data = await getAllDiscounts();
            if(data.EC == 0) {
                setListDiscounts(data.DT);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetAllDiscounts();
    }, [])

    return (
        <Box>
            <Box sx={{
                padding: '10px',
                backgroundColor: '#fff',
                marginBottom: '6px',
                borderRadius: '2px',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                }}>
                    <Button
                        sx={{
                            backgroundColor: 'blue',
                            color: '#fff',
                            ':hover': {
                                backgroundColor: 'blue',
                                color: '#fff',
                            }
                        }}
                        onClick={() => {setOpenDialog(openDialog + 1)}}
                    >
                        <AddIcon />
                        Thêm mã giảm mới
                    </Button>
                </Box>
            </Box>
            <TableDiscounts handleGetAllDiscounts={handleGetAllDiscounts} listDiscounts={listDiscounts} />
            <DialogAddDiscount openDialog={openDialog}/>
        </Box>
    )
}

export default page