import ls from 'local-storage'
import React, { Fragment } from 'react'
import { getUsers } from '../../Actions'
import { daysDiffernce } from '../../utility/index'
import config from '../../config'
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';
var loadjs = require('loadjs');
let lat = 0, lng = 0;
const { baseFrontenUrl } = config

class UserSearchItem extends React.Component {
	constructor() {
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
	
	render() {
		console.log(this.props)
		let {
			firstName = '',
			lastName = '',
			skills = [],
			address = '',
			priceRange = { min: '', max: '' },
			jobType,
			jobCategory,
			currency = 'INR',
			createdDate = '',
		} = this.props.usersData

		const allSkills = skills.map(item => item).join(' | ')

		return (
			<div href="#" className="job-listing" onClick={this.handleUserClick}>

				{/* <!-- Job Listing Details --> */}
				<div className="job-listing-details">
					{/* <!-- Logo --> */}
					<div className="job-listing-company-logo">
						<img src={'https://png.pngtree.com/element_our/png_detail/20181011/facebook-social-media-icon-design-template-vector-png_126986.jpg' || ''} alt="" />
					</div>

					{/* <!-- Details --> */}
					<div className="job-listing-description">
						<h4 className="job-listing-company">{allSkills} <span className="verified-badge" title="Verified Employer" data-tippy-placement="top"></span></h4>
						<h3 className="job-listing-title">{`${firstName} ${lastName}`}</h3>
					</div>
				</div>

				{/* <!-- Job Listing Footer --> */}
				<div className="job-listing-footer">
					<span className="bookmark-icon"></span>
					<ul>
						<li><i className="icon-material-outline-location-on"></i> {address}</li>
						<li><i className="icon-material-outline-business-center"></i> {jobType}</li>
						<li><i className="icon-material-outline-account-balance-wallet"></i> {`${priceRange.min}-${priceRange.max}/${currency}`}</li>
						<li><i className="icon-material-outline-access-time"></i> {daysDiffernce(createdDate, new Date())} days ago</li>
						<li><i className="icon-material-outline-access-time"></i> {jobCategory}</li>
					</ul>
				</div>
			</div>
		)
	}
}

export class FreelancerSearchMapwise extends React.Component {
	constructor() {
		super()

		this.state = {
			usersData: [],
			address: '',
			unitSelected: 'kilometers',
			location: { lat: (ls.get('lat') || 0), lng: (ls.get('lng') || 0) },
			distance: 2,
			limit: 10,
			skip: 0,
			currentPage: 1,
			enableSidebar: "full-page-sidebar hidden-sidebar",
			enableSidebarToggle: true
		}
		this.inputRef = React.createRef();
		this.inputElement = React.createRef();
		this.myRef = React.createRef();
		this.textInput = React.createRef();
		this.handleDegrees = this.handleDegrees.bind(this)
		this.handleKilometers = this.handleKilometers.bind(this)
		this.handleMiles = this.handleMiles.bind(this)
		this.handleRadians = this.handleRadians.bind(this)
		this.handleMeters = this.handleMeters.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.getUserData = this.getUserData.bind(this)
		this.distanceChange = this.distanceChange.bind(this)
		this.onNearestClick = this.onNearestClick.bind(this)
		this.onPreviousClick = this.onPreviousClick.bind(this)
		this.onNextClick = this.onNextClick.bind(this)
		this.handleHiddenUserValue = this.handleHiddenUserValue.bind(this)
		this.enableFiltersClick = this.enableFiltersClick.bind(this)

	}

	enableFiltersClick() {
		const enableSidebar = this.state.enableSidebar === 'full-page-sidebar hidden-sidebar' ? 'full-page-sidebar' : 'full-page-sidebar hidden-sidebar'
		this.setState({ enableSidebar, enableSidebarToggle: this.state.enableSidebarToggle === false ? true : false })
	}

	onPreviousClick() {
		if (this.state.currentPage > 1) {
			let skip = this.state.limit * (this.state.currentPage - 2)
			let currentPage = this.state.currentPage - 1
			this.setState({ skip, currentPage })
		}
	}

	onNextClick() {
		let skip = this.state.limit * (this.state.currentPage)
		let currentPage = this.state.currentPage + 1
		this.setState({ skip, currentPage })
	}

	handleHiddenUserValue() {
		alert('inside value change')
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('check component update', this.state.skip !== prevState.skip)
		if (this.state.skip !== prevState.skip || this.state.location !== prevState.location) {
			this.getUserData()
		}
	}

	onNearestClick() {
		this.setState({ location: { lat, lng }, distance: 2, unitSelected: 'kilometers' })
	}

	distanceChange(e) {
		this.setState({ distance: e.target.value })
	}

	handleSearch() {
		this.getUserData()
	}

	handleKilometers(e) {
		this.setState({
			unitSelected: e.currentTarget.value
		});
	}

	handleMeters(e) {
		this.setState({
			unitSelected: e.currentTarget.value
		});
	}

