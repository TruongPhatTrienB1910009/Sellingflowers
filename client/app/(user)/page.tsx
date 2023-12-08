"use client"
import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "@/styles/main.css";
import { getAllProducts } from '@/services/productService';
import CarouselComponent from '@/components/Carousel';
import { getExisDiscounts } from '@/services/discountService';
import WrapperCards from '@/components/common/WrapperCards';

const page = () => {
    const [listDiscounts, setListDiscounts] = useState<any>([]);
    const [listProducts, setListProducts] = useState<any>([]);

    const handleGetExisDiscounts = async () => {
        try {
            const result = await getExisDiscounts();
            if (result.EC == 0) {
                setListDiscounts(result.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetAllProducts = async () => {
        try {
            const result = await getAllProducts();
            if (result.EC == 0) {
                console.log(result.DT);
                const products = result.DT;
                products.length = 4;
                setListProducts(products);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetExisDiscounts();
        handleGetAllProducts();
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <Box className="mainImg"></Box>
            <Box id="Introduce" className="boxIntroduce">
                <Box>
                    <Container maxWidth='lg'>
                        <div className="three">
                            <h1>Về Chúng Tôi</h1>
                        </div>
                        <Box sx={{
                            display: 'flex',
                            backgroundColor: '#fff',
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
                <Box>
                    <Container maxWidth='lg'>
                        <div className="three">
                            <h1>Sản Phẩm Tiêu Biểu</h1>
                        </div>
                        <Box>
                            <WrapperCards listItems={listProducts} />
                        </Box>
                    </Container>
                </Box>
            </Box>

            <Box id="Products" sx={{
                marginTop: '20px',
            }}>
                <Box>
                    <Container maxWidth='lg'>
                        <div className="three">
                            <h1>Khuyến Mãi</h1>
                        </div>
                        <Box>
                            <CarouselComponent listDiscounts={listDiscounts} />
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}

export default page