import { ToastContainer, toast } from 'react-toastify'
import ls from 'local-storage'
import React from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import { createPaymentsubscPlan } from '../../Actions'
import config from '../../config'
const env = config.payment.paypal.env
const { clientID } = config.payment.paypal[env]

export class PricingCheckout extends React.Component {
    constructor() {
        super()
        this.state = {
            chkTurmAndCond: false
        }
        this.handlTurmAndCond = this.handlTurmAndCond.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.onFail = this.onFail.bind(this)
    }

    handlTurmAndCond() {
        this.setState({ chkTurmAndCond: (this.state.chkTurmAndCond ? false : true) })
    }

    onSuccess(details, data) {
        console.log("SUCCESS :", details, data)
        if (details.status === "COMPLETED") {
            let productProposalId = ls.get('userId')

            let body = {
                productProposalId: ls.get('userId'),
                paymentObj: [{ details, data }]
            }

            createPaymentsubscPlan(body, (err, result) => {
                if (result.paymentId) {
                    this.notifySucc('Activated primium successfully!')
                    setTimeout(() => {
                        return window.location.reload(false)
                    }, 2000)
                } else {

                }
            })
            // api
        } else {
            // handle here
        }

    }

    onFail(data) {
        console.log("PAYMENT ERROR: ", data)
        this.notifyErr('Payment Failed!')
    }

    notifyErr = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    notifySucc = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    render() {

        const { amount, currency } = this.props
        console.log(amount, currency)
        return (
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div id="titlebar" class="gradient">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">

                                <h2>Checkout</h2>

                                {/* <!-- Breadcrumbs --> */}
                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Pricing Plans</a></li>
                                        <li>Checkout</li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Container --> */}
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12 col-lg-8 content-right-offset">
                            {/* <!-- Summary --> */}
                            <div class="col-xl-12 col-lg-4 margin-top-0 margin-bottom-60">

                                {/* <!-- Summary --> */}
                                <div class="boxed-widget summary margin-top-0">
                                    <div class="boxed-widget-headline">
                                        <h3>Summary</h3>
                                    </div>
                                    <div class="boxed-widget-inner">
                                        <ul>
                                            <li>Standard Plan <span>{this.props.amount}/{this.props.currency}</span></li>
                                            {/* <li>VAT (20%) <span>$9.80</span></li> */}
                                            <li class="total-costs">Final Price <span>{this.props.amount}/{this.props.currency}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- Summary / End --> */}

                                {/* <!-- Checkbox --> */}
                                <div class="checkbox margin-top-30">
                                    <input type="checkbox" id="two-step" onChange={this.handlTurmAndCond} checked={this.state.chkTurmAndCond} />
                                    <label for="two-step"><span class="checkbox-icon"></span>  I agree to the <a href="#">Terms and Conditions</a> and the <a href="#">Automatic Renewal Terms</a></label>
                                </div>
                                {/* <!-- Billing Cycle Radios  --> */}
                                <div class="billing-cycle margin-top-1">
                                    <div>{this.state.chkTurmAndCond &&
                                        <PayPalButton
                                            amount={amount}
                                            options={{
                                                clientId: clientID,
                                                currency: currency
                                            }}
                                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                            onSuccess={this.onSuccess}
                                            catchError={this.onFail}
                                            onError={this.onFail}
                                            onCancel={this.onFail}
                                        />}
                                    </div>
                                    {/* <a href="pages-order-confirmation.html" class="button big ripple-effect margin-top-40 margin-bottom-65">Proceed Payment</a> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        )
    }
}