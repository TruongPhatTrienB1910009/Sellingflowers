"use client"
import { Box, Button, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '@/styles/formInfo.css'
import { updateProfile } from '@/services/accountService'

const FormInfo = ({ user }: { user: any }) => {
    
    const [inputUser, setInputUser] = useState({
        name: '',
        email: '',
        phone: '',
        gender: ''
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const address = {
            name: data.get('name'),
            email: data.get('email'),
            phone: data.get('phone'),
            gender: data.get('gender'),
        }

        const result = await updateProfile(address);

        if(result.EC == 0) {
            console.log(result.DT);
        }
    }

    const handleChangeName = (e: any) => {
        console.log(e.target.value)
        setInputUser({...inputUser, name: e.target.value});
    }

    const handleChangeEmail = (e: any) => {
        console.log(e.target.value)
        setInputUser({...inputUser, email: e.target.value});
    }

    const handleChangePhone = (e: any) => {
        console.log(e.target.value)
        setInputUser({...inputUser, phone: e.target.value});
    }

    const handleChangeGender = (e: any) => {
        console.log(e.target.value)
        setInputUser({...inputUser, gender: e.target.value});
    }

    useEffect(() => {
        if(user != null) setInputUser({...user});
    }, [user])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Box component="form" onSubmit={handleSubmit}>
                <div className='inputCell'>
                    <label>Họ tên: </label>
                    <input value={inputUser?.name} onChange={handleChangeName} name='name' type="text" />
                </div>
                <div className='inputCell'>
                    <label>Email: </label>
                    <input value={inputUser?.email} onChange={handleChangeEmail} name='email' type="text" />
                </div>
                <div className='inputCell'>
                    <label>Số điện thoại: </label>
                    <input value={inputUser?.phone} onChange={handleChangePhone} name='phone' type="text" />
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
                            <input checked={inputUser?.gender == '1'} onChange={handleChangeGender} type="radio" name="gender" value="1"/>
                        </div>
                        <div style={{
                            width: '50px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <label>Nữ</label>
                            <input checked={inputUser?.gender == '0'} onChange={handleChangeGender} type="radio" name="gender" value="0"/>
                        </div>
                    </div>
                </div>

                <Button sx={{
                    backgroundColor: '#228b22', padding: '14px', color: '#fff', marginTop: '12px', ":hover": {
                        backgroundColor: '#47ab47',
                        color: '#eee'
                    }
                }}
                    type='submit'
                >
                    Lưu thông tin
                </Button>
            </Box>
        </Box>
    )
}

export default FormInfo