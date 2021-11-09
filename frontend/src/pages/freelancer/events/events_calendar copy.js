
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ls from 'local-storage'
import qs from 'qs'
import { getPayment } from '../../../Actions'
import { daysDiffernce, addDays } from '../../../utility/index'
import './main.css'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/umd/popper.min.js'
import $ from 'jquery'

import config from '../../../config'
const { displayNameSettings, cloudinary } = config

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
      showReview: true
    }
  }

  render () {
    console.log(this.props)
    const {
      paymentId,
      status,
      productType,
      productId,
      productProposalId,
      productTitle,
      userId,
      zoomMeetingUrls = { start_url: '', join_url: '' },
      calendarEvent = {
        days: '',
        start: '',
        end: ''
      },
      createdDate
    } = this.props.eventDataItem
    const { days, start, end } = calendarEvent
    const { start_url, join_url } = zoomMeetingUrls
    // const allSkills = skills.map(item => item).join(' | ')

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
            <h4 className='job-listing-company'>{} <span className='verified-badge' title='Verified Employer' data-tippy-placement='top' /></h4>
            <h3 className='job-listing-title'>{productTitle}</h3>
          </div>
        </div>

        {/* <!-- Job Listing Footer --> */}
        <div className='job-listing-footer'>
          <span className='bookmark-icon' />
          <ul>
            <li class='button gray' data-tippy-placement='top'><a href={start_url} target='_blank'><i className='icon-material-outline-location-on' />Zoom start Url</a> </li>
            <li class='button gray' data-tippy-placement='top'><a href={join_url} target='_blank'><i className='icon-material-outline-location-on' />Zoom Join Url</a></li>
            {/* <li><i className="icon-material-outline-location-on"></i> {start_url}</li> */}
            {/* <li><i className="icon-material-outline-business-center"></i> {join_url}</li> */}
            <li><i className='icon-material-outline-account-balance-wallet' /> {`${start}-${end}/${days}`}</li>
            {/* <li><i className="icon-material-outline-access-time"></i>{start}-{end}</li> */}
            {/* <li><i className="icon-material-outline-access-time"></i> {jobCategory}</li> */}
          </ul>
        </div>
      </div>
    )
  }
}

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
      showReview: true
    }
  }

  render () {
    console.log(this.props)
    const {
      paymentId,
      status,
      productType,
      productId,
      productProposalId,
      productTitle,
      userId,
      zoomMeetingUrls = { start_url: '', join_url: '' },
      calendarEvent = {
        days: '',
        start: '',
        end: ''
      },
      createdDate
    } = this.props.eventDataItem
    const { days, start, end } = calendarEvent
    const { start_url, join_url } = zoomMeetingUrls
    // const allSkills = skills.map(item => item).join(' | ')

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
            <h4 className='job-listing-company'>{} <span className='verified-badge' title='Verified Employer' data-tippy-placement='top' /></h4>
            <h3 className='job-listing-title'>{productTitle}</h3>
          </div>
        </div>

        {/* <!-- Job Listing Footer --> */}
        <div className='job-listing-footer'>
          <span className='bookmark-icon' />
          <ul>
            <li class='button gray' data-tippy-placement='top'><a href={start_url} target='_blank'><i className='icon-material-outline-location-on' />Zoom start Url</a> </li>
            <li class='button gray' data-tippy-placement='top'><a href={join_url} target='_blank'><i className='icon-material-outline-location-on' />Zoom Join Url</a></li>
            {/* <li><i className="icon-material-outline-location-on"></i> {start_url}</li> */}
            {/* <li><i className="icon-material-outline-business-center"></i> {join_url}</li> */}
            <li><i className='icon-material-outline-account-balance-wallet' /> {`${start}-${end}/${days}`}</li>
            {/* <li><i className="icon-material-outline-access-time"></i>{start}-{end}</li> */}
            {/* <li><i className="icon-material-outline-access-time"></i> {jobCategory}</li> */}
          </ul>
        </div>
      </div>
    )
  }
}

const myEventsList = [
  { title: 'All Day Event', start: '2020-10-01' },
  { title: 'Long Event', start: '2020-10-07', end: '2020-10-10' },
  { groupId: '999', title: 'Repeating Event', start: '2020-10-09T16:00:00+00:00' },
  { groupId: '999', title: 'Repeating Event', start: '2020-10-16T16:00:00+00:00' },
  { title: 'Conference', start: '2020-10-29', end: '2020-10-31' },
  { title: 'Meeting', start: '2020-10-30T10:30:00+00:00', end: '2020-10-30T12:30:00+00:00' },
  { title: 'Lunch', start: '2020-10-30T12:00:00+00:00' },
  { title: 'Birthday Party', start: '2020-10-31T07:00:00+00:00' },
  { url: 'http:\/\/google.com\/', title: 'Click for Google', start: '2020-10-28' }
]

