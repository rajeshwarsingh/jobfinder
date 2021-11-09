
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ls from 'local-storage'
import qs from 'qs'
import { getServiceById, getServiceProposal, getProposal, getPostById, getUserById } from '../../../Actions'
import { daysDiffernce, addDays } from '../../../utility/index'
import './main.css'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/umd/popper.min.js'

import config from '../../../config'
const { baseSocketUrl, displayNameSettings } = config

class PostSearchItem extends React.Component {
  constructor () {
    super()
    this.state = {
      showImage: true,
      showTitle: true,
      showDescription: true,
      showLocation: true,
      showPriceRange: true,
      showJobType: true,
      showJobCategory: true,
      showLocation: true,
      showAvgRating: true,
      showReview: true,
      userDetails: {},
      postDetails: {}
    }
  }

  convertHMS (value) {
    const sec = parseInt(value, 10) // convert value to number if it's string
    let hours = Math.floor(sec / 3600) // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60) //  get seconds
    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    return hours + ':' + minutes + ':' + seconds // Return is HH : MM : SS
  }

  componentDidMount () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      fields: {
			  userId: true,
        id: true,
        firstName: true,
        lastName: true,
			  recentViewedPost: true
      }
    }

    getUserById(this.props.eventDataItem.userId, filter, (err, userDetails) => {
      console.log('check user detsils for view:', err, userDetails)
      if (err) {
        console.log('Error in user fetch', err)
        return
      }
      if (userDetails.id) {
        this.setState({ userDetails })
      }
    })

    const filterPostDetails = {
      offset: 0,
      limit: 100,
      skip: 0,
      fields: {
        postId: true,
        title: true,
        NoOfWeeks: true,
        workingHours: true
      }
    }

    getPostById(this.props.eventDataItem.postId, filterPostDetails, (err, postDetails) => {
      console.log('check user detsils for view:', err, postDetails)
      if (err) {
        console.log('Error in user fetch', err)
        return
      }
      if (postDetails.postId) {
        this.setState({ postDetails })
      }
      this.props.handleEventData(postDetails, 'post')
    })
  }

  render () {
    const { firstName = '', lastName = '' } = this.state.userDetails
    const { title, workingHours = {}, NoOfWeeks = '' } = this.state.postDetails
    const {
      serviceId = '',
      serviceProposalId = '',
      userId,
      proposalId = '',
      zoomMeetingUrls = { start_url: '', join_url: '' },
      calendarEvent = {
        days: '',
        start: '',
        end: ''
      }

    } = this.props.eventDataItem

    const start_url = zoomMeetingUrls.start_url
    const join_url = zoomMeetingUrls.start_url
    const start = (calendarEvent.start ? new Date(calendarEvent.start).toDateString() : ''); const end = (calendarEvent.end ? new Date(calendarEvent.end).toDateString() : ''); const days = ''

    const showWorkingHours = Object.keys(workingHours).map((item, i) => {
      return (
        <span>
          {item} : {this.convertHMS(workingHours[item].start)} - {this.convertHMS(workingHours[item].end)} /
        </span>
      )
    })

    return (
      <div href='#' className='job-listing' onClick={() => console.log('clicked')}>

        {/* <!-- Job Listing Details --> */}
        <div className='job-listing-details'>
          {/* <!-- Logo --> */}
          <div className='job-listing-company-logo'>
            <img src={'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg' || ''} alt='' />
          </div>

          {/* <!-- Details --> */}
          <div className='job-listing-description'>
            <h4 className='job-listing-company'>{title} <span className='verified-badge' title='Verified Employer' data-tippy-placement='top' /></h4>
            <h4><Link to={serviceProposalId ? `/freelancer/service/${serviceId}` : (`/freelancer/search_details/${userId}?currPraposalId=${proposalId}`)}>{firstName} {lastName} <img class='flag' src={require('../../../assets/images/flags/de.svg')} alt='' title='Germany' data-tippy-placement='top' /></Link></h4>
          </div>
        </div>

        {/* <!-- Job Listing Footer --> */}
        <div className='job-listing-footer'>
          <span className='bookmark-icon' />
          <ul>
            <li><i className='icon-material-outline-account-balance-wallet' /> {`${start}-${end}/${days}`}</li>
            {/* <li><i className="icon-material-outline-access-time"></i>{start}-{end}</li> */}
            <li><i className='icon-material-outline-access-time' />{NoOfWeeks} weeks</li>
            <li><i className='icon-material-outline-access-time' />{showWorkingHours}</li>
          </ul>
        </div>
      </div>
    )
  }
}

