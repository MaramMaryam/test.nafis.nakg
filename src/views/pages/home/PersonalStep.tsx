import { useState, ChangeEvent, useEffect, useMemo, useContext, SyntheticEvent } from 'react'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material/Select'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import RHFTextField from 'src/@core/components/hook-form/RHFTextField'
import UserContext from 'src/@core/context/userContext'
import FormProvider from 'src/@core/components/hook-form/FormProvider'
import RHFSelect from 'src/@core/components/hook-form/RHFSelect'
import { styled } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'

const StepPersonalDetails = ({ steps, isEdit, isLoading, onNext }: any,) => {
    const maritalStatusArray = ['مجرد', 'متاهل', 'متارکه']
    const housingStatusArray = ['استیجاری', 'شخصی']
    const [maritalStatus, setMaritalStatus] = useState<string[]>([])
    const [housingStatus, setHousingStatus] = useState<string[]>([])
    const { data, setData, } = useContext<any>(UserContext);
    console.log(data?.data?.step0, data?.data?.step0?.email)
    const showErrors = (field: string, valueLen: number, min: number) => {
        if (valueLen === 0) {
            return `${field} field is required`
        } else if (valueLen > 0 && valueLen < min) {
            return `${field} must be at least ${min} characters`
        } else {
            return ''
        }
    }

    const schema = yup.object().shape({
        firstName: yup
            .string()
            .min(4, obj => showErrors('firstName', obj.value.length, obj.min))
            .required(),
        lastName: yup
            .string()
            .min(4, obj => showErrors('lastName', obj.value.length, obj.min))
            .required(),
        email: yup.string().email().required(),
    })
    const handleChange = (event: SelectChangeEvent<typeof maritalStatus>) => {
        const {
            target: { value }
        } = event
        setMaritalStatus(typeof value === 'string' ? value.split(',') : value)
    }
    const last_update = new Date()
    let i = 0
    const defaultValues = useMemo(
        () => ({
            last_update,
            id: i,
            email: data?.data?.step0?.email ?? '',
            lastName: data?.data?.step0?.lastName ?? '',
            firstName: data?.data?.step0?.firstName ?? '',
            code: data?.data?.step0?.code ?? '',
            bitrthDate: data?.data?.step0?.bitrthDate ?? '',
        }),
        [data?.data || data?.data?.step0]
    );

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const {
        handleSubmit, control,
        formState: { isSubmitting, errors },
    } = methods

    const onSubmit = async (personalData: any) => {
        console.log(personalData)
        personalData.id = i + 1;
        try {
            // const res = await fetch("/api/infos", {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         step: 0,
            //         data: personalData
            //     }),
            // })
            setData((prev: any) => ({
                ...prev, ...data,
                step: 0,
                step0: personalData,
                last_update,
            }))
            setExpanded(false)
            onNext()
            toast.success('اطلاعات با موفقیت ثبت شد')
        } catch (error) {
            console.error('اطلاعات ثبت نشد', error);
        }
    };
    const renderFooter = () => {

        return (
            <Box sx={{ mt: 6, display: 'flex', flexDirection: 'row-reverse' }}>
                <Button type='submit'
                    variant='contained'
                    color={'primary'}
                    startIcon={
                        <Icon style={{ marginLeft: 6 }}
                            icon={
                                'tabler:arrow-right'
                            }
                        />
                    }
                >
                    {'Next'}
                </Button>
            </Box>
        )
    }

    // Styled component for Accordion component
    const Accordion = styled(MuiAccordion)<AccordionProps>(({ theme }) => ({
        margin: 0,
        borderRadius: 0,
        boxShadow: 'none !important',
        border:
            theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
        '&:not(:last-of-type), &:last-child .MuiAccordionSummary-root:not(.Mui-expanded)': {
            borderBottom: 0
        },
        '&:before': {
            display: 'none'
        },
        '&.Mui-expanded': {
            margin: 'auto'
        },
        '&:first-of-type': {
            '& .MuiButtonBase-root': {
                borderTopLeftRadius: theme.shape.borderRadius,
                borderTopRightRadius: theme.shape.borderRadius
            }
        },
        '&:last-of-type': {
            '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
                borderBottomLeftRadius: theme.shape.borderRadius,
                borderBottomRightRadius: theme.shape.borderRadius
            }
        }
    }))

    // Styled component for AccordionSummary component
    const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(({ theme }) => ({
        marginBottom: -1,
        padding: theme.spacing(0, 4),
        minHeight: theme.spacing(12),
        transition: 'min-height 0.15s ease-in-out',
        backgroundColor: theme.palette.action[theme.palette.mode === 'light' ? 'hover' : 'selected'],
        borderBottom:
            theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
        '&.Mui-expanded': {
            minHeight: theme.spacing(12)
        },
        '& .MuiAccordionSummary-content': {
            alignItems: 'center',
            '&.Mui-expanded': {
                margin: '13px 0'
            }
        },
        '& .MuiTypography-root': {
            fontWeight: 400
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
            color: theme.palette.text.secondary
        }
    }))

    // Styled component for AccordionDetails component
    const AccordionDetails = styled(MuiAccordionDetails)<AccordionDetailsProps>(({ theme }) => ({
        padding: `${theme.spacing(4)} !important`
    }))

    // ** State
    const [expanded, setExpanded] = useState<string | false>('panel1')

    const handleChangeA = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    const expandIcon = (value: string) => <Icon icon={expanded === value ? 'tabler:minus' : 'tabler:plus'} />

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChangeA('panel1')}>
            <AccordionSummary
                id='customized-panel-header-1'
                expandIcon={expandIcon('panel1')}
                aria-controls='customized-panel-content-1'
            >
                <Icon fontSize='1.25rem' icon='tabler:user' color='red' />
                <Typography sx={{ ml: 2, color: 'red' }}>🚀مشخصات فردی</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'firstName'} label='نام' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'lastName'} label='نام خانوادگی' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'code'} label='شماره شناسنامه' placeholder='24' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'bitrthDate'} label='تاریخ تولد' placeholder='مثال:1394/01/01' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFSelect name={'maritalStatus'} label='وضعیت تاهل' SelectProps={{
                                multiple: false,
                                value: maritalStatus,
                                onChange: (e: any) => handleChange(e as SelectChangeEvent<typeof maritalStatus>),
                                renderValue: (selected: any) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {(selected as string[]).map(value => (
                                            <CustomChip rounded key={value} label={value} skin='light' />
                                        ))}
                                    </Box>
                                )
                            }}>
                                {maritalStatusArray.map((maritalStatus: any) => (
                                    <MenuItem key={maritalStatus} value={maritalStatus} sx={{ flexDirection: 'row-reverse' }}>
                                        {maritalStatus}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFSelect name={'housingStatus'} label='وضعیت مسکن'
                                SelectProps={{
                                    multiple: false,
                                    value: housingStatus,
                                    onChange: (e: any) => handleChange(e as SelectChangeEvent<typeof housingStatus>),
                                    renderValue: (selected: any) => (
                                        <Box
                                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, }}
                                        >
                                            {(selected as string[]).map(value => (
                                                <CustomChip rounded key={value} label={value} skin='light' />
                                            ))}
                                        </Box>
                                    )
                                }}>
                                {housingStatusArray.map((housingStatus: any) => (
                                    <MenuItem key={housingStatus} value={housingStatus} sx={{ flexDirection: 'row-reverse' }}>
                                        {housingStatus}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'email'} label='آدرس الکترونیک' placeholder='john.doe@gmail.com' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFTextField name={'Mobile'} label='تلفن همراه' />
                        </Grid>
                    </Grid>
                    {renderFooter()}
                </FormProvider>
            </AccordionDetails>
        </Accordion>

    )
}

export default StepPersonalDetails
