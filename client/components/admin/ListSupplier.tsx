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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { VND } from '@/utils/VND';
import '@/styles/common/tableItems.css'
import DialogUpdateSupplier from './update/DialogUpdateSupplier';
import { getSupplierById } from '@/services/admin/adminProductsService';

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Tên', minWidth: 170 },
    { id: 'code', label: 'Địa chỉ', minWidth: 100 },
    {
        id: 'population',
        label: 'Email',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Số điện thoại',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Thao Tác',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
];


export default function ListSupplier({ listSuppliers }: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openDialogUpdate, setOpenDialogUpdate] = React.useState(-1);
    const [Supplier, setSupplier] = React.useState(null);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleGetSupplierById = async (id: any) => {
        try {
            const result = await getSupplierById(id);
            if(result.EC == 0) {
                setSupplier(result.DT);
                if(Supplier != null) {
                    setOpenDialogUpdate(openDialogUpdate + 1);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {

    }, [])

    return (
        (listSuppliers) ? (
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
                            {listSuppliers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell>
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                {row.address}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.email}
                                            </TableCell>
                                            <TableCell align='center' className='inputBtnGroup'>
                                                {row.phone}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Tooltip title="Chỉnh Sửa" placement="top">
                                                    <IconButton onClick={() => {handleGetSupplierById(row.id)}}>
                                                        <BorderColorIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa" placement="top">
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
                    count={listSuppliers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <DialogUpdateSupplier Supplier={Supplier} openDialogUpdate={openDialogUpdate} />
            </Paper>
        ) : ''
    );
}
