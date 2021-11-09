import React from 'react'
// import logo from './logo.svg'
import './App.css'
import PayPalBtn from './components/PayPalBtn'
import ls from 'local-storage'
import { createPayment, createNotification } from '../../../Actions'
const paypalSubscribe = (data, actions) => {
  return actions.subscription.create({
    plan_id: data.planId
  })
}

const paypalOnError = (err) => {
  console.log('Error', err)
}

const paypalOnApprove = (data, detail) => {
  const { finalProposalObj, type, postData } = data
  console.log('Payapl approved', data, detail)
  console.log('Payapl data', data)
  console.log('Payapl detail', detail)

  	const body = {
    paymentType: finalProposalObj.paymentType, // //booked or completed-paid
    productType: type, // service or post
    status: 'success',
    bookingAmount: finalProposalObj.bookingAmount.toString(),
    userId: ls.get('userId'),
    createrUserId: postData.userId,
    productProposalId: finalProposalObj.proposalId,
    productId: postData.postId,
    productTitle: postData.title,
    typeMode: 'paypal-pay-button',
    merchant: 'paypal',
    paymentObj: [data]
  }
  
  createPayment(body, (err, res) => {
    if (err) {
      alert(err)
    }
    const profile = (ls.get('userProfile')) ? JSON.parse(ls.get('userProfile')) : {}
      let readedUsers = []
      readedUsers.push(ls.get('userId'))
    const notifiyBody = {
      type: type,
      userId: ls.get('userId'),
      subtype: `proposal-${finalProposalObj.paymentType}`,
      notificationTypeId: body.productId,
      message: ` ${profile.firstName} ${profile.lastName} has ${body.paymentType === 'booked' ? 'booked'
							: body.paymentType === 'completed-paid' ? 'did final payment of ' : ''
						} proposal`,
      status: 'unread',
      notifyId: body.createrUserId,
      createrUserId: body.createrUserId,
      readedUsers: readedUsers
    }
    createNotification(notifiyBody, () => {
      return window.location.href = `/payConfirmation?invoiceId=${res.invoiceId}&type=${type}&productId=${body.productId}&productProposalId=${body.productProposalId}&userId=${body.createrUserId}`
    })
  })
}

function PaypalButtonSubscrition (props) {
  const { amount = '',  currency = '' } = props.finalProposalObj
  console.log("**********************",props.postData)
  return (
    <div className='App'>
      <PayPalBtn
        amount={amount}
        currency={currency}
        createSubscription={paypalSubscribe}
        onApprove={paypalOnApprove}
        catchError={paypalOnError}
        onError={paypalOnError}
        onCancel={paypalOnError}
        planId={props.planId}
        finalProposalObj={props.finalProposalObj}
        type={props.type}
        postData={props.postData}
      />
    </div>
  )
}

export default PaypalButtonSubscrition
