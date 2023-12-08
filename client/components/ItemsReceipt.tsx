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
import { VND } from '@/utils/VND';
import '@/styles/common/tableItems.css'
import { IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Column {
    id: 'name' | 'price' | 'total' | 'amount' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Sản Phẩm', minWidth: 170 },
    {
        id: 'price',
        label: 'Đơn Giá',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'total',
        label: 'Số Lượng',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'amount',
        label: 'Số tiền',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'action',
        label: 'Hành động',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];


export default function ItemsReceipt({ listItemsInCart, receipt }: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const router = useRouter();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        (listItemsInCart) ? (
            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '0px' }}>
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
                            {listItemsInCart
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                <img style={{ height: 'auto', maxWidth: '50px' }} src={`/${row?.img.slice(row?.img.indexOf('images'))}`} alt="" />
                                                <span style={{ marginLeft: '30px' }}>
                                                    {row.name}
                                                </span>
                                            </TableCell>
                                            <TableCell align='center'>
                                                {VND.format(row.price)}
                                            </TableCell>
                                            <TableCell align='center' className='inputBtnGroup'>
                                                {row.DetailBill.totalItems}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {VND.format(row.price * row.DetailBill.totalItems)}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Tooltip onClick={() => {router.push(`/account/feedback/${row.id}`)}} title="Đánh Giá" placement="top">
                                                    <IconButton disabled={receipt.BillStatus.statuscode != 2}>
                                                        <img style={{width: '24px'}} src="https://cdn-icons-png.flaticon.com/128/9592/9592955.png?uid=R100488832&ga=GA1.1.1538859696.1700853912&semt=ais" alt="" />
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
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    count={listItemsInCart.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        ) : ''
    );
}
