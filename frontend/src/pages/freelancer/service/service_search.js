import ls from 'local-storage'
import React from 'react'
import { getServices, countServices } from '../../../Actions'
import { ServiceSearchItem } from './index'
import { Industry_sectors } from '../../../utility/master_data'
import Select, { components } from 'react-select'
import { ToastContainer } from 'react-toastify'
import config from '../../../config'
const { baseFrontenUrl, displayNameSettings } = config
const Spinner = require('react-spinkit')
var loadjs = require('loadjs');

let lat = null; let lng = null

const Menu = props => {
  const optionSelectedLength = props.getValue().length || 0;
  return (
    <components.Menu {...props}>
      {optionSelectedLength < 3 ? (
        props.children
      ) : (
          <div style={{ margin: 15 }}>Max limit achieved</div>
        )}
    </components.Menu>
  );
};

export class ServiceSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      servicesData: [],
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
    this.getServiceData = this.getServiceData.bind(this)
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
    this.setState({
      title: '', skills: [], selctedJobCategory: [], selectedOrder: '', isClearFilter: true,
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

  componentWillMount() {
		// loadjs(baseFrontenUrl+'/js/bootstrap-select.min.js');
		// loadjs(baseFrontenUrl+'/js/bootstrap-slider.min.js');
		// loadjs(baseFrontenUrl+'/js/chart.min.js');
		// loadjs(baseFrontenUrl+'/js/clipboard.min.js');
		// loadjs(baseFrontenUrl+'/js/counterup.min.js');
		// loadjs(baseFrontenUrl+'/js/counterup.min.js');
		// loadjs(baseFrontenUrl+'/js/custom.js');
		// loadjs(baseFrontenUrl+'/js/infobox.min.js');
		// loadjs(baseFrontenUrl+'/js/jquery-3.3.1.min.js');
		// loadjs(baseFrontenUrl+'/js/jquery-3.4.1.min.js');
		// loadjs(baseFrontenUrl+'/js/jquery-migrate-3.1.0.min.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-autocomplete.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-control-geocoder.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-gesture-handling.min.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-hireo.js');
		// loadjs(baseFrontenUrl+'/js/leaflet-markercluster.min.js');
		// loadjs(baseFrontenUrl+'/js/leaflet.min.js');
		// loadjs(baseFrontenUrl+'/js/magnific-popup.min.js');
		// loadjs(baseFrontenUrl+'/js/maps.js');
		// loadjs(baseFrontenUrl+'/js/markerclusterer.js');
		// loadjs(baseFrontenUrl+'/js/mmenu.min.js');
		// loadjs(baseFrontenUrl+'/js/simplebar.min.js');
		// loadjs(baseFrontenUrl+'/js/snackbar.js');
		// loadjs(baseFrontenUrl+'/js/tippy.all.min.js');
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
      this.getServiceData()
    }
  }

  getServiceData() {
    this.setState({ spinner: true })
    const filter = {
      offset: 0,
      limit: this.state.limit,
      skip: this.state.skip,
      where: {},
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

    const count = {}

    if (this.state.title) {
      count.title = {
        like: `${this.state.title}.*`, options: 'i'
      }
    }

    if (this.state.skills.length) {
      count.skills = { "inq": this.state.skills }
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
    console.log('state :', this.state)
    console.log('filter :', filter)

    // check user should not fetch it's own services
    filter.where.userId = { neq: ls.get('userId') }
    getServices(filter, (err, res) => {
      console.log('show all services:', err, res)

      if (err) {
        alert('Error in fetching service details!', err)
        return
      }

      countServices(filter.where, (countErr, count) => {
        if (res) {
          this.setState({ servicesData: Array.isArray(res) ? res : [], isClearFilter: false, serviceCount: count.count, spinner: false })
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

    console.log('check')

    if (!ls.get('lat') || !ls.get('lng')) {
      navigator.geolocation.getCurrentPosition(function (position) {
        ls.set('lng', position.coords.longitude)
        ls.set('lat', position.coords.latitude)
        lat = position.coords.longitude
        lng = position.coords.latitude
      })
    } else {
      lat = ls.get('lat')
      lng = ls.get('lng')
    }
    this.getServiceData()
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

    const orderData = [{ label: 'title a-z', value: 'title ASC' },
    { label: 'title z-a', value: 'title Desc' },
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

    const services = this.state.servicesData.length ? (this.state.servicesData.map((item, i) => {
      return <ServiceSearchItem key={i} servicesData={item} {...this.props} />
    })) : (
        <div class='col-xl-6 col-md-6'>
          <div class='notification error'>
            <p>No {displayNameSettings.service} found!</p>

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
                      <button onClick={() => this.props.history.push('/freelancer/service_search_mapwise')} className='button ripple-effect'>Search {displayNameSettings.service} in Map</button>
                    </div>
                  </div>
                </div>
                <div className="sidebar-widget">
                  <button onClick={this.clearFilter} className=""><u>Clear Filter</u></button>
                </div>

                <div className='sidebar-widget'>
                  <h3>{displayNameSettings.service} Title</h3>
                  <div className='input-with-icon'>
                    <div id='autocomplete-container'>
                      <input id='autocomplete-input' value={this.title} onChange={this.onTitle} type='text' placeholder='Job Title' />
                    </div>
                  </div>
                </div>

                {/* <!-- Keywords --> */}
                <div className='sidebar-widget'>
                  <h3>Skills</h3>
                  <div class='keywords-container'>
                    <div class='keyword-input-container'>
                      <input value={this.state.skillItem} onKeyUp={this.onKeyUp} onChange={this.skillItemChange} type='text' class='keyword-input with-border' placeholder='e.g. job title, responsibilites' />
                      <button onClick={this.OnSkillItemClicked} class='keyword-input-button ripple-effect'><i class='icon-material-outline-add' /></button>
                    </div>
                    <div class='keywords-list' style={{ 'maxHeight': 'auto', height: 'auto' }}>
                      {skills}
                    </div>
                    <div class='clearfix' />
                  </div>
                </div>

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
                <button onClick={this.getServiceData} className='button ripple-effect'>Search</button>
              </div>
              {/* <!-- Search Button / End--> */}

            </div>
          </div>
          {/* <!-- Full Page Sidebar / End --> */}

          {/* <!-- Full Page Content --> */}
          <div className='full-page-content-container' data-simplebar>
            <div className='full-page-content-inner'>

              <h3 className='page-title'>Search {displayNameSettings.service}</h3>

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

              <div className='listings-container grid-layout margin-top-35'>
                {this.state.spinner && <Spinner name='line-scale' color='blue' />}
                {services}

              </div>

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
