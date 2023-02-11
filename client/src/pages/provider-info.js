import FormPrimary from '@components/Layout/FormPrimary'
import FormPvdInfo from '@components/Layout/FormPvdInfo'

export default function ProvideProviderInfo() {
	return <FormPrimary header="Provider Information" form={<FormPvdInfo />} />
}
