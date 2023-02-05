import FormPrimary from "@components/Layout/FormPrimary"
import FormProviderStdInfo from "@components/Layout/FormProvideStdInfo"

export default function ProvideStudentInfo() {
	return <FormPrimary header="Student Information" form={<FormProviderStdInfo />} />
}