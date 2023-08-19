// Table.js
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Collapse, Typography, Grid, IconButton, } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

export default function MapTable({ columns, onDelete, data }: any) {
    const [selectedRow, setSelectedRow] = useState<any>();
    function handleRowClick(row: any) {
        console.log(row?.step1, row?.id); // clicked row
    }
    console.log(data, data?.map((ite: any) => ite?.step0))
    function RowDetails({ selectedRow }: any) {
        console.log(selectedRow?.step1)
        return (
            <>
                <Typography fontWeight={'bold'} fontSize={16} py={2}>{'اطلاعات تکمیلی'}</Typography>
                {selectedRow?.step1?.map((item: any) => (
                    <Box sx={{ padding: 2 }}>
                        <Grid container spacing={20} sx={{ display: 'flex' }}>
                            <Grid item xs={4} mb={2}>
                                <Typography>نام:{item.name}</Typography>
                            </Grid>
                            <Grid item xs={4} mb={2}>
                                <Typography>نسبت:{item.nesbat}</Typography>
                            </Grid>
                            <Grid item xs={4} mb={2}>
                                <Typography>شغل:{item.job}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                ))}

                <Typography fontWeight={'bold'} fontSize={16} py={2}>{'اطلاعات تحصیلی'}</Typography>
                {selectedRow?.step2?.map((item: any) => (
                    <Box sx={{ padding: 2 }}>
                        <Grid container spacing={20} sx={{ display: 'flex' }}>
                            <Grid item xs={4} mb={2}>
                                <Typography>رشته:{item.field}</Typography>
                            </Grid>
                            <Grid item xs={4} mb={2}>
                                <Typography>سطح:{item.grade ?? '-'}</Typography>
                            </Grid>
                            <Grid item xs={4} mb={2}>
                                <Typography>معدل:{item.score ? item.score : '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </>
        );
    }
    const [expandedRowId, setExpandedRowId] = useState(false);

    const toggleDetails = (rowId: any) => {
        setExpandedRowId((prevRowId) => (prevRowId === rowId ? false : rowId));
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
                    {data?.map((row: any) => (
                        <React.Fragment key={row.id}>
                            <TableRow onClick={() => { handleRowClick(row); setSelectedRow(row); toggleDetails(row.id) }} selected={selectedRow === row}>
                                {columns?.map((column: any) => (<>
                                    <TableCell key={column.field} id={row.id} align='right' >
                                        {row?.step0[column?.field]}
                                    </TableCell>
                                </>
                                ))}
                            </TableRow>
                            <TableRow >
                                <TableCell align='right' colSpan={5} sx={{ py: '0 !important' }} scope='row'>
                                    <Collapse in={expandedRowId === row.id}>
                                        {selectedRow && <RowDetails selectedRow={selectedRow} />}
                                    </Collapse></TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}