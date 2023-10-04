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
import { Checkbox, IconButton, Tooltip } from '@mui/material';
import { VND } from '@/app/utils/VND';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density' | 'density2';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Sản Phẩm', minWidth: 170 },
  { id: 'code', label: 'Hình Ảnh', minWidth: 100 },
  {
    id: 'population',
    label: 'Đơn Giá',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Số Lượng',
    minWidth: 170,
    align: 'right',
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


export default function TableItems({ listItemsInCart }: any) {
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
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>
                      <Checkbox /> {row.name}
                    </TableCell>
                    <TableCell>
                      <img style={{ height: 'auto', maxWidth: '50px' }} src={row?.img.slice(row?.img.indexOf('images'))} alt="" />
                    </TableCell>
                    <TableCell align='right'>
                      {VND.format(row.price)}
                    </TableCell>
                    <TableCell align='right'>
                      {row.DetailBill.totalItems}
                    </TableCell>
                    <TableCell align='right'>
                      {VND.format(row.price * row.DetailBill.totalItems)}
                    </TableCell>
                    <TableCell align='right'>
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
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={listItemsInCart.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
