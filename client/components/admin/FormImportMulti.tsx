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
import { Box, Button, Checkbox } from '@mui/material';
import { VND } from '@/utils/VND';
import '@/styles/common/tableItems.css'
import SupplierComponent from './SupplierComponent';
import { createMultipleImportBill } from '@/services/admin/adminProductsService';

interface Column {
    id: 'name' | 'total' | 'price' | 'inventory';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Sản Phẩm', minWidth: 120 },
    {
        id: 'total',
        label: 'Số lượng nhập',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'price',
        label: 'Giá nhập',
        minWidth: 170,
        align: 'center',
    },
];

const SupplierComponnetForMulti = ({ supplierId, getSupplierId }: any) => {
    return (
        <Box sx={{
            padding: '10px',
            backgroundColor: 'white',
            marginTop: '10px',
            borderRadius: '10px',
        }}>
            <SupplierComponent getSupplierId={getSupplierId} supplierId={supplierId} />
        </Box>
    )
}


export default function FormImportMulti({ listUpdate }: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [supplierId, setSupplierId] = React.useState<any>(null);

    const getSupplierId = (id: any) => {
        setSupplierId(id);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const form = new FormData(event.currentTarget);

            let listTotalItems: any = [];
            let listPriceItem: any = [];

            const listItems = listUpdate.map((item: any, index: number) => {
                listTotalItems.push(Number(form.get(`totalItems-${index + 1}`)));
                listPriceItem.push(Number(form.get(`priceItem-${index + 1}`)));
                return item.id;
            })

            const data = JSON.stringify({
                listItems: listItems,
                listTotalItems: listTotalItems,
                listPriceItem: listPriceItem,
                supplierId: supplierId
            })

            const result = await createMultipleImportBill(data);
            if(result.EC == 0) {
                location.href = "http://localhost:3001/dashboard/products/list"
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Box component={"form"} onSubmit={handleSubmit}>
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
                            {listUpdate
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    align: 'center',
                                                }}>
                                                    <img style={{ height: 'auto', maxWidth: '50px' }} src={`/${row?.img.slice(row?.img.indexOf('images'))}`} alt="" />
                                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}>
                                                        {row.name}
                                                    </span>
                                                </Box>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <input style={{ padding: '8px', fontSize: '14px' }} type="number" name={`totalItems-${index + 1}`}/>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <input style={{ padding: '8px', fontSize: '14px' }} type="number" name={`priceItem-${index + 1}`}/>
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
                    count={listUpdate.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <SupplierComponnetForMulti supplierId={supplierId} getSupplierId={getSupplierId} />

            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Button
                    type='submit'
                    sx={{
                        padding: '10px',
                        backgroundColor: 'blue',
                        color: 'white',
                        marginTop: '10px',
                        ':hover' : {
                            backgroundColor: 'blue',
                            color: 'white',
                        }
                    }}
                >
                    Lưu thay đổi
                </Button>
            </Box>

        </Box>
    );
}
