import { React, useEffect, useState } from 'react'
import FormEditScholarship from '@components/Layout/FormEditScholarship'
import FormPrimary from '@components/Layout/FormPrimary'
import FormSecondary from '@components/Layout/FormSecondary'
import FormAddScholarship from '@components/Layout/FormAddScholarship'

export default function addScholarship() {
	return(
        <FormSecondary header="Add Scholarship" form={<FormAddScholarship />} />
    )
}

