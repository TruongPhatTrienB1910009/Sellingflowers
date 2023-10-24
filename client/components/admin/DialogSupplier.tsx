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
import { getAllSuppliers } from '@/services/admin/adminProductsService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const SupplierContainer = ({Supplier, getSupplierId, handleClose} : {Supplier: any, getSupplierId: any, handleClose: any}) => {
    return (
        <Box sx={{
            minWidth: '500px',
            padding: '10px'
        }}>
            <h3 style={{
                marginBottom: '4px'
            }}>{Supplier.name}</h3>
            <Box>
                <Box>
                    <span style={{
                        fontWeight: '600'
                    }}>Địa chỉ:</span> {Supplier.address}
                </Box>
                <Box>
                <span style={{
                        fontWeight: '600'
                    }}>Email:</span> {Supplier.email}
                </Box>
                <Box>
                <span style={{
                        fontWeight: '600'
                    }}>Điện thoại:</span> {Supplier.phone}
                </Box>
            </Box>
            <Box sx={{
                marginTop: '6px'
            }}>
                <Button     
                    sx={{
                        backgroundColor: 'blue', 
                        color: 'white',
                        marginRight: '10px',
                        ':hover': {
                            backgroundColor: 'blue',
                        }
                    }}
                    onClick={() => {
                        getSupplierId(Supplier.id)
                        handleClose()
                    }}
                >
                    Chọn
                </Button>

                <Button     
                    sx={{
                        backgroundColor: 'blue', 
                        color: 'white',
                        ':hover': {
                            backgroundColor: 'blue',
                        }
                    }}
                >
                    Cập nhật
                </Button>
            </Box>
        </Box>
    )
}

export default function DialogSupplier({openDialog, getSupplierId}: {openDialog: any, getSupplierId: any}) {
    const [open, setOpen] = React.useState(false);
    const [listSuppliers, setListSuppliers] = React.useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleGetAllSuppliers = async () => {
        try {
            const list = await getAllSuppliers();
            if(list.EC == 0) {
                setListSuppliers(list.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        if(openDialog > -1) {
            setOpen(true);
        }

        handleGetAllSuppliers();
    }, [openDialog, listSuppliers.length])

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Danh sách nhà cung cấp
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
                    {
                        listSuppliers.map((Supplier: any, index: number) => {
                            return (
                                <SupplierContainer handleClose={handleClose} getSupplierId={getSupplierId} key={Supplier.id} Supplier={Supplier}/>
                            )
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        backgroundColor: 'blue',
                        color: 'white',
                        ':hover': {
                            backgroundColor: 'blue',
                        }
                    }} autoFocus onClick={handleClose}>
                        Thêm nhà cung cấp mới
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