class ServiceSearchItem extends React.Component {
  constructor () {
    super()
    this.state = {
      showImage: true,
      showTitle: true,
      showDescription: true,
      showLocation: true,
      showPriceRange: true,
      showJobType: true,
      showJobCategory: true,
      showLocation: true,
      showAvgRating: true,
      showReview: true,
      userDetails: {},
      serviceDetails: {}
    }
  }

  convertHMS (value) {
    const sec = parseInt(value, 10) // convert value to number if it's string
    let hours = Math.floor(sec / 3600) // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60) //  get seconds
    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    return hours + ':' + minutes + ':' + seconds // Return is HH : MM : SS
  }

  componentDidMount () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      fields: {
			  userId: true,
        id: true,
        firstName: true,
        lastName: true,
			  recentViewedPost: true
      }
		  }
    getUserById(this.props.eventDataItem.userId, filter, (err, userDetails) => {
      console.log('check user detsils for view:', err, userDetails)
      if (err) {
        console.log('Error in user fetch', err)
        return
      }
      if (userDetails.id) {
        this.setState({ userDetails })
      }
    })

    const filterPostDetails = {
      offset: 0,
      limit: 100,
      skip: 0,
      fields: {
        serviceId: true,
        title: true,
        NoOfWeeks: true,
        workingHours: true
      }
    }

    getServiceById(this.props.eventDataItem.serviceId, filterPostDetails, (err, serviceDetails) => {
      console.log('check user detsils for view:', err, serviceDetails)
      if (err) {
        console.log('Error in user fetch', err)
        return
      }
      if (serviceDetails.serviceId) {
        this.setState({ serviceDetails })
      }
      this.props.handleEventData(serviceDetails, 'service')
    })
  }

  render () {
    const { firstName = '', lastName = '' } = this.state.userDetails
    const { title } = this.state.serviceDetails
    const {
      serviceId = '',
      serviceProposalId = '',
      userId,
      zoomMeetingUrls = { start_url: '', join_url: '' },
      calendarEvent = {
        days: '',
        start: '',
        end: ''
      }

    } = this.props.eventDataItem

    const start = (calendarEvent.start ? new Date(calendarEvent.start).toDateString() : ''); const end = (calendarEvent.end ? new Date(calendarEvent.end).toDateString() : ''); const days = ''

    return (
      <div href='#' className='job-listing' onClick={() => console.log('clicked')}>

        {/* <!-- Job Listing Details --> */}
        <div className='job-listing-details'>
          {/* <!-- Logo --> */}
          <div className='job-listing-company-logo'>
            <img src={'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg' || ''} alt='' />
          </div>

          {/* <!-- Details --> */}
          <div className='job-listing-description'>
            <h4 className='job-listing-company'>{title} <span className='verified-badge' title='Verified Employer' data-tippy-placement='top' /></h4>
            <h4><Link to={`/freelancer/service/${serviceId}`}>{firstName} {lastName} <img class='flag' src={require('../../../assets/images/flags/de.svg')} alt='' title='Germany' data-tippy-placement='top' /></Link></h4>
          </div>
        </div>

        {/* <!-- Job Listing Footer --> */}
        <div className='job-listing-footer'>
          <span className='bookmark-icon' />
          <ul>
            <li><i className='icon-material-outline-account-balance-wallet' /> {`${start}-${end}/${days}`}</li>
            {/* <li><i className="icon-material-outline-access-time"></i>{start}-{end}</li> */}
            {/* <li><i className="icon-material-outline-access-time"></i>{NoOfWeeks} weeks</li>
          <li><i className="icon-material-outline-access-time"></i>{showWorkingHours}</li> */}
          </ul>
        </div>
      </div>
    )
  }
}

const myEventsList = [
  { title: 'All Day Event', start: '2020-12-12' },
  { title: 'Long Event', start: '2020-10-07', end: '2020-10-10' },
  { groupId: '999', title: 'Repeating Event', start: '2020-10-09T16:00:00+00:00' },
  { groupId: '999', title: 'Repeating Event', start: '2020-10-16T16:00:00+00:00' },
  { title: 'Conference', start: '2020-10-29', end: '2020-10-31' },
  { title: 'Meeting', start: '2020-10-30T10:30:00+00:00', end: '2020-10-30T12:30:00+00:00' },
  { title: 'Lunch', start: '2020-10-30T12:00:00+00:00' },
  { title: 'Birthday Party', start: '2020-10-31T07:00:00+00:00' },
  { url: 'http:\/\/google.com\/', title: 'Click for Google', start: '2020-10-28' }
]

function createEventData (productDetails, proposalData, productType) {
  const { productId, productProposalId, proposalId = '', productTitle, calendarEvent = { start: '', end: '' }, status, userId, zoomMeetingUrls = { start_url: '', join_url: '' }, createdDate } = proposalData
  const url = productType === 'service' ? `/freelancer/service/${productId}`
    : productType === 'post' ? `/freelancer/post/${productId}`
      : '/errorpage'

  // return {"title":"Conference","start":"2020-10-29","end":"2020-12-06"}
  return {
    title: productDetails.title,
    description: '',
    overlap: true,
    url: productType === 'post' ? (`/freelancer/search_details/${userId}?currPraposalId=${proposalId}`) : `/freelancer/service/${productDetails.serviceId}`,
    start: new Date(calendarEvent.start),
    end: addDays(new Date(calendarEvent.end),
      parseInt(calendarEvent.days))
  }
}

export class EventsCalendar extends React.Component {
  constructor () {
    super()
    this.state = {
      eventList: [],
      selectedProduct: 'post',
      orders: [],
      userType: 'guest',
      proposalData: [],
      serviceProposalData: [],
      applied: false
    }
    this.myRef = React.createRef()
    this.textInput = React.createRef()
    this.onShowPoductChange = this.onShowPoductChange.bind(this)
    this.getProposaldata = this.getProposaldata.bind(this)
    this.onAppliedChange = this.onAppliedChange.bind(this)
    this.getServiceProposalData = this.getServiceProposalData.bind(this)
    this.handleEventData = this.handleEventData.bind(this)
  }

  handleEventData (data, type) {
    if (type === 'service') {
      const eventList = []

      const serviceProposalDetails = this.state.serviceProposalData.filter(item => data.serviceId === item.serviceId)

      eventList.push(createEventData(data, serviceProposalDetails.length ? serviceProposalDetails[0] : [], 'service'))

      this.setState({ eventList })
    }
    if (type === 'post') {
      const eventList = []

      const postProposalDetails = this.state.proposalData.filter(item => data.postsId === item.postsId)

      eventList.push(createEventData(data, postProposalDetails.length ? postProposalDetails[0] : [], 'service'))

      this.setState({ eventList })
    }
  }

  onAppliedChange () {
    this.setState({ applied: (this.state.applied !== true) })
  }

  onShowPoductChange (e) {
    // alert(this.state.selectedProduct)
    if (this.state.selectedProduct === 'service') {
      this.setState({ selectedProduct: 'post' })
    } else {
      this.setState({ selectedProduct: 'service' })
    }
  }

  getProposaldata () {
    // const userId = this.props.match.params.postId
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        or: [{ and: [{ userId: ls.get('userId') }, { subscribe: true }] }, { and: [{ createrUserId: ls.get('userId') }, { subscribe: true }] }]
      },
      fields: {
        proposalId: true,
        postId: true,
        questionnaireSelected: true,
        userId: true,
        createrUserId: true,
        proposalTime: true,
        currentProposalStatus: true,
        questionnaireObj: true,
        finalProposalRequest: true,
        zoomMeetingUrls: true,
        subscribe: true,
        calendarEvent: true
      }
    }

    getProposal(filter, (err, proposalData) => {
      console.log('*******************************11', err, proposalData)
      if (err) {
        alert(err)
        return
      }
      if (Array.isArray(proposalData)) {
        this.setState({ proposalData })
      }
    })
  }

  getServiceProposalData () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        or: [{ and: [{ userId: ls.get('userId') }, { currentProposalStatus: 'completed' }] }, { and: [{ createrUserId: ls.get('userId') }, { currentProposalStatus: 'completed' }] }]
      },
      fields: {
        serviceProposalId: true,
        serviceId: true,
        userId: true,
        createrUserId: true,
        proposalTime: true,
        currentProposalStatus: true,
        finalProposalRequest: true,
        zoomMeetingUrls: true,
        calendarEvent: true
      }
    }

    getServiceProposal(filter, (err, serviceProposalData) => {
      console.log('*******************************222', err, serviceProposalData)
      if (err) {
        alert(err)
        return
      }
      if (Array.isArray(serviceProposalData)) {
        this.setState({ serviceProposalData })
      }
    })
  }

  componentDidMount () {
    // Identify User Type
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }

    let { userType = 'guest' } = search
    if (userType === 'creater') {
      userType = 'creater'
    } else if (ls.get('userId')) {
      userType = 'user'
    } else {
      userType = 'guest'
    }

    this.getProposaldata()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.selectedProduct !== 'service' && this.state.selectedProduct === 'service') {
      this.getServiceProposalData()
    }
  }

  render () {
    const serviceData = {}

    const serviceList = this.state.orders.filter(item => item.productType === 'service')
    const postList = this.state.orders.filter(item => item.productType === 'post')
    console.log('check data:', serviceList, postList)

    // Handle post
    let posts = <div> No Data Found!</div>
    // Handle services
    let services = <div> No Data Found!</div>

    if (this.state.proposalData && this.state.proposalData.length < 1) {
      // write condition
      posts = (
        <div href='#' className='job-listing'>
          <div className='job-listing-details notification success'>No {displayNameSettings.post} Found!</div>
        </div>
      )
    } else if (this.state.applied) {
      console.log(1, (this.state.proposalData.filter(item => item.userId === ls.get('userId'))))
      posts = (this.state.proposalData.filter(item => item.userId === ls.get('userId'))).map((item, i) => {
        return <PostSearchItem handleEventData={this.handleEventData} key={i} eventDataItem={item} {...this.props} />
      })
    } else {
      console.log(2, ls.get('userId'), this.state.proposalData, (this.state.proposalData.filter(item => item.createrUserId === ls.get('userId'))))
      posts = (this.state.proposalData.filter(item => item.createrUserId === ls.get('userId'))).map((item, i) => {
        return <PostSearchItem handleEventData={this.handleEventData} key={i} eventDataItem={item} {...this.props} />
      })
    }

    if (this.state.serviceProposalData && this.state.serviceProposalData.length < 1) {
      // write condition
      services = (
        <div href='#' className='job-listing'>
          <div className='job-listing-details notification success'>No {displayNameSettings.post} Found!</div>
        </div>
      )
    } else if (this.state.applied) {
      console.log(1, (this.state.serviceProposalData.filter(item => item.userId === ls.get('userId'))))
      services = (this.state.serviceProposalData.filter(item => item.userId === ls.get('userId'))).map((item, i) => {
        return <ServiceSearchItem handleEventData={this.handleEventData} key={i} eventDataItem={item} {...this.props} />
      })
    } else {
      console.log(2, ls.get('userId'), this.state.serviceProposalData, (this.state.serviceProposalData.filter(item => item.createrUserId === ls.get('userId'))))
      services = (this.state.serviceProposalData.filter(item => item.createrUserId === ls.get('userId'))).map((item, i) => {
        return <ServiceSearchItem handleEventData={this.handleEventData} key={i} eventDataItem={item} {...this.props} />
      })
    }

    return (
      <>

        {/* <!-- Page Content================================================== --> */}
        <div className='full-page-container with-map'>

          <div className='full-page-sidebar hidden-sidebar'>
            <div className='full-page-sidebar-inner' data-simplebar>

              <div className='sidebar-container'>
                {/* <!-- Keywords --> */}
                <div className='sidebar-widget'>
                  <h3>Keywords</h3>
                  <div className='keywords-container'>
                    <div className='keyword-input-container'>
                <input type='text' className='keyword-input' placeholder='e.g. job title' />
                <button className='keyword-input-button ripple-effect'><i className='icon-material-outline-add' /></button>
              </div>
                    <div className='keywords-list'>
                {/* <!-- keywords go here --> */}
              </div>
                    <div className='clearfix' />
                  </div>
                </div>

                {/* <!-- Category --> */}
                <div className='sidebar-widget'>
                  <h3>Category</h3>
                  <select className='selectpicker default' multiple data-selected-text-format='count' data-size='7' title='All Categories'>
                    <option>Admin Support</option>
                    <option>Customer Service</option>
                    <option>Data Analytics</option>
                    <option>Design & Creative</option>
                    <option>Legal</option>
                    <option>Software Developing</option>
                    <option>IT & Networking</option>
                    <option>Writing</option>
                    <option>Translation</option>
                    <option>Sales & Marketing</option>
                  </select>
                </div>

                {/* <!-- Job Types --> */}
                <div className='sidebar-widget'>
                  <h3>Job Type</h3>

                  <div className='switches-list'>
                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Freelance</label>
              </div>

                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Full Time</label>
              </div>

                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Part Time</label>
              </div>

                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Internship</label>
              </div>
                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Temporary</label>
              </div>
                  </div>

                </div>

                {/* <!-- Salary --> */}
                <div className='sidebar-widget'>
                  <h3>Salary</h3>
                  <div className='margin-top-55' />

                  {/* <!-- Range Slider --> */}
                  <input className='range-slider' type='text' value='' data-slider-currency='$' data-slider-min='1500' data-slider-max='15000' data-slider-step='100' data-slider-value='[1500,15000]' />
                </div>

                {/* <!-- Tags --> */}
                <div className='sidebar-widget'>
                  <h3>Tags</h3>

                  <div className='tags-container'>
                    <div className='tag'>
                <input type='checkbox' id='tag1' />
                <label htmlFor='tag1'>front-end dev</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag2' />
                <label htmlFor='tag2'>angular</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag3' />
                <label htmlFor='tag3'>react</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag4' />
                <label htmlFor='tag4'>vue js</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag5' />
                <label htmlFor='tag5'>web apps</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag6' />
                <label htmlFor='tag6'>design</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag7' />
                <label htmlFor='tag7'>wordpress</label>
              </div>
                  </div>
                  <div className='clearfix' />
                </div>

              </div>
              {/* <!-- Sidebar Container / End --> */}

              {/* <!-- Search Button --> */}
              <div className='sidebar-search-button-container'>
                <button className='button ripple-effect'>Search</button>
              </div>
              {/* <!-- Search Button / End--> */}

            </div>
          </div>
          {/* <!-- Full Page Sidebar / End --> */}

          {/* <!-- Full Page Content --> */}
          <div className='full-page-content-container' data-simplebar>
            <div className='full-page-content-inner'>

              <h3 className='page-title'>Search Results for <strong>{displayNameSettings[this.state.selectedProduct]}</strong></h3>
              <div class='col-xl-12'>
                <div class='checkbox'>
                  {/* <input type="checkbox"  id="two-step" checked={this.state.applied}/> */}
                  <input type='checkbox' id='applied' onClick={this.onAppliedChange} checked={this.state.applied} />
                  <label for='applied'><span class='checkbox-icon' /> check to show all applied</label>
                </div>
              </div>

              <div className='notify-box margin-top-15'>
                <div className='switch-container'>
                  <label className='switch'><input onChange={this.onShowPoductChange} type='checkbox' /><span className='switch-button' /><span className='switch-text'>Showing {displayNameSettings[this.state.selectedProduct]} Turn on for {displayNameSettings[(this.state.selectedProduct === 'service' ? 'post' : 'service')]}</span></label>
                </div>

                <div className='sort-by'>
                  {/* <span>Sort by:</span>
                <select className="selectpicker hide-tick">
                  <option>Relevance</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Random</option>
                </select> */}
                </div>
              </div>

              <div className='listings-container grid-layout margin-top-35'>

                {/* <!-- Job Listing --> */}
                {/* {if(this.state.selectedProduct==='post'){}} */}
                {this.state.selectedProduct === 'service' && services}
                {this.state.selectedProduct === 'post' && posts}
                {/* {posts} */}
              </div>

              {/* <!-- Pagination --> */}
              <div className='clearfix' />
              <div className='pagination-container margin-top-20 margin-bottom-20'>
                {/* <nav className="pagination">
                <ul>
                  <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li>
                  <li><a href="#" className="ripple-effect">1</a></li>
                  <li><a href="#" className="ripple-effect current-page">2</a></li>
                  <li><a href="#" className="ripple-effect">3</a></li>
                  <li><a href="#" className="ripple-effect">4</a></li>
                  <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
                </ul>
              </nav> */}
              </div>
              <div className='clearfix' />
              {/* <!-- Pagination / End --> */}

              {/* <!-- Footer --> */}
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
          {/* <!-- Full Page Content / End --> */}

          {/* <!-- Full Page Calendar --> */}
          <div className='full-page-map-container'>

            {/* <!-- Enable Filters Button --> */}
            {/* <div className="filter-button-container">
              <button className="enable-filters-button">
                <i className="enable-filters-button-icon"></i>
                <span className="show-text">Show Filters</span>
                <span className="hide-text">Hide Filters</span>
              </button>
              <div className="filter-button-tooltip">Click to expand sidebar with filters!</div>
            </div> */}
            {/* <div id="user" data-userId={}></div> */}
            {/* <!-- Map --> */}
            <FullCalendar
              events={this.state.eventList}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
              }}
            />
          </div>
          {/* <!-- Full Page Calendar / End --> */}

        </div>

      </>
    )
  }
}
