import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormControl, Grid, Stack, Box} from '@mui/material'
import { SelectComponent, TextFieldComponent, DatePickerComponent } from '@utils/formComponentUtils'
import { useRouter } from 'next/router'

function FormEditScholarship(){
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
			const response = await axios.post('/scholarship', data)
			alert(response.data)
			router.push('/')
		} catch (error) {
			console.error(error)
		}
	}
    const onSubmit = (data) => {
        console.log(data)
		sendData(data)
	}
    return(
        <Stack>
            <FormControl
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
               
                <TextFieldComponent name="scholarshipName" label="Scholarship Name" required={true} {...formProps} />
                <TextFieldComponent name="provider" label="Organization Name" required={true} {...formProps} />
                <h3> Requirement </h3>
                <TextFieldComponent name="gpax" label="GPAX" {...formProps} />
                <SelectComponent name="degree" {...formProps} />
                <TextFieldComponent name="targetNation" label="Scholarship Nation" required={true} {...formProps} />
                <SelectComponent name="program" {...formProps} />
                <h3> Detail of scholarship </h3>
                <TextFieldComponent name="amount" label="Amount (Baht)" {...formProps} />
                <TextFieldComponent name="quota" {...formProps} />
                <TextFieldComponent name="fieldOfInterest" {...formProps} />
                <SelectComponent name="typeOfScholarship" {...formProps} />
                <TextFieldComponent name="detail" Label="More Detail" multiline={true} rows={4} {...formProps} />
                <DatePickerComponent name="applicationDeadline" {...formProps} />
            
                <Box sx={{ width: '100%', display: 'flex', gap: 2, mt: 4 }}>
				    <Button fullWidth variant="contained" onClick ={() => router.push("/")} >
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

export default FormEditScholarship
