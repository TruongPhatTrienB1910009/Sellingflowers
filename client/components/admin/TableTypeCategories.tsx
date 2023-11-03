'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Tooltip } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import '@/styles/common/tableItems.css'
import DialogUpdateTypeCategories from './update/DialogUpdateTypeCategories';
import { deleteTypeCategory } from '@/services/admin/adminProductsService';

interface Column {
    id: 'name' | 'description' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Tên Ngành Hàng', minWidth: 170 },
    {
        id: 'description',
        label: 'Mô Tả',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: 'Hành Động',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    }
];


export default function TableTypeCaterories({ listTypeCategories, handleGetAllTypesCategories }: any) {
    const [page, setPage] = React.useState(0);
    const [openDialogType, setOpenDialogType] = React.useState(-1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [typeCategoryId, setTypeCategoryId] = React.useState(null);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenDialog = async (id: any) => {
        try {
            setTypeCategoryId(id);
            setOpenDialogType(openDialogType + 1);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteTypeCategory = async (id: any) => {
        try {
            console.log(id);
            const result = await deleteTypeCategory(id);
            if (result.EC == 0) {
                alert("Xóa thành công");
                handleGetAllTypesCategories();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        (listTypeCategories) ? (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listTypeCategories
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                {row.description}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Tooltip title="Chỉnh Sửa" placement="top">
                                                    <IconButton onClick={() => { handleOpenDialog(row.id) }}>
                                                        <BorderColorIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip onClick={() => {handleDeleteTypeCategory(row.id)}} title="Xóa" placement="top">
                                                    <IconButton>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={listTypeCategories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <DialogUpdateTypeCategories handleGetAllTypesCategories={handleGetAllTypesCategories} typeCategoryId={typeCategoryId} openDialogType={openDialogType} />
            </Paper>
        ) : <Box></Box>
    );
}
