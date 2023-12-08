import { Box, Typography, styled } from '@mui/material'
import React from 'react'

const UserInfo = ({ user }: { user: any }) => {

    return (
        <>
            {
                (user != undefined) ? (
                    <Box sx={{
                        display: 'flex',
                        backgroundColor: '#fff',
                        padding: '8px',
                        gap: '10px'
                    }}>
                        <Box sx={{
                            marginRight: '30px',
                        }}>
                            <img style={{ width: 'auto', height: '100%' }} src="https://cdn-icons-png.flaticon.com/128/456/456141.png?ga=GA1.1.1538859696.1700853912&semt=ais" alt="" />
                        </Box>

                        <Box sx={{
                            marginLeft: '10px'
                        }}>
                            <h2 style={{
                                marginBottom: '6px'
                            }}>Thông tin cơ bản</h2>

                            <Box sx={{
                                margin: '4px 0px'
                            }}>
                                <strong><span>Họ Tên:</span></strong> {user.name}
                            </Box>

                            <Box sx={{
                                margin: '4px 0px'
                            }}>
                                <strong><span>Email:</span></strong> {user.email}
                            </Box>

                            <Box sx={{
                                margin: '4px 0px'
                            }}>
                                <strong><span>Điện Thoại:</span></strong> {user.phone}
                            </Box>

                            <Box sx={{
                                margin: '4px 0px'
                            }}>
                                <strong><span>Giới Tính:</span></strong> {(user.gender) ? "Nam" : "Nữ"}
                            </Box>

                        </Box>

                    </Box>
                ) : ''
            }
        </>
    )
}

export default UserInfo

const WrapperInfo = styled('div')({
    fontSize: '18px',
    marginBottom: '10px',
    'span': {
        fontWeight: 'bold',
        marginRight: '4px',
    }
})