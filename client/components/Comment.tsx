import { useAppSelector } from '@/redux/store';
import { Box, Button, Rating } from '@mui/material'
import React from 'react'


const Comment = ({ comment }: any) => {
    console.log(comment)
    const user = useAppSelector((state) => state.authReducer.value.account);
    console.log(user)
    return (
        <Box sx={{
            margin: '28px 0px'
        }}>
            <Box sx={{
                display: 'flex',
                gap: '10px',
            }}>
                <Box>
                    <img style={{ width: '32px', marginTop: '2px' }} src="https://cdn-icons-png.flaticon.com/128/847/847969.png?ga=GA1.1.1538859696.1700853912&semt=ais" alt="" />
                </Box>
                <Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <span style={{ fontSize: '12px' }}>{comment.Account.email}</span>
                        <Rating
                            name="simple-controlled"
                            value={comment.star}
                            readOnly
                            style={{
                                fontSize: '14px'
                            }}
                        />

                        <p style={{ marginTop: '8px', fontSize: '14px' }}>{comment.comment}</p>

                        {
                            (comment.Account.email === user.email) ? (
                                <Box>
                                    <Button sx={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        marginTop: '8px',
                                        fontSize: '12px',
                                        padding: '2px 4px',
                                        ':hover': {
                                            backgroundColor: 'red',
                                            color: 'white',
                                        }
                                    }}>Xóa</Button>
                                </Box>
                            ) : ''
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Comment