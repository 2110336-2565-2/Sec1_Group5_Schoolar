import FormPrimary from '@components/Layout/FormPrimary'
import FormStdInfo from '@components/Layout/FormStdInfo'

export default function UpdateStudentInfo() {

	return <FormPrimary header="Student Information" form={<FormStdInfo />} />
}
