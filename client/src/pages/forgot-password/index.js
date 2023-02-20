import React from 'react'
import { useRouter } from 'next/router'
import ForgotPassword from '@components/Forgot-Password-page/ForgotPassword'
import NewPassword from '@components/Forgot-Password-page/NewPassword'

function ResetPassword() {
	const router = useRouter()
	if (router?.query?.token) {
		return <NewPassword router={router} />
	} else {
		return <ForgotPassword router={router} />
	}
}

export default ResetPassword
