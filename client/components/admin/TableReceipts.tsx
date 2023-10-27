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

interface Column {
    id: 'id' | 'products' | 'total' | 'status' | 'billstatus' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'STT', minWidth: 30 },
    { id: 'products', label: 'Sản Phẩm', minWidth: 170 },
    {
        id: 'total',
        label: 'Thành Tiền',
        minWidth: 100,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'status',
        label: 'Thanh Toán',
        minWidth: 100,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'billstatus',
        label: 'Trạng Thái',
        minWidth: 70,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'actions',
        label: 'Hành Động',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
];


export default function TableReceipts({ listReceipts }: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        (listReceipts) ? (
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
                            {listReceipts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '6px'
                                                }}>
                                                    {
                                                        row.Products.map((product: any, index: number) => {
                                                            return (
                                                                <Box key={product.id}>
                                                                    <Box sx={{
                                                                        display: 'flex'
                                                                    }}>
                                                                        <img style={{ height: 'auto', maxWidth: '50px' }} src={`/${product?.img.slice(product?.img.indexOf('images'))}`} alt="" />
                                                                        <span style={{ display: 'flex', alignItems: 'center', marginLeft: '6px' }}>{product.name} x{product.DetailBill.totalItems}</span>
                                                                    </Box>
                                                                </Box>
                                                            )
                                                        })
                                                    }
                                                </Box>
                                            </TableCell>
                                            <TableCell align='center'>
                                                {VND.format(row.totalprice + row.deliveryfee)}
                                            </TableCell>
                                            <TableCell align='center' className='inputBtnGroup'>
                                                {(row.state) ? ('Đã Thanh Toán') : ('Chưa Thanh Toán')}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.BillStatus.detail}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Tooltip title="Xem Chi Tiết" placement="top">
                                                    <Link href={`/dashboard/receipts/details/${row.id}`}>
                                                        <IconButton>
                                                            <FindInPageIcon />
                                                        </IconButton>
                                                    </Link>
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
                    count={listReceipts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        ) : ''
    );
}
