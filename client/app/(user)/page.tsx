"use client"
import { Box } from '@mui/material'
import React from 'react'
import "@/styles/main.css";
import CarouselComponent from '@/components/Carousel';
const page = () => {
  return (
    <Box sx={{width: '100%'}}>
        <Box className="mainImg">
          <CarouselComponent />
        </Box>
    </Box>
  )
}

export default page