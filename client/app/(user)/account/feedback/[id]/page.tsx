"use client"
import { Box, Button, Container, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/navigation';
import { getAllReviewByProductId, getProductById } from '@/services/productService';
import { VND } from '@/utils/VND';
import FeedBackDialog from '@/components/dialog/FeedBackDialog';
import ContainComment from '@/components/ContainComment';

const FeedBack = ({ params }: { params: { id: number } }) => {
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState(-1);
    const [listComment, setListComment] = useState<any>([]);

    const handleGetProduct = async () => {
        try {
            const data = await getProductById(params.id);
            if (data.EC == 0) {
                setProduct(data.DT);
                console.log(data.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetAllReviews = async () => {
        try {
            const data = await getAllReviewByProductId(params.id);
            if(data.EC == 0) {
                setListComment(data.DT)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetProduct();
        handleGetAllReviews();
    }, [])

    return (
        (product != null) ? (
            <Box>
                <Box sx={{
                    padding: '10px',
                    backgroundColor: '#fff',
                    marginBottom: '6px',
                    borderRadius: '2px',
                }}>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            marginLeft: '6px',
                            ':hover': {
                                cursor: 'pointer'
                            }
                        }}
                            onClick={() => { router.back() }}
                        >
                            <ArrowBackIosIcon sx={{ width: '16px' }} /> Trở lại
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    backgroundColor: '#fff',
                }}>
                    <Container maxWidth="md">
                        <Box
                            sx={{
                                display: 'flex',
                                padding: '10px',
                                backgroundColor: '#fff',
                                gap: '20px',
                            }}
                        >
                            <Box sx={{
                                flex: '2',
                                padding: '2px',
                                border: '1px solid #ccc',
                            }}>
                                <img style={{
                                    width: '100%',
                                }} src={`/${product?.img?.slice(product?.img.indexOf('images'))}`} alt="" />
                            </Box>
                            <Box sx={{
                                flex: '4'
                            }}>
                                <h3 style={{
                                    marginBottom: '10px'
                                }}>{product.name}</h3>
                                <p style={{
                                    marginBottom: '10px'
                                }}>
                                    {product.description}
                                </p>
                                <Typography variant="body1" display="block" gutterBottom>
                                    <strong>Kích Thước:</strong> {product.width}x{product.height}cm
                                </Typography>
                                <Typography variant="body1" display="block" gutterBottom><strong>Giá Bán:</strong> {VND.format(product.price)}</Typography>
                                <Typography variant="body2" gutterBottom><i>Lưu ý: giá sản phẩm đã bao gồm chậu.</i></Typography>
                                <Box sx={{
                                    margin: '20px 0px'
                                }}>
                                    <Button sx={{
                                        backgroundColor: '#228b22',
                                        marginRight: '10px',
                                        color: '#fff',
                                        ':hover': {
                                            backgroundColor: '#228b22',
                                        }
                                        
                                    }}
                                    onClick={() => {setOpenDialog(openDialog + 1)}}
                                    >Thêm Đánh Giá</Button>
                                    <Button
                                        sx={{
                                            backgroundColor: '#228b22',
                                            color: '#fff',
                                            ':hover': {
                                                backgroundColor: '#228b22',
                                            }
                                        }}
                                    >Xem Chi Tiết</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <Box sx={{
                    backgroundColor: '#fff',
                    marginTop: '10px',
                    padding: '10px'
                }}>
                    <ContainComment listComment={listComment} />
                </Box>
                <FeedBackDialog openDialog={openDialog}/>
            </Box>
        ) : ('')
    )
}

export default FeedBack