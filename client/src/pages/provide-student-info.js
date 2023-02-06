import FormPrimary from "@components/Layout/FormPrimary"
import FormProvideStdInfo from "@components/Layout/FormProvideStdInfo"

export default function ProvideStudentInfo() {
	return <FormPrimary header="Student Information" form={<FormProvideStdInfo />} />
}