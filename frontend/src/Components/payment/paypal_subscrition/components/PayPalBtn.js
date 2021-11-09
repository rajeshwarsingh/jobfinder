import { PayPalButton } from 'react-paypal-button-v2'
import React from 'react'
import config from '../../../../config'

const env = config.payment.paypal.env
const { clientID } = config.payment.paypal[env]

export function PayPalBtn(props) {
  const { amount, currency, createSubscription, onApprove, catchError, onError, onCancel, planId, finalProposalObj, type, postData } = props
  const paypalKey = clientID
  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      createSubscription={(data, details) => {
        data.planId = planId
        return createSubscription(data, details)
      }}
      onApprove={(data, details) => {
        data.planId = planId
        data.finalProposalObj = finalProposalObj
        data.type = type
        data.postData = postData
        onApprove(data, details)
      }}
      onError={(err) => onError(err)}
      catchError={(err) => catchError(err)}
      onCancel={(err) => onCancel(err)}
      options={{
        clientId: paypalKey,
        vault: true
      }}
      style={{
        shape: 'rect',
        color: 'blue',
        layout: 'horizontal',
        label: 'subscribe'
      }}
    />
  )
}

export default PayPalBtn
