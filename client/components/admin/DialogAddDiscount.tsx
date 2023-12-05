import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import DatePickerComponent from '../common/DatePickerComponent';
import { createNewDiscount } from '@/services/admin/adminDiscountService';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



export default function DialogAddDiscount({ openDialog }: any) {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const data = {
                total: form.get('total'),
                amount: form.get('amount'),
                description: form.get('description'),
                start: startDate,
                end: endDate,
            }
            const result = await createNewDiscount(data);
            if (result.EC == 0) {
                alert("Tạo thành công");
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (openDialog > -1) {
            handleClickOpen();
        }
    }, [openDialog])

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <Box component={'form'} onSubmit={handleSubmit}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Thông tin mã giảm giá
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
                    <DialogContent style={{
                        width: '600px'
                    }} dividers>
                        <Box sx={{
                            display: 'flex',
                            gap: '16px'
                        }}>
                            <Box>
                                <DatePickerComponent startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                            </Box>
                            <Box sx={{
                                width: '100%',
                            }}>
                                <Box>
                                    <label style={{}} htmlFor="">Số lượng: </label>
                                    <input name='total' style={{ width: '100%', padding: '10px', marginTop: '8px' }} type="number" />
                                </Box>
                                <Box sx={{ marginTop: '10px' }}>
                                    <label style={{}} htmlFor="">Số Tiền: </label>
                                    <input name='amount' style={{ width: '100%', padding: '10px', marginTop: '8px' }} type="number" />
                                </Box>
                                <Box sx={{ marginTop: '10px' }}>
                                    <label style={{}} htmlFor="">Nội dung: </label>
                                    <textarea name='description' style={{ width: '100%', padding: '10px', marginTop: '8px' }} id="" cols={30} rows={4}></textarea>
                                </Box>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' autoFocus>
                            Lưu
                        </Button>
                    </DialogActions>
                </Box>
            </BootstrapDialog>
        </React.Fragment>
    );
}