import { React, useState } from 'react'
import FormPrimary from '@components/Layout/FormPrimary'
import FormStdUpdate from '@components/Layout/FormStdUpdate'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import Image from 'next/image'

export default function UpdateStudentInfo() {
	// const [disabled, setDisabled] = useState(true)

	// function handleEditBtnClick() {
	// 	setDisabled(!disabled)
	// 	// console.log(disabled)
	// }

	return <FormPrimary header="Update Student Information" form={<FormStdUpdate />} />
}
