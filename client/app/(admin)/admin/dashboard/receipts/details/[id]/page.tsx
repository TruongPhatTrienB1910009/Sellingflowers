"use client"
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';
import DetailReceipt from '@/components/admin/DetailReceipt';
import { getReceiptbyId } from '@/services/billService';

const page = ({params}: {params: {id: string}}) => {
    const [receipt, setReceipt] = useState(null);

    const handleGetReceiptById = async () => {
        try {
            const bill = await getReceiptbyId(params.id);
            if(bill.EC == 0){
                setReceipt(bill.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetReceiptById();
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
                    <Link href={"/dashboard/receipts/list"} style={{
                        display: 'flex',
                        marginLeft: '6px'
                    }}>
                        <ArrowBackIosIcon sx={{width: '16px'}} /> Trở lại
                    </Link>
                </Box>
            </Box>
            <DetailReceipt receipt={receipt}/>
        </Box>
    )
}

export default page