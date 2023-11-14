"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, InputLabel, MenuItem, NativeSelect, Select, SelectChangeEvent } from '@mui/material';
import { createNewAddress } from '@/services/accountService';
import { getCities, getDistricts, getWards } from '@/utils/api';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function FormAddress({ openDialog }: { openDialog: any }) {
    const [open, setOpen] = React.useState(false);
    const [cities, setCities] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);


    const handleGetCities = async () => {
        const data = await getCities();
        if (data) {
            setCities(data);
        }

    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const getSelectCities = async (e: any) => {
        if (e.target.value) {
            setWards([]);
            const districts = await getDistricts({ province_id: Number(e.target.value.slice(0, e.target.value.indexOf("-"))) });
            setDistricts(districts)
        } else {
            setWards([]);
        }
    }

    const getSelectDistrict = async (e: any) => {
        if (e.target.value != 0) {
            const wards = await getWards({ district_id: Number(e.target.value.slice(0, e.target.value.indexOf("-"))) });
            if (wards) {
                setWards(wards)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const address = {
            name: data.get('name'),
            phone: data.get('phone'),
            city: data.get('city'),
            district: data.get('district'),
            ward: data.get('ward'),
            detail: data.get('detail'),
        }

        console.log(address);

        const result = await createNewAddress(address);
        if (result.EC == 0) {
            alert("Tao dia chi moi thanh cong")
            handleClose();
        }
    }

    React.useEffect(() => {
        if (openDialog > 1) handleClickOpen();
        handleGetCities();
    }, [openDialog])

    React.useEffect(() => {
        handleGetCities();
    }, [cities.length, districts.length, wards.length]);
    return (
        <div>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <Box component="form" noValidate onSubmit={handleSubmit}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Thông tin địa chỉ
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Box sx={{
                            display: 'flex',
                            gap: '20px',
                            marginBottom: '30px'
                        }}>
                            <input
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '16px'
                                }}
                                type="text" placeholder='Họ và tên' name='name' />
                            <input
                                style={{
                                    width: '100%',
                                    fontSize: '16px',
                                    padding: '12px',
                                }}
                                type="text" placeholder='Số điện thoại' name='phone' />
                        </Box>
                        <Box sx={{ display: 'flex', gap: '20px' }}>
                            <Box sx={{ minWidth: 160 }}>
                                <FormControl fullWidth>
                                    <label htmlFor="" style={{
                                        width: '100%',
                                        fontSize: '14px'
                                    }}>Tỉnh / Thành Phố</label>
                                    <NativeSelect
                                        defaultValue={0}
                                        inputProps={{
                                            name: 'city',
                                            id: 'selectCity',
                                        }}
                                        onChange={(e) => { getSelectCities(e) }}
                                    >
                                        <option value={0}>Chọn</option>
                                        {
                                            cities.map((c: any, index: number) => {
                                                return <option value={`${c.ProvinceID}-${c.ProvinceName}`} key={c.ProvinceName}>{c.ProvinceName}</option>
                                            })
                                        }
                                    </NativeSelect>
                                </FormControl>
                            </Box>

                            <Box sx={{ minWidth: 160 }}>
                                <FormControl fullWidth>
                                    <label htmlFor="" style={{
                                        width: '100%',
                                        fontSize: '14px'
                                    }}>Quận / Huyện</label>
                                    <NativeSelect
                                        defaultValue={0}
                                        inputProps={{
                                            name: 'district',
                                            id: 'selectDistrict',
                                        }}
                                        onChange={(e) => { getSelectDistrict(e) }}
                                    >
                                        <option value={0}>Chọn</option>
                                        {
                                            districts.map((d: any, index: number) => {
                                                if(d.DistrictID != 3715) {
                                                    return <option value={`${d.DistrictID}-${d.DistrictName}`} key={d.DistrictID}>{d.DistrictName}</option>
                                                }
                                            })
                                        }
                                    </NativeSelect>
                                </FormControl>
                            </Box>

                            <Box sx={{ minWidth: 160 }}>
                                <FormControl fullWidth>
                                    <label htmlFor="" style={{
                                        width: '100%',
                                        fontSize: '14px'
                                    }}>Xã / Phường</label>
                                    <NativeSelect
                                        defaultValue={0}
                                        inputProps={{
                                            name: 'ward',
                                            id: 'selectWard',
                                        }}
                                    >
                                        <option value={0}>Chọn</option>
                                        {
                                            wards.map((w: any, index: number) => {
                                                return <option value={`${w.WardCode}-${w.WardName}`} key={w.WardCode}>{w.WardName}</option>
                                            })
                                        }
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{
                            marginTop: '30px'
                        }}>
                            <textarea style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '14px'
                            }} name="detail" id="" cols={60} rows={3} placeholder='Địa chỉ cụ thể'></textarea>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus type="submit" sx={{
                            padding: '12px',
                            backgroundColor: '#228b22',
                            color: '#fff',
                            transform: '0.02s linear',
                            ':hover': {
                                backgroundColor: '#47ab47',
                                color: '#eee'
                            }
                        }}>
                            Lưu Địa Chỉ
                        </Button>

                    </DialogActions>
                </Box>
            </BootstrapDialog>
        </div>
    );
}
