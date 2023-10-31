"use client"
import { Box } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UserInfo from '@/components/admin/Details/UserInfo';
import { adminGetUserById } from '@/services/admin/adminUserService';
import BuyHistory from '@/components/admin/Details/BuyHistory';

const page = ({ params }: { params: { id: number } }) => {
    const [user, setUser] = useState<any>(null);

    const handleAdminGetUserById = async () => {
        try {
            const result = await adminGetUserById(params.id);
            if (result.EC == 0) {
                setUser(result.DT);
            }
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(()=> {
        handleAdminGetUserById();
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
                    <Link href={"/dashboard/users"} style={{
                        display: 'flex',
                        marginLeft: '6px'
                    }}>
                        <ArrowBackIosIcon sx={{ width: '16px' }} /> Trở lại
                    </Link>
                </Box>
            </Box>

            <Box>
                <UserInfo user={user?.user}/>
            </Box>

            <Box>
                <BuyHistory receipts={user?.receipts}/>
            </Box>
        </Box>
    )
}

export default page