import React from 'react'
import ls from 'local-storage'
import {getUserById} from '../../Actions'
import { PricingCheckout} from './plans_checkout'

export class PricingPlan extends React.Component {

    constructor() {
        super()
        this.state = {
          payment: true,
          amount:'',
          currency:'',
          planType:''
        }
        this.handlePlans = this.handlePlans.bind(this)
        this.getUserData = this.getUserData.bind(this)
      }

      getUserData(){

        const filter = {
            offset: 0,
            limit: 1,
            skip: 0,
            fields: {
              userId: true,
              planType: true
            }
          }

        getUserById (ls.get('userId'), filter,(err, user)=>{
            if(user.planType) this.setState({planType:user.planType})
        })
      }
      componentDidMount(){
        this.getUserData()
        const profile = (ls.get('userProfile')) ? JSON.parse(ls.get('userProfile')) : {}
        const currency = profile.currency?profile.currency:'USD'
        this.setState({currency:currency, amount:49})
      }

      handlePlans(){
        //   alert(2)
        this.setState({payment:false})
      }

    render() { 
        return (
            <div>{this.state.payment && <div>
                
                <div id="titlebar" class="gradient">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">

                                <h2>Pricing Plans</h2>

                                {/* <!-- Breadcrumbs --> */}
                                <nav id="breadcrumbs" class="dark">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Pages</a></li>
                                        <li>Pricing Plans</li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">

                        <div className="col-xl-12">
                        {this.state.planType==='premium' && <div class="notification success closeable"> You have already subscribed premium Plan!</div>}
                            {/* <!-- Billing Cycle  --> */}
                            <div className="billing-cycle-radios margin-bottom-70">
                                
                            </div>

                            {/* <!-- Pricing Plans Container --> */}
                            <div className="pricing-plans-container">

                                {/* <!-- Plan --> */}
                                <div className="pricing-plan recommended">
                                    <div className="recommended-badge" style={{ backgroundColor: 'gray' }}></div>
                                    <h3>Basic Plan</h3>
                                    <p className="margin-top-10"></p>
                                    <div className="pricing-plan-label billed-monthly-label"><strong>$0</strong>/ yearly</div>
                                    {/* <div className="pricing-plan-label billed-yearly-label"><strong>$205</strong>/ yearly</div> */}
                                    <div className="pricing-plan-features">
                                        <strong>Features of Basic Plan</strong>
                                        <ul>
                                            <li>unlimited Joblems</li>
                                            <li>unlimited joblots</li>
                                            <li>unlimited jobers</li>
                                        </ul>
                                    </div>
                                    <a href="#" className="button full-width margin-top-20">Free</a>
                                </div>

                                {/* <!-- Plan --> */}
                                <div className="pricing-plan recommended">
                                    <div className="recommended-badge">Recommended</div>
                                    <h3>Subscription Plan</h3>
                                    <p className="margin-top-10"></p>
                                    <div className="pricing-plan-label billed-monthly-label"><strong>{this.state.amount}/{this.state.currency}</strong>/ yearly</div>
                                    <div className="pricing-plan-features">
                                        <strong>Features of Standard Plan</strong>
                                        <ul>
                                            <li>unlimited Joblems / questionair</li>
                                            <li>unlimited joblots</li>
                                            <li>unlimited jobers</li>
                                        </ul>
                                    </div>
                                    {this.state.planType!=='premium' && <a onClick={this.handlePlans} className="button full-width margin-top-20">Activate Now</a>}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="dashboard-footer-spacer"></div>
                <div className="small-footer margin-top-15">
                    <div className="small-footer-copyrights">
                        © 2021 <strong>jobviously</strong>. All Rights Reserved.
                      </div>
                    <ul className="footer-social-links">
                        <li>
                            <a href="#" title="Facebook" data-tippy-placement="top">
                                <i className="icon-brand-facebook-f"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" title="Twitter" data-tippy-placement="top">
                                <i className="icon-brand-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" title="Google Plus" data-tippy-placement="top">
                                <i className="icon-brand-google-plus-g"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" title="LinkedIn" data-tippy-placement="top">
                                <i className="icon-brand-linkedin-in"></i>
                            </a>
                        </li>
                    </ul>
                    <div className="clearfix"></div>
                </div>
                {/* <!-- Footer / End --> */}
            </div>}

            {!this.state.payment && <PricingCheckout amount={this.state.amount} currency={this.state.currency}/>}
            </div>

        )
    }
}