function createEventData (event) {
  const { paymentId, productType, productId, productProposalId, productTitle, calendarEvent, status, userId, zoomMeetingUrls = { start_url: '', join_url: '' }, createdDate } = event
  const url = productType === 'service' ? `/freelancer/service/${productId}`
    : productType === 'post' ? `/freelancer/post/${productId}`
      : '/errorpage'

  return { title: productTitle, discription: 'zoom link:safdsafsfa', overlap: true, url: url, start: new Date(createdDate), end: addDays(new Date(createdDate), parseInt(calendarEvent.days)) }
}

export class EventsCalendar extends React.Component {
  constructor () {
    super()
    this.state = {
      eventList: [],
      selectedProduct: 'post',
      orders: [],
      userType: 'guest'
    }
    this.myRef = React.createRef()
    this.textInput = React.createRef()
    this.onShowPoductChange = this.onShowPoductChange.bind(this)
  }

  onShowPoductChange (e) {
    // alert(this.state.selectedProduct)
    if (this.state.selectedProduct === 'service') {
      this.setState({ selectedProduct: 'post' })
    } else {
      this.setState({ selectedProduct: 'service' })
    }
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

    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {},
      fields: {
        paymentId: true,
        status: true,
        productType: true,
        productId: true,
        productProposalId: true,
        productTitle: true,
        userId: true,
        zoomMeetingUrls: true,
        calendarEvent: true,
        createdDate: true,
        createrUserId: true
      }
    }

    filter.where = { or: [{ userId: ls.get('userId') }, { createrUserId: ls.get('userId') }] }

    getPayment(filter, (err, res) => {
      console.log('show all services:', err, res)

      if (err) {
        alert('Error in fetching service details!', err)
        return
      }
      if (res.length) {
        // find post or service

        const eventList = res.map((item, i) => {
          return createEventData(item)
        })
        console.log('eventList*******************', eventList)
        this.setState({ orders: res, eventList: eventList, userType: userType })
      }
    })
  }

  render () {
    console.log('********', this.state.eventList)
    // alert(this.state.selectedProduct)
    const serviceData = {}

    const serviceList = this.state.orders.filter(item => item.productType === 'service')
    const postList = this.state.orders.filter(item => item.productType === 'post')
    console.log('check data:', serviceList, postList)

    const services = serviceList.map((item, i) => {
      return <ServiceSearchItem key={i} eventDataItem={item} {...this.props} />
    })

    const posts = postList.map((item, i) => {
      return <PostSearchItem key={i} eventDataItem={item} {...this.props} />
    })

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

              <h3 className='page-title'>Search Results for <strong>{(this.state.selectedProduct === 'post' ? displayNameSettings.post : displayNameSettings.service)}</strong></h3>

              <div className='notify-box margin-top-15'>
                <div className='switch-container'>
                  <label className='switch'><input onChange={this.onShowPoductChange} type='checkbox' /><span className='switch-button' /><span className='switch-text'>Showing {this.state.selectedProduct} Turn on for {(this.state.selectedProduct === 'post' ? displayNameSettings.post : displayNameSettings.service)}</span></label>
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
              </div>

              {/* <!-- Pagination --> */}
              <div className='clearfix' />
              <div className='pagination-container margin-top-20 margin-bottom-20'>
                <nav className='pagination'>
                  <ul>
                    <li className='pagination-arrow'><a href='#' className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-left' /></a></li>
                    <li><a href='#' className='ripple-effect'>1</a></li>
                    <li><a href='#' className='ripple-effect current-page'>2</a></li>
                    <li><a href='#' className='ripple-effect'>3</a></li>
                    <li><a href='#' className='ripple-effect'>4</a></li>
                    <li className='pagination-arrow'><a href='#' className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-right' /></a></li>
                  </ul>
                </nav>
              </div>
              <div className='clearfix' />
              {/* <!-- Pagination / End --> */}

              {/* <!-- Footer --> */}
              <div className='small-footer margin-top-15'>
                <div className='small-footer-copyrights'>
                  © 2019 <strong>Hireo</strong>. All Rights Reserved.
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
