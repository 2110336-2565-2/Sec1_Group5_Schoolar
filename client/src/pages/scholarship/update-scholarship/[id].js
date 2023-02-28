import { React } from 'react'
import { useEffect } from 'react'

import FormEditScholarship from '@components/Layout/FormEditScholarship'
import FormSecondary from '@components/Layout/FormSecondary'
import { useRouter } from 'next/router'

export default function UpdateScholarship() {
	const router = useRouter()
	const { id } = router.query

	return <FormSecondary header="Update Scholarship" form={<FormEditScholarship id={id} />} />
}

// export async function getStaticPaths() {
// 	return {
// 		paths: [],
// 		fallback: 'blocking',
// 	}
// }

// export async function getStaticProps(context) {
// 	return {
// 		props: {
// 			authRequired: true,
// 		},
// 	}
// }
