import { React, useEffect, useState } from 'react'
import FormEditScholarship from '@components/Layout/FormEditScholarship'
import FormPrimary from '@components/Layout/FormPrimary'
import FormSecondary from '@components/Layout/FormSecondary'

export default function updateScholarship() {
	return(
        <FormSecondary header="Update Scholarship" form={<FormEditScholarship />} />
    )
}
