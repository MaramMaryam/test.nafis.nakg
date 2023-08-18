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

  const rowpersonals = data?.data
  console.log(rowpersonals)
  const userIds = rowpersonals?.map((itms: any) => itms.userId)
  console.log(userIds,)

  const rowss: any = data?.data?.map((item: any) => {
    return {
      id: item._id,
      userId: item.userId,
      steps: item.step2,
      step0: item.step2.step0,
      step1: item.step2?.step1?.map((s1: any) => s1),
      step2: item.step2?.step2?.map((s2: any) => s2),
      // other row data  
    };
  });
  console.log(rowss?.map((item: any) => item.step0))
  const flats = rowss?.flat()
  const s0 = flats?.map((item: any) => item.step0)
  const s1 = flats?.map((item: any) => item.step1).flat()
  const s2 = flats?.map((item: any) => item.step2).flat()
  console.log(flats, s0, s1, s2)

  const coledu = [
    { field: 'grade', headerName: 'سطح', width: 110 },
    { field: 'field', headerName: 'رشته', width: 110 },
    { field: 'fromDate', headerName: 'از', width: 110 },
    { field: 'tomDate', headerName: 'تا', width: 110 },
    { field: 'score', headerName: 'معدل', width: 110 },
    // {
    //   field: 'action',
    //   headerName: 'عملیات',
    // },
  ];

  const colcontact = [
    { field: 'name', headerName: 'نام', width: 110 },
    { field: 'job', headerName: 'شغل', width: 110 },
    { field: 'nesbat', headerName: 'نسبت', width: 110 },
    { field: 'address', headerName: 'آدرس', width: 110 },
    { field: 'tel', headerName: 'شماره تلفن', width: 110 },
    // {
    //   field: 'action',
    //   headerName: 'عملیات',
    // },
  ];
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

  return (
    <Grid container spacing={6} >
      <Grid item xs={12} mb={5}>
        <Card>
          <CustomTable columns={colpersonal} rows={s0} />
        </Card>
      </Grid>
      <Grid item xs={12} mb={5}>
        <CustomTable columns={colcontact} rows={s1} />
      </Grid>
      <Grid item xs={12} mb={5}>
        <CustomTable columns={coledu} rows={s2} />
      </Grid>
    </Grid>
  )
}

export default UserInfo
