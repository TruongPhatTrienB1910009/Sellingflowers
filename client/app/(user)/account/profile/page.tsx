"use client"

import { Box, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FormInfo from '@/components/FormInfo'
import { getAccount } from '@/services/accountService'

const Profile = () => {
    const [user, setUser] = useState<any>(null);

    const getUser = async () => {
        try {
            const foundUser = await getAccount();
            if(foundUser.EC == 0) {
                setUser(foundUser.DT);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <Box>
            <div style={{marginBottom: '20px'}}>
                <h2 style={{marginBottom: '8px'}}>Hồ Sơ Của Tôi</h2>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <hr />
            <Box>
                <FormInfo user={user}/>
            </Box>
        </Box>
    )
}

export default Profile