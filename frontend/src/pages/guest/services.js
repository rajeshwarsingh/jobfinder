import config from '../../config'
import ls from 'local-storage'
import React, { Fragment } from 'react'
import { getServices, countServices } from '../../Actions'
import { Industry_sectors } from '../../utility/master_data'
import { ServiceSearchItem } from '../freelancer/service'
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify'
import qs from 'qs'
var Spinner = require('react-spinkit')
var loadjs = require('loadjs');
const {displayNameSettings, baseFrontenUrl} =config
let lat = null, lng = null;

export class Services extends React.Component {
	constructor() {
		super()
		this.state = {
			servicesData: [],
			title: '',
			skills: [],
			skillItem: '', //need for ui skills input
			jobType: '',
			selctedJobCategory: '',
			selectedOrder: '',
			limit: 10,
			skip: 0,
			currentPage: 1,
			isClearFilter:false,
			serviceCount:0,
			spinner:false,
		}
		this.onTitle = this.onTitle.bind(this)
		this.getPostData = this.getPostData.bind(this)
		this.skillItemChange = this.skillItemChange.bind(this)
		this.OnSkillItemClicked = this.OnSkillItemClicked.bind(this)
		this.onJobCategoryChange = this.onJobCategoryChange.bind(this)
		this.orderTypeChange = this.orderTypeChange.bind(this)
		this.onPreviousClick = this.onPreviousClick.bind(this)
		this.onNextClick = this.onNextClick.bind(this)
		this.clearFilter = this.clearFilter.bind(this)
	}

