import ls from 'local-storage'
import React from 'react'
import { ServiceAppliedListItem } from "./components/service_applied_list_item";
import { getServiceById, getServiceProposal, } from '../../../Actions'
import Select from 'react-select'
import config from "../../../config";
const { displayNameSettings } = config
const Spinner = require('react-spinkit')

export class ServiceAppliedList extends React.Component {
  constructor() {
    super()
    this.state = {
      servicesData: [],
      title: '',
      skills: [],
      skillItem: '', // need for ui skills input
      jobType: '',
      selctedJobCategory: '',
      selectedOrder: 'completed,completed-paid',
      limit: 2,
      skip: 0,
      currentPage: 1,
      isClearFilter: false,
      serviceCount: 0,
      spinner: false
    }
    this.getAppliedServices = this.getAppliedServices.bind(this)
    this.getServiceDetails = this.getServiceDetails.bind(this)
    this.onTitle = this.onTitle.bind(this)
    this.skillItemChange = this.skillItemChange.bind(this)
    this.OnSkillItemClicked = this.OnSkillItemClicked.bind(this)
    this.onJobCategoryChange = this.onJobCategoryChange.bind(this)
    this.orderTypeChange = this.orderTypeChange.bind(this)
    this.onPreviousClick = this.onPreviousClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
  }

  getServiceDetails(serviceDetails) {
    const { serviceId } = serviceDetails
    return new Promise((resolve, reject) => {
      const filter = {
        offset: 0,
        limit: 100,
        skip: 0,
        fields: {
          serviceId: true,
          userId: true,
          title: true,
          description: true,
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
          review: true,
          avgRating: true,
          createdDate: true,
          block: true,
          view: true
        }
      }
      getServiceById(serviceId, filter, (err, res) => {
        console.log('show all services:', err, res)

        if (err) {
          console.log('Error in fetching service details!', err)
          return reject(err)
        }
        if (res) {
          res.serviceDetails = serviceDetails
        }
        return resolve(res)
      })
    })
  }

  getAppliedServices() {

    let OrderStatusSelected = this.state.selectedOrder.split(',');
    let order = OrderStatusSelected.map(item => {
      return { currentProposalStatus: item }
    })
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        userId: ls.get('userId'),
        or: order
      },
      fields: {
        serviceProposalId: true,
        serviceId: true,
        userId: true,
        createrUserId: true,
        currentProposalStatus: true,
        finalProposalRequest: true,
        proposalTime: false,
        paymentType: false,
        createrUserRequest: false,
        userRequest: false,
        updatedTime: false
      }
    }

    getServiceProposal(filter, (err, res) => {
      console.log('get proposal details:', err, res)
      if (err || (res && res.error)) {
        alert('error in fetching proposal details!', err)
        return
      }

      if (res && Array.isArray(res)) {
        const serviceDetailsData = res.map(item => {
          return this.getServiceDetails(item)
        })

        Promise.all(serviceDetailsData)
          .then((Data) => {
            console.log('check result data:', Data)
            this.setState({ servicesData: Array.isArray(Data) ? Data : [], isClearFilter: false, serviceCount: res.length, spinner: false })
          })
          .then((reason) => {
            console.log('error in service details data:', reason)
          })
      }
    })
  }

  clearFilter() {
    this.setState({
      title: '', skills: [], selctedJobCategory: '', selectedOrder: '', isClearFilter: true
    })
  }

  onPreviousClick() {
    if (this.state.currentPage > 1) {
      const skip = this.state.limit * (this.state.currentPage - 2)
      const currentPage = this.state.currentPage - 1
      this.setState({ skip, currentPage })
    }
  }

  onNextClick() {
    const skip = this.state.limit * (this.state.currentPage)
    const currentPage = this.state.currentPage + 1
    this.setState({ skip, currentPage })
  }

  orderTypeChange(e) {
    this.setState({ selectedOrder: e.value })
  }

  onTitle(e) {
    this.setState({ title: e.target.value })
  }

  skillItemChange(e) {
    this.setState({ skillItem: e.target.value })
  }

  OnSkillItemClicked() {
    this.setState({ skills: [...this.state.skills, this.state.skillItem], skillItem: '' })
  }

  onJobCategoryChange(e) {
    this.setState({ selctedJobCategory: e.value })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.skip !== prevState.skip || this.state.selectedOrder !== prevState.selectedOrder) {
      // alert('a')
      this.getAppliedServices()
    }
  }

  componentDidMount() {
    this.getAppliedServices()
  }

  render() {


    let services = <div href="#" className="job-listing" onClick={this.handleServiceClick}>
      <div className="job-listing-details">No {displayNameSettings.service} Found!</div>
    </div>


    if (this.state.servicesData.length) {
      services = this.state.servicesData.map((service, i) => {
        return (
          <ServiceAppliedListItem keys={i} data={service} />
        )
      })
    }


    const orderData = [
      { label: 'Applied', value: 'sent,revised,revised-by-creater,attempted-pay,accepted,accepted-by-creater,booked' },
      { label: 'Rejected', value: 'rejected-by-creater,rejected' },
      { label: 'Completed', value: 'completed,completed-paid' },
    ]

    const customStyleSrt = {
      control: base => ({
        ...base,
        height: 44,
        minHeight: 44
      })
    }

    return (
      <>
        {/* <!-- Dashboard Content================================================== --> */}
        <div className='dashboard-content-container' data-simplebar>
          <div className='dashboard-content-inner'>

            <div className="row">

              <div className="col-xl-12 col-lg-8 content-left-offset">

                <h3 className="page-title">{displayNameSettings.service}</h3>

                <div className='notify-box margin-top-15'>

                  <Select
                    defaultValue={orderData[2]}
                    placeholder='Sort By'
                    value={orderData.find(obj => obj.value === this.state.selectedOrder)}
                    options={orderData}
                    onChange={this.orderTypeChange}
                    styles={customStyleSrt}
                    isSearchable={false}
                  />
                </div>

                {/* <!-- Tasks Container --> */}
                <div className="tasks-list-container margin-top-35">
                  {this.state.spinner && <Spinner name='line-scale' color='blue' />}
                  {services}

                  {/* <!-- Pagination --> */}
                  <div className="clearfix"></div>
                  <div className="row">
                    <div className="col-md-12">
                      {/* <!-- Pagination --> */}
                      <div className="pagination-container margin-top-30 margin-bottom-60">
                        <nav className='pagination'>
                          <ul>
                            <li onClick={this.onPreviousClick} className='pagination-arrow'><a className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-left' /></a></li>
                            <li><a className='ripple-effect current-page'>{this.state.currentPage}</a></li>
                            {(this.state.currentPage * this.state.limit) < this.state.serviceCount && <li onClick={this.onNextClick} className='pagination-arrow'><a className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-right' /></a></li>}
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Pagination / End --> */}

                </div>
                {/* <!-- Tasks Container / End --> */}

              </div>

            </div>

            {/* <!-- Row --> */}

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