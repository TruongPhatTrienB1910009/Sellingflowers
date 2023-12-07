import { VND } from '@/utils/VND'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const Discount = ({ discount, handleSelectDiscount, handleClose }: any) => {
    return (
        <Box sx={{
            display: 'flex',
            gap: '20px',
            minWidth: '300px',
            margin: '10px',
            backgroundColor: '#ccc',
            padding: '8px',
            justifyContent: 'space-between'
        }}>
            <Box>
                <Box sx={{
                    marginBottom: '10px',
                }}>
                    Mã giảm: {discount.code}
                </Box>
                <Box>
                    Số tiền: {VND.format(discount.amount)}
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <button
                    style={{
                        padding: '2px 10px'
                    }}
                    onClick={() => {
                        handleSelectDiscount(discount.id);
                        handleClose();
                    }}
                >Chọn</button>
            </Box>
        </Box>
    )
}


const ListDiscounts = ({ listDiscounts, handleSelectDiscount, handleClose }: any) => {
    return (
        <Box>
            {
                listDiscounts.map((discount: any, index: number) => {
                    return (
                        <Discount handleClose={handleClose} handleSelectDiscount={handleSelectDiscount} key={discount.id} discount={discount} />
                    )
                })
            }
        </Box>
    )
}

export default ListDiscounts