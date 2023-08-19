// Table.js
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Collapse, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function CustomTable({ columns, rows, onDelete, data }: any) {
    const [selectedRow, setSelectedRow] = useState<any>();
    function handleRowClick(row: any) {
        console.log(row); // clicked row
    }

    const [expandedRowId, setExpandedRowId] = useState(null);

    const toggleDetails = (rowId: any) => {
        setExpandedRowId((prevRowId) => (prevRowId === rowId ? null : rowId));
    };
    return (
        <TableContainer component={Paper}>
            <Table border={1} sx={{ border: '1px solid lightgrey' }}>
                <TableHead>
                    <TableRow>
                        {columns?.map((column: any) => (
                            <TableCell key={column.field} id={column.id} align='right'>
                                {column.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows?.map((row: any, index: any) => (
                        <React.Fragment key={row.id}>
                            <TableRow selected={selectedRow === row} onClick={() => { toggleDetails(row.id); setSelectedRow(row); console.log(row, expandedRowId) }}  >
                                {columns?.map((column: any) => (
                                    <TableCell key={column.field} id={row.id} align='right' onClick={() => { handleRowClick(row) }}>
                                        {row[column?.field]}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {/* <TableRow>
                                <Collapse in={expandedRowId === row.id}>
                                    <Typography>{row}</Typography>
                                </Collapse>
                            </TableRow> */}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            {/* {selectedRow && <RowDetails row={selectedRow} />} */}
        </TableContainer >
    );
}