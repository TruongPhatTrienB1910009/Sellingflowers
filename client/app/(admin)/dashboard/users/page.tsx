"use client"
import TableUsers from '@/components/admin/TableUsers';
import { getAllUsers } from '@/services/admin/adminUserService';
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [listUsers, setListUsers] = useState([]);

    const handleGetAllUsers = async () => {
        try {
            const users = await getAllUsers();
            if(users.EC == 0) {
                setListUsers(users.DT);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetAllUsers();
    }, [])

    return (
        <Box>
            <Box sx={{
                padding: '10px',
                backgroundColor: '#fff',
                marginBottom: '6px',
                borderRadius: '2px',
            }}>
                <h4>Danh sách người dùng</h4>
            </Box>
            <TableUsers listUsers={listUsers}/>
        </Box>
    )
}

export default page