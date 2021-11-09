import React, { Fragment } from 'react'
import ls from 'local-storage'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { deleteService, getServiceById, addWishlist, getWishlist, deleteWishlist } from '../../../Actions'
import { daysDiffernce } from '../../../utility/index'
import { FavouriteService } from './index'
import { BlockService } from '../../../Components/block/block_service'
import { Rating } from '../../../Components/rating/rating'
import { FraudReport } from '../../../Components/fraud_report/fraud_report'

export class ServiceDetailsSidebar extends React.Component {
	constructor() {
		super();
		this.state = {
			serviceData: {},
			wishlistId: '',
			isWishlisted: false,
			setShow: false,
		}

		this.handleClose = this.handleClose.bind(this)
		this.handleShow = this.handleShow.bind(this)
		this.handleDeleteService = this.handleDeleteService.bind(this)
		this.hadleCloneService = this.hadleCloneService.bind(this)
	}



	handleClose = () => this.setState({ setShow: false })
	handleShow = () => this.setState({ setShow: true })

	handleDeleteService() {
		this.handleClose()

		deleteService(this.props.serviceData.serviceId, (err, data) => {
			console.log(err, data)
			this.props.history.push('/freelancer/service_list')
		})
	}

	hadleCloneService() {
		this.props.history.push(`/freelancer/service/clone/${this.props.serviceData.serviceId}`)
	}

	render() {

		let {
			serviceId,
			address = '',
			jobType,
			jobCategory,
			profession,
			view = '',
			createdDate,
			paymentType,
			expectedDuration,
			workingPref = "",
		} = this.props.serviceData

		const { userType = 'guest' } = this.props

		if (userType === 'creater') {
			return (
				<div className="col-xl-4 col-lg-4">
					<div className="sidebar-container">
						<div className="sidebar-widget">
							<div className="job-overview">
								<button onClick={() => this.props.history.push(`/freelancer/service_manage_bidders/${serviceId}`)} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">Show Bidders</button>
								<button onClick={this.hadleCloneService} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">Clone Service</button>
								<button onClick={this.handleShow} style={{ backgroundColor: '#dc3139' }} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">delete Service</button>
								{/* confirmation modal */}
								<Modal show={this.state.setShow} onHide={this.handleClose}>
									<Modal.Header closeButton>
										<Modal.Title>Please confirm</Modal.Title>
									</Modal.Header>
									<Modal.Body>Once you delete the Service, I will not restore.</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={this.handleClose}>
											Close
										</Button>
										<Button variant="danger" onClick={this.handleDeleteService}>
											Delete Service
										</Button>
									</Modal.Footer>
								</Modal>
								{/* end */}
								<div className="job-overview-headline">Job Summary</div>
								<div className="job-overview-inner">
									<ul>
										<li>
											<i className="icon-material-outline-location-on"></i>
											<span>Location</span>
											<h5>{address}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Industry</span>
											<h5>{jobCategory}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Profession</span>
											<h5>{profession}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Work Preference</span>
											<h5>{workingPref}</h5>
										</li>
										<li>
											<i className="icon-material-outline-local-atm"></i>
											<span>Payment Type</span>
											<h5>{paymentType}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Expected Duration</span>
											<h5>{expectedDuration} days</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Date Service</span>
											<h5>{daysDiffernce(createdDate, new Date())} days ago</h5>
										</li>

										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Views</span>
											<h5>{view}</h5>
										</li>

									</ul>
								</div>
							</div>
						</div>

						{/* <!-- Sidebar Widget --> */}
						<div className="sidebar-widget">

						</div>

					</div>
				</div>
			)
		}
		else if (userType === 'user') {
			return (
				<div className="col-xl-4 col-lg-4">
					<div className="sidebar-container">

						<div className="sidebar-widget">
							<div className="job-overview">
								<button onClick={() => this.props.history.push(`/appointment/${serviceId}`)} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">Show Calendar</button>
								<div className="job-overview-headline">Job Summary</div>
								<div className="job-overview-inner">
									<ul>
										<li>
											<i className="icon-material-outline-location-on"></i>
											<span>Location</span>
											<h5>{address}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Industry</span>
											<h5>{jobCategory}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Profession</span>
											<h5>{profession}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Work Preference</span>
											<h5>{workingPref}</h5>
										</li>
										<li>
											<i className="icon-material-outline-local-atm"></i>
											<span>Payment Type</span>
											<h5>{paymentType}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Expected Duration</span>
											<h5>{expectedDuration} days</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Date Service</span>
											<h5>{daysDiffernce(createdDate, new Date())} days ago</h5>
										</li>

										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Views</span>
											<h5>{view}</h5>
										</li>

									</ul>
								</div>
							</div>
						</div>

						{/* <!-- Sidebar Widget --> */}
						<div className="sidebar-widget">

							{/* FavouriteService show */}
							<FavouriteService serviceData={this.props.serviceData} />


						</div>
						<div className="sidebar-widget">
							<Rating {...this.props} type='post' ratingTypeId="" serviceData={this.props.serviceData} />
						</div>
						<div className="sidebar-widget">
							<FraudReport {...this.props} serviceData={this.props.serviceData} />
						</div>
						{/* end */}
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="col-xl-4 col-lg-4">
					<div className="sidebar-container">

						<div className="sidebar-widget">
							<div className="job-overview">
								<Link to='/login' className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">Go to Login</Link>
								<div className="job-overview-headline">Job Summary</div>
								<div className="job-overview-inner">
									<ul>
										<li>
											<i className="icon-material-outline-location-on"></i>
											<span>Location</span>
											<h5>{address}</h5>
										</li>
										<li>
											<i className="icon-material-outline-business-center"></i>
											<span>Job Type</span>
											<h5>{jobType}</h5>
										</li>

										<li>
											<i className="icon-material-outline-local-atm"></i>
											<span>Payment Type</span>
											<h5>{paymentType}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Expected Duration</span>
											<h5>{expectedDuration}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Date Service</span>
											<h5>{daysDiffernce(createdDate, new Date())} days ago</h5>
										</li>

										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Views</span>
											<h5>{view}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Project Category</span>
											<h5>{jobCategory}</h5>
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* <!-- Sidebar Widget --> */}

					</div>
				</div>
			)
		}


	}

}

