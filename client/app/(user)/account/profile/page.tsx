import { Box, Divider } from '@mui/material'
import React from 'react'
import FormInfo from '@/components/FormInfo'

const Profile = () => {
    return (
        <Box>
            <div style={{marginBottom: '20px'}}>
                <h2 style={{marginBottom: '8px'}}>Hồ Sơ Của Tôi</h2>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <hr />
            <Box>
                <FormInfo />
            </Box>
        </Box>
    )
}

export default Profile