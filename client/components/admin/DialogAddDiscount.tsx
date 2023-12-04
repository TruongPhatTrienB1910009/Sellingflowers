import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import DatePickerComponent from '../common/DatePickerComponent';


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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = React.useState(3);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                            <DatePickerComponent />
                        </Box>
                        <Box sx={{
                            width: '100%',
                        }}>
                            <Box>
                                <label style={{}} htmlFor="">Số lượng: </label>
                                <input style={{width: '100%', padding: '10px', marginTop: '8px'}} type="number" />
                            </Box>
                            <Box sx={{marginTop: '10px'}}>
                                <label style={{}} htmlFor="">Số Tiền: </label>
                                <input style={{width: '100%', padding: '10px', marginTop: '8px'}} type="number" />
                            </Box>
                            <Box sx={{marginTop: '10px'}}>
                                <label style={{}} htmlFor="">Nội dung: </label>
                                <textarea style={{width: '100%', padding: '10px', marginTop: '8px'}} name="" id="" cols={30} rows={4}></textarea>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Lưu
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}