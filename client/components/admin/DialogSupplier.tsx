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
import { createSupplier, getAllSuppliers, getSupplierById, updateSupplier } from '@/services/admin/adminProductsService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const SupplierContainer = ({ Supplier, getSupplierId, handleClose, handleGetSupplierId }: { Supplier: any, getSupplierId: any, handleClose: any, handleGetSupplierId: any }) => {
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
                    onClick={() => { handleGetSupplierId(Supplier.id) }}
                >
                    Cập nhật
                </Button>
            </Box>
        </Box>
    )
}

function DialogUpdateSupplier({ handleGetAllSuppliers, openDialogUpdate, SupplierId, handleSetNewSupplier }: { handleGetAllSuppliers: any, openDialogUpdate: any, SupplierId: any, handleSetNewSupplier: any }) {
    const [open, setOpen] = React.useState(false);
    const [Supplier, setSupplier] = React.useState<any>(null);

    const [newSupplier, setNewSupplier] = React.useState({
        name: Supplier?.name,
        email: Supplier?.email,
        phone: Supplier?.phone,
        address: Supplier?.address,
    })

    const handleGetSupplierById = async () => {
        try {
            const result = await getSupplierById(SupplierId);
            if (result.EC == 0) {
                setSupplier(result.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onchaneValue = (e: any, data: any) => {
        switch (data.key) {
            case 'name':
                setNewSupplier({ ...newSupplier, name: e.target.value });
                break;
            case 'email':
                setNewSupplier({ ...newSupplier, email: e.target.value });
                break;
            case 'phone':
                setNewSupplier({ ...newSupplier, phone: e.target.value });
                break;
            case 'address':
                setNewSupplier({ ...newSupplier, address: e.target.value });
                break;
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        handleSetNewSupplier();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const result = await updateSupplier(Supplier.id, data);
            if (result.EC == 0) {
                alert("Cập nhật thành công");
                handleGetAllSuppliers();
                handleSetNewSupplier();
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (openDialogUpdate > -1) {
            handleClickOpen();
        }

        if (Supplier != null) {
            setNewSupplier({ ...Supplier })
        }

        handleGetSupplierById();
    }, [openDialogUpdate, Supplier?.id]);

    return (
        <div>
            {
                (newSupplier != null) ? (<BootstrapDialog
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
                                <label style={{ marginBottom: '6px', fontSize: '16px' }} htmlFor="">Tên nhà cung cấp:</label>
                                <input onChange={(e) => { onchaneValue(e, { key: 'name' }) }} value={newSupplier?.name} name='name' style={{ padding: '10px', width: '400px', fontSize: '16px' }} placeholder='Nhập tên...' type="text" />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '10px'
                            }}>
                                <label style={{ marginBottom: '6px', fontSize: '16px' }} htmlFor="">Địa chỉ nhà cung cấp:</label>
                                <input onChange={(e) => { onchaneValue(e, { key: 'address' }) }} value={newSupplier?.address} name='address' style={{ padding: '10px', width: '400px', fontSize: '16px' }} placeholder='Nhập địa chỉ...' type="text" />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '10px'
                            }}>
                                <label style={{ marginBottom: '6px', fontSize: '16px' }} htmlFor="">Email cung cấp:</label>
                                <input onChange={(e) => { onchaneValue(e, { key: 'email' }) }} value={newSupplier?.email} name='email' style={{ padding: '10px', width: '400px', fontSize: '16px' }} placeholder='Nhập email...' type="text" />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '10px'
                            }}>
                                <label style={{ marginBottom: '6px', fontSize: '16px' }} htmlFor="">Số điện thoại:</label>
                                <input onChange={(e) => { onchaneValue(e, { key: 'phone' }) }} value={newSupplier?.phone} name='phone' style={{ padding: '10px', width: '400px', fontSize: '16px' }} placeholder='Nhập số điện thoại...' type="text" />
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
                            <Button sx={{
                                backgroundColor: 'blue',
                                color: '#fff',
                                ':hover': {
                                    backgroundColor: 'blue',
                                }
                            }} autoFocus onClick={handleSetNewSupplier}>
                                Hủy
                            </Button>
                        </DialogActions>
                    </Box>
                </BootstrapDialog>) : <div></div>
            }
        </div>
    );
}

