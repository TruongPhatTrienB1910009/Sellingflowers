import { Box, Button } from '@mui/material'
import React from 'react'
import TableItemsCheckout from './TableItemsCheckout'
import { VND } from '@/utils/VND'
import ItemsReceipt from './ItemsReceipt'

const DetailReceiptUser = ({ receipt }: any) => {
    return (
        <Box>
            {
                (receipt != null) ? (
                    <Box>
                        <Box sx={{
                            padding: '10px',
                            backgroundColor: 'white',
                            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                        }}>
                            <h3>Danh sách sản phẩm</h3>
                        </Box>
                        <ItemsReceipt listItemsInCart={receipt.Products} />
                        <Box sx={{
                            padding: '10px',
                            backgroundColor: 'white',
                            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                        }}>
                            <Box>
                                <h3>Thông tin vận chuyển</h3>
                                <Box sx={{
                                    padding: '6px'
                                }}>
                                    <h4>{receipt.DeliveryAddress.name} | {receipt.DeliveryAddress.phone}</h4>
                                    <div style={{ fontSize: '14px' }}>
                                        <p>{receipt.DeliveryAddress.detail}</p>
                                        <p>{`${receipt.DeliveryAddress.ward.slice(receipt.DeliveryAddress.ward.indexOf("-") + 1)}, ${receipt.DeliveryAddress.district.slice(receipt.DeliveryAddress.district.indexOf("-") + 1)}, ${receipt.DeliveryAddress.city.slice(receipt.DeliveryAddress.city.indexOf("-") + 1)}`}</p>
                                    </div>
                                </Box>
                            </Box>
                            <Box>
                                <h3>Thông tin thanh toán</h3>
                                <Box sx={{
                                    padding: '6px'
                                }}>
                                    <Box>Tổng tiền sản phẩm: {VND.format(receipt.totalprice)}</Box>
                                    <Box>Phí vận chuyển: {VND.format(receipt.deliverycode)}</Box>
                                    <Box>Tổng thanh toán: {VND.format(receipt.totalprice + receipt.deliverycode)}</Box>
                                    <Box>Trạng thái: {(receipt.state) ? ('Đã thanh toán') : ('Chưa thanh toán')}</Box>
                                </Box>
                            </Box>

                            <Box>
                                <h3>Trạng thái hóa đơn</h3>
                                <Box sx={{
                                    padding: '6px'
                                }}>
                                    {receipt.BillStatus.detail}
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                                <Button
                                    sx={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        padding: '10px',
                                        marginLeft: '10px',
                                        ':hover': {
                                            backgroundColor: 'blue',
                                            color: 'white',
                                        }
                                    }}
                                >
                                    Hủy đơn
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ) : ''
            }
        </Box>
    )
}

export default DetailReceiptUser