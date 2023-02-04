import FormPrimary from '@components/Layout/FormPrimary'
import FormRegister from '@components/Layout/FormRegister'

export default function Register() {
	return <FormPrimary header="Sign Up to Schoolar" form={<FormRegister />} />
}
