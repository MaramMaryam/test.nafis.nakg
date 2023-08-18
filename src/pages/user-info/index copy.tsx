// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { useContext, useEffect } from 'react'
import UserContext from 'src/@core/context/userContext'
import { DataGrid, GridColDef, GridRowId, GridRowsProp } from '@mui/x-data-grid'
import { IconButton, Tooltip, Typography, Box } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomTable from 'src/@core/components/tables/BasicTables'


const UserInfo = ({ datas, row }: any) => {
  const { data, setData, activeStep, setActiveStep } = useContext<any>(UserContext);
  console.log(row)

  useEffect(() => {
    async function getApiData() {
      const res = await fetch('/api/getInfos', { method: 'GET' });
      const data = await res.json();
      if (data) {
        setData((prev: any) => ({ ...prev, data: data }));
      }
      console.log(data)
    }

    getApiData();
  }, [setData]);

  console.log(data?.data, data?.data?.map((item: any) => (item?.step2?.step1).map((it: any) => it.name)))
  const rowpersonals = data?.data?.map((item: any) => item?.step2?.step0)
  console.log(rowpersonals?.id)
  const ifData = data?.data?.map((item: any) => item?.step2)
  console.log(ifData)
  const rowContanct: any = data?.data?.map((item: any) => { return item?.step2?.step1 })
  const rowEdu: any = data?.data?.map((item: any) => { return item?.step2?.step2 })
  console.log(rowContanct, rowEdu)
  console.log(rowEdu)

  const rowContancts: any = rowContanct?.map((subArray: any) => {
    return subArray.map((item: any) => {
      return {
        id: item.id,
        name: item?.name
      }
      // <div key={item.id}>{item.id}</div>; 
    });
  });
  console.log(rowContancts)
  // const rowContancts = rowContanct?.map((item: any) => {
  //   return {
  //     // id: item.id,
  //     name: item?.name
  //   }
  // })
  const colpersonal = [
    { field: `firstName`, headerName: 'نام', width: 110 },
    { field: 'lastName', headerName: 'نام خانوادگی', width: 110 },
    { field: 'email', headerName: 'ایمیل', width: 110 },
    { field: 'code', headerName: 'کدملی', width: 110 },
    { field: 'bitrthDate', headerName: 'تاریخ تولد', width: 110 },
    {
      field: 'action',
      headerName: 'عملیات',
    },
  ];

  const defaultColumns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'name',
      minWidth: 100,
      headerName: 'name',
      renderCell: ({ row }: any) => (
        // <Typography component={LinkStyled} href={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</Typography>
        <Typography>{row.name}</Typography>
      )
    },
  ]
  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete Invoice'>
            <IconButton size='small' sx={{ color: 'text.secondary' }} >
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View'>
            <IconButton
              size='small'
              component={Link}
              sx={{ color: 'text.secondary' }}
              href={`/apps/invoice/preview/${row.id}`}
            >
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'Download',
                icon: <Icon icon='tabler:download' fontSize={20} />
              },
              {
                text: 'Edit',
                href: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon='tabler:edit' fontSize={20} />
              },
              {
                text: 'Duplicate',
                icon: <Icon icon='tabler:copy' fontSize={20} />
              }
            ]}
          />
        </Box>
      )
    }
  ]
  return (
    <Grid container spacing={6} >
      <Grid item xs={12} mb={5}>
        <CustomTable columns={colpersonal} rows={rowpersonals} />
      </Grid>
      <Grid item xs={12} mb={52}>
        <DataGrid
          autoHeight
          pagination
          rowHeight={62}
          rows={[]}
          columns={columns}
        // checkboxSelection
        // disableRowSelectionOnClick
        // pageSizeOptions={[10, 25, 50]}
        // columns={[]}
        // rows={[]}
        // paginationModel={paginationModel}
        // onPaginationModelChange={setPaginationModel}
        // onRowSelectionModelChange={rows => setSelectedRows(rows)}
        />
      </Grid>
    </Grid>
  )
}

export default UserInfo
