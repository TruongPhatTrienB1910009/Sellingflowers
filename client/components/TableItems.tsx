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

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
  density2: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
  density2: number
): Data {
  const density = population / size;
  return { name, code, population, size, density, density2 };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263, 1),
  createData('China', 'CN', 1403500365, 9596961, 1),
  createData('Italy', 'IT', 60483973, 301340, 1),
  createData('United States', 'US', 327167434, 9833520, 1),
  createData('Canada', 'CA', 37602103, 9984670, 1),
  createData('Australia', 'AU', 25475400, 7692024, 1),
  createData('Germany', 'DE', 83019200, 357578, 1),
  createData('Ireland', 'IE', 4857000, 70273, 1),
  createData('Mexico', 'MX', 126577691, 1972550, 1),
  createData('Japan', 'JP', 126317000, 377973, 1),
  createData('France', 'FR', 67022000, 640679, 1),
  createData('United Kingdom', 'GB', 67545757, 242495, 1),
  createData('Russia', 'RU', 146793744, 17098246, 1),
  createData('Nigeria', 'NG', 200962417, 923768, 1),
  createData('Brazil', 'BR', 210147125, 8515767, 1),
];

export default function TableItems() {
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell>
                        <DeleteIcon />
                    </TableCell>
                    <TableCell>
                        <DeleteIcon />
                    </TableCell>
                    <TableCell align='right'>
                        <DeleteIcon />
                    </TableCell>
                    <TableCell align='right'>
                        <DeleteIcon />
                    </TableCell>
                    <TableCell align='right'>
                        <DeleteIcon />
                    </TableCell>
                    <TableCell align='right'>
                        <DeleteIcon />
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
