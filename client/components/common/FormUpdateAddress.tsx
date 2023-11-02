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

export default function FormUpdateAddress({ openDialog, address }: { openDialog: any, address: any }) {
    const [open, setOpen] = React.useState(false);

    const [newAddress, setNewAddress] = React.useState<any>({
        name: address?.name,
        detail: address?.detail,
        district: address?.district,
        ward: address?.ward,
        city: address?.city,
        phone: address?.phone
    })

    const handleChaneValue = (e: any, data: any) => {
        switch (data.key) {
            case 'name':
                setNewAddress({ ...newAddress, name: e.target.value });
                break;
            case 'phone':
                setNewAddress({ ...newAddress, phone: e.target.value });
                break;
            case 'detail':
                setNewAddress({ ...newAddress, detail: e.target.value });
                break;
        }
    }

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
        setNewAddress({ ...address, city: address.city, district: address.district, ward: address.ward })
        setOpen(false);
    };

    const [cities, setCities] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);

    const getSelectCities = async (e: any) => {
        setNewAddress({ ...newAddress, city: e.target.value });
        if (e.target.value) {
            setWards([]);
            const districts = await getDistricts(e.target.value.slice(0, e.target.value.indexOf("-")));
            setDistricts(districts)
        } else {
            setWards([]);
        }
    }

    const getSelectDistrict = async (e: any) => {
        if (e.target.value != 0) {
            setNewAddress({ ...newAddress, district: e.target.value });
            const wards = await getWards(e.target.value.slice(0, e.target.value.indexOf('-')));
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

        // const result = await createNewAddress(address);
        // if (result.EC == 0) {
        //     alert("Tao dia chi moi thanh cong")
        //     handleClose();
        // }
    }

    const handleGetData = async () => {
        setNewAddress({ ...address, city: address.city, district: address.district, ward: address.ward })
        handleGetCities();
        console.log(newAddress)
        const districts = await getDistricts(newAddress.city.slice(0, newAddress.city.indexOf("-")));
        if (districts) {
            setDistricts(districts)
            const wards = await getWards(newAddress.district.slice(0, newAddress.district.indexOf('-')));
            if (wards) {
                setWards(wards)
            }
        }
    }

    const handleGetWard = (e: any) => {
        setNewAddress({ ...newAddress, ward: e.target.value });
    }

    React.useEffect(() => {
        if (openDialog > -1) handleClickOpen();
        handleGetData();
    }, [openDialog])

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
                                onChange={(e: any) => { handleChaneValue(e, { key: 'name' }) }}
                                value={newAddress.name}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '16px'
                                }}
                                type="text" placeholder='Họ và tên' name='name' />
                            <input
                                value={newAddress.phone}
                                onChange={(e: any) => { handleChaneValue(e, { key: 'phone' }) }}
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
                                        value={`${newAddress.city}`}
                                        inputProps={{
                                            name: 'city',
                                            id: 'selectCity',
                                        }}
                                        onChange={(e) => { getSelectCities(e) }}
                                    >
                                        <option value={0}>chọn</option>
                                        {
                                            cities.map((c: any, index: number) => {
                                                return <option value={`${c.id}-${c.name}`} key={c.id}>{c.name}</option>
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
                                        value={`${newAddress.district}`}
                                        inputProps={{
                                            name: 'district',
                                            id: 'selectDistrict',
                                        }}
                                        onChange={(e) => { getSelectDistrict(e) }}
                                    >
                                        <option value={0}>chọn</option>
                                        {
                                            districts.map((d: any, index: number) => {
                                                return <option value={`${d.id}-${d.name}`} key={d.id}>{d.name}</option>
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
                                        value={newAddress.ward}
                                        inputProps={{
                                            name: 'ward',
                                            id: 'selectWard',
                                        }}

                                        onChange={(e: any) => { handleGetWard(e) }}
                                    >
                                        <option value={0}>chọn</option>
                                        {
                                            wards.map((w: any, index: number) => {
                                                return <option value={`${w.id}-${w.name}`} key={w.id}>{w.name}</option>
                                            })
                                        }
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{
                            marginTop: '30px'
                        }}>
                            <textarea onChange={(e: any) => { handleChaneValue(e, { key: 'detail' }) }} value={newAddress.detail} style={{
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
                            Cập Nhật
                        </Button>
                    </DialogActions>
                </Box>
            </BootstrapDialog>
        </div>
    );
}
