"use client"
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import FormAddress from '@/components/FormAddress';
import ListAddress from '@/components/ListAddress';
import { getAllAddress } from '@/services/accountService';

const Address = () => {
    const [openDialog, setOpenDialog] = useState(1);
    const [listAddress, setListAddress] = useState([]);

    const handleGetAllAddress = async () => {
        const data = await getAllAddress();
        if(data.EC == 0) {
            setListAddress(data.DT);
        }
    }

    useEffect(() => {
        handleGetAllAddress();
    }, [listAddress.length])

    return (
        <Box>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff', padding: '10px 20px'}}>
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
            <Box>
                <FormAddress openDialog={openDialog}/>
                <ListAddress handleGetAllAddress={handleGetAllAddress} listAddress={listAddress} />
            </Box>
        </Box>
    )
}

export default Address