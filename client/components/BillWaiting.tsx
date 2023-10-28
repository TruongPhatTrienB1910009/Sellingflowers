"use client"
import { getAllBillByType } from '@/services/accountService'
import { VND } from '@/utils/VND'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const BillContainer = ({ Bill }: { Bill: any }) => {
    return (
        <Box sx={{
            backgroundColor: '#fff',
            marginY: '12px',
            padding: '10px'
        }}>
            <Box sx={{
                marginBottom: '12px'
            }}>
                <span>Tình Trạng: {Bill.BillStatus.detail}</span>
            </Box>
            <hr />
            <Box>
                {
                    Bill.Products.map((Product: any, index: number) => {
                        return (
                            <Box sx={{ marginY: '10px', display: 'flex', alignItems: 'center' }}>
                                <img style={{ maxWidth: '45px', height: 'auto' }} src={`/${Product.img.slice(Product?.img.indexOf('images'))}`} alt="" />
                                <span style={{ margin: '0px 12px' }}>{Product.name}   x{Product.DetailBill.totalItems}</span>
                            </Box>
                        )
                    })
                }
            </Box>
            <hr />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                <Box sx={{
                    margin: '20px 0px'
                }}>
                    Thành Tiền: {VND.format(Bill.totalprice + Bill.deliveryfee)}
                </Box>
                <Box>
                    <Link href={`/account/receipts/${Bill.id}`}>
                        <Button sx={{
                            background: '#228b22',
                            color: '#fff',
                            padding: '10px',
                            ':hover': {
                                backgroundColor: '#6fa86f'
                            }
                        }}>
                            Xem Chi Tiết
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}


const BillWaiting = ({ type }: { type: any }) => {
    const [listBill, setListBill] = useState<any>([]);

    const handleGetAllBillByType = async () => {
        try {
            const Bills = await getAllBillByType(type);
            if (Bills.EC == 0) {
                setListBill(Bills.DT);
                console.log(listBill);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetAllBillByType();
    }, [listBill.length]);
    return (
        <Box>
            {
                listBill.map((Bill: any, index: number) => {
                    return (
                        <BillContainer key={index} Bill={Bill} />
                    )
                })
            }
        </Box>
    )
}

export default BillWaiting