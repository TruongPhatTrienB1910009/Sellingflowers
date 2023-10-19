"use client"
import { Box, Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableItemsCheckout from '@/components/TableItemsCheckout'
import DialogAddress from '@/components/DialogAddress'
import { getAllItemsInCart } from '@/services/cartService'
import { getAddressById } from '@/services/accountService'
import { caculateDeliveryFee } from '@/utils/api'
import { VND } from '@/utils/VND'

const ComponentAddress = ({ handleSelectAddress, selectedAddress }: { handleSelectAddress: any, selectedAddress: any }) => {
    const [openDialog, setOpenDialog] = useState(1);
    const [address, setAddress] = useState<any>(null);
    const handleGetAddressById = async () => {
        if (selectedAddress > -1) {
            const ad = await getAddressById(selectedAddress);
            if (ad.EC == 0) {
                setAddress(ad.DT);
            }
        }
    }

    useEffect(() => {
        handleGetAddressById();
    }, [selectedAddress])
    return (
        <>
            <Box sx={{
                backgroundColor: '#fff',
                padding: '20px',
                marginBottom: '10px',
                borderRadius: '5px'
            }}>
                <h3>Địa chỉ giao hàng</h3>
                <div>
                    {
                        (address != null) ? (
                            <Box>
                                <Box component={"div"} sx={{
                                    minWidth: '400px',
                                    margin: '12px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                                        <h4 style={{ marginRight: '10px' }}>{address.name}</h4>
                                        <span>({address.phone})</span>
                                    </div>
                                    <div style={{ fontSize: '14px' }}>
                                        <p>{address.detail}</p>
                                        <p>{`${address.ward}, ${address.district}, ${address.city}`}</p>
                                    </div>
                                </Box>
                                <button style={{
                                    padding: '6px 10px'
                                }} onClick={() => setOpenDialog(openDialog + 1)}>
                                    Chọn địa chỉ
                                </button>
                            </Box>
                        ) : (
                            <button style={{
                                padding: '6px 10px'
                            }} onClick={() => setOpenDialog(openDialog + 1)}>
                                Chọn địa chỉ
                            </button>
                        )
                    }
                </div>
            </Box>
            <DialogAddress openDialog={openDialog} handleSelectAddress={handleSelectAddress} />
        </>
    )
}


const ComponentCheckout = ({selectedAddress, totalpriceItems}: {selectedAddress: any, totalpriceItems: any}) => {

    const [address, setAddress] = useState<any>(null);
    const [deliveryFee, setDeliveryFee] = useState<any>(0);

    const handleGetAddressById = async () => {
        if (selectedAddress > -1) {
            const ad = await getAddressById(selectedAddress);
            if (ad.EC == 0) {
                setAddress(ad.DT);
                const fee = await caculateDeliveryFee({address: ad.DT})
                if(fee) {
                    setDeliveryFee(fee.total_amount);
                }
            }
        }
    }

    useEffect(() => {
        handleGetAddressById();
    }, [selectedAddress, totalpriceItems]);

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
                            <span style={{ fontSize: '16px', marginBottom: '6px' }}>Tổng tiền hàng: {VND.format(totalpriceItems)}</span>
                            <span style={{ fontSize: '16px', marginBottom: '6px' }}>Phí vận chuyển: {VND.format(deliveryFee)}</span>
                            <span style={{ fontSize: '16px', marginBottom: '6px' }}>Tổng thanh toán: {VND.format(totalpriceItems + deliveryFee)}</span>
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
    const [selectedAddress, setSelectedAddress] = React.useState<any>(-1);
    const [totalpriceItems, setTotalpriceItems] = React.useState<any>(0);

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
                        const total = temp.reduce((accumulator: any, currentValue: any, currentIndex: any) => {
                            return accumulator += currentValue.DetailBill.totalPriceItem
                        }, 0)

                        setTotalpriceItems(total);
                    }
                }
            }
        }
    }

    const handleSelectAddress = (id: number) => {
        setSelectedAddress(id);
    }

    React.useEffect(() => {
        getAllProducts();
    }, [listItemsInCart.length, setSelectedAddress]);

    return (
        <Container maxWidth='lg' sx={{ marginTop: '6px' }}>
            <ComponentAddress handleSelectAddress={handleSelectAddress} selectedAddress={selectedAddress} />
            <TableItemsCheckout listItemsInCart={listItemsInCart} />
            <ComponentCheckout  selectedAddress={selectedAddress} totalpriceItems={totalpriceItems}/>
        </Container>
    )
}

export default CheckOut