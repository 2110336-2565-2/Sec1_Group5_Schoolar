import React from 'react'
import ForgotPassword from '@components/Forgot-Password-page/ForgotPassword'
import NewPassword from '@components/Forgot-Password-page/NewPassword'
import FormPrimary from '@components/Layout/FormPrimary'
import LockResetIcon from '@mui/icons-material/LockReset'
import { useRouter } from 'next/router'

function ResetPassword() {
	const router = useRouter()
	if (router?.query?.token) {
		return (
			<FormPrimary
				header="Reset password"
				form={<NewPassword router={router} />}
				icon={<LockResetIcon sx={{ fontSize: { xs: '50px', sm: '65px', md: '110px' } }} />}
			/>
		)
	} else {
		return (
			<FormPrimary
				header="Reset password"
				form={<ForgotPassword router={router} />}
				icon={<LockResetIcon sx={{ fontSize: { xs: '50px', sm: '65px', md: '110px' } }} />}
			/>
		)
	}
}

export default ResetPassword