export default function DialogSupplier({ openDialog, getSupplierId }: { openDialog: any, getSupplierId: any }) {
    const [open, setOpen] = React.useState(false);
    const [newSupplier, setNewSupplier] = React.useState(0);
    const [listSuppliers, setListSuppliers] = React.useState([]);
    const [SupplierId, setSupplierId] = React.useState(null);

    const handleClose = () => {
        setOpen(false);
        setNewSupplier(0);
    };

    const handleGetAllSuppliers = async () => {
        try {
            const list = await getAllSuppliers();
            if (list.EC == 0) {
                setListSuppliers(list.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetSupplierId = (id: any) => {
        setSupplierId(id);
        setNewSupplier(2);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const result = await createSupplier({
                name: data.get('name'),
                email: data.get('email'),
                phone: data.get('phone'),
                address: data.get('address'),
            })

            if (result.EC == 0) {
                alert('Thêm nhà cung cấp thành công');
                handleGetAllSuppliers();
                setNewSupplier(1)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSetNewSupplier = () => {
        setNewSupplier(0);
    }


    React.useEffect(() => {
        if (openDialog > -1) {
            setOpen(true);
        }

        handleGetAllSuppliers();
    }, [openDialog, listSuppliers.length])

    if (newSupplier == 1) {
        // Thêm
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
                                <label style={{ marginBottom: '6px', fontSize: '16px' }} htmlFor="">Tên nhà cung cấp:</label>
                                <input name='name' style={{ padding: '10px', width: '400px', fontSize: '16px' }} placeholder='Nhập tên...' type="text" />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '10px'
                            }}>
                                <label style={{ marginBottom: '6px', fontSize: '16px' }} htmlFor="">Địa chỉ nhà cung cấp:</label>
                                <input name='address' style={{ padding: '10px', width: '400px', fontSize: '16px' }} placeholder='Nhập địa chỉ...' type="text" />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '10px'
                            }}>
                                <label style={{ marginBottom: '6px', fontSize: '16px' }} htmlFor="">Email cung cấp:</label>
                                <input name='email' style={{ padding: '10px', width: '400px', fontSize: '16px' }} placeholder='Nhập email...' type="text" />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '10px'
                            }}>
                                <label style={{ marginBottom: '6px', fontSize: '16px' }} htmlFor="">Số điện thoại:</label>
                                <input name='phone' style={{ padding: '10px', width: '400px', fontSize: '16px' }} placeholder='Nhập số điện thoại...' type="text" />
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
                            <Button type='submit' sx={{
                                backgroundColor: 'blue',
                                color: '#fff',
                                ':hover': {
                                    backgroundColor: 'blue',
                                }
                            }} autoFocus onClick={() => setNewSupplier(0)}>
                                Hủy
                            </Button>
                        </DialogActions>
                    </Box>
                </BootstrapDialog>

            </div>
        );
    } else if (newSupplier == 2) {
        // Cập nhật
        return < DialogUpdateSupplier handleGetAllSuppliers={handleGetAllSuppliers} handleSetNewSupplier={handleSetNewSupplier} openDialogUpdate={openDialog} SupplierId={SupplierId} />
    } else {
        // Mặc định
        return (
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
                                <SupplierContainer handleGetSupplierId={handleGetSupplierId} handleClose={handleClose} getSupplierId={getSupplierId} key={Supplier.id} Supplier={Supplier} />
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
                    }} autoFocus onClick={() => { setNewSupplier(1) }}>
                        Thêm nhà cung cấp mới
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        )
    }
}
