// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import StepPersonalDetails from 'src/views/pages/home/PersonalStep'
import CompeleteStep from 'src/views/pages/home/CompeleteStep'
import EducationStep from 'src/views/pages/home/EducationStep'
import { useContext, useEffect } from 'react'
import UserContext from 'src/@core/context/userContext'

const Home = ({ datas }: any) => {
  const { data, setData, activeStep, setActiveStep } = useContext<any>(UserContext);
  console.log(datas)
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
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
  console.log(data)

  return (
    <Grid container spacing={6}  >
      <Grid item xs={12} mb={52}>
        <StepPersonalDetails onNext={handleNext} />
        <CompeleteStep onNext={handleNext} />
        <EducationStep onNext={handleNext} />
        {/* {activeStep ===4 && (
          <Typography>{'اطلاعات شما ثبت شد'}</Typography>
        )} */}
      </Grid>
    </Grid>
  )
}

export default Home
