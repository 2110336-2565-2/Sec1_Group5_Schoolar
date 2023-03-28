import { React } from 'react'
import PaymentComponent from '@components/Payment/paymentComponent'
import FormSecondary from '@components/Layout/FormSecondary'
import { Center } from '@components/common'

export default function paymentList() {
    return <FormSecondary header="Payment" form={<PaymentComponent />} />
}