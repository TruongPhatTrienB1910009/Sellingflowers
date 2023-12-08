"use client";
import React, { useEffect, useRef, useState } from 'react'
import "@/styles/detail.css";
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getAllProductsByCategory, getAllReviewByProductId, getProductById } from '@/services/productService';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { VND } from '@/utils/VND';
import WrapperCards from '@/components/common/WrapperCards';
import { addItemToCart } from '@/services/cartService';
import CustomizedSnackbars from '@/components/common/Snackbar';
import { handleGetItemsInCart } from '@/redux/features/cart-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import ContainComment from '@/components/ContainComment';


const Page = ({ params }: { params: { id: number } }) => {
    // variables
    const [item, setItem] = useState<any>({});
    const [sameItems, setSameItems] = useState([]);
    const [totalItem, setTotalItem] = useState<number>(1);
    const childRef = useRef<any>(null);
    const [message, setMessage] = useState<any>("");
    const [stateMessage, setStateMessage] = useState<any>("success");
    const [listComment, setListComment] = useState<any>([]);
    const dispatch = useDispatch<AppDispatch>();

    // methods
    const preventNegativeValues = (e: any) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    const handleChange = (e: any) => setTotalItem(e.target.value);

    const handleAddItemToCart = async (e: any) => {
        try {
            const data = await addItemToCart({
                "ProductId": item.id,
                "totalItems": totalItem,
            })

            if (data.EC == 0) {
                setMessage("Thêm sản phẩm thành công");
                childRef.current!.handleOpen();
                dispatch(handleGetItemsInCart());
            } else {
                setStateMessage("error")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleGetProduct = async () => {
        try {
            const data = await getProductById(params.id);
            if (data.EC == 0) {
                setItem(data.DT);
                const products = await getAllProductsByCategory(data.DT.CategoryId);
                if (products.EC == 0) {
                    const filteredProducts = products.DT.filter((p: any, index: number) => {
                        if (p.id != data.DT.id) return p;
                    })

                    if (filteredProducts) {
                        setSameItems(filteredProducts);
                    }
                }
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
        <>
            <CustomizedSnackbars ref={childRef} message={message} stateMessage={stateMessage} />
            <Container maxWidth='lg'>
                <Box sx={{ backgroundColor: '#fff', overflow: 'hidden', marginTop: '4px' }}>
                    <div className='productDetailContainer'>
                        <div className='productSide'>
                            <img className='img' src={`/${item?.img?.slice(item?.img.indexOf('images'))}`} alt="" />
                        </div>
                        <div className='detailSide'>
                            <div className='detailSide__info'>
                                <Typography variant="h5" gutterBottom>
                                    {item.name}
                                </Typography>

                                <Typography variant="body1" gutterBottom>{item.description}</Typography>

                                <Typography variant="body1" display="block" gutterBottom>
                                    <strong>Kích Thước:</strong> {item.width}x{item.height}cm
                                </Typography>
                                <Typography variant="body1" display="block" gutterBottom><strong>Giá Bán:</strong> {VND.format(item.price)}</Typography>
                                <Typography variant="body2" gutterBottom><i>Lưu ý: giá sản phẩm đã bao gồm chậu.</i></Typography>
                                <div className='detailSide_countItem'>
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button onClick={() => { if (totalItem > 1) setTotalItem(totalItem - 1) }}>
                                            <RemoveIcon />
                                        </Button>
                                        <Button>
                                            <input type="number" value={totalItem} onKeyDown={preventNegativeValues} onChange={handleChange} />
                                        </Button>
                                        <Button onClick={() => { setTotalItem(Number(totalItem) + 1) }}>
                                            <AddIcon />
                                        </Button>
                                    </ButtonGroup>
                                    <Typography sx={{ marginBottom: 0, color: '#757575', fontSize: '0.875rem' }} variant="body1" display="block" gutterBottom>{item.inventory} sản phẩm có sẵn</Typography>
                                </div>
                                <Button onClick={(e) => handleAddItemToCart(e)} className='btnAddToCart'>
                                    Thêm Vào Giỏ Hàng
                                    <AddShoppingCartIcon sx={{ marginLeft: '6px' }} />
                                </Button>
                            </div>
                            <div className='detailSide__commit'>
                                <h4>CHÚNG TÔI XIN CAM KẾT</h4>
                                <p>
                                    1. Cung cấp các loại cây cảnh đa dạng với giá hợp lý <br />
                                    2. Miễn phí giao hàng cho đơn hàng trên 500.000đ (áp dụng tại các quận nội thành TP.HCM) <br />
                                    3. Tư vấn và hướng dẫn chăm sóc cây tận tình <br />
                                    4. Tư vấn kỹ lưỡng các vấn đề phong thuỷ, hợp mệnh - hợp tuổi <br />
                                    5. Hỗ trợ đổi trả sản phẩm trong vòng 3 ngày sau khi mua <br />
                                </p>
                            </div>
                        </div>
                    </div>
                    <Box sx={{
                        padding: '20px',
                        backgroundColor: 'white',
                    }}>
                        <h3>CHI TIẾT SẢN PHẨM</h3>
                        <hr />
                        <Box sx={{
                            marginTop: '6px'
                        }}>
                            <Box sx={{ marginBottom: '20px' }}>
                                <h4>Đặc điểm</h4>
                                <Typography>
                                    {item?.characteristic}
                                </Typography>
                            </Box>

                            <Box sx={{ marginBottom: '20px' }}>
                                <h4>Cách dùng</h4>
                                <Typography>
                                    {item?.use}
                                </Typography>
                            </Box>

                            <Box sx={{ marginBottom: '20px' }}>
                                <h4>Cách chăm sóc</h4>
                                <Typography>
                                    {item?.takecare}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#fff'
                }}>
                    <h3>SẢN PHẨM TƯƠNG TỰ</h3>
                    <hr />
                    <Box sx={{
                        marginTop: '10px',
                    }}>
                        <WrapperCards listItems={sameItems} />
                    </Box>
                </Box>
                <Box sx={{
                    backgroundColor: '#fff',
                    marginTop: '10px',
                    padding: '10px'
                }}>
                    <ContainComment listComment={listComment} />
                </Box>
            </Container>
        </>
    )
}

export default Page