// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import StepPersonalDetails from 'src/views/pages/home/PersonalStep'
import CompeleteStep from 'src/views/pages/home/CompeleteStep'
import EducationStep from 'src/views/pages/home/EducationStep'
import { useContext, useEffect } from 'react'
import UserContext from 'src/@core/context/userContext'

const Home = ({ props }: any) => {
  const { data, setData, activeStep, setActiveStep } = useContext<any>(UserContext);
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
        <CompeleteStep />
        <EducationStep />
      </Grid>
    </Grid>
  )
}

export default Home
