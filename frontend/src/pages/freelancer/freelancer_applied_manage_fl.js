
import React, { Fragment } from 'react'
import ls from 'local-storage'
import { Fl } from './components'
import { getProposal } from '../../Actions'
import qs from 'qs'

export class FreelancerAppliedManageFl extends React.Component {
  constructor () {
    super()
    this.state = {
      bidsData: [],
      post: {}
    }
  }

  componentDidMount () {
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }
    this.setState({ post: search })

    console.log('obj:', search)
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        postId: this.props.match.params.postId,
        freelancerId: ls.get('userId')
      },
      fields: {
        proposalId: true,
        postId: true,
        freelancerId: true,
        proposalTime: true,
        paymentType: true,
        paymentAmount: true,
        currentProposalStatus: true,
        clientGrade: false,
        clientComment: false,
        freelancerGrade: false,
        freelancerComment: false,
        hireMngrId: true,
        freelancerRequest: true,
        hiremngrRequest: true,
        finalProposalRequest: true,
        additionalProp1: {}
      }
    }

    getProposal(filter, (err, res) => {
      console.log('show all Bids:', err, res)
      this.setState({ bidsData: res })
    })
  }

  render () {
    console.log('states :', this.state)
    console.log('props	 :', this.props)
    const showBids = this.state.bidsData.length ? (this.state.bidsData.map((item, i) => {
      return <Fl key={i} Bid={item} {...this.props} />
    })) : (<div><h1>No bid till now!</h1></div>)

    return (
      <>
        {/* <!-- Dashboard Content================================================== --> */}
        <div class='dashboard-content-container' data-simplebar>
          <div class='dashboard-content-inner'>

            {/* <!-- Dashboard Headline --> */}
            <div class='dashboard-headline'>
              <h3>Manage Freelancers</h3>
              <span class='margin-top-7'> <a href='#'>{(this.state.post.title || '')}</a></span>

              {/* <!-- Breadcrumbs --> */}
              <nav id='breadcrumbs' class='dark'>
                <ul>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>Dashboard</a></li>
                  <li>Manage freelansers</li>
                </ul>
              </nav>
            </div>

            {/* <!-- Row --> */}
            <div class='row'>

              {/* <!-- Dashboard Box --> */}
              <div class='col-xl-12'>
                <div class='dashboard-box margin-top-0'>

                  {/* <!-- Headline --> */}
                  <div class='headline'>
                <h3><i class='icon-material-outline-supervisor-account' /> {this.state.bidsData.length} Bids</h3>
                <div class='sort-by'>
                <select class='selectpicker hide-tick'>
                <option>Highest First</option>
                <option>Lowest First</option>
                <option>Fastest First</option>
              </select>
              </div>
              </div>

                  <div class='content'>
                <ul class='dashboard-box-list'>
                {showBids}
              </ul>
              </div>
                </div>
              </div>

            </div>
            {/* <!-- Row / End --> */}

            {/* <!-- Footer --> */}
            <div class='dashboard-footer-spacer' />
            <div class='small-footer margin-top-15'>
              <div class='small-footer-copyrights'>
                © 2021 <strong>jobviously</strong>. All Rights Reserved.
              </div>
              <ul class='footer-social-links'>
                <li>
                  <a href='#' title='Facebook' data-tippy-placement='top'>
                <i class='icon-brand-facebook-f' />
              </a>
                </li>
                <li>
                  <a href='#' title='Twitter' data-tippy-placement='top'>
                <i class='icon-brand-twitter' />
              </a>
                </li>
                <li>
                  <a href='#' title='Google Plus' data-tippy-placement='top'>
                <i class='icon-brand-google-plus-g' />
              </a>
                </li>
                <li>
                  <a href='#' title='LinkedIn' data-tippy-placement='top'>
                <i class='icon-brand-linkedin-in' />
              </a>
                </li>
              </ul>
              <div class='clearfix' />
            </div>
            {/* <!-- Footer / End --> */}

          </div>
        </div>
        {/* <!-- Dashboard Content / End --> */}
      </>
    )
  }
}
