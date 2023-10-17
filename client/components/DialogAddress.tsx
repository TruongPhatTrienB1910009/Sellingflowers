import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListAddress from './ListAddress';
import { getAllAddress } from '@/services/accountService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DialogAddress({openDialog, handleSelectAddress} : {openDialog: any, handleSelectAddress: any}) {
    const [open, setOpen] = React.useState(false);
    const [listAddress, setListAddress] = React.useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleGetAllAddress = async () => {
        const data = await getAllAddress();
        if(data.EC == 0) {
            setListAddress(data.DT);
        }
    }

    React.useEffect (() => {
        if(openDialog > 1) handleClickOpen();
        handleGetAllAddress();
    }, [openDialog, listAddress.length])

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Chọn địa chỉ giao hàng
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
                    <ListAddress handleClose={handleClose} listAddress={listAddress} handleSelectAddress={handleSelectAddress}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus>
                        Thêm địa chỉ mới
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
