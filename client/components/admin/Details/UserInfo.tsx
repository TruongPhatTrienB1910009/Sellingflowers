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
                            width: '20%',
                        }}>
                            <img style={{ width: '100%', height: 'auto', borderRadius: '6px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC0HlQ_ckX6HqCAlqroocyRDx_ZRu3x3ezoA&usqp=CAU" alt="" />
                        </Box>
                        <Box sx={{
                            width: '80%',
                        }}>
                            <Box sx={{
                                marginLeft: '10px'
                            }}>
                                <h2 style={{
                                    marginBottom: '14px'
                                }}>Thông tin cơ bản</h2>
                                <WrapperInfo>
                                    <span>Họ Tên:</span> {user.name}
                                </WrapperInfo>
                                <WrapperInfo>
                                    <span>Email:</span> {user.email}
                                </WrapperInfo>
                                <WrapperInfo>
                                    <span>Điện Thoại:</span> {user.phone}
                                </WrapperInfo>
                                <WrapperInfo>
                                    <span>Giới Tính:</span> {(user.gender) ? "Nam" : "Nữ"}
                                </WrapperInfo>
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