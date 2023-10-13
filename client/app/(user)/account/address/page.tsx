"use client"
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import FormAddress from '@/components/FormAddress';

const Address = () => {
    const [openDialog, setOpenDialog] = useState(1);

    return (
        <Box>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <h2 style={{ marginBottom: '8px' }}>Địa Chỉ Của Tôi</h2>
                    <p>Quản lý địa chỉ giao hàng</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Button sx={{
                        padding: '12px',
                        backgroundColor: '#228b22',
                        color: '#fff',
                        transform: '0.02s linear',
                        ':hover' : {
                            backgroundColor: '#47ab47',
                            color: '#eee'
                        }
                    }}
                        onClick={() => setOpenDialog(openDialog + 1)}
                    >
                        <AddIcon />
                        Thêm địa chỉ mới
                    </Button>
                </div>
            </div>
            <hr />
            <Box>
                <FormAddress openDialog={openDialog}/>
            </Box>
        </Box>
    )
}

export default Address