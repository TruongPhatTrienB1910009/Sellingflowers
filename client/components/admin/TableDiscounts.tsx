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
import { Box, IconButton, Tooltip } from '@mui/material';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { VND } from '@/utils/VND';
import '@/styles/common/tableItems.css'
import Link from 'next/link';
import { convertDatetimeLocal } from '@/utils/dateConvert';
import { Delete, DeleteOutline } from '@mui/icons-material';
import { deleteDiscountById } from '@/services/discountService';

interface Column {
    id: 'id' | 'code' | 'total' | 'amount' | 'start' | 'end' | 'used' | 'description' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'STT', minWidth: 30 },
    { id: 'code', label: 'Mã Giảm', minWidth: 70 },
    {
        id: 'total',
        label: 'Đã Dùng',
        minWidth: 70,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'amount',
        label: 'Giá Trị',
        minWidth: 100,
        align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'start',
        label: 'Bắt Đầu',
        minWidth: 70,
        align: 'center',
    },
    {
        id: 'end',
        label: 'Kết Thúc',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'description',
        label: 'Nội Dung',
        minWidth: 200,
        align: 'center',
    },
    {
        id: 'actions',
        label: 'Hành Động',
        minWidth: 170,
        align: 'center',
    },
];


export default function TableDiscounts({ listDiscounts, handleGetAllDiscounts }: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    console.log(listDiscounts);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDeleteDiscount = async (id: any) => {
        try {
            const result = await deleteDiscountById(id);
            if (result.EC == 0) {
                alert("Đã xóa");
                handleGetAllDiscounts();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        (listDiscounts) ? (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 800 }}>
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
                            {listDiscounts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.code}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {`${row.applied}/${row.total}`}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {VND.format(row.amount)}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {convertDatetimeLocal(row.start)}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {convertDatetimeLocal(row.end)}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.description}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Tooltip title="Xóa" placement="top">
                                                    <IconButton onClick={() => handleDeleteDiscount(row.id)}>
                                                        <Delete />
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
                    count={listDiscounts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        ) : ''
    );
}
