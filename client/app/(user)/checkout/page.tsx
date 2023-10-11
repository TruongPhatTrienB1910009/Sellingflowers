"use client"
import { Container } from '@mui/material'
import React from 'react'
import TableItemsCheckout from '@/components/TableItemsCheckout'
import { getAllItemsInCart } from '@/services/cartService'

const CheckOut = () => {
  const [listItemsInCart, setListItemsInCart] = React.useState<any>([]);


  const getAllProducts = async () => {
    if (localStorage.getItem('accesstoken')) {
      const items = await getAllItemsInCart();
      if (items) {
        const arrCheckOut = sessionStorage.getItem("checkout");
        if (arrCheckOut) {
          const temp = (items.DT.Products.map((item: any, index: number) => {
            if(JSON.parse(arrCheckOut).includes(index)) {
              return item;
            }
          })).filter((value: any) => value != undefined);

          if(temp) {
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
    <Container maxWidth='lg' sx={{marginTop: '6px'}}>
      
      <TableItemsCheckout listItemsInCart={listItemsInCart}/>
    </Container>
  )
}

export default CheckOut