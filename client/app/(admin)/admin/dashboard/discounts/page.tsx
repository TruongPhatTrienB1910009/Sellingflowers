"use client"
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DialogAddDiscount from '@/components/admin/DialogAddDiscount';

const page = () => {
    const [openDialog, setOpenDialog] = useState(-1);

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
            
            <DialogAddDiscount openDialog={openDialog}/>
        </Box>
    )
}

export default page