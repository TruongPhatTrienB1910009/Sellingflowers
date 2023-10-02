"use client";
import React, { useEffect, useState } from 'react'
import "@/styles/detail.css";
import { CardMedia, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { getProductById } from '@/services/productService';


const Page = ({ params }: { params: { id: number } }) => {

  const [item, setItem] = useState<any>({});

  const handleGetProduct = async () => {
    try {
      const data = await getProductById(params.id);
      if (data.EC == 0) {
        console.log(data.DT)
        console.log(data.DT?.img?.slice(data.DT?.img.indexOf('images')))
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
            <strong>Kích Thước: {item.size}</strong>
          </Typography>
          <Typography variant="body1" display="block" gutterBottom><strong>Tình Trạng:</strong> Còn hàng</Typography>
          <Typography variant="body1" display="block" gutterBottom><strong>Giá Bán:</strong> {item.price}</Typography>
          <Typography variant="body2" gutterBottom><i>Lưu ý: giá sản phẩm đã bao gồm chậu.</i></Typography>
          <Typography className='detailSide_countItem'>
            <RemoveCircleOutlineIcon /> <input type="number" min={1} /> <AddCircleOutlineIcon />
          </Typography>
        </div>
        <div className='detailSide__commit'>
          <h4>CHÚNG TÔI XIN CAM KẾT</h4>
          <p>Cung cấp các loại cây cảnh đa dạng với giá hợp lý</p>
          <p>Miễn phí giao hàng cho đơn hàng trên 500.000đ (áp dụng tại các quận nội thành TP.HCM)</p>
          <p>Tư vấn và hướng dẫn chăm sóc cây tận tình</p>
          <p>Tư vấn kỹ lưỡng các vấn đề phong thuỷ, hợp mệnh - hợp tuổi</p>
          <p>Hỗ trợ đổi trả sản phẩm trong vòng 3 ngày sau khi mua</p>
        </div>
      </div>
    </div>
  )
}

export default Page