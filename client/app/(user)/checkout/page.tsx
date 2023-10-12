"use client"
import { Box, Button, Container } from '@mui/material'
import React, { useState } from 'react'
import TableItemsCheckout from '@/components/TableItemsCheckout'
import DialogAddress from '@/components/DialogAddress'
import { getAllItemsInCart } from '@/services/cartService'

const ComponentAddress = () => {
    const [openDialog, setOpenDialog] = useState(1);

    return (
        <>
            <Box sx={{
                backgroundColor: '#fff',
                padding: '20px',
                marginBottom: '10px',
                borderRadius: '5px'
            }}>
                <h4>Địa chỉ giao hàng</h4>
                <div>
                    <button onClick={() => setOpenDialog(openDialog + 1)}>
                        Open
                    </button>
                </div>
            </Box>
            <DialogAddress openDialog={openDialog} />
        </>
    )
}


const ComponentCheckout = () => {
    return (
        <>
            <Box sx={{
                backgroundColor: '#fff',
                padding: '20px',
                marginTop: '10px',
                borderRadius: '5px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản của chúng tôi
                    </div>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                            <span style={{fontSize: '16px', marginBottom: '6px'}}>Tổng tiền hàng: 200.000.000 đ</span>
                            <span style={{fontSize: '16px', marginBottom: '6px'}}>Phí vận chuyển: </span>
                            <span style={{fontSize: '16px', marginBottom: '6px'}}>Tổng tiền hàng: </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button sx={{ backgroundColor: '#228b22', color: '#fff', padding: '16px 42px', ':hover': { backgroundColor: '#228b22' } }}>
                                Đặt Hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}


const CheckOut = () => {
    const [listItemsInCart, setListItemsInCart] = React.useState<any>([]);

    const getAllProducts = async () => {
        if (localStorage.getItem('accesstoken')) {
            const items = await getAllItemsInCart();
            if (items) {
                const arrCheckOut = sessionStorage.getItem("checkout");
                if (arrCheckOut) {
                    const temp = (items.DT.Products.map((item: any, index: number) => {
                        if (JSON.parse(arrCheckOut).includes(index)) {
                            return item;
                        }
                    })).filter((value: any) => value != undefined);

                    if (temp) {
                        setListItemsInCart(temp);
                    }
                }
            }
        }
    }

    React.useEffect(() => {
        getAllProducts();
    }, [listItemsInCart.length]);

    return (
        <Container maxWidth='lg' sx={{ marginTop: '6px' }}>
            <ComponentAddress />
            <TableItemsCheckout listItemsInCart={listItemsInCart} />
            <ComponentCheckout />
        </Container>
    )
}

export default CheckOut