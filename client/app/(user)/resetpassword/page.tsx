"use client"
import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { resetPassword } from '@/services/homeService'

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const data = {
                password: form.get('password'),
                confirm: form.get('confirm'),
                token: searchParams.get('token'),
            }

            const result = await resetPassword(data);

            if(result.EC == 0) {
                alert('Đặt mật khẩu thành công')
                router.push('/signin')
            }
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
                        }} htmlFor="password">Vui lòng điền mật khẩu:</label>
                        <input style={{
                            fontSize: '14px',
                            marginBottom: '16px',
                            padding: '10px'
                        }}
                            placeholder='mật khẩu đăng nhập'
                            name='password'
                            type="password" />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <label style={{
                            fontSize: '16px',
                            marginBottom: '6px'
                        }} htmlFor="confirm">Xác nhận lại mật khẩu:</label>
                        <input style={{
                            fontSize: '14px',
                            marginBottom: '16px',
                            padding: '10px'
                        }}
                            placeholder='xác nhận lại mật khẩu'
                            name='confirm'
                            type="password" />
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