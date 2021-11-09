import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { getServiceById, getUserById, patchUser, patchService } from '../../../Actions'
import { ServiceDetailsSidebar, ServiceDetailsContent } from './index'
import ls from 'local-storage'
import qs from 'qs'
import config from '../../../config'
const { defaultLogo, defaultBg } = config.service

export class ServiceDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			serviceData: {},
			userType:'guest'
		}

	}

	componentDidMount() {
		const serviceId = this.props.match.params.serviceId
		
		// Identify User Type
		let search = this.props.history.location.search
		if (search.length && search[0] === '?') {
			search = search.substr(1, search.length)
			search = qs.parse(search);
		}

		let { userType='guest' } = search
		if(userType === 'creater'){
			userType = 'creater'
		}else if(ls.get('userId')){
			userType = 'user'
		}else{
			userType = 'guest'
		}

		getServiceById(serviceId, {}, (err, res) => {
			if (err) {
				alert(err)
				return
			}
			if (res && res.serviceId) {
				userType = res.userId && res.userId === ls.get('userId')?'creater':'user'
				this.setState({ serviceData: res, userType })
			}
			//UPDATE service VIEW
			if (res.view || res.view === '0' || res.view===0) {
				let view = parseInt(res.view)
				if (typeof view === 'number') {
					view = view + 1
					patchService(serviceId, { view: view.toString() }, () => {
						// log here
					})
				}
			}

		})

		//UPDATE USER RECENT VIEW
		let filter = {
			"offset": 0,
			"limit": 100,
			"skip": 0,
			"fields": {
				"userId": true,
				"id": true,
				"recentViewedService": true
			}
		}
		getUserById(ls.get('userId'), filter, (err, data) => {
			// console.log('check user detsils for view:', err, data)
			if (err) {
				console.log('Error in user fetch', err)
				return;
			}
			if (data.id) {
				let recentViewedService = (data.recentViewedService || '').split(',')
				
				//check service already exist
				if(recentViewedService.includes(serviceId)) return


				if (recentViewedService.length >= 3) recentViewedService.shift()
				recentViewedService.push(serviceId)
				recentViewedService = recentViewedService.join(',')
				// patchUser
				patchUser(ls.get('userId'), { recentViewedService }, (errU, resU) => {
					console.log('recent view updated successfully!')
				})
			}
		})
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

	render() {
		// console.log('service details state: ', this.state)
		
		let {
			serviceId,
			serviceLogo = { url: '' },
			serviceBg = { url: '' },
			title,
			description,
			files,
			skills = [],
			location,
			address,
			priceRange = { min: '', max: '' },
			jobType,
			jobCategory,
			expectedDuration = '',
			paymentType = '',
			avgRating = '1',
			currency = '',
			questionnaireSelected = '',
			time = '' } = this.state.serviceData

		let supportDoc = (files || []).map((item, i) => {
			return <div><a href={item.url} download>{item.fileName}</a></div>
		})

		const allSkills = skills.map(item => item).join(' | ')

		let logoImg = serviceLogo.url || defaultLogo

		let logoBg = serviceBg.url || defaultBg

		return (<Fragment>

			{/* <!-- Titlebar================================================== --> */}
			<div className="single-page-header" data-background-image={logoBg}>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="single-page-header-inner">
								<div className="left-side">
									<div className="header-image"><a href="single-company-profile.html"><img src={logoImg} alt="" /></a></div>
									<div className="header-details">
										<h3>{title}</h3>
										{/* <h5>About the Employer</h5> */}
										<ul>
											<li><a href="single-company-profile.html"><i className="icon-material-outline-business"></i>{jobCategory}</a></li>
											{/* <li><div className="star-rating" data-rating={avgRating}></div></li> */}
											{/* <li>Job Type : {jobType} </li> */}
											<div><span>Skills : {allSkills}</span>

											</div>


											{/* <li><img className="flag" src={require("../../assets/images/flags/gb.svg")} alt="" /> United Kingdom</li> */}
											{questionnaireSelected && <li><div className="verified-badge-with-title">Need to qualify</div></li>}
										</ul>
									</div>
								</div>
								<div className="right-side">
									<div className="salary-box">
									<div className="salary-type"><Link  to={`/freelancer/service/edit/${this.state.serviceData.serviceId}`}><i className='icon-feather-edit'/> Edit Joblot</Link></div>
									<div className="salary-type">Price</div>
										<div className="salary-amount">{`${priceRange.min}/${currency}`}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


			{/* <!-- Page Content================================================== --> */}
			<div className="container">
				<div className="row">

					{/* <!-- Content --> */}
					<ServiceDetailsContent userType={this.state.userType} {...this.props} serviceData={this.state.serviceData} />

					{/* <!-- Sidebar --> */}
					<ServiceDetailsSidebar userType={this.state.userType} {...this.props} serviceData={this.state.serviceData} />

				</div>
			</div>

		</Fragment>);
	}
}
