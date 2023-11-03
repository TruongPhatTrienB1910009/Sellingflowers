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
import { createCategory, getCategory, updateCategory } from '@/services/admin/adminProductsService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DialogUpdateCategory({ openDialogCategory, listTypeCategories, handleGetAllCategories, categoryId }: any) {
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = React.useState<any>(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleGetCategory = async () => {
        try {
            const result = await getCategory(categoryId);
            if (result.EC == 0) {
                setCategory(result.DT);
                console.log(result.DT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: any, data: any) => {
        switch (data.key) {
            case 'name':
                setCategory({ ...category, name: e.target.value });
                break;
            case 'description':
                setCategory({ ...category, description: e.target.value });
                break;
        }
    }

    const handleChangeSelect = (e: any) => {
        setCategory({ ...category, TypeCategoryId: e.target.value});
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const newCategory = {
                name: data.get('name'),
                description: data.get('description'),
                TypeCategoryId: data.get('TypeCategoryId')
            }

            const result = await updateCategory(category.id, newCategory);
            if(result.EC == 0) {
                alert("Cập nhật thành công");
                handleGetAllCategories();
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (openDialogCategory > -1) {
            setOpen(true);
            handleGetCategory();
        }
    }, [openDialogCategory])

    return (
        <>
            {
                (category != null) ? (
                    <div>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <Box component={"form"} onSubmit={handleSubmit}>
                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                    THÔNG TIN DANH MỤC
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
                                            <label htmlFor="TypeCategoryId">Thuộc ngành hàng: </label>
                                            <select onChange={(e) => {handleChangeSelect(e)}} value={category.TypeCategoryId} name="TypeCategoryId" id="TypeCategoryId" style={{ padding: '8px', marginTop: '6px', fontSize: '16px' }}>
                                                {
                                                    listTypeCategories.map((typecategory: any, index: number) => {
                                                        return (
                                                            <option key={typecategory.id} value={typecategory.id}>
                                                                {typecategory.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginBottom: '16px'
                                        }}>
                                            <label htmlFor="name">Tên Danh Mục: </label>
                                            <input onChange={(e) => { handleChange(e, { key: 'name' }) }} value={category.name} placeholder='Tên của danh mục...' style={{ padding: '8px', marginTop: '6px', fontSize: '16px' }} id='name' name='name' type="text" />
                                        </Box>
                                        <Box>
                                            <label htmlFor="description">Mô Tả: </label>
                                            <textarea onChange={(e) => { handleChange(e, { key: 'description' }) }} value={category.description} placeholder='Một số mô tả về danh mục...' name="description" id="description" style={{ width: '100%', padding: '8px', marginTop: '6px', fontSize: '16px' }} rows={6}></textarea>
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
