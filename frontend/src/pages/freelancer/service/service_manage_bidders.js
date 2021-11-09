
import React from 'react'
import ls from 'local-storage'
import { Bid } from './components'
import { getServiceProposal } from '../../../Actions'
import qs from 'qs'

export class ServiceManageBidders extends React.Component {
  constructor () {
    super()
    this.state = {
      biddersData: [],
      service: {}
    }
  }

  componentDidMount () {
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }

    console.log('obj:', search)
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        serviceId: this.props.match.params.serviceId,
        createrUserId: ls.get('userId')
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

		  getServiceProposal(filter, (err, res) => {
      console.log('show all Bidders:', err, res)
      if (err) {
        alert('Error in bidder fetch:', err)
      }
      if (res.length) {
        this.setState({ biddersData: res, service: search })
      }
    })
  }

  render () {
    console.log('states***** :', this.state)
    console.log('props	 :', this.props)
    const showBidders = this.state.biddersData.length ? (this.state.biddersData.map((item, i) => {
      return <Bid key={i} Bid={item} service={this.state.service} {...this.props} />
    })) : (<div><h1>No bidder till now!</h1></div>)

    return (
      <>
        {/* <!-- Dashboard Content================================================== --> */}
        <div className='dashboard-content-container' data-simplebar>
          <div className='dashboard-content-inner'>

            {/* <!-- Dashboard Headline --> */}
            <div className='dashboard-headline'>
              <h3>Manage Bidders</h3>
              <span className='margin-top-7'>Bids for <a href='#'>{(this.state.service.title || '')}</a></span>

              {/* <!-- Breadcrumbs --> */}
              <nav id='breadcrumbs' className='dark'>
                <ul>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>Dashboard</a></li>
                  <li>Manage Bidders</li>
                </ul>
              </nav>
            </div>

            {/* <!-- Row --> */}
            <div className='row'>

              {/* <!-- Dashboard Box --> */}
              <div className='col-xl-12'>
                <div className='dashboard-box margin-top-0'>

                  {/* <!-- Headline --> */}
                  <div className='headline'>
                <h3><i className='icon-material-outline-supervisor-account' /> {this.state.biddersData.length} Bidders</h3>
                <div className='sort-by'>
                <select className='selectpicker hide-tick'>
                <option>Highest First</option>
                <option>Lowest First</option>
                <option>Fastest First</option>
              </select>
              </div>
              </div>

                  <div className='content'>
                <ul className='dashboard-box-list'>
                {showBidders}
              </ul>
              </div>
                </div>
              </div>

            </div>
            {/* <!-- Row / End --> */}

            {/* <!-- Footer --> */}
            <div className='dashboard-footer-spacer' />
            <div className='small-footer margin-top-15'>
              <div className='small-footer-copyrights'>
                © 2021 <strong>jobviously</strong>. All Rights Reserved.
              </div>
              <ul className='footer-social-links'>
                <li>
                  <a href='#' title='Facebook' data-tippy-placement='top'>
                <i className='icon-brand-facebook-f' />
              </a>
                </li>
                <li>
                  <a href='#' title='Twitter' data-tippy-placement='top'>
                <i className='icon-brand-twitter' />
              </a>
                </li>
                <li>
                  <a href='#' title='Google Plus' data-tippy-placement='top'>
                <i className='icon-brand-google-plus-g' />
              </a>
                </li>
                <li>
                  <a href='#' title='LinkedIn' data-tippy-placement='top'>
                <i className='icon-brand-linkedin-in' />
              </a>
                </li>
              </ul>
              <div className='clearfix' />
            </div>
            {/* <!-- Footer / End --> */}

          </div>
        </div>
        {/* <!-- Dashboard Content / End --> */}

      </>
    )
  }
}