	handleMiles(e) {
		this.setState({
			unitSelected: e.currentTarget.value
		});
	}

	handleRadians(e) {
		this.setState({
			unitSelected: e.currentTarget.value
		});
	}

	handleRadians(e) {
		this.setState({
			unitSelected: e.currentTarget.value
		});
	}

	handleDegrees(e) {
		this.setState({
			unitSelected: e.currentTarget.value
		});
	}

	getUserData() {
		const filter = {
			"offset": 0,
			"limit": this.state.limit,
			"skip": this.state.skip,
			'where': {},
			"fields": {
				"userId": true,
				"email": true,
				"userName": true,
				"firstName": true,
				"lastName": true,
				"isActive": true,
				"recentViewedPost": true,
				"recentViewedService": true,
				"recentViewedUser": true,
				"about": true,
				"address": true,
				"avgRating": true,
				"currency": true,
				"files": true,
				"jobFunType": true,
				"location": true,
				"mobile": true,
				"rate": true,
				"rateType": true,
				"skills": true,
				"userBg": true,
				"userLogo": true,
				"view": true,
				"nationality": true,
				"createdDate": true
			}
		}

		let count = {}

		let location = { lat, lng }
		if (this.state.location) {
			location = this.state.location
		}

		count.location = {
			near: location,
			maxDistance: this.state.distance,
			unit: this.state.unitSelected
		}
		
		let flCount = Object.keys(count).length
		if (flCount <= 0) {
			filter.where = {}
		} else if (flCount === 1) {
			filter.where = count
		} else {
			filter.where.or = Object.keys(count).map(item => {
				return { [item]: count[item] }
			})
		}

		getUsers(filter, (err, res) => {
			if (err) {
				alert('Error in fetching user details!', err)
				return
			}
			if (res) {
				this.setState({ usersData: (Array.isArray(res) ? res : []) })
				setTimeout(() => this.inputRef.current.click(), 1000)

			}

		})
	}

	//google serach place 	
	handleChange = address => {
		this.setState({ address });
	};

