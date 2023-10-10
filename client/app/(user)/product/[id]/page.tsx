"use client";
import React, { useEffect, useState } from 'react'
import "@/styles/detail.css";
import { Button, ButtonGroup, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getProductById } from '@/services/productService';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const Page = ({ params }: { params: { id: number } }) => {
    // variables
    const [item, setItem] = useState<any>({});
    const [totalItem, setTotalItem] = useState<number>(1);

    // methods
    const preventNegativeValues = (e: any) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
    const handleChange = (e: any) => setTotalItem(e.target.value);

    const handleGetProduct = async () => {
        try {
            const data = await getProductById(params.id);
            if (data.EC == 0) {
                setItem(data.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetProduct();
    }, [])

    return (
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
                        <strong>Kích Thước:</strong> {item.size}
                    </Typography>
                    <Typography variant="body1" display="block" gutterBottom><strong>Giá Bán:</strong> {item.price}</Typography>
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
                        <Typography sx={{marginBottom: 0, color: '#757575', fontSize: '0.875rem'}} variant="body1" display="block" gutterBottom>10 sản phẩm có sẵn</Typography>
                    </div>
                    <Button className='btnAddToCart'>
                        Thêm Vào Giỏ Hàng
                        <AddShoppingCartIcon sx={{marginLeft: '6px'}}/>
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
    )
}

export default Page