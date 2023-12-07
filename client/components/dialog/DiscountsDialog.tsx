import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListDiscounts from '../ListDiscounts';
import { getExisDiscounts } from '@/services/discountService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DiscountDialog({ openDialog, handleSelectDiscount }: any) {
    const [open, setOpen] = React.useState(false);
    const [listDiscounts, setListDiscounts] = React.useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleGetAllExisDiscounts = async () => {
        const data = await getExisDiscounts();
        if (data.EC == 0) {
            setListDiscounts(data.DT);
        }
    }

    React.useEffect(() => {
        if (openDialog > 1) handleClickOpen();
        handleGetAllExisDiscounts();
    }, [openDialog, listDiscounts.length])

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Chọn mã giảm giá
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
                    <ListDiscounts handleSelectDiscount={handleSelectDiscount} handleClose={handleClose} listDiscounts={listDiscounts} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus>
                        Hủy
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
