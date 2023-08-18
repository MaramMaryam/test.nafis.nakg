// Table.js
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Collapse, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function MapTable({ columns, onDelete, data }: any) {
    const [selectedRow, setSelectedRow] = useState<any>();
    function handleRowClick(row: any) {
        console.log(row); // clicked row
    }
    function RowDetails({ selectedRow }: any) {
        return (
            <>
                Email: {selectedRow.email}

                {selectedRow.step1.map((item: any) => (
                    <div>{item.name}</div>
                ))}</>
        );
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
                    {data.map((row: any) => (
                        <TableRow onClick={() => setSelectedRow(row)}>
                            {row.map((cell: any) => (
                                <TableCell>{row[cell?.field]}</TableCell>
                            ))}
                        </TableRow>
                    ))}


                </TableBody>
            </Table>
            {selectedRow && <RowDetails row={selectedRow} />}
        </TableContainer >
    );
}