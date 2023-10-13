import { Box, Button, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import '@/styles/formInfo.css'

const FormInfo = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Box component="form">
                <div className='inputCell'>
                    <label>Họ tên: </label>
                    <input type="text" />
                </div>
                <div className='inputCell'>
                    <label>Email: </label>
                    <input type="text" />
                </div>
                <div className='inputCell'>
                    <label>Số điện thoại: </label>
                    <input type="text" />
                </div>
                <div className='inputCell'>
                    <label>Giới tính:</label>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: '80px'
                    }}>
                        <div style={{
                            width: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginRight: '60px'
                        }}>
                            <label>Nam</label>
                            <input type="radio" name="gender" value="1" />
                        </div>
                        <div style={{
                            width: '50px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <label>Nữ</label>
                            <input type="radio" name="gender" value="0" />
                        </div>
                    </div>
                </div>

                <Button sx={{backgroundColor: '#228b22', padding: '14px', color: '#fff', marginTop: '12px', ":hover": {
                    backgroundColor: '#228b22',
                }}}>
                    Lưu thông tin
                </Button>
            </Box>
        </Box>
    )
}

export default FormInfo