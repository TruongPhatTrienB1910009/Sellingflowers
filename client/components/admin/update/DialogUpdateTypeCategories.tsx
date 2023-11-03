import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { createCategory, createTypeCategory, getTypeCategory, updateTypeCategory } from '@/services/admin/adminProductsService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DialogUpdateTypeCategories({ openDialogType, handleGetAllTypesCategories, typeCategoryId }: any) {
    const [open, setOpen] = React.useState(false);
    const [typeCategory, setTypeCategory] = React.useState<any>(null);


    const handleChange = (e: any, data: any) => {
        switch (data.key) {
            case 'name':
                setTypeCategory({ ...typeCategory, name: e.target.value });
                break;
            case 'description':
                setTypeCategory({ ...typeCategory, description: e.target.value });
                break;
        }
    }

    const handleGetTypeCategory = async () => {
        try {
            const result = await getTypeCategory(typeCategoryId);
            if (result.EC == 0) {
                setTypeCategory(result.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const newTypeCategory = {
                name: data.get('name'),
                description: data.get('description')
            }

            const result = await updateTypeCategory(typeCategoryId, newTypeCategory);
            if(result.EC == 0) {
                alert("Cập nhật thành công");
                handleGetAllTypesCategories();
                handleClose();
            } 
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (openDialogType > -1) {
            setOpen(true);
            handleGetTypeCategory();
        }
    }, [openDialogType])

    return (
        <>
            {
                (typeCategory) ? (
                    <div>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <Box component={"form"} onSubmit={handleSubmit}>
                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                    THÔNG TIN NGÀNH HÀNG
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
                                        minWidth: '500px'
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginBottom: '16px'
                                        }}>
                                            <label htmlFor="name">Tên Ngành Hàng: </label>
                                            <input onChange={(e) => { handleChange(e, { key: 'name' }) }} value={typeCategory?.name} placeholder='Tên của ngành hàng...' style={{ padding: '8px', marginTop: '6px', fontSize: '16px' }} id='name' name='name' type="text" />
                                        </Box>
                                        <Box>
                                            <label htmlFor="description">Mô Tả: </label>
                                            <textarea onChange={(e) => { handleChange(e, { key: 'description' }) }} value={typeCategory?.description} placeholder='Một số mô tả về ngành hàng...' name="description" id="description" style={{ width: '100%', padding: '8px', marginTop: '6px', fontSize: '16px' }} rows={6}></textarea>
                                        </Box>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        sx={{
                                            backgroundColor: 'blue',
                                            color: 'white',
                                            ':hover': {
                                                backgroundColor: 'blue',
                                            }
                                        }}
                                        autoFocus
                                        type={"submit"}
                                    >
                                        Lưu Thay Đổi
                                    </Button>
                                </DialogActions>
                            </Box>
                        </BootstrapDialog>
                    </div>
                ) : (<div></div>)
            }
        </>
    );
}
