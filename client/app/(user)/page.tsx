"use client"
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "@/styles/main.css";
import { getAllProducts } from '@/services/productService';
import CarouselComponent from '@/components/Carousel';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Link from 'next/link';

const page = () => {
  const [listProducts, setListProducts] = useState([]);

  const handleGetAllProducts = async () => {
    try {
      const data = await getAllProducts();
      if (data.EC == 0) {
        setListProducts(data.DT);
        console.log(data.DT)
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    handleGetAllProducts();
  }, [listProducts.length]);


  return (
    <Box sx={{ width: '100%' }}>
      <Box className="mainImg"></Box>
      <Box id="Introduce" className="boxIntroduce">
        <Box className="heading">
          <h3>Giới Thiệu</h3>
        </Box>
        <Box>
          <Container maxWidth='lg'>
            <Box sx={{
              textAlign: 'justify',
              marginBottom: '16px'
            }}>
              Cây cảnh, từ trước đến nay vẫn được xem như vật trang trí, làm đẹp không gian sống cho con người. Cây để bàn, bonsai, terrarium, cây thuỷ sinh hoặc cây treo chậu… mỗi loại mỗi cây đều có ý nghĩa và vẻ đẹp riêng của mình, góp phần đáng kể làm cho cuộc sống chúng ta thêm sinh động, trở nên đáng yêu và thanh bình hơn.
              Nhưng tại Vườn Cây Việt, chúng tôi muốn mang đến cho bạn không chỉ là cây cảnh, chúng tôi muốn mang đến cho bạn những trải nghiệm tuyệt vời mà không nơi nào có.
            </Box>
            <Box sx={{
              display: 'flex',
              backgroundColor: '#fff',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <Box className="bannerIntro"></Box>
              <Box className="boxIntroduce__Content">
                <Box>
                  <h4>Sứ mệnh</h4>
                  <Typography sx={{ textAlign: 'justify' }} variant="body1" gutterBottom>
                    Vườn Cây Việt đặt ra cho mình sứ mệnh cung cấp các loại cây làm đẹp không gian sống và không chỉ vậy, còn cung cấp thêm các giá trị tinh thần cho khách hàng, là điểm đến cho mọi khách hàng có nhu cầu tìm mua những cây cảnh trang trí đẹp, phù hợp cá tính, phong thuỷ, không gian sống và làm việc.
                  </Typography>
                </Box>
                <Box>
                  <h4>Tầm nhìn</h4>
                  <Typography sx={{ textAlign: 'justify' }} variant="body1" gutterBottom>
                    Đến năm 2023, Vườn Cây Việt phấn đấu trở thành 1 trong 3 đơn vị dẫn đầu trong lĩnh vực cung cấp cây cảnh để bàn, cây cảnh mini, bonsai, cây thuỷ sinh, terrarium.... tại Việt Nam, đồng thời trở thành nhà cung cấp đa dạng các loại hình cây cảnh phù hợp cho nhiều đối tượng khách hàng khác nhau với hệ thống đối tác phân phối rộng khắp cả nước.
                  </Typography>
                </Box>
                <Box>
                  <h4>Giá trị cốt lõi</h4>
                  <ul style={{
                    marginLeft: '30px'
                  }}>
                    <li style={{ textAlign: 'justify' }}>Chất lượng: Tập trung vào chất lượng sản phẩm, cam kết chỉ đưa ra thị trường các sản phẩm thực sự chất lượng.</li>
                    <li style={{ textAlign: 'justify' }}>Chính trực: Không lừa dối khách hàng, luôn đảm bảo tư vấn cho khách hàng một cách công tâm, khách quan nhất về sản phẩm.</li>
                    <li style={{ textAlign: 'justify' }}>Sáng tạo, đổi mới: Không ngừng quan sát, tìm hiểu và học hỏi, từ đó đưa ra các ý tưởng, sản phẩm mới.</li>
                  </ul>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Box id="Products">
        <Box className="heading">
          <h3>Sản Phẩm</h3>
        </Box>
        <Box>
          <Container maxWidth='lg'>
            <Box sx={{
              textAlign: 'justify',
              marginBottom: '16px'
            }}>
              Chúng tôi luôn đổi mới và cập nhật xu hướng liên tục để mang đến trải nghiệm tuyệt vời cho khách hàng, đến với Geen. bạn dễ dàng tìm được các loại hoa tươi hoặc cây cảnh phù hợp với nhu cầu của bản thân vì chúng tôi cung cấp đa dạng các chủng loại và kích thước nhằm mang đến những lựa chọn tuyệt vời cho khách hàng.
            </Box>
          </Container>
          <Box>
            <CarouselComponent listProducts={listProducts} />
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Link href={`/products`}>
                <span style={{
                  color: '#228b22',
                  fontSize: '18px',
                }}>
                  Xem tất cả...
                </span>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box id="Contacts">
        <Box className="heading">
          <h3>Liên hệ</h3>
        </Box>
        <Box>
          <Container maxWidth='lg'>
            <Box sx={{
              textAlign: 'justify',
              marginBottom: '16px'
            }}>
              Nếu có bất kì vấn đề nào cần giải đáp, bạn có thể liên lạc với chúng tôi bằng các hình thức dưới đây. Chúng tôi luôn luôn lắng nghe các vấn đề của khách hàng để đưa ra cách giải quyết tốt nhất.
            </Box>
            <Box className="Contacts__Content">
              <Box className="Contacts__Info">
                <h4 style={{ marginBottom: '10px' }}>Cửa Hàng Hoa Tươi Và Cây Cảnh Green.</h4>
                <Typography sx={{ display: 'flex', marginBottom: '10px' }}>
                  <FmdGoodIcon sx={{ marginRight: '10px' }} /> Đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.
                </Typography>
                <Typography sx={{ display: 'flex', marginBottom: '10px' }}>
                  <EmailIcon sx={{ marginRight: '10px' }} /> Trienb1910009@student.ctu.edu.vn
                </Typography>
                <Typography sx={{ display: 'flex' }}>
                  <LocalPhoneIcon sx={{ marginRight: '10px' }} /> 0787899778
                </Typography>
              </Box>
              <Box className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841454377115!2d105.76804037459512!3d10.029938972519753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1698073898735!5m2!1svi!2s" style={{ width: '100%', minHeight: '400px', border: '1px solid #ccc', borderRadius: '10px' }} loading="lazy"></iframe>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default page