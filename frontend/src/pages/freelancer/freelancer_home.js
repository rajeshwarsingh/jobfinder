import React, { Fragment, Component } from 'react'
import ls from 'local-storage'
import Select from 'react-select';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import auth from '../../Auth/auth'
import qs from 'qs'
import {getUsers, getUserById, getPosts, getServices} from '../../Actions'
import {daysDiffernce} from '../../utility/index'

export class FreelancerHome extends Component {

	constructor() {
		super()
		this.state = {
			skills: '',
			title:'',
			serviceData:[],
			postData:[],
			selectedProductType:'joblem'
		}
		this.onTitleChange = this.onTitleChange.bind(this)
		this.onSkillsChange = this.onSkillsChange.bind(this)
		this.onSearchClick = this.onSearchClick.bind(this)
		this.getPostData = this.getPostData.bind(this)
		this.onProductTypesChange = this.onProductTypesChange.bind(this)
	}

	onProductTypesChange(e) {
        this.setState({ selectedProductType: e.value })
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

	onSkillsChange(e){
		this.setState({skills:e.target.value})
	}
	
	onTitleChange(e){
		this.setState({title:e.target.value})
	}

	onSearchClick(){
		if(this.state.selectedProductType==='joblem'){
			return this.props.history.push(`/freelancer/posts?skills=${this.state.skills}&title=${this.state.skills}`)
		}
		if(this.state.selectedProductType==='joblot'){
			return this.props.history.push(`/freelancer/service_search?skills=${this.state.skills}&title=${this.state.skills}`)
		}
		
	}

	getServiceData(serviceIds) {

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
				"serviceLogo":true,
				"serviceBg":true,
				"files": true,
				"skills": true,
				"paymentType": true,
				"priceRange": true,
				"currency":true,
				"jobType": true,
				"jobCategory": true,
				"location": true,
				"address": true,
				"expectedDuration": true,
				"review": true,
				"avgRating": true,
				"createdDate": true,
				"block" : true,
    			"view" : true
			}
		}

		if(serviceIds){
			filter.where.or = serviceIds.split(',').map((item,i)=>{
				return { "serviceId": item }
			})
		}
		

		// order the result 
		if (this.state.selectedOrder) {
			filter.order = this.state.selectedOrder
		}
		getServices(filter, (err, res) => {

			if (err) {
				console.log('Error in fetching service details!', err)
				return this.notifyErr('Somethin went wrong!')
				
			}
			if (res) {
				this.setState({ serviceData: Array.isArray(res)?res:[] })
			}

		})
	}

	getPostData(postIds) {
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
				"postLogo":true,
				"postBg":true,
				"files": true,
				"skills": true,
				"paymentType": true,
				"priceRange": true,
				"currency":true,
				"jobType": true,
				"jobCategory": true,
				"location": true,
				"address": true,
				"expectedDuration": true,
				"review": true,
				"avgRating": true,
				"createdDate": true,
				"questionnaire" : true,
				"questionnaireSelected" : true,
				"block" : true,
				"view" : true
			}
		}

		if(postIds){
			filter.where.or = postIds.split(',').map((item,i)=>{
				return { "postId": item }
			})
		}
		

		getPosts(filter, (err, res) => {

			console.log('show all posts:', err, res)

			if (err) {
				alert('Error in fetching post details!', err)
				return
			}
			if (res) {
				this.setState({ postData: (Array.isArray(res)?res:[]) })
			}

		})
	}
	
	componentDidMount(){
			const filter = {
				"fields": {
					"id": true,
					"recentViewedPost": true,
					"recentViewedService": true,
					"recentViewedUser": true,
					"view": true,
					"nationality": true,
					"createdDate": true
				}
			}
			
			getUserById(ls.get('userId'),filter,(err, res) => {
				console.log('show all users:', err, res)
	
				if (err) {
					alert('1Error in fetching user details!', err)
					return
				}
				if (res) {
					console.log('##############################',res.recentViewedPost, res.recentViewedService)
						this.getPostData(res.recentViewedPost)
						this.getServiceData(res.recentViewedService)
					
				}
	
			})
		}

	render() {

		const productItem = [{
			label:'joblem',
			value:'joblem'
		},{
			label:"joblot",
			value:"joblot"
		}]

		const customStyles = {
            control: base => ({
                ...base,
                height: 48,
                minHeight: 48
            })
		};
		

		const recentServices = this.state.serviceData.map((item,i)=>{
			return (
				<div className="col-xl-4">
					<a href={`/freelancer/service/${item.serviceId}`} className="blog-compact-item-container">
						<div className={item.serviceBg}>
							<img src="images/blog-01a.jpg" alt="" />
							<span className="blog-item-tag">View</span>
							<div className="blog-compact-item-content">
								<ul className="blog-post-tags">
									<li>{daysDiffernce(item.createdDate,new Date())}</li>
								</ul>
								<h3>{item.title}</h3>
								<p>{item.description.substring(0,(item.description.length>=50)?50:item.description.length)}</p>
							</div>
						</div>
					</a>
				</div>)
		})
		console.log('******recent postData:', this.state.postData)
		const recentPosts = this.state.postData.map((item, i)=>{
			return (
				<a href={`freelancer/post/${item.postId}`} className="job-listing with-apply-button">

					{/* <!-- Job Listing Details --> */}
					<div className="job-listing-details">

						{/* <!-- Logo --> */}
						<div className="job-listing-company-logo">
							<img src={item.serviceLogo && item.serviceLogo.url} alt="" />
						</div>

						{/* <!-- Details --> */}
						<div className="job-listing-description">
							<h3 className="job-listing-title">{(item.title || '')}</h3>

							{/* <!-- Job Listing Footer --> */}
							<div className="job-listing-footer">
								<ul>
									<li><i className="icon-material-outline-business"></i> {item.jobType} <div className="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>
									<li><i className="icon-material-outline-location-on"></i> {item.address || ''}</li>
									<li><i className="icon-material-outline-business-center"></i> {item.jobCategory}</li>
									<li><i className="icon-material-outline-access-time"></i> {daysDiffernce(item.createdDate,new Date())} days ago</li>
								</ul>
							</div>
						</div>

						{/* <!-- Apply Button --> */}
						<span className="list-apply-button ripple-effect">Apply Now</span>
					</div>
				</a>)
		}) 
		return (
			<Fragment>

				{/* <!-- Intro Banner================================================== --> */}
				<div className="intro-banner dark-overlay big-padding">

					{/* <!-- Transparent Header Spacer --> */}
					<div className="transparent-header-spacer"></div>
					<ToastContainer
                    position="top-right"
                    autoClose={2000}
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

					<div className="container">

						{/* <!-- Intro Headline --> */}
						<div className="row">
							<div className="col-md-12">
								<div className="banner-headline-alt">
									<h3>Post, match book...</h3>
									<span>... and get the job done!</span>
								</div>
							</div>
						</div>

						{/* <!-- Search Bar --> */}
						<div className="row">
							<div className="col-md-12">
								<div className="intro-banner-search-form margin-top-95">

									{/* <!-- /Search Field --> */}
									{/* <div className="intro-search-field with-autocomplete">
										<label htmlFor="autocomplete-input" className="field-title ripple-effect">Job Title ?</label>
										<div className="input-with-icon">
											<input value ={this.state.title} onChange={this.onTitleChange} id="autocomplete-input" type="text" placeholder="Job Title ie. web development" />
										
										</div>
									</div> */}

									{/* <!-- Search Field --> */}
									<div className="intro-search-field">
										<label htmlFor="intro-keywords" className="field-title ripple-effect">What are you looking?</label>
										<input value={this.state.skills} onChange={this.onSkillsChange} id="intro-keywords" type="text" placeholder="Skills ie. java, tax, contract law, health & safty ..." />
									</div>

									

									{/* <div className="intro-search-button">
									<Select
										// placeholder=""
										value={productItem.find(obj => obj.value === this.state.selectedProductType)}
										options={productItem}
										onChange={this.onProductTypesChange}
										styles={customStyles}
										isSearchable={false}
									/>
									</div> */}

									{/* <!-- Button --> */}
									<div className="intro-search-button">
									<Select
										// placeholder=""
										value={productItem.find(obj => obj.value === this.state.selectedProductType)}
										options={productItem}
										onChange={this.onProductTypesChange}
										styles={customStyles}
										isSearchable={false}
									/>
										<button onClick={this.onSearchClick} className="button ripple-effect" >Search</button>
									</div>
								</div>
							</div>
						</div>

						{/* <!-- Stats --> */}
						{/* <div className="row">
							<div className="col-md-12">
								<ul className="intro-stats margin-top-45 hide-under-992px">
									<li>
										<strong className="counter">1,586</strong>
										<span>Jobs Posted</span>
									</li>
									<li>
										<strong className="counter">3,543</strong>
										<span>Tasks Posted</span>
									</li>
									<li>
										<strong className="counter">1,232</strong>
										<span>Freelancers</span>
									</li>
								</ul>
							</div>
						</div> */}

					</div>

					{/* <!-- Video Container --> */}
					<div className="video-container" data-background-image="images/home-video-background-poster.jpg">
						<video loop autoPlay muted>
							<source src="images/home-video-background.mp4" type="video/mp4" />
						</video>
					</div>

				</div>

				{/* <!-- Content */}
				{/* ================================================== --> */}
				{/* <!-- Features Jobs --> */}
				<div className="section padding-top-65 padding-bottom-75">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">

								{/* <!-- Section Headline --> */}
								<div className="section-headline margin-top-0 margin-bottom-35">
									<h3>Recent Joblems</h3>
									<a href="/freelancer/posts" className="headline-link">Browse All Joblems</a>
								</div>

								{/* <!-- Jobs Container --> */}
								<div className="listings-container compact-list-layout margin-top-35">

									{recentPosts}

								</div>
								{/* <!-- Jobs Container / End --> */}

							</div>
						</div>
					</div>
				</div>
				{/* <!-- Featured Jobs / End --> */}


				{/* <!-- Photo Section --> */}
				<div className="photo-section" data-background-image="images/section-background.jpg">

					{/* <!-- Infobox --> */}
					<div className="text-content white-font">
						<div className="container">

							<div className="row">
								<div className="col-lg-6 col-md-8 col-sm-12">
									<h2>The concept is so simple. <br /> It's Jobvious when you think about it.</h2>
									<p>Let's get the job done! Just post what you are looking for, find a math and book or get booked. It's that simple.</p>
									<a href="pages-pricing-plans.html" className="button button-sliding-icon ripple-effect big margin-top-20">Jobviously Explained <i className="icon-material-outline-arrow-right-alt"></i></a>
								</div>
							</div>

						</div>
					</div>

					{/* <!-- Infobox / End --> */}

				</div>
				{/* <!-- Photo Section / End --> */}


				{/* <!-- Recent Blog Posts --> */}
				<div className="section padding-top-65 padding-bottom-50">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">

								{/* <!-- Section Headline --> */}
								<div className="section-headline margin-top-0 margin-bottom-45">
									<h3>Recent Joblots</h3>
									<a href="/freelancer/service_search" className="headline-link">View Joblots</a>
								</div>

								<div className="row">
									{recentServices}
								</div>


							</div>
						</div>
					</div>
				</div>
				{/* <!-- Recent Blog Posts / End --> */}

				<div className="section border-top padding-top-45 padding-bottom-45">
					{/* <!-- Logo Carousel --> */}
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								{/* <!-- Carousel </div>--> */}
								<div className="col-md-12">
									<div className="logo-carousel">

										<div className="carousel-item">
											<a href="http://acmelogos.com/" target="_blank" title="http://acmelogos.com/"><img src="images/logo-carousel-01.png" alt="" /></a>
										</div>

										<div className="carousel-item">
											<a href="http://acmelogos.com/" target="_blank" title="http://acmelogos.com/"><img src="images/logo-carousel-02.png" alt="" /></a>
										</div>

										<div className="carousel-item">
											<a href="http://acmelogos.com/" target="_blank" title="http://acmelogos.com/"><img src="images/logo-carousel-03.png" alt="" /></a>
										</div>

										<div className="carousel-item">
											<a href="http://acmelogos.com/" target="_blank" title="http://acmelogos.com/"><img src="images/logo-carousel-04.png" alt="" /></a>
										</div>

										<div className="carousel-item">
											<a href="http://acmelogos.com/" target="_blank" title="http://acmelogos.com/"><img src="images/logo-carousel-05.png" alt="" /></a>
										</div>

										<div className="carousel-item">
											<a href="http://acmelogos.com/" target="_blank" title="http://acmelogos.com/"><img src="images/logo-carousel-06.png" alt="" /></a>
										</div>

									</div>
								</div>
								{/* <!-- Carousel / End --> */}
							</div>
						</div>
					</div>
				</div>
			</Fragment>)
	}
}

