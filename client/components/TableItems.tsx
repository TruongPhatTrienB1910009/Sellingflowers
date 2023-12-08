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
import { Button, ButtonGroup, Checkbox, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { VND } from '@/utils/VND';
import '@/styles/common/tableItems.css'

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density' | 'density2';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Sản Phẩm', minWidth: 170 },
    { id: 'code', label: 'Hình Ảnh', minWidth: 100 },
    {
        id: 'population',
        label: 'Đơn Giá',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Số Lượng',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Số tiền',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'density2',
        label: 'Thao Tác',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];


export default function TableItems({ listItemsInCart, checkedState, handleAddItemToCheckout, handleUpdateTotalsItem, handleRemoveItemInCart }: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const preventNegativeValues = (e: any) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        (checkedState && listItemsInCart) ? (
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
                            {listItemsInCart
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={checkedState[index]}
                                                    onChange={() => { handleAddItemToCheckout({ position: index }) }}
                                                /> {row.name}
                                            </TableCell>
                                            <TableCell>
                                                <img style={{ height: 'auto', maxWidth: '50px' }} src={row?.img.slice(row?.img.indexOf('images'))} alt="" />
                                            </TableCell>
                                            <TableCell align='center'>
                                                {VND.format(row.price)}
                                            </TableCell>
                                            <TableCell align='center' className='inputBtnGroup'>
                                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                                    <Button onClick={(event) => { if (row.DetailBill.totalItems > 1) handleUpdateTotalsItem(event, { id: index, totalItems: row.DetailBill.totalItems - 1 }) }}>
                                                        <RemoveIcon />
                                                    </Button>
                                                    <Button>
                                                        <input type="number" value={row.DetailBill.totalItems} onKeyDown={preventNegativeValues} onChange={(event) => { handleUpdateTotalsItem(event, { id: index }) }} />
                                                    </Button>
                                                    <Button onClick={(event) => { 
                                                        console.log(row.DetailBill.totalItems)
                                                        console.log(row.inventory)
                                                        if(row.DetailBill.totalItems + 1 <= row.inventory) {
                                                            handleUpdateTotalsItem(event, { id: index, totalItems: row.DetailBill.totalItems + 1 })
                                                        } else {
                                                            alert("Đã hết sản phẩm trong kho")
                                                        }
                                                     }}>
                                                        <AddIcon />
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                            <TableCell align='right'>
                                                {VND.format(row.price * row.DetailBill.totalItems)}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Tooltip onClick={() => {handleRemoveItemInCart({ProductId: row.id})}} title="Xóa" placement="top">
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
