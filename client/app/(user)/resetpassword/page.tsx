"use client"
import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { useSearchParams } from 'next/navigation'

const Page = () => {
    const searchParams = useSearchParams();

    console.log(searchParams.get('token'));

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            console.log(form.get('email'));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container maxWidth='md'>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '16%',
            }}>
                <Box onSubmit={handleSubmit} component={'form'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '16px',
                        border: '2px solid #228b22',
                        width: '400px'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <label style={{
                            fontSize: '16px',
                            marginBottom: '6px'
                        }} htmlFor="email">Vui lòng điền mật khẩu:</label>
                        <input style={{
                            fontSize: '14px',
                            marginBottom: '16px',
                            padding: '10px'
                        }}
                            placeholder='mật khẩu đăng nhập'
                            name='email'
                            type="email" />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <label style={{
                            fontSize: '16px',
                            marginBottom: '6px'
                        }} htmlFor="email">Xác nhận lại mật khẩu:</label>
                        <input style={{
                            fontSize: '14px',
                            marginBottom: '16px',
                            padding: '10px'
                        }}
                            placeholder='xác nhận lại mật khẩu'
                            name='email'
                            type="email" />
                    </Box>
                    <Button sx={{
                        backgroundColor: '#228b22',
                        color: '#fff',
                        ':hover': {
                            backgroundColor: '#228b22',
                            color: '#fff'
                        }
                    }} type={'submit'}>
                        Xác Nhận
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Page