import { React, useState } from 'react'
import FormStdUpdate from '@components/Layout/FormStdUpdate'
import FormPrimary from '@components/Layout/FormPrimary'
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

	return <FormPrimary header="Student Information" form={<FormStdUpdate />} />
}
