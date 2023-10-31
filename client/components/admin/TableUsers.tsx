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
import { Button, ButtonGroup, Checkbox, IconButton, Tooltip } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { VND } from '@/utils/VND';
import '@/styles/common/tableItems.css'
import { deleteProduct } from '@/services/admin/adminProductsService';
import Link from 'next/link';

interface Column {
    id: 'name' | 'email' | 'phone' | 'gender' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Họ Tên', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    {
        id: 'phone',
        label: 'Điện Thoại',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'gender',
        label: 'Giới Tính',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'actions',
        label: 'Hành Động',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
];


export default function TableUsers({ listUsers, handleGetAllProducts }: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    console.log(listUsers)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        (listUsers) ? (
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
                            {listUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                {row.email}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.phone}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {
                                                    (row.gender == 1) ? ('Nam') : ('Nữ')
                                                }
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Link href={`/dashboard/users/${row.id}`}>
                                                    <Tooltip title="Xem Chi Tiết" placement="top">
                                                        <IconButton>
                                                            <FindInPageIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
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
                    count={listUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        ) : ''
    );
}
