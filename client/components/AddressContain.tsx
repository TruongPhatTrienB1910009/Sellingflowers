"use client"
import { Box } from '@mui/material'
import React, { useState } from 'react'
import FormUpdateAddress from './common/FormUpdateAddress';
import { deleteAddress } from '@/services/accountService';

const AddressContain = ({ handleGetAllAddress, address, handleSelectAddress, handleClose }: {handleGetAllAddress: any, address: any, handleSelectAddress?: any, handleClose?: any }) => {

    const [openDialog, setOpenDialog] = useState(-1);

    const handleDeleteAddress = async (id: number) => {
        try {
            const result = await deleteAddress(id);
            if(result.EC == 0) {
                alert("Xóa địa chỉ thành công");
                handleGetAllAddress();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={"div"} sx={{
            padding: '20px',
            minWidth: '400px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ marginRight: '10px' }}>{address.name}</h3>
                <span>({address.phone})</span>
            </div>
            <div style={{ fontSize: '14px' }}>
                <p>{address.detail}</p>
                <p>{`${address.ward.slice(address.ward.indexOf("-") + 1)}, ${address.district.slice(address.district.indexOf("-") + 1)}, ${address.city.slice(address.city.indexOf("-") + 1)}`}</p>
            </div>
            <div style={{
                marginTop: '10px',
            }}>
                {
                    (window.location.href.includes('checkout') ? (
                        <button style={{
                            padding: '4px 10px',
                            marginRight: '10px',
                        }}
                            onClick={() => {
                                handleSelectAddress(address.id);
                                handleClose();
                            }}
                        >
                            Chọn
                        </button>
                    ) : '')
                }

                <button style={{
                    padding: '4px 10px',
                    marginRight: '10px',
                }}
                    onClick={() => setOpenDialog(openDialog + 1)}
                >
                    Cập nhật
                </button>

                <button style={{
                    padding: '4px 10px'
                }}
                    onClick={(e: any) => {handleDeleteAddress(address.id)}}
                >
                    Xóa
                </button>
            </div>
            
            <FormUpdateAddress handleGetAllAddress={handleGetAllAddress} address={address} openDialog={openDialog}/>
        </Box>
    )
}

export default AddressContain