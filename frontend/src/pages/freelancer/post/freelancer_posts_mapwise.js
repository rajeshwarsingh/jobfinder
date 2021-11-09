import ls from 'local-storage'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../../../Actions'
import { daysDiffernce } from '../../../utility/index'
import config from '../../../config'
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';
var loadjs = require('loadjs');
let lat = 0, lng = 0;

const { baseFrontenUrl = '', displayNameSettings } = config

class PostSearchItem extends React.Component {
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
			postId,
			image,
			title,
			description,
			skills = [],
			location = { lat: '', lng: '' },
			address = '',
			priceRange = { min: '', max: '' },
			jobType,
			jobCategory,
			avgRating,
			review,
			currency = 'INR',
			createdDate = '',
		} = this.props.postsData

		const allSkills = skills.map(item => item).join(' | ')

		return (
			<div href="#" className="job-listing" onClick={this.handlePostClick}>

				{/* <!-- Job Listing Details --> */}
				<div className="job-listing-details">
					{/* <!-- Logo --> */}
					<div className="job-listing-company-logo">
						<img src={'https://png.pngtree.com/element_our/png_detail/20181011/facebook-social-media-icon-design-template-vector-png_126986.jpg' || ''} alt="" />
					</div>

					{/* <!-- Details --> */}
					<div className="job-listing-description">
						<h4 className="job-listing-company">{allSkills} <span className="verified-badge" title="Verified Employer" data-tippy-placement="top"></span></h4>
						<h3 className="job-listing-title">{title}</h3>
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

export class FreelancerPostsMapwise extends React.Component {
	constructor() {
		super()
		this.state = {
			postsData: [],
			address: '',
			unitSelected: 'kilometers',
			location: { lat: (ls.get('lat') || 0), lng: (ls.get('lng') || 0) },
			// location: { lat: 0, lng: 0 },
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
		this.getPostData = this.getPostData.bind(this)
		this.distanceChange = this.distanceChange.bind(this)
		this.onNearestClick = this.onNearestClick.bind(this)
		this.onPreviousClick = this.onPreviousClick.bind(this)
		this.onNextClick = this.onNextClick.bind(this)
		this.handleHiddenPostValue = this.handleHiddenPostValue.bind(this)
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

	handleHiddenPostValue() {
		alert('inside value change')
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('check component update', this.state.skip !== prevState.skip)
		if (this.state.skip !== prevState.skip || this.state.location !== prevState.location) {
			this.getPostData()
		}
	}

	onNearestClick() {
		this.setState({ location: { lat, lng }, distance: 2, unitSelected: 'kilometers' })
	}

	distanceChange(e) {
		this.setState({ distance: e.target.value })
	}

	handleSearch() {
		this.getPostData()
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

	getPostData() {
		const filter = {
			"offset": 0,
			"limit": this.state.limit,
			"skip": this.state.skip,
			'where': {},
			"fields": {
				"postId": true,
				"userId": true,
				"title": true,
				"description": true,
				"postLogo": true,
				"postBg": true,
				"files": true,
				"skills": true,
				"paymentType": true,
				"priceRange": true,
				"currency": true,
				"jobType": true,
				"jobCategory": true,
				"location": true,
				"address": true,
				"expectedDuration": true,
				"review": true,
				"avgRating": true,
				"createdDate": true,
				"questionnaire": true,
				"questionnaireSelected": true,
				"block": true,
				"view": true
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
		// }

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

		getPosts(filter, (err, res) => {


			if (err) {
				alert('Error in fetching post details!', err)
				return
			}
			if (res) {
				this.setState({ postsData: (Array.isArray(res) ? res : []) })
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

				console.log('Success', latLng)
			})
			.catch(error => {
				this.setState({ location: { lat: '', lng: '' } })
				console.error('Error', error)
			});
	};

	componentDidMount() {
		// loadjs(baseFrontenUrl+'/js/custom.js');
		loadjs(baseFrontenUrl+'/js/maps.js');
		
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
		this.getPostData()
	}

	// componentWillMount() {
	// 	loadjs(baseFrontenUrl + '/js/bootstrap-select.min.js');
	// 	loadjs(baseFrontenUrl + '/js/bootstrap-slider.min.js');
	// 	loadjs(baseFrontenUrl + '/js/chart.min.js');
	// 	loadjs(baseFrontenUrl + '/js/clipboard.min.js');
	// 	loadjs(baseFrontenUrl + '/js/counterup.min.js');
	// 	loadjs(baseFrontenUrl + '/js/counterup.min.js');
	// 	loadjs(baseFrontenUrl + '/js/custom.js');
	// 	loadjs(baseFrontenUrl + '/js/infobox.min.js');
	// 	loadjs(baseFrontenUrl + '/js/jquery-3.3.1.min.js');
	// 	loadjs(baseFrontenUrl + '/js/jquery-3.4.1.min.js');
	// 	loadjs(baseFrontenUrl + '/js/jquery-migrate-3.1.0.min.js');
	// 	loadjs(baseFrontenUrl + '/js/leaflet-autocomplete.js');
	// 	loadjs(baseFrontenUrl + '/js/leaflet-control-geocoder.js');
	// 	loadjs(baseFrontenUrl + '/js/leaflet-gesture-handling.min.js');
	// 	loadjs(baseFrontenUrl + '/js/leaflet-hireo.js');
	// 	loadjs(baseFrontenUrl + '/js/leaflet-markercluster.min.js');
	// 	loadjs(baseFrontenUrl + '/js/leaflet.min.js');
	// 	loadjs(baseFrontenUrl + '/js/magnific-popup.min.js');
	// 	loadjs(baseFrontenUrl + '/js/maps.js');
	// 	loadjs(baseFrontenUrl + '/js/markerclusterer.js');
	// 	loadjs(baseFrontenUrl + '/js/mmenu.min.js');
	// 	loadjs(baseFrontenUrl + '/js/simplebar.min.js');
	// 	loadjs(baseFrontenUrl + '/js/snackbar.js');
	// 	loadjs(baseFrontenUrl + '/js/tippy.all.min.js');
	// }

	render() {
		console.log('render********', this.state.postsData)
		let postData = {}

		let posts = (<div href="#" className="job-listing" onClick={this.handlePostClick}>
			<div className="job-listing-details">No {displayNameSettings.post} Found!</div>
		</div>)


		if (this.state.postsData && this.state.postsData.length) {
			posts = this.state.postsData.map((item, i) => {
				postData[i] = {
					"pagename": `post/${item.postId}`,
					"imageUrl": (item.postLogo && item.postLogo.url) || '',
					"title": item.title || '',
					"description": item.address || '',
					"status": "verified",
					"lat": item.location.lat || '',
					"lng": item.location.lng || '',
					"count": 6
				}

				return <PostSearchItem key={i} postsData={item} {...this.props} />
			})
		}


		postData = JSON.stringify(postData)

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

							{/* <!-- Salary --> */}
							{/* <div className="sidebar-widget"> */}
							{/* <h3>Salary</h3> */}
							{/* <div className="margin-top-55"></div> */}

							{/* <!-- Range Slider --> */}
							{/* <input className="range-slider" type="text" value="" data-slider-currency="$" data-slider-min="1500" data-slider-max="15000" data-slider-step="100" data-slider-value="[1500,15000]"/> */}
							{/* </div> */}

							{/* <!-- Tags --> */}
							{/* <div className="sidebar-widget">
					<h3>Tags</h3>

					<div className="tags-container">
						<div className="tag">
							<input type="checkbox" id="tag1"/>
							<label htmlFor="tag1">front-end dev</label>
						</div>
						<div className="tag">
							<input type="checkbox" id="tag2"/>
							<label htmlFor="tag2">angular</label>
						</div>
						<div className="tag">
							<input type="checkbox" id="tag3"/>
							<label htmlFor="tag3">react</label>
						</div>
						<div className="tag">
							<input type="checkbox" id="tag4"/>
							<label htmlFor="tag4">vue js</label>
						</div>
						<div className="tag">
							<input type="checkbox" id="tag5"/>
							<label htmlFor="tag5">web apps</label>
						</div>
						<div className="tag">
							<input type="checkbox" id="tag6"/>
							<label htmlFor="tag6">design</label>
						</div>
						<div className="tag">
							<input type="checkbox" id="tag7"/>
							<label htmlFor="tag7">wordpress</label>
						</div>
					</div>
					<div className="clearfix"></div>
				</div> */}

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
						{/* <input ref={input => this.inputElement = input} type="hidden" value={postData} id="myInput"></input> */}
						<input ref={this.inputRef} value={postData} onChange={this.handleHiddenPostValue} id='myInput' type="hidden" />
						{/* <input ref={input => this.inputElement = input} /> */}


						<div className="notify-box margin-top-15">
							<div className="switch-container">
								{/* <label className="switch"><input type="checkbox" /> */}
								{/* <span className="switch-button"></span> */}
								<span className="switch-text">Search result for your Nearest post</span>
								{/* </label> */}
							</div>

							{/* <div className="sort-by">
								<span>Sort by:</span>
								<select className="selectpicker hide-tick">
									<option>Relevance</option>
									<option>Newest</option>
									<option>Oldest</option>
									<option>Random</option>
								</select>
							</div> */}
						</div>

						<div className="listings-container grid-layout margin-top-35">

							{/* <!-- Job Listing --> */}
							{posts}
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
					{/* <div id="user" data-userId={}></div> */}
					{/* <!-- Map --> */}
					<div id="map" className="map" data-map-zoom="12" data-map-scroll="true"></div>
					{/* <MyMapComponent style={{height:'100%'}} isMarkerShown /> */}


				</div>
				{/* <!-- Full Page Map / End --> */}

			</div>

		</Fragment>);
	}
}
