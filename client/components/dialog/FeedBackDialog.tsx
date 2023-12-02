import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, Rating } from '@mui/material';

export default function FeedBackDialog({ openDialog }: any) {
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
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Đánh giá sản phẩm"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '500px'
                    }}>
                        <Box>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue: any) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box>
                        <Box>
                            <textarea style={{
                                width: '100%',
                                padding: '4px',
                                fontSize: '16px'
                            }} placeholder='Nội dung đánh giá' name="comment" id="comment" cols={30} rows={6}></textarea>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    padding: '8px 24px'
                }}>
                    <Button autoFocus onClick={handleClose}
                        sx={{
                            backgroundColor: '#228b22',
                            color: '#fff',
                            ':hover': {
                                backgroundColor: '#228b22',
                            }
                        }}
                    >
                        Hủy
                    </Button>
                    <Button onClick={handleClose} autoFocus
                        sx={{
                            backgroundColor: '#228b22',
                            color: '#fff',
                            ':hover': {
                                backgroundColor: '#228b22',
                            }
                        }}
                    >
                        Đánh Giá
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}