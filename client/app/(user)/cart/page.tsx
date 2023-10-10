"use client"
import React from 'react'
import Container from '@mui/material/Container';
import { Button, Checkbox } from '@mui/material';
import TableItems from '@/components/TableItems'
import '@/styles/cart.css';
import { getAllItemsInCart, updateTotalsItem } from '@/services/cartService';
import { VND } from '../../../utils/VND';


const page = () => {
    const [listItemsInCart, setListItemsInCart] = React.useState<any>([]);
    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    const [checkedState, setCheckedState] = React.useState<any>([]);
    const [checkAll, setCheckAll] = React.useState<any>(false);
    const [reRender, setRerender] = React.useState<any>(false);

    const getAllProducts = async () => {
        if (localStorage.getItem('accesstoken')) {
            const items = await getAllItemsInCart();
            if (items) {
                setCheckedState(new Array(items.DT.Products.length).fill(false));
                setListItemsInCart(items.DT.Products);
            }
        }
    }

    const addItemToCheckout = ({ position }: any = {}) => {
        setCheckAll(false);
        const updatedCheckedState = checkedState.map((item: any, index: number) =>
            index === position ? !item : item
        );

        if (!updatedCheckedState.includes(false)) setCheckAll(true);

        setCheckedState(updatedCheckedState);

        const total = updatedCheckedState.reduce((accumulator: any, currentValue: any, index: number) => {
            if (currentValue === true) {
                return accumulator + listItemsInCart[index].price * listItemsInCart[index].DetailBill.totalItems;
            } else {
                return accumulator;
            }
        }, 0)

        setTotalPrice(total);

    }

    const handleCheckAll = (event: any) => {
        setCheckAll(!checkAll);
        let updatedCheckedState = [];
        if (event.target.checked) {
            updatedCheckedState = checkedState.map((item: any, index: number) =>
                true
            );
        } else {
            updatedCheckedState = checkedState.map((item: any, index: number) =>
                false
            );
        }

        setCheckedState(updatedCheckedState);

        const total = updatedCheckedState.reduce((accumulator: any, currentValue: any, index: number) => {
            if (currentValue === true) {
                return accumulator + listItemsInCart[index].price;
            } else {
                return accumulator;
            }
        }, 0)

        setTotalPrice(total);
    }

    const handleUpdateTotalsItem = async (
        event: any,
        { id, totalItems }: { id: number, totalItems?: number }
    ) => {
        try {
            const result = await updateTotalsItem({
                ProductId: listItemsInCart[id].DetailBill.ProductId,
                BillId: listItemsInCart[id].DetailBill.BillId,
                totalItems: totalItems
            })

            if(result.EC == 0) {
                setRerender(!reRender)
            }

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getAllProducts();
    }, [listItemsInCart.length, checkedState.length, reRender]);

    return (
        <Container maxWidth="xl" sx={{ mt: '10px' }}>
            <TableItems listItemsInCart={listItemsInCart} checkedState={checkedState} handleAddItemToCheckout={addItemToCheckout} handleUpdateTotalsItem={handleUpdateTotalsItem}/>
            <div className='container__BuyItems'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Checkbox checked = {checkAll} onChange={handleCheckAll} /> Chọn tất cả
                </div>
                <div className='container__checkout'>
                    <div>
                        Tổng thanh toán ({(checkedState.filter((item: any) => item == true)).length} Sản phẩm): {VND.format(totalPrice)}
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