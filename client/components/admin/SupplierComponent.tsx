"use client"
import { Box, Button, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DialogSupplier from './DialogSupplier';
import { getSupplierById } from '@/services/admin/adminProductsService';

const SupplierComponent = ({ supplierId, getSupplierId }: { supplierId: any, getSupplierId: any }) => {
    const [openDialog, setOpenDialog] = useState<any>(-1);
    const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

    const handleGetSupplierById = async () => {
        try {
            const supplier = await getSupplierById(supplierId);
            if (supplier.EC == 0) {
                setSelectedSupplier(supplier.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (supplierId != null) {
            handleGetSupplierById();
        }
    }, [supplierId])

    return (
        <Box>
            {
                (selectedSupplier != null) ? (
                    <Box>
                        <h3>Nhà cung cấp sản phẩm</h3>
                        <Box sx={{
                            padding: '6px'
                        }}>
                            <Box>
                                <Typography>
                                    <span>Tên nhà cung cấp: </span>{selectedSupplier.name}
                                </Typography>
                                <Typography>
                                    <span>Địa chỉ: </span>{selectedSupplier.address}
                                </Typography>
                                <Typography>
                                    <span>Email: </span>{selectedSupplier.email}
                                </Typography>
                                <Typography>
                                    <span>Số điện thoại: </span>{selectedSupplier.phone}
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    sx={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        ':hover': {
                                            'backgroundColor': 'blue',
                                        }
                                    }}

                                    onClick={() => {
                                        console.log(openDialog)
                                        setOpenDialog(openDialog + 1)
                                    }}
                                >
                                    Cập nhật
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <h3>Chọn nhà cung cấp</h3>
                        <Button onClick={() => {
                            console.log(openDialog)
                            setOpenDialog(openDialog + 1)
                        }}
                            sx={{
                                backgroundColor: 'blue',
                                color: 'white',
                                ':hover': {
                                    backgroundColor: 'blue',
                                    color: 'white',
                                }
                            }}
                        >
                            Chọn nhà cung cấp
                        </Button>
                    </Box>
                )
            }
            <Box>
                <DialogSupplier getSupplierId={getSupplierId} openDialog={openDialog} />
            </Box>
        </Box>
    )
}

export default SupplierComponent