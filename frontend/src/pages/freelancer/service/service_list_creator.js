
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ls from 'local-storage'
import { getServices } from '../../../Actions'
import { ServiceListCreaterItem } from './index'

export class ServiceListCreator extends React.Component {
  constructor () {
    super()
    this.state = {
      servicesData: []
    }
  }

  componentDidMount () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
			 userId: ls.get('userId')
      },
      fields: {
        serviceId: true,
        userId: true,
        title: true,
        description: true,
        images: true,
        serviceLogo: true,
        serviceBg: true,
        files: true,
        skills: true,
        paymentType: true,
        priceRange: true,
        currency: true,
        jobType: true,
        jobCategory: true,
        location: true,
        address: true,
        expectedDuration: true,
        geometry: true,
        review: true,
        avgRating: true,
        author: true,
        createdDate: true,
        UpdatedTime: true,
        block: true,
        additionalProp1: {}
			  }
    }
    getServices(filter, (err, res) => {
      console.log('show all posts:', err, res)
      this.setState({ servicesData: res })
    })
  }

  render () {
    const serviceLists = this.state.servicesData.map((item, i) => {
      return <ServiceListCreaterItem key={i} service={item} {...this.props} />
    })

    return (
      <>

        {/* <!-- Dashboard Content================================================== --> */}
        <div class='dashboard-content-container' data-simplebar>
          <div class='dashboard-content-inner'>

            {/* <!-- Dashboard Headline --> */}
            <div class='dashboard-headline'>
              <h3>Manage Services</h3>

              {/* <!-- Breadcrumbs --> */}
              <nav id='breadcrumbs' class='dark'>
                <ul>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>Dashboard</a></li>
                  <li>Manage Tasks</li>
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
                    <h3><i class='icon-material-outline-assignment' /> My Services</h3>
                  </div>

                  <div class='content'>
                    <ul class='dashboard-box-list'>
                {serviceLists}

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
