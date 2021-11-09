// import ls from 'local-storage'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getServiceById, getServiceProposal, createServiceProposal, updateServiceProposal } from '../../../Actions'
import { PostDetailsSidebar, PostDetailsContent } from './index'
import ls from 'local-storage'
import $ from 'jquery'

export class ServiceSearchDetails extends React.Component {
  constructor () {
    super()
    this.state = {
      service: {},
      payTypesSelected: 'hours',
      amount: '5',
      daysOrHours: '10',
      totalPrice: '5' * '10'

    }
    this.handleBid = this.handleBid.bind(this)

    this.onPaytypeChange = this.onPaytypeChange.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
    this.onDaysorHourChange = this.onDaysorHourChange.bind(this)
  }

  onPaytypeChange (e) {
    this.setState({ payTypesSelected: e.target.value })
  }

  onAmountChange (e) {
    this.setState({ amount: e.target.value, totalPrice: (e.target.value * this.state.daysOrHours) })
  }

  onDaysorHourChange (e) {
    this.setState({ daysOrHours: e.target.value, totalPrice: (e.target.value * this.state.amount) })
  }

  handleBid () {
    // console.log($('.bidding-slider').val())

    // check service proposal already exist or not
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        serviceId: this.state.service.serviceId,
        createrUserId: this.state.service.userId,
        userId: ls.get('userId')
      },
      fields: {
        serviceProposalId: true,
        serviceId: true,
        createrUserId: true,
        proposalTime: true,
        paymentType: true,
        paymentAmount: true,
        currentProposalStatus: true,
        clientGrade: true,
        clientComment: true,
        freelancerGrade: true,
        freelancerComment: true,
        userId: true,
        createrUserRequest: true,
        userRequest: true,
        finalProposalRequest: true,
        updatedTime: true
      }
    }
    getServiceProposal(filter, (err, data) => {
      console.log(err, data)
      if (err || data.error) {
        alert(err || data)
        return
      }
      if (data.length) {
        // call service proposal update

        const newData = data[0]
        newData.userId = ls.get('userId')
        newData.userRequest = {
          amount: this.state.totalPrice,
          days: this.state.daysOrHours,
          payTypesSelected: this.state.payTypesSelected,
          message: ''
        }
        updateServiceProposal(newData.serviceProposalId, newData, (upErr, upRes) => {
          if (upErr || upRes.error) {
            alert(upErr || upRes)
            return
          }
          alert('proposal updated!', upRes)
        })
      } else {
        // call service proposal create

        const body = {
          serviceId: this.state.service.serviceId,
          createrUserId: this.state.service.userId,
          proposalTime: new Date(),
          paymentType: this.state.service.paymentType,
          paymentAmount: this.state.service.priceRange,
          currentProposalStatus: 'proposal-sent',
          clientGrade: '',
          clientComment: '',
          freelancerGrade: '',
          freelancerComment: '',
          userId: ls.get('userId'),
          createrUserRequest: {},
          userRequest: {
            amount: this.state.totalPrice,
            days: this.state.daysOrHours,
            payTypesSelected: this.state.payTypesSelected,
            message: ''
          },
          finalProposalRequest: {}
        }
        createServiceProposal(body, (crErr, crRes) => {
          if (crErr || crRes.error) {
            alert('service proposal ceate:', crErr || crRes)
            return
          }
          alert('request Send!')
        })
      }
    })
  }

  componentDidMount () {
    getServiceById(this.props.match.params.serviceId, (err, res) => {
      console.log('check post :', err, res)
      if (err) {
        alert(err)
        return
      }
      this.setState({ service: res })
    })
  }

  render () {
    console.log('aaaaa', this.state)
    const {
      postId,
      image,
      title,
      description,
      files = [],
      mainSkill,
      subSkill = [],
      location,
      priceRange,
      jobType,
      jobCategory,
      avgRating,
      review,
      paymentType = '',
      currency = 'INR',
      createdDate,
      time = ''
    } = this.state.service

    const supportDoc = (files || []).map((item, i) => {
      return <div><a href={item.url} download>{item.fileName}</a></div>
    })
    // const subSkills = (subSkill || []).map(item => item).join(' | ')
    const skills = [mainSkill, ...subSkill].map((item, i) => {
      return <span key={i}>{item}</span>
    })
    const Attachments = files.map((item, i) => {
      return <a href={item.url} class='attachment-box ripple-effect'><span>{item.fileName}</span><i>{item.format}</i></a>
    })

    const payTypes = [{
      label: 'Hourly',
      value: 'hourly'
    }, {
      label: 'Days',
      value: 'days'
    }].map((item, i) => {
      return <option value={item.value} key={i} selected={item.value === this.state.jobFunTypeSelected}>{item.label}</option>
    })

    return (
      <>

        {/* <!-- Titlebar================================================== --> */}
        <div class='single-page-header' data-background-image='images/single-task.jpg'>
          <div class='container'>
            <div class='row'>
              <div class='col-md-12'>
                <div class='single-page-header-inner'>
                  <div class='left-side'>
                    <div class='header-image'><a href='single-company-profile.html'><img src='images/browse-companies-02.png' alt='' /></a></div>
                    <div class='header-details'>
                <h3>{title}</h3>
                {/* <h5>About the Employer</h5> */}
                <ul>
                            <li><a href='single-company-profile.html'><i class='icon-material-outline-business' /> Acue</a></li>
                            <li><div class='star-rating' data-rating='5.0' /></li>
                            <li><img class='flag' src='images/flags/de.svg' alt='' /> Germany</li>
                            <li><div class='verified-badge-with-title'>Verified</div></li>
                          </ul>
              </div>
                  </div>
                  <div class='right-side'>
                    <div class='salary-box'>
                <div class='salary-type'>Project Budget</div>
                <div class='salary-amount'>{priceRange}{currency}</div>
              </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Page Content================================================== --> */}
        <div class='container'>
          <div class='row'>

            {/* <!-- Content --> */}
            <div class='col-xl-8 col-lg-8 content-right-offset'>

              {/* <!-- Description --> */}
              <div class='single-page-section'>
                <h3 class='margin-bottom-25'>Project Description</h3>
                <p>{description}</p>
              </div>

              {/* <!-- Atachments --> */}
              <div class='single-page-section'>
                <h3>Attachments</h3>
                <div class='attachments-container'>
                  {Attachments}
                </div>
              </div>

              {/* <!-- Skills --> */}
              <div class='single-page-section'>
                <h3>Skills Required</h3>
                <div class='task-tags'>
                  {skills}
                </div>
              </div>
              <div class='clearfix' />

              {/* <!-- Freelancers Bidding --> */}

            </div>

            {/* <!-- Sidebar --> */}
            <div class='col-xl-4 col-lg-4'>
              <div class='sidebar-container'>

                <div class='countdown green margin-bottom-35'>{createdDate}</div>

                <div class='sidebar-widget'>
                  <div class='bidding-widget'>
                    <div class='bidding-headline'><h3>Bid on this job!</h3></div>
                    <div class='bidding-inner'>

                {/* <!-- Headline --> */}
                {/* <span className="bidding-detail">Set your <strong>minimal rate</strong></span> */}
                <span>Set your <strong>minimal rate</strong></span>

                {/* <!-- Price Slider --> */}
                {/* <div className="bidding-value">$<span id="biddingVal"></span></div> */}
                {/* <input className="bidding-slider" type="text" value="" data-slider-handle="custom" data-slider-currency="$" data-slider-min="2500" data-slider-max="4500" data-slider-value="auto" data-slider-step="50" data-slider-tooltip="hide" /> */}
                <input type='text' value={this.state.amount} onChange={this.onAmountChange} /><span>{currency}</span>{paymentType}
                {/* <!-- Headline --> */}
                <span class='bidding-detail margin-top-30'>Set your <strong>delivery time</strong></span>

                {/* <!-- Fields --> */}
                <div class='bidding-fields'>
                            <div class='bidding-field'>
                                {/* <!-- Quantity Buttons --> */}
                                <div class='qtyButtons'>
                                    {/* <div className="qtyDec"></div> */}
                                    <input type='text' value={this.state.daysOrHours} onChange={this.onDaysorHourChange} />
                                    {/* <div className="qtyInc"></div> */}
                                  </div>
                              </div>
                            <div class='bidding-field'>
                                <select class='selectpicker default' onChange={this.onPaytypeChange}>

                                    {payTypes}
                                  </select>
                              </div>
                          </div>

                {/* <!-- Button --> */}
                <button onClick={this.handleBid} id='snackbar-place-bid' class='button ripple-effect move-on-hover full-width margin-top-30'><span>Place a Bid</span></button>

              </div>
                    <div class='bidding-signup'>Don't have an account? <a href='#sign-in-dialog' class='register-tab sign-in popup-with-zoom-anim'>Sign Up</a></div>
                  </div>
                </div>

                {/* <!-- Sidebar Widget --> */}
                <div class='sidebar-widget'>
                  {/* <h3>Bookmark or Share</h3> */}

                  {/* <!-- Bookmark Button --> */}
                  {/* <button className="bookmark-button margin-bottom-25">
                                        <span className="bookmark-icon"></span>
                                        <span className="bookmark-text">Bookmark</span>
                                        <span className="bookmarked-text">Bookmarked</span>
                                    </button> */}

                  {/* <!-- Copy URL --> */}
                  {/* <div className="copy-url">
                                        <input id="copy-url" type="text" value="" className="with-border"/>
                                        <button className="copy-url-button ripple-effect" data-clipboard-target="#copy-url" title="Copy to Clipboard" data-tippy-placement="top"><i className="icon-material-outline-file-copy"></i></button>
                                    </div> */}

                  {/* <!-- Share Buttons --> */}
                  {/* <div className="share-buttons margin-top-25">
                                    <div className="share-buttons-trigger"><i className="icon-feather-share-2"></i></div>
                                    <div className="share-buttons-content">
                                        <span>Interesting? <strong>Share It!</strong></span>
                                        <ul className="share-buttons-icons">
                                            <li><a href="#" data-button-color="#3b5998" title="Share on Facebook" data-tippy-placement="top"><i className="icon-brand-facebook-f"></i></a></li>
                                            <li><a href="#" data-button-color="#1da1f2" title="Share on Twitter" data-tippy-placement="top"><i className="icon-brand-twitter"></i></a></li>
                                            <li><a href="#" data-button-color="#dd4b39" title="Share on Google Plus" data-tippy-placement="top"><i className="icon-brand-google-plus-g"></i></a></li>
                                            <li><a href="#" data-button-color="#0077b5" title="Share on LinkedIn" data-tippy-placement="top"><i className="icon-brand-linkedin-in"></i></a></li>
                                        </ul>
                                    </div>
                                </div> */}
                </div>

              </div>
            </div>

          </div>
        </div>

      </>
    )
  }
}
