import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DialigAddSupplier({ openDialog }: { openDialog: any }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log(data.get('name'));
    }

    React.useEffect(() => {
        if (openDialog > -1) {
            handleClickOpen();
        }
    }, [openDialog])

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <Box component={"form"} onSubmit={handleSubmit}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Thông tin nhà cung cấp
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
                            flexDirection: 'column',
                            marginBottom: '10px'
                        }}>
                            <label style={{marginBottom: '6px', fontSize: '16px'}} htmlFor="">Tên nhà cung cấp:</label>
                            <input name='name' style={{padding: '10px', width: '400px', fontSize: '16px'}} placeholder='Nhập tên...' type="text" />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '10px'
                        }}>
                            <label style={{marginBottom: '6px', fontSize: '16px'}} htmlFor="">Địa chỉ nhà cung cấp:</label>
                            <input name='address' style={{padding: '10px', width: '400px', fontSize: '16px'}} placeholder='Nhập địa chỉ...' type="text" />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '10px'
                        }}>
                            <label style={{marginBottom: '6px', fontSize: '16px'}} htmlFor="">Email cung cấp:</label>
                            <input name='email' style={{padding: '10px', width: '400px', fontSize: '16px'}} placeholder='Nhập email...' type="text" />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '10px'
                        }}>
                            <label style={{marginBottom: '6px', fontSize: '16px'}} htmlFor="">Số điện thoại:</label>
                            <input name='phone' style={{padding: '10px', width: '400px', fontSize: '16px'}} placeholder='Nhập số điện thoại...' type="text" />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' sx={{
                            backgroundColor: 'blue',
                            color: '#fff',
                            ':hover': {
                                backgroundColor: 'blue',
                            }
                        }} autoFocus>
                            Lưu Thay Đổi
                        </Button>
                    </DialogActions>
                </Box>
            </BootstrapDialog>
        </div>
    );
}
