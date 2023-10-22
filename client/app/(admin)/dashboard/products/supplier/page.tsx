"use client"
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import DialigAddSupplier from '@/components/admin/DialogAddSupplier';
import ListSupplier from '@/components/admin/ListSupplier';
import { getAllSuppliers } from '@/services/admin/adminProductsService';

const Supplier = () => {
    const [openDialog, setOpenDialog] = useState(-1);
    const [listSuppliers, setListSuppliers] = useState<any>([]);

    const handlegetAllSuppliers = async () => {
        const result = await getAllSuppliers();
        if (result.EC == 0) {
            setListSuppliers(result.DT);
            console.log(result.DT);
        }
    }

    useEffect(() => {
        handlegetAllSuppliers();
    }, [])

    return (
        <Box>
            <Box sx={{
                padding: '10px',
                backgroundColor: '#fff',
                marginBottom: '6px',
                borderRadius: '2px',
            }}>
                <h4>Danh sách nhà cung cấp</h4>
                <Button
                    onClick={() => {
                        setOpenDialog(openDialog + 1);
                    }}
                    sx={{
                        backgroundColor: 'blue',
                        padding: '10px',
                        color: 'white',
                        marginTop: '10px',
                        ':hover': {
                            backgroundColor: 'blue',
                        }
                    }}
                >
                    <AddIcon />
                    Thêm nhà cung cấp mới
                </Button>
            </Box>

            <Box>
                <DialigAddSupplier openDialog={openDialog} />
                <ListSupplier listSuppliers={listSuppliers}/>
            </Box>
        </Box>
    )
}

export default Supplier