"use client"
import { forgotPassword } from '@/services/homeService'
import { Box, Button, Container } from '@mui/material'
import React, { useState } from 'react'

const Page = () => {
    const [sended, setSended] = useState(false);
    const [email, setEmail] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const result = await forgotPassword({
                email: form.get('email'),
            })

            if (result.EC == 0) {
                setEmail(form.get('email') as string);
                setSended(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container maxWidth='md'>
            {
                (!sended) ? (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20%',
                    }}>
                        <Box onSubmit={handleSubmit} component={'form'}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '16px',
                                border: '2px solid #228b22',
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <label style={{
                                    fontSize: '16px',
                                    marginBottom: '16px'
                                }} htmlFor="email">Vui lòng điền email đăng nhập vào tài khoản của bạn</label>
                                <input style={{
                                    fontSize: '14px',
                                    marginBottom: '16px',
                                    padding: '10px'
                                }}
                                    placeholder='email của bạn'
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
                ) : (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20%',
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '16px',
                                border: '2px solid #228b22',
                                maxWidth: '800px'
                            }}
                        >
                            <Box sx={{
                                marginBottom: '20px'
                            }}>
                                <p style={{fontSize: '16px'}}>Email khôi phục đã được gửi vào {email}</p>
                                <div>
                                    Vui lòng kiểm tra để khôi phục lại mật khẩu
                                </div>
                            </Box>
                            <Button sx={{
                                backgroundColor: '#228b22',
                                color: '#fff',
                                ':hover': {
                                    backgroundColor: '#228b22',
                                    color: '#fff'
                                }
                            }} >
                               <a href="https://mail.google.com/" target="_blank">Đi đến gmail</a>
                            </Button>
                        </Box>
                    </Box>
                )
            }
        </Container >
    )
}

export default Page