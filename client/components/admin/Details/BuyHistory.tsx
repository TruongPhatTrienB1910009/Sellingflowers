import { Box } from '@mui/material'
import React from 'react'
import TableReceipts from '../TableReceipts'

const BuyHistory = ({ receipts }: { receipts: any }) => {
    console.log(receipts)

    return (
        <>
            {
                (receipts) ? (
                    <Box sx={{
                        marginTop: '6px',
                        padding: '6px',
                        backgroundColor: '#fff'
                    }}>
                        <h3 style={{marginBottom: '10px'}}>Lịch Sử Mua Hàng</h3>
                        <TableReceipts listReceipts={receipts} />
                    </Box>
                ) : ''
            }
        </>
    )
}

export default BuyHistory