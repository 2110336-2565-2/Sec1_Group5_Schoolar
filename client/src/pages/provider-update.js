import React from 'react'
import FormPrimary from '@components/Layout/FormPrimary'
import FormProviderUpd from '@components/Layout/FormProviderUpd'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import Image from 'next/image'

export default function UpdateProviderInfo() {
	return <FormPrimary header="Update Provider Information" form={<FormProviderUpd />} />
}

export async function getStaticProps(context) {
	return {
		props: {
			authRequired: true,
		},
	}
}
