import ls from 'local-storage'
import React from 'react'
import { getUsers, countUsers } from '../../Actions'
import { FreelancerSearchItem } from './index'
import { Industry_sectors } from '../../utility/master_data'
import Select, { components } from 'react-select'
import { ToastContainer, toast } from 'react-toastify'
import config from '../../config'
const { baseFrontenUrl,displayNameSettings } = config
var loadjs = require('loadjs');
let lat = null; let lng = null

export class FreelancerSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
      title: '',
      skills: [],
      skillItem: '', // need for ui skills input
      jobType: '',
      selctedJobCategory: [],
      selectedOrder: '',
      limit: 10,
      skip: 0,
      currentPage: 1, 
      isClearFilter: false,
      serviceCount: 0,
      spinner: false
    }
    this.onTitle = this.onTitle.bind(this)
    this.getUserData = this.getUserData.bind(this)
    this.skillItemChange = this.skillItemChange.bind(this)
    this.OnSkillItemClicked = this.OnSkillItemClicked.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onJobCategoryChange = this.onJobCategoryChange.bind(this)
    this.orderTypeChange = this.orderTypeChange.bind(this)
    this.onPreviousClick = this.onPreviousClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
  }

  clearFilter() {
    // alert("asfd")
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

  onKeyUp(event) {
    if (event.key === 'Enter') {
      if (this.state.skills.length > 49) return alert('More than 50 skills not allowed!')
      if (this.state.skillItem.trim() && this.state.skills.indexOf(this.state.skillItem.toLowerCase()) === -1) {
        this.setState({ skills: [...this.state.skills, this.state.skillItem.toLowerCase()], skillItem: '' })
      }
    }
  }

  onJobCategoryChange(value, { action, removedValue }) {
    let jobcategory = (value ? value : []).map(item => {
      return item.value
    })

    this.setState({ selctedJobCategory: jobcategory })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.skip !== prevState.skip || this.state.selectedOrder !== prevState.selectedOrder || this.state.selctedJobCategory !== prevState.selctedJobCategory) {
      this.getUserData()
    }
  }
  getUserData() {
    
    this.setState({ spinner: true })
    const filter = {
      offset: 0,
      limit: this.state.limit,
      skip: this.state.skip,
      where: {},
      fields: {
        id: true,
        email: true,
        userName: true,
        firstName: true,
        lastName: true,
        isActive: true,
        recentViewedPost: true,
        recentViewedService: true,
        recentViewedUser: true,
        about: true,
        address: true,
        avgRating: true,
        currency: true,
        files: true,
        jobFunType: true,
        location: true,
        mobile: true,
        rate: true,
        rateType: true,
        skills: true,
        userBg: true,
        userLogo: true,
        view: true,
        nationality: true,
        createdDate: true
      }
    }

    const count = {}

    if (this.state.title) {
      count.firstName = {
        like: `${this.state.title}.*`, options: 'i'
      }

      count.lastName = {
        like: `${this.state.title}.*`, options: 'i'
      }

      count.email = {
        like: `${this.state.title}.*`, options: 'i'
      }
    }

    if (this.state.skills.length) {
      count.skills = { inq: this.state.skills }
    }

    if (this.state.selctedJobCategory.length) {
			count.jobCategory = { "inq": this.state.selctedJobCategory }
		}

    if (this.state.selectedOrder === 'nearest') {
      count.location = {
        near: {
          lat: lat,
          lng: lng
        }
      }
    }

    const flCount = Object.keys(count).length
    if (flCount <= 0) {
      filter.where = {}
    } else if (flCount === 1) {
      filter.where = count
    } else {
      filter.where.or = Object.keys(count).map(item => {
        return { [item]: count[item] }
      })
    }

    // order the result
    if (this.state.selectedOrder) {
      filter.order = this.state.selectedOrder
    }
    filter.where.id = { neq: ls.get('userId') }
    getUsers(filter, (err, res) => {
      
      if (err) {
        alert('Error in fetching user details!', err)
        return
      }

      countUsers(filter.where, (countErr, count) => {
        if (res) {
          this.setState({ users: Array.isArray(res) ? res : [], isClearFilter: false, serviceCount: count.count, spinner: false })
        }
      })
    })
  }

  componentDidMount() {
    
    const userProfile = ls.get('userProfile') && JSON.parse(ls.get('userProfile'))

    // set based on preference
    this.setState({
      skills: Array.isArray(userProfile.skills) && userProfile.skills.length ? userProfile.skills
        : [],
      selctedJobCategory: userProfile && userProfile.compIndus ? userProfile.compIndus : ''
    })

    if (!ls.get('lat') || !ls.get('lng')) {
      navigator.geolocation.getCurrentPosition(function (position) {
        ls.set('lng', position.coords.longitude)
        ls.set('lat', position.coords.latitude)
        lng = position.coords.longitude
        lat = position.coords.latitude
      })
    } else {
      lat = ls.get('lat')
      lng = ls.get('lng')
    }
    this.getUserData()
  }

  render() {
    const customStyles = {
      control: base => ({
        ...base,
        height: 48,
        minHeight: 48
      })
    }

    const customStyleSrt = {
      control: base => ({
        ...base,
        height: 44,
        minHeight: 44
      })
    }

    const orderData = [{ label: 'firstName a-z', value: 'firstName ASC' },
    { label: 'firstName z-a', value: 'firstName Desc' },
    { label: 'Newest', value: 'createdDate ASC' },
    { label: 'oldes', value: 'createdDate DESC' },
    { label: 'Rating', value: 'avgRating ASC' },
    { label: 'nearest', value: 'nearest' }]

    const skills = this.state.skills.map((item, i) => {
      return (
        <span key={i} className='keyword'>
          <span
            onClick={() => {
              const newSkills = this.state.skills
              const index = newSkills.indexOf(item)
              if (index > -1) {
                newSkills.splice(index, 1)
                this.setState({ skills: newSkills })
              }
            }} key={i} className='keyword-remove' style={{ height: 'auto' }}
          />
          <span key={i} className='keyword-text'>{item}</span>
        </span>
      )
    })

    const freelancers = this.state.users.length ? (this.state.users.map((item, i) => {
      return <FreelancerSearchItem key={i} user={item} {...this.props} />
    })) : (
        <div className='col-xl-6 col-md-6'>
          <div className='notification error'>
            <p>No {displayNameSettings.freelancer} found!</p>

          </div>
        </div>
      )

    const isValidNewOption = (inputValue, selectValue) =>
      inputValue.length > 0 && selectValue.length < 3;

    const industrySelectedValues = Industry_sectors.filter(item => this.state.selctedJobCategory.includes(item.value))

    return (
      <>
        {/* <!-- Page Content================================================== --> */}
        <div className='full-page-container'>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />
          <div className='full-page-sidebar'>
            <div className='full-page-sidebar-inner' data-simplebar>
              <div className='sidebar-container'>

                {/* <!-- Location --> */}
                <div className='sidebar-widget'>
                  <div className='input-with-icon'>
                    <div id='autocomplete-container'>
                      <button onClick={() => this.props.history.push('/freelancer/search_mapwise')} className='button ripple-effect'>Search {displayNameSettings.freelancer} in Map</button>
                    </div>
                  </div>
                </div>
                <div className="sidebar-widget">
                  <button onClick={this.clearFilter} className=""><u>Clear Filter</u></button>
                </div>
                <div className='sidebar-widget'>
                  <h3>{displayNameSettings.freelancer} name</h3>
                  <div className='input-with-icon'>
                    <div id='autocomplete-container'>
                      <input id='autocomplete-input' value={this.title} onChange={this.onTitle} type='text' placeholder={`${displayNameSettings.freelancer} name`} />
                    </div>
                  </div>
                </div>

                {/* <!-- Keywords --> */}
                <div className='sidebar-widget'>
                  <h3>Skills</h3>
                  <div className='keywords-container'>
                    <div className='keyword-input-container'>
                      <input value={this.state.skillItem} onKeyUp={this.onKeyUp} onChange={this.skillItemChange} type='text' className='keyword-input with-border' placeholder={`e.g. ${displayNameSettings.freelancer}, responsibilites`} />
                      <button onClick={this.OnSkillItemClicked} className='keyword-input-button ripple-effect'><i className='icon-material-outline-add' /></button>
                    </div>
                    <div className='keywords-list' style={{ 'maxHeight': 'auto', height: 'auto' }}>
                      {skills}
                    </div>
                    <div className='clearfix' />
                  </div>
                </div>

                {/* <!-- Category --> */}
                <div className="sidebar-widget" style={{ height: "400px" }}>
                  <h5>Industry</h5>
                  <Select
                    isValidNewOption={isValidNewOption}
                    onChange={this.onJobCategoryChange}
                    closeMenuOnSelect={false}
                    isMulti
                    options={Industry_sectors}
                    value={industrySelectedValues}
                  />
                </div>
              </div>
              {/* <!-- Sidebar Container / End --> */}

              {/* <!-- Search Button --> */}

              <div className='sidebar-search-button-container'>
                <button onClick={this.getUserData} className='button ripple-effect'>Search</button>
              </div>
              {/* <!-- Search Button / End--> */}

            </div>
          </div>
          {/* <!-- Full Page Sidebar / End --> */}

          {/* <!-- Full Page Content --> */}
          <div className='full-page-content-container' data-simplebar>
            <div className='full-page-content-inner'>

              <h3 className='page-title'>Search {displayNameSettings.freelancer}</h3>

              <div className='notify-box margin-top-15'>

                <Select
                  placeholder='Sort By'
                  value={orderData.find(obj => obj.value === this.state.selectedOrder)}
                  options={orderData}
                  onChange={this.orderTypeChange}
                  styles={customStyleSrt}
                  isSearchable={false}
                />
                {/* </div> */}
              </div>

              {/* <!-- Freelancers List Container --> */}
              <div className='freelancers-container freelancers-grid-layout margin-top-35'>
                {freelancers}
              </div>
              {/* <!-- Freelancers Container / End --> */}

              {/* <!-- Pagination --> */}
              <div className='clearfix' />
              <div className='pagination-container margin-top-20 margin-bottom-20'>
                <nav className='pagination'>
                  <ul>
                    <li onClick={this.onPreviousClick} className='pagination-arrow'><a className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-left' /></a></li>
                    <li><a className='ripple-effect current-page'>{this.state.currentPage}</a></li>
                    {(this.state.currentPage * this.state.limit) < this.state.serviceCount && <li onClick={this.onNextClick} className='pagination-arrow'><a className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-right' /></a></li>}
                  </ul>
                </nav>
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

        </div>
      </>
    )
  }
}