	//address and location selection google map
	handleSelect = address => {
		console.log(address)
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				this.setState({ location: latLng, address })
			})
			.catch(error => {
				this.setState({ location: { lat: '', lng: '' } })
				console.error('Error', error)
			});
	};


	componentDidMount() {
		loadjs(baseFrontenUrl + '/js/maps.js');

		if (!ls.get('lat') || !ls.get('lng')) {
			navigator.geolocation.getCurrentPosition(function (position) {
				ls.set('lng', position.coords.longitude)
				ls.set('lat', position.coords.latitude)
				lng = position.coords.longitude
				lat = position.coords.latitude
			});
		} else {
			lat = ls.get('lat')
			lng = ls.get('lng')
		}
		this.getUserData()
	}

	render() {
		let userData = {}

		let users = (<div href="#" className="job-listing" onClick={this.handleUserClick}>
			<div className="job-listing-details">No user Found!</div>
		</div>)

		if (this.state.usersData && this.state.usersData.length) {
			users = this.state.usersData.map((item, i) => {
				userData[i] = {
					"pagename": `user/${item.userId}`,
					"imageUrl": (item.userLogo && item.userLogo.url) || '',
					"title": `${item.firstName} ${item.lastName}` || '',
					"description": item.address || '',
					"status": "verified",
					"lat": item.location.lat || ls.get('lat'),
					"lng": item.location.lng || ls.get('lng'),
					"count": 6
				}
				return <UserSearchItem key={i} usersData={item} {...this.props} />
			})
		}


		userData = JSON.stringify(userData)

		return (<Fragment>

			{/* <!-- Page Content================================================== --> */}
			<div className="full-page-container with-map">
				<div className={`${this.state.enableSidebar}`}>
					<div className="full-page-sidebar-inner" data-simplebar>
						<div className="sidebar-container">
							{/* <!-- Location --> */}
							<div className="sidebar-widget">
								<h3>Location</h3>
								<PlacesAutocomplete
									value={this.state.address}
									onChange={this.handleChange}
									onSelect={this.handleSelect}
								>
									{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
										<div>
											<input
												{...getInputProps({
													placeholder: 'Search Places ...',
													className: 'location-search-input',
												})}
											/>
											<div className="autocomplete-dropdown-container">
												{loading && <div>Loading...</div>}
												{suggestions.map(suggestion => {
													const className = suggestion.active
														? 'suggestion-item--active'
														: 'suggestion-item';
													// inline style for demonstration purpose
													const style = suggestion.active
														? { backgroundColor: '#fafafa', cursor: 'pointer' }
														: { backgroundColor: '#ffffff', cursor: 'pointer' };
													return (
														<div
															{...getSuggestionItemProps(suggestion, {
																className,
																style,
															})}
														>
															<span>{suggestion.description}</span>
														</div>
													);
												})}
											</div>
										</div>
									)}
								</PlacesAutocomplete>
							</div>

							<div className="sidebar-widget">
								<h3>Max Distance</h3>
								<div className="input-with-icon">
									<div id="autocomplete-container">
										<input id="autocomplete-input" value={this.distance} onChange={this.distanceChange} type="text" placeholder="2" />
									</div>
								</div>
							</div>

							{/* <!-- Job Types --> */}
							<div className="sidebar-widget">
								<h3> Units of Measurement</h3>

								<div className="switches-list">
									<div className="switch-container">
										<label className="switch"><input id={`radio-1`} value='kilometers' onChange={this.handleKilometers} checked={(this.state.unitSelected === 'kilometers') ? true : false} type="checkbox" /><span className="switch-button"></span> kilometers</label>
									</div>

									<div className="switch-container">
										<label className="switch"><input id={`radio-1`} value='meters' onChange={this.handleMeters} checked={(this.state.unitSelected === 'meters') ? true : false} type="checkbox" /><span className="switch-button"></span> meters</label>
									</div>

									<div className="switch-container">
										<label className="switch"><input id={`radio-1`} value='miles' onChange={this.handleMiles} checked={(this.state.unitSelected === 'miles') ? true : false} type="checkbox" /><span className="switch-button"></span> miles</label>
									</div>

									<div className="switch-container">
										<label className="switch"><input id={`radio-1`} value='radians' onChange={this.handleRadians} checked={(this.state.unitSelected === 'radians') ? true : false} type="checkbox" /><span className="switch-button"></span> radians</label>
									</div>
									<div className="switch-container">
										<label className="switch"><input id={`radio-1`} value='degrees' onChange={this.handleDegrees} checked={(this.state.unitSelected === 'degrees') ? true : false} type="checkbox" /><span className="switch-button"></span> degrees</label>
									</div>
								</div>

							</div>

						</div>
						{/* <!-- Sidebar Container / End --> */}

						{/* <!-- Search Button --> */}
						<div className="sidebar-search-button-container">
							<button onClick={this.handleSearch} className="button ripple-effect">Search</button>
						</div>
						{/* <!-- Search Button / End--> */}

					</div>
				</div>
				{/* <!-- Full Page Sidebar / End --> */}


				{/* <!-- Full Page Content --> */}
				<div className="full-page-content-container" data-simplebar>
					<div className="full-page-content-inner">


						<h3 className="page-title">Search Results</h3>
						<button onClick={this.onNearestClick} className="submit button margin-top-15" type="button" id="myBtn">Nearest to Me</button>
						{/* <input ref={input => this.inputElement = input} type="hidden" value={userData} id="myInput"></input> */}
						<input ref={this.inputRef} value={userData} onChange={this.handleHiddenUserValue} id='myInput' type="hidden" />
						{/* <input ref={input => this.inputElement = input} /> */}


						<div className="notify-box margin-top-15">
							<div className="switch-container">
								{/* <label className="switch"><input type="checkbox" /> */}
								{/* <span className="switch-button"></span> */}
								<span className="switch-text">Search result for your Nearest user</span>
								{/* </label> */}
							</div>
							
						</div>

						<div className="listings-container grid-layout margin-top-35">

							{/* <!-- Job Listing --> */}
							{users}
						</div>

						{/* <!-- Pagination --> */}
						<div className="clearfix"></div>
						<div className="pagination-container margin-top-20 margin-bottom-20">
							<nav className="pagination">
								<ul>
									<li onClick={this.onPreviousClick} className="pagination-arrow"><a className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li>
									<li ><a className="ripple-effect current-page">{this.state.currentPage}</a></li>
									<li onClick={this.onNextClick} className="pagination-arrow"><a className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
								</ul>
							</nav>
						</div>
						<div className="clearfix"></div>
						{/* <!-- Pagination / End --> */}

						{/* <!-- Footer --> */}
						<div className="small-footer margin-top-15">
							<div className="small-footer-copyrights">
								© 2019 <strong>Hireo</strong>. All Rights Reserved.
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

					</div>
				</div>
				{/* <!-- Full Page Content / End --> */}


				{/* <!-- Full Page Map --> */}
				<div className="full-page-map-container">

					{/* <!-- Enable Filters Button --> */}
					<div className="filter-button-container" onClick={this.enableFiltersClick}>
						<button className={`enable-filters-button ${this.state.enableSidebarToggle ? '' : 'active'}`} onClick={this.enableFiltersClick} >
							<i className="enable-filters-button-icon"></i>
							<span className="show-text">Show Filters</span>
							<span className="hide-text">Hide Filters</span>
						</button>
						<div className={`filter-button-tooltip ${this.state.enableSidebarToggle ? 'tooltip-visible' : ''}`}>Click to expand sidebar with filters!</div>
					</div>
					{/* <!-- Map --> */}
					<div id="map" className="map" data-map-zoom="12" data-map-scroll="true"></div>


				</div>
				{/* <!-- Full Page Map / End --> */}

			</div>

		</Fragment>);
	}
}
