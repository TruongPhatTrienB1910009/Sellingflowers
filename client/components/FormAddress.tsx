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

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (openDialog > 1) handleClickOpen();
    }, [openDialog])

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
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
                        type="text" placeholder='Họ và tên'/>
                        <input
                             style={{
                                width: '100%',
                                fontSize: '16px',
                                padding: '12px',
                            }}
                        type="text" placeholder='Số điện thoại'/>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <Box sx={{ minWidth: 160 }}>
                            <FormControl fullWidth>
                                <label htmlFor="" style={{
                                    width: '100%',
                                    fontSize: '14px'
                                }}>Tỉnh / Thành Phố</label>
                                <NativeSelect
                                    defaultValue={30}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
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
                                    defaultValue={30}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
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
                                    defaultValue={"Hà Nội"}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={"Hà Nội"}>Hà Nội</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
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
                        }} name="" id="" cols={60} rows={3} placeholder='Địa chỉ cụ thể'></textarea>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} sx={{
                        padding: '12px',
                        backgroundColor: '#228b22',
                        color: '#fff',
                        transform: '0.02s linear',
                        ':hover' : {
                            backgroundColor: '#47ab47',
                            color: '#eee'
                        }
                    }}>
                        Lưu Địa Chỉ
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
