"use client"
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getProductById } from '@/services/productService';
import Link from 'next/link';
import { Box, Button } from '@mui/material';
import { getAllCategories } from '@/services/homeService';
import "@/styles/admin/FormCreateProduct.css";

const page = ({ params }: { params: { id: number } }) => {

    const [dataProduct, setDataProduct] = useState<any>(null)
    const [listCategories, setListCategories] = useState<any>([]);

    const handleChangeValue = (e: any, data: any) => {
        switch (data.key) {
            case 'name':
                setDataProduct({ ...dataProduct, name: e.target.value });
                break;
            case 'size':
                setDataProduct({ ...dataProduct, size: e.target.value });
                break;
            case 'description':
                setDataProduct({ ...dataProduct, description: e.target.value });
                break;
            case 'characteristic':
                setDataProduct({ ...dataProduct, characteristic: e.target.value });
                break;
            case 'use':
                setDataProduct({ ...dataProduct, use: e.target.value });
                break;
            case 'takecare':
                setDataProduct({ ...dataProduct, takecare: e.target.value });
                break;
            case 'price':
                setDataProduct({ ...dataProduct, price: e.target.value });
                break;
            case 'CategoryId':
                setDataProduct({ ...dataProduct, CategoryId: e.target.value });
                break;
            case 'area':
                setDataProduct({ ...dataProduct, area: e.target.value });
                break;
            case 'country':
                setDataProduct({ ...dataProduct, country: e.target.value });
                break;
        }
    }

    const handleGetProductById = async () => {
        try {
            const result = await getProductById(params.id);
            if (result.EC == 0) {
                setDataProduct(result.DT);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetAllCategories = async () => {
        try {
            const result = await getAllCategories();
            if (result.EC == 0) {
                setListCategories(result.DT)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const newData = {
                name: data.get('name'),
                description: data.get('description'),
                size: data.get('size'),
                characteristic: data.get('characteristic'),
                use: data.get('use'),
                takecare: data.get('takecare'),
                price: data.get('price'),
                CategoryId: data.get('CategoryId'),
                area: data.get('area'),
                country: data.get('country'),
            }

            console.log(newData);

        } catch (error) {
            console.log(error);
        }
    }

    // const handle

    useEffect(() => {
        handleGetProductById();
        handleGetAllCategories();
    }, [])

    return (
        <Box>
            <Box sx={{
                padding: '10px',
                backgroundColor: '#fff',
                marginBottom: '6px',
                borderRadius: '2px',
            }}>
                <Box>
                    <Link href={"/dashboard/products/list"} style={{
                        display: 'flex',
                        marginLeft: '6px'
                    }}>
                        <ArrowBackIosIcon sx={{ width: '16px' }} /> Trở lại
                    </Link>
                </Box>
            </Box>
            <Box>
                {(dataProduct != null) ? (
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
                            <h3>CẬP NHẬT THÔNG TIN</h3>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{
                                    display: 'flex',
                                    gap: '40px',
                                    marginBottom: '20px'
                                }}>
                                    <Box className="containInput">
                                        <label htmlFor="name">Tên sản phẩm:</label>
                                        <input onChange={(e) => handleChangeValue(e, { key: 'name' })} value={dataProduct?.name} placeholder='Tên của sản phẩm' id='name' name='name' type="text" />
                                    </Box>
                                    <Box className="containInput">
                                        <label htmlFor="size">Chiều cao:</label>
                                        <input onChange={(e) => handleChangeValue(e, { key: 'size' })} value={dataProduct?.size} placeholder='Chiều cao của cây (đơn vị cm)' id='size' name='size' type="number" />
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
                                        <textarea onChange={(e) => handleChangeValue(e, { key: 'description' })} value={dataProduct?.description} placeholder='Viết mô tả về sản phẩm...' style={{ width: '100%' }} name="description" id="description" cols={30} rows={5}></textarea>
                                    </Box>

                                    <Box className='containInput'>
                                        <label htmlFor="characteristic">Đặc điểm:</label>
                                        <textarea onChange={(e) => handleChangeValue(e, { key: 'characteristic' })} value={dataProduct?.characteristic} placeholder='Đặc điểm của sản phẩm...' style={{ width: '100%' }} name="characteristic" id="characteristic" cols={30} rows={5}></textarea>
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
                                        <textarea onChange={(e) => handleChangeValue(e, { key: 'use' })} value={dataProduct?.use} placeholder='Công dụng của sản phẩm...' style={{ width: '100%' }} name="use" id="use" cols={30} rows={5}></textarea>
                                    </Box>

                                    <Box className='containInput'>
                                        <label htmlFor="takecare">Cách chăm sóc:</label>
                                        <textarea onChange={(e) => handleChangeValue(e, { key: 'takecare' })} value={dataProduct?.takecare} placeholder='Cách chăm sóc sản phẩm...' style={{ width: '100%' }} name="takecare" id="takecare" cols={30} rows={5}></textarea>
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
                                        <input onChange={(e) => handleChangeValue(e, { key: 'price' })} value={dataProduct?.price} placeholder='Giá sản phẩm bán ra thị trường' id='price' name='price' type="number" />
                                    </Box>
                                    <Box className="containInput">
                                        <label htmlFor="img">Hình ảnh:</label>
                                        <input id='img' name='img' type="file" />
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
                                            <label style={{ marginBottom: '6px' }} htmlFor="CategoryId">Thuộc danh mục:</label>
                                            <select onChange={(e) => handleChangeValue(e, { key: 'CategoryId' })} value={dataProduct?.CategoryId} style={{ padding: '12px' }} name="CategoryId" id="CategoryId">
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
                                            <input onChange={(e) => handleChangeValue(e, { key: 'area' })} value={dataProduct?.Root.area} placeholder='Khu vực giống cây xuất hiện' id='area' name='area' type="text" />
                                        </Box>
                                        <Box className="containInput">
                                            <label htmlFor="country">Quốc gia:</label>
                                            <input onChange={(e) => handleChangeValue(e, { key: 'country' })} value={dataProduct?.Root.country} placeholder='Cây được nhập từ đâu' id='country' name='country' type="text" />
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
                ) : ''}
            </Box>
        </Box>
    )
}

export default page