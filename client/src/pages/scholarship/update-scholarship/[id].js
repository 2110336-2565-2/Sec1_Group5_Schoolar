import { React } from 'react'

import FormEditScholarship from '@components/Layout/FormEditScholarship'
import FormSecondary from '@components/Layout/FormSecondary'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function UpdateScholarship() {
	const router = useRouter();
	const {id} = router.query;

	return <FormSecondary header="Update Scholarship" form={<FormEditScholarship id={id}/>} />
}