	notifyErr = (msg) => toast.error(msg, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	notifySucc = (msg) => toast.success(msg, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	// componentWillMount() {
	// 	loadjs(baseFrontenUrl+'/js/bootstrap-select.min.js');
	// 	loadjs(baseFrontenUrl+'/js/bootstrap-slider.min.js');
	// 	loadjs(baseFrontenUrl+'/js/chart.min.js');
	// 	loadjs(baseFrontenUrl+'/js/clipboard.min.js');
	// 	loadjs(baseFrontenUrl+'/js/counterup.min.js');
	// 	loadjs(baseFrontenUrl+'/js/counterup.min.js');
	// 	loadjs(baseFrontenUrl+'/js/custom.js');
	// 	loadjs(baseFrontenUrl+'/js/infobox.min.js');
	// 	loadjs(baseFrontenUrl+'/js/jquery-3.3.1.min.js');
	// 	loadjs(baseFrontenUrl+'/js/jquery-3.4.1.min.js');
	// 	loadjs(baseFrontenUrl+'/js/jquery-migrate-3.1.0.min.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-autocomplete.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-control-geocoder.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-gesture-handling.min.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-hireo.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-markercluster.min.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet.min.js');
	// 	loadjs(baseFrontenUrl+'/js/magnific-popup.min.js');
	// 	loadjs(baseFrontenUrl+'/js/maps.js');
	// 	loadjs(baseFrontenUrl+'/js/markerclusterer.js');
	// 	loadjs(baseFrontenUrl+'/js/mmenu.min.js');
	// 	loadjs(baseFrontenUrl+'/js/simplebar.min.js');
	// 	loadjs(baseFrontenUrl+'/js/snackbar.js');
	// 	loadjs(baseFrontenUrl+'/js/tippy.all.min.js');
	// }

	clearFilter() {
		this.setState({
			title: '', skills: [], selctedJobCategory: '', selectedOrder: '', isClearFilter:true,
		})

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
		// if (this.state.skip !== prevState.skip || this.state.selectedOrder !== prevState.selectedOrder || this.state.selctedJobCategory !== prevState.selctedJobCategory) {
		if (this.state.skip !== prevState.skip || this.state.selectedOrder !== prevState.selectedOrder || this.state.selctedJobCategory !== prevState.selctedJobCategory) {
			this.getPostData()
		}
	}

	getPostData() {
		this.setState({spinner:true})
		const filter = {
			"offset": 0,
			"limit": this.state.limit,
			"skip": this.state.skip,
			'where': {},
			"fields": {
				"serviceId": true,
				"userId": true,
				"title": true,
				"description": true,
				"serviceLogo": true,
				"serviceBg": true,
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

		if (this.state.title) {
			count.title = {
				"like": `${this.state.title}.*`, "options": "i"
			}
		}

		if (this.state.skills.length) {
			count.skills = { "inq": this.state.skills }
		}

		if (this.state.selctedJobCategory) {
			count.jobCategory = this.state.selctedJobCategory
		}

		if (this.state.selectedOrder === 'nearest') {
			count.location = {
				near: {
					lat: lat,
					lng: lng
				}
			}
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

		// order the result 
		if (this.state.selectedOrder) {
			filter.order = this.state.selectedOrder
		}
		getServices(filter, (err, res) => {

			console.log('show all services:', err, res)

			if (err) {
				console.log('Error in fetching service details!', err)
				this.notifyErr('something went wrong!, try in sometime!')
				return
			}
			countServices(filter.where,(countErr, count)=>{
				if (res) {
					this.setState({ servicesData: Array.isArray(res) ? res : [], isClearFilter:false, serviceCount:count.count, spinner:false })
				}
			})
		})
	}

	componentDidMount() {
		let search = this.props.history.location.search
		if (search.length && search[0] === '?') {
			search = search.substr(1, search.length)
			search = qs.parse(search);
		}

		const { title = '', msg = '', login = false, skills = '' } = search
		
		//set based on preference
		this.setState({
			title: (title ? title : ''),
			skills: skills ? skills.split(',') : []
		})

		if(!ls.get('lat') || !ls.get('lng')){
			navigator.geolocation.getCurrentPosition(function (position) {
				ls.set('lng', position.coords.longitude)
				ls.set('lat', position.coords.latitude)
				lng= position.coords.longitude
				 lat = position.coords.latitude
			});
		}else{
			lat =ls.get('lat')
			lng =ls.get('lng')
		}
		

		setTimeout(() => this.getPostData(), 1000)

	}

	render() {
		const customStyles = {
			control: base => ({
				...base,
				height: 48,
				minHeight: 48
			}),
			indicatorsContainer: (provided, state) => ({
				...provided,
				height: '30px',
			  }),
		};

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
		{ label: 'nearest', value: 'nearest' }]

		const skills = this.state.skills.map((item, i) => {
			return (<span key={i} className='keyword'>
				<span onClick={() => {
					let newSkills = this.state.skills
					const index = newSkills.indexOf(item);
					if (index > -1) {
						newSkills.splice(index, 1);
						this.setState({ skills: newSkills })
					}

				}} key={i} className='keyword-remove' style={{ 'height': 'auto' }}></span>
				<span key={i} className='keyword-text'>{item}</span>
			</span>)
		})

		const services = this.state.servicesData.length?(this.state.servicesData.map((item, i) => {
			return <ServiceSearchItem key={i} servicesData={item} {...this.props} />
		})) : (<div className="col-xl-6 col-md-6">
			<div className="notification error">
				<p>No {displayNameSettings.service} found!</p>

			</div>
		</div>)
		
		return (<Fragment>

			{/* <!-- Page Content================================================== --> */}
			<div className="full-page-container">
				<ToastContainer
					position="top-right"
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
				<div className="full-page-sidebar">
					<div className="full-page-sidebar-inner" data-simplebar>
						<div className="sidebar-container">

							{/* <!-- Location --> */}
							<div className="sidebar-widget">
								<div className="input-with-icon">
									<div id="autocomplete-container">
										{/* <button onClick={() => this.props.history.push('/freelancer/services_mapwise')} className="button ripple-effect">Search {displayNameSettings.service} in Map</button> */}
									</div>
								</div>
							</div>
							<div className="sidebar-widget">
								<button onClick={this.clearFilter} className="button ripple-effect">Clear Filter</button>
							</div>
							<div className="sidebar-widget">
								<h3>{displayNameSettings.service} title</h3>
								<div className="input-with-icon">
									<div id="autocomplete-container">
										<input id="autocomplete-input" value={this.state.title} onChange={this.onTitle} type="text" placeholder="Job Title" />
									</div>
								</div>
							</div>

							{/* <!-- Keywords --> */}
							<div className="sidebar-widget">
								<h3>Skills</h3>
								<div className="keywords-container">
									<div className="keyword-input-container">
										<input value={this.state.skillItem} onChange={this.skillItemChange} type="text" className="keyword-input with-border" placeholder="e.g. job title, responsibilites" />
										<button onClick={this.OnSkillItemClicked} className="keyword-input-button ripple-effect"><i className="icon-material-outline-add"></i></button>
									</div>
									<div className="keywords-list" style={{ 'maxHeight': 'auto', 'height': 'auto' }}>
										{skills}
									</div>
									<div className="clearfix"></div>
								</div>
							</div>

							{/* <!-- Category --> */}
							<div className="sidebar-widget">

								<h5>Industry</h5>
								<Select
									placeholder="Select Category"
									value={Industry_sectors.find(obj => obj.value === this.state.selctedJobCategory)}
									options={Industry_sectors}
									onChange={this.onJobCategoryChange}
									styles={customStyles}
									isSearchable={false}
									captureMenuScroll={false}
								/>
							</div>
							<div style={{height:160}}></div>
							

							{/* <!-- Job Types --> */}
							
							</div>
						{/* <!-- Sidebar Container / End --> */}

						{/* <!-- Search Button --> */}
						<div className="sidebar-search-button-container">
							<button onClick={this.getPostData} className="button ripple-effect">Search</button>
						</div>
						{/* <!-- Search Button / End--> */}

					</div>
				</div>
				{/* <!-- Full Page Sidebar / End --> */}

				{/* <!-- Full Page Content --> */}
				<div className="full-page-content-container" data-simplebar>
					<div className="full-page-content-inner">

						<h3 className="page-title">Search {displayNameSettings.service}s</h3>

						<div className="notify-box margin-top-15">

							<Select
								placeholder="Sort By"
								value={orderData.find(obj => obj.value === this.state.selectedOrder)}
								options={orderData}
								onChange={this.orderTypeChange}
								styles={customStyleSrt}
								isSearchable={false}
							/>
							{/* </div> */}
						</div>

						<div className="listings-container grid-layout margin-top-35">
						{this.state.spinner && <Spinner name="line-scale" color="blue"/>}
							{services}

						</div>

						{/* <!-- Pagination --> */}
						<div className="clearfix"></div>
						<div className="pagination-container margin-top-20 margin-bottom-20">
							<nav className="pagination">
								<ul>
									<li onClick={this.onPreviousClick} className="pagination-arrow"><a className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li>
									<li ><a className="ripple-effect current-page">{this.state.currentPage}</a></li>
									{(this.state.currentPage*this.state.limit)<this.state.serviceCount && <li onClick={this.onNextClick} className="pagination-arrow"><a className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>}
								</ul>
							</nav>
						</div>
						<div className="clearfix"></div>
						{/* <!-- Pagination / End --> */}

						{/* <!-- Footer --> */}
						<div className="small-footer margin-top-15">
							<div className="small-footer-copyrights">
								© 2021 <strong>jobviously</strong>. All Rights Reserved.
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

			</div>
		</Fragment>);
	}
}
