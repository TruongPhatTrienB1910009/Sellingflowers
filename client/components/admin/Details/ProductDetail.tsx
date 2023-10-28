import { Box } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography';
import { VND } from '@/utils/VND';

const ProductDetail = ({ product }: any) => {
  return (
    <Box>
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
            maxHeight: '400px'
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
          <Typography>
            Chiều cao: {product?.size} cm
          </Typography>

          <Typography>
            Tồn kho: {product?.inventory} sản phẩm
          </Typography>

          <Typography>
            Giá bán: {VND.format(product?.price)}
          </Typography>

          <Typography>
            Nguồn gốc: {product?.Root.area} - {product?.Root.country}
          </Typography>
        </Box>
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
          <Box sx={{marginBottom: '20px'}}>
            <h4>Đặc điểm</h4>
            <Typography>
              {product?.characteristic}
            </Typography>
          </Box>

          <Box sx={{marginBottom: '20px'}}>
            <h4>Cách dùng</h4>
            <Typography>
              {product?.use}
            </Typography>
          </Box>

          <Box sx={{marginBottom: '20px'}}>
            <h4>Cách chăm sóc</h4>
            <Typography>
              {product?.takecare}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetail