"use client";
import { Box } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ProductDetail from '@/components/admin/Details/ProductDetail';
import { getProductById } from '@/services/productService';

const page = ({params}: {params: {id: number}}) => {

    const [product, setProduct] = useState<any>(null);
    
    const handleGetProductById = async () => {
        try {
            const result = await getProductById(params.id);
            if(result.EC == 0) {
                setProduct(result.DT);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetProductById();
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
                    <Link href={"/admin/dashboard/products/list"} style={{
                        display: 'flex',
                        marginLeft: '6px'
                    }}>
                        <ArrowBackIosIcon sx={{ width: '16px' }} /> Trở lại
                    </Link>
                </Box>
            </Box>
            <ProductDetail product={product}/>
        </Box>
    )
}

export default page