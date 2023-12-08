import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { VND } from '@/utils/VND';
import ContainComment from '@/components/ContainComment';
import { getAllReviewByProductId } from '@/services/productService';

const ProductDetail = ({ product, params }: any) => {
    const [listComment, setListComment] = useState<any>([]);


    const handleGetAllReviews = async () => {
        try {
            const data = await getAllReviewByProductId(params.id);
            if(data.EC == 0) {
                setListComment(data.DT)
                console.log(data.DT)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetAllReviews();
    }, [])


    return (
        <Box>
            <Box sx={{
                backgroundColor: 'white'
            }}>
                <Container maxWidth='md'>
                    <Box sx={{
                        display: 'flex',
                        gap: '16px',
                        padding: '10px',
                        backgroundColor: 'white'
                    }}>
                        <Box sx={{
                            width: '30%',
                        }}>
                            <img style={{
                                width: '100%',
                                maxHeight: '400px',
                                border: '1px solid #ccc'
                            }} src={`/${product?.img.slice(product?.img.indexOf('images'))}`} alt="" />
                        </Box>
                        <Box sx={{
                            width: '70%',
                        }}>
                            <Box sx={{
                                marginBottom: '4px',
                            }}>
                                <h3 style={{ fontWeight: 600, marginBottom: '10px' }}>{product?.name} </h3>
                                <Typography>
                                    {product?.description}
                                </Typography>
                            </Box>
                            <Typography sx={{
                                marginTop: '6px',
                            }}>
                                <strong>Kích thước:</strong> {product?.width}x{product?.height} cm
                            </Typography>

                            <Typography sx={{
                                marginTop: '6px',
                            }}>
                                <strong>Tồn kho:</strong> {product?.inventory} sản phẩm
                            </Typography>

                            <Typography sx={{
                                marginTop: '6px',
                            }}>
                                <strong>Giá bán:</strong> {VND.format(product?.price)}
                            </Typography>

                            <Typography sx={{
                                marginTop: '6px',
                            }}>
                                <strong>Nguồn gốc:</strong> {product?.Root.area} - {product?.Root.country}
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box sx={{
                padding: '10px',
                backgroundColor: 'white',
                marginTop: '6px'
            }}>
                <h3>CHI TIẾT SẢN PHẨM</h3>
                <hr />
                <Box sx={{
                    marginTop: '6px'
                }}>
                    <Box sx={{ marginBottom: '20px' }}>
                        <h4>Đặc điểm</h4>
                        <Typography>
                            {product?.characteristic}
                        </Typography>
                    </Box>

                    <Box sx={{ marginBottom: '20px' }}>
                        <h4>Cách dùng</h4>
                        <Typography>
                            {product?.use}
                        </Typography>
                    </Box>

                    <Box sx={{ marginBottom: '20px' }}>
                        <h4>Cách chăm sóc</h4>
                        <Typography>
                            {product?.takecare}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                backgroundColor: '#fff',
                marginTop: '10px',
                padding: '10px'
            }}>
                <ContainComment handleGetAllReviews={handleGetAllReviews} listComment={listComment} />
            </Box>
        </Box>
    )
}

export default ProductDetail