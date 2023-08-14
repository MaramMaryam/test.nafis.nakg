// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import StepPersonalDetails from 'src/views/pages/home/PersonalStep'
import CompeleteStep from 'src/views/pages/home/CompeleteStep'
import EducationStep from 'src/views/pages/home/EducationStep'

const Home = () => {
  return (
    <Grid container spacing={6}  >
      <Grid item xs={12} mb={52}>
        <StepPersonalDetails />
        <CompeleteStep />
        <EducationStep />
      </Grid> 
    </Grid>
  )
}

export default Home
