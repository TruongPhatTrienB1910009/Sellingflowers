"use client"
import React from 'react'
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import TableItems from '@/components/TableItems'
import '@/styles/cart.css';
import { getAllItemsInCart } from '@/services/cartService';


const page = () => {

    const [listItemsInCart, setListItemsInCart] = React.useState<any>([]);

    const getAllProducts = async () => {
        if (localStorage.getItem('accesstoken')) {
            const items = await getAllItemsInCart();
            if(items) {
                console.log(items);
                setListItemsInCart(items.DT.Products);
            }
        }
    }

    React.useEffect(() => {
        getAllProducts();
    }, [listItemsInCart.length]);

    return (
        <Container maxWidth="xl" sx={{mt: '10px'}}>
            <TableItems listItemsInCart={listItemsInCart}/>
            <div className='container__BuyItems'>
                <div>
                    Chọn tất cả
                </div>
                <div className='container__checkout'>
                    <div>
                        Tổng thanh toán (0 Sản phẩm): ₫0
                    </div>
                    <div>
                        <Button>
                            Mua Hàng
                        </Button>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default page