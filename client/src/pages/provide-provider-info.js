import FormPrimary from '@components/Layout/FormPrimary'
import FormProviderPvdInfo from '@components/Layout/FormProvidePvdInfo'

export default function ProvideProviderInfo() {
	return <FormPrimary header="Provider Information" form={<FormProviderPvdInfo />} />
}
