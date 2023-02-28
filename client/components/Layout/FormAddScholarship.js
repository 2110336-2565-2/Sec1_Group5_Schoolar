import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack, Box } from '@mui/material'
import { SelectComponent, TextFieldComponent, DatePickerComponent } from '@utils/formComponentUtils'
import { useRouter } from 'next/router'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useAuth } from '@/context/AuthContext'

function FormAddScholarship() {
    const axiosPrivate = useAxiosPrivate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        control,
        watch,
        trigger,
    } = useForm({ mode: 'onBlur' })
    const formProps = { register, errors, getValues, setValue, control, watch }
    const router = useRouter()
    const sendData = async (data) => {
        try {
            const response = await axiosPrivate.post('/scholarship/', data)
            alert(response.data)
            alert('Data has been added successfully')
            router.push('/')
        } catch (error) {
            alert('NOT SUCCESS')
            console.error(error)
        }
    }
    const onSubmit = (data) => {
        console.log(data)
        sendData(data)
    }
    const { auth } = useAuth()
    useEffect(() => {
        if (auth) {
            axiosPrivate.get(`/provider/${auth.username}`).then((res) => {
                setValue('provider', res.data.provider.organizationName)
            })
        }
        else {
            router.push('/login')
        }
    }, [])
    return (
        <Stack>
            <FormControl
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >

                <TextFieldComponent name="scholarshipName" label="Scholarship Name" required={true} {...formProps} />
                <TextFieldComponent name="provider" label="Organization Name" disabled={true} shrink={true}{...formProps} />
                <h3> Requirements </h3>
                <TextFieldComponent name="gpax" label="GPAX" {...formProps} />
                <SelectComponent name="degree" required={true} {...formProps} />
                <TextFieldComponent name="targetNation" label="Target Nation" required={true} {...formProps} />
                <SelectComponent name="program" required={true} {...formProps} />
                <h3> Details of scholarship </h3>
                <TextFieldComponent name="amount" label="Amount (Baht)" {...formProps} />
                <TextFieldComponent name="quota" {...formProps} />
                <TextFieldComponent name="fieldOfInterest" label="Field of Interest" required={true} {...formProps} />
                <SelectComponent name="typeOfScholarship" label="Type of Scholarship" required={true} {...formProps} />
                <TextFieldComponent name="detail" label="More Details" multiline={true} rows={4} {...formProps} />
                <DatePickerComponent name="applicationDeadline" disablePast={true} {...formProps} />
                <Box sx={{ width: '100%', display: 'flex', gap: 2, mt: 4 }}>
                    <Button fullWidth variant="contained" onClick={() => router.push("/")} >
                        Back
                    </Button>
                    <Button fullWidth variant="contained" type="submit">
                        Submit
                    </Button>
                </Box>
            </FormControl>
        </Stack>
    )
}

export default FormAddScholarship
