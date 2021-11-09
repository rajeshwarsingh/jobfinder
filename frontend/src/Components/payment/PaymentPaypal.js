import ls from 'local-storage'
import React from 'react'
import ReactDOM from 'react-dom'
import scriptLoader from 'react-async-script-loader'
import { changeProposalStatus, patchServiceProposal, createPayment, createNotification } from '../../Actions'
import config from '../../config'
const env = config.payment.paypal.env
const { clientID } = config.payment.paypal[env]

class PaypalButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showButton: false
    }
    this.handlePaymentRequst = this.handlePaymentRequst.bind(this)
    this.handlePaymentFaildRequst = this.handlePaymentFaildRequst.bind(this)
    this.onError = this.onError.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  handlePaymentRequst () {}

  handlePaymentFaildRequst (error) {
    alert(error)
    const { type = '', serviceProposalId } = this.props.finalProposalObj

    if (type === 'service') {
      const updateBody = {
        currentProposalStatus: 'attempted-pay'
      }

      if (this.props.finalProposalObj.paymentType === 'booked') {
        updateBody.currentProposalStatus = 'attempted-pay'
        patchServiceProposal(serviceProposalId, updateBody, (err, res) => {
          this.props.history.push(`/freelancer/service/${this.props.serviceData.serviceId}?payStatus=failed`)
          window.location.reload()
        })
      } else if (this.props.finalProposalObj.paymentType === 'completed-paid') {
        this.props.history.push(`/freelancer/service/${this.props.serviceData.serviceId}?payStatus=failed`)
        window.location.reload()
      }
    } else if (type === 'post') {
      const updateBody = {
        currentProposalStatus: 'attempted-pay'
      }
      alert('payment failed!')
      if (this.props.finalProposalObj.paymentType === 'booked') {
        updateBody.currentProposalStatus = 'attempted-pay'
        changeProposalStatus(serviceProposalId, updateBody, (err, res) => {
          window.location.reload()
        })
      } else if (this.props.finalProposalObj.paymentType === 'completed-paid') {
        window.location.reload()
      }
    } else {
      // handle here if not post or service
    }
  }

  onSuccess (payment) {
    const body = {
      paymentType: this.props.finalProposalObj.paymentType, // //booked or completed-paid
      productType: this.props.type, // service or post
      status: 'success',
      bookingAmount: this.props.finalProposalObj.bookingAmount.toString(),
      userId: ls.get('userId'),
      createrUserId: (this.props.type === 'service' ? this.props.serviceData.userId
        : this.props.postData.userId),
      productProposalId: (this.props.type === 'service' ? this.props.finalProposalObj.serviceProposalId
        : this.props.type === 'post' ? this.props.finalProposalObj.proposalId
          : ''),
      productId: (this.props.type === 'service' ? this.props.serviceData.serviceId
        : this.props.type === 'post' ? this.props.postData.postId
          : ''),
      productTitle: (this.props.type === 'service' && this.props.serviceData.title) || (this.props.type === 'post' && this.props.postData.title) || '',
      typeMode: 'paypal-pay-button',
      merchant: 'paypal',
      paymentObj: [payment]
    }
    
    createPayment(body, (err, res) => {
      if (err) {
        alert(err)
      }
      const profile = (ls.get('userProfile')) ? JSON.parse(ls.get('userProfile')) : {}
      let readedUsers = []
      readedUsers.push(ls.get('userId'))
      const notifiyBody = {
        type: 'service',
        subtype: `proposal-${this.props.finalProposalObj.paymentType}`,
        userId: ls.get('userId'),
        notificationTypeId: this.props.serviceData.serviceId,
        message: ` ${profile.firstName} ${profile.lastName} has ${this.props.serviceData.paymentType} joblem proposal`,
        status: "unread",
        notifyId: this.props.serviceData.userId,
        createrUserId: this.props.serviceData.userId,
        readedUsers: readedUsers
      }
      createNotification(notifiyBody, () => {
        return this.props.history.push(`/payConfirmation?invoiceId=${res.invoiceId}&type=${this.props.type}&productId=${body.productId}&productProposalId=${body.productProposalId}&userId=${body.createrUserId}`)
      })
    })
  }

  onError (error) {
    this.handlePaymentFaildRequst(error)
  }

  onCancel (data) {
    this.handlePaymentFaildRequst(data)
  }

  componentDidMount () {
    window.React = React
    window.ReactDOM = ReactDOM
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true })
    }
    setTimeout(() => {
      this.handlePaymentRequst()
    }, 1000)
  }

  componentWillReceiveProps (nextProps) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = nextProps

    const isLoadedButWasntLoadedBefore =
			!this.state.showButton &&
			!this.props.isScriptLoaded &&
			isScriptLoaded

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true })
      }
    }
  }

  render () {
    let paypal
    if (typeof window !== 'undefined') {
      paypal = window.PAYPAL
    }
    const client = {
      sandbox: clientID,
      production: ''
    }
    const { amount = '', currency = '', bookingAmount, paymentType } = this.props.finalProposalObj
    let total = parseInt(amount) // If paymentType=completed-paid
    if (paymentType === 'booked') {
      total = parseInt(bookingAmount)
    }
    const commit = true

    const {
      showButton
    } = this.state

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency
            }
          }
        ]
      })

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl
          }
          this.onSuccess(payment)
        })

    return (

      <div>{(typeof window !== 'undefined') && (<div>
        {showButton && <paypal.Button.react
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={this.onCancel}
          onError={this.onError}
          />}
      </div>)}
      </div>
    )
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton)
