import { React } from 'react'

import FormEditScholarship from '@components/Layout/FormEditScholarship'
import FormSecondary from '@components/Layout/FormSecondary'

export default function updateScholarship() {
	return <FormSecondary header="Update Scholarship" form={<FormEditScholarship />} />
}
