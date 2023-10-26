"use client"
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "@/styles/admin/FormCreateProduct.css";
import SupplierComponent from './SupplierComponent';
import { createProduct } from '@/services/admin/adminProductsService';
import { getAllCategories } from '@/services/homeService';

const FormCreateProduct = () => {
    const [supplierId, setSupplierId] = useState<any>(null);
    const [listCategories, setListCategories] = useState<any>([]);

    const getSupplierId = (id: any) => {
        setSupplierId(id);
    }

    const handleGetAllCategories = async () => {
        try {
            const result = await getAllCategories();
            if(result.EC == 0) {
                setListCategories(result.DT)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        console.log(file);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            data.append("SupplierId", supplierId);
            const result = await createProduct(data); 
            if(result.EC == 0) {
                alert("Thêm sản phẩm mới thành công");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetAllCategories();
    }, [])

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
            }} component={"form"} onSubmit={handleSubmit}>
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
                            <label htmlFor="priceItem">Giá tiền nhập vào:</label>
                            <input placeholder='Nhập giá tiền khi nhập sản phẩm' id='priceItem' name='priceItem' type="number" />
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
                            <label htmlFor="size">Chiều cao:</label>
                            <input placeholder='Chiều cao của cây (đơn vị cm)' id='size' name='size' type="number" />
                        </Box>
                        <Box className="containInput">
                            <label htmlFor="totalItems">Số lượng nhập vào:</label>
                            <input placeholder='Số lượng nhập vào' id='totalItems' name='totalItems' type="number" />
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
                            <label htmlFor="characteristic">Đặc điểm:</label>
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
                            <label htmlFor="use">Công dụng:</label>
                            <textarea placeholder='Công dụng của sản phẩm...' style={{ width: '100%' }} name="use" id="use" cols={30} rows={5}></textarea>
                        </Box>

                        <Box className='containInput'>
                            <label htmlFor="takecare">Cách chăm sóc:</label>
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
                            <input placeholder='Giá sản phẩm bán ra thị trường' id='price' name='price' type="number" />
                        </Box>
                        <Box className="containInput">
                            <label htmlFor="img">Hình ảnh:</label>
                            <input onChange={handleFileChange} id='img' name='img' type="file" />
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{
                            display: 'flex',
                            gap: '40px',
                            marginBottom: '20px'
                        }}>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <label style={{marginBottom: '6px'}} htmlFor="CategoryId">Thuộc danh mục:</label>
                                <select style={{padding: '12px'}} name="CategoryId" id="CategoryId">
                                    {
                                        listCategories.map((category: any, index: number) => {
                                            return (
                                                <option value={category.id} key={category.id}>{category.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Box>
                            <Box sx={{ width: '100%' }}></Box>
                        </Box>
                    </Box>
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
                                <label htmlFor="area">Khu vực:</label>
                                <input placeholder='Khu vực giống cây xuất hiện' id='area' name='area' type="text" />
                            </Box>
                            <Box className="containInput">
                                <label htmlFor="country">Quốc gia:</label>
                                <input placeholder='Cây được nhập từ đâu' id='country' name='country' type="text" />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <SupplierComponent getSupplierId={getSupplierId} supplierId={supplierId} />
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <Button sx={{
                        backgroundColor: 'blue',
                        padding: '10px',
                        color: '#fff',
                        ':hover': {
                            backgroundColor: 'blue',
                        }
                    }}
                        type='submit'
                    >Lưu Thay Đổi</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default FormCreateProduct