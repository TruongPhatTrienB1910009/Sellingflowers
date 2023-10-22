"use client"
import { Box, Button } from '@mui/material'
import React from 'react'
import "@/styles/admin/FormCreateProduct.css";

const FormCreateProduct = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '20px'
        }}>
            <Box sx={{
                backgroundColor: '#fff',
                padding: '20px',
                width: '900px'
            }} component={"form"}>
                <h3>Thông tin về sản phẩm</h3>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px'
                    }}>
                        <Box className="containInput">
                            <label htmlFor="name">Tên sản phẩm:</label>
                            <input placeholder='Tên của sản phẩm' id='name' name='name' type="text" />
                        </Box>
                        <Box className="containInput">
                            <label htmlFor="name">Giá tiền nhập vào:</label>
                            <input id='name' name='name' type="number" />
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px'
                    }}>
                        <Box className="containInput">
                            <label htmlFor="name">Chiều cao:</label>
                            <input id='name' name='name' type="text" />
                        </Box>
                        <Box className="containInput">
                            <label htmlFor="name">Số lượng nhập vào:</label>
                            <input id='name' name='name' type="text" />
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px'
                    }}>
                        <Box className='containInput'>
                            <label htmlFor="description">Mô tả về sản phẩm:</label>
                            <textarea placeholder='Viết mô tả về sản phẩm...' style={{ width: '100%' }} name="description" id="description" cols={30} rows={5}></textarea>
                        </Box>

                        <Box className='containInput'>
                            <label htmlFor="description">Đặc điểm:</label>
                            <textarea placeholder='Đặc điểm của sản phẩm...' style={{ width: '100%' }} name="characteristic" id="characteristic" cols={30} rows={5}></textarea>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px'
                    }}>
                        <Box className='containInput'>
                            <label htmlFor="description">Công dụng:</label>
                            <textarea placeholder='Công dụng của sản phẩm...' style={{ width: '100%' }} name="use" id="use" cols={30} rows={5}></textarea>
                        </Box>

                        <Box className='containInput'>
                            <label htmlFor="description">Cách chăm sóc:</label>
                            <textarea placeholder='Cách chăm sóc sản phẩm...' style={{ width: '100%' }} name="takecare" id="takecare" cols={30} rows={5}></textarea>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px'
                    }}>
                        <Box className="containInput">
                            <label htmlFor="price">Giá bán ra:</label>
                            <input id='price' name='price' type="number" />
                        </Box>
                        <Box className="containInput">
                            <label htmlFor="img">Hình ảnh:</label>
                            <input id='img' name='img' type="file" />
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <h3>Thông tin nhà cung cấp</h3>

                </Box>

                <Box>
                    <h3>Nguồn gốc sản phẩm</h3>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{
                            display: 'flex',
                            gap: '40px',
                            marginBottom: '20px'
                        }}>
                            <Box className="containInput">
                                <label htmlFor="price">Khu vực:</label>
                                <input id='price' name='price' type="text" />
                            </Box>
                            <Box className="containInput">
                                <label htmlFor="img">Quốc gia:</label>
                                <input id='img' name='img' type="text" />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <Button sx={{
                        backgroundColor: 'blue',
                        marginRight: '10px',
                        padding: '10px',
                        color: '#fff',
                        ':hover': {
                            backgroundColor: 'blue',
                        }
                    }}>Xóa Tất Cả</Button>
                    <Button sx={{
                        backgroundColor: 'blue',
                        padding: '10px',
                        color: '#fff',
                        ':hover': {
                            backgroundColor: 'blue',
                        }
                    }}>Lưu Thay Đổi</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default FormCreateProduct