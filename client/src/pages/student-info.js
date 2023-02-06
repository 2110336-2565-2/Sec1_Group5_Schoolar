import FormPrimary from '@components/Layout/FormPrimary'
import FormProvideStdInfo from '@components/Layout/FormStdInfo'

export default function ProvideStudentInfo() {
	return <FormPrimary header="Student Information" form={<FormProvideStdInfo />} />
}
