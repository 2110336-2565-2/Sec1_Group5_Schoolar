import { React } from 'react'
import FormSecondary from '@components/Layout/FormSecondary'
import FormAddScholarship from '@components/Layout/FormAddScholarship'

export default function addScholarship() {
    return (
        <FormSecondary header="Add Scholarship" form={<FormAddScholarship />} />
    )
}

