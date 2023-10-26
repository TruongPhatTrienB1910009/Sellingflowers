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
import { Checkbox } from '@mui/material';
import { VND } from '@/utils/VND';
import '@/styles/common/tableItems.css'

interface Column {
    id: 'name' | 'img' | 'price' | 'inventory';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Sản Phẩm', minWidth: 120 },
    {
        id: 'img',
        label: 'Hình Ảnh',
        minWidth: 100,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Giá bán',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'inventory',
        label: 'Tồn kho',
        minWidth: 100,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
];


export default function TableItemsUpdate({ listItems, checkedState, handleAddItemToUpdate }: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        (checkedState && listItems) ? (
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
                            {listItems
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={checkedState[index]}
                                                    onChange={() => {  handleAddItemToUpdate({position: index}) }}
                                                /> {row.name}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <img style={{ height: 'auto', maxWidth: '50px' }} src={`/${row?.img.slice(row?.img.indexOf('images'))}`} alt="" />
                                            </TableCell>
                                            <TableCell align='center'>
                                                {VND.format(row.price)}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.inventory}
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
                    count={listItems.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        ) : ''
    );
}
