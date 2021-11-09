import React from 'react'
import { Link } from 'react-router-dom'
import { deletePost } from '../../Actions'
import { daysDiffernce } from '../../utility/index'
import { Favourite } from './index'
import { BlockPost } from '../block/block_post'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export class PostDetailsSidebar extends React.Component {
	constructor() {
		super();
		this.state = {
			postData: {},
			wishlistId: '',
			isWishlisted: false,
			setShow: false,
		}
		this.handleClose = this.handleClose.bind(this)
		this.handleShow = this.handleShow.bind(this)
		this.handleDeletePost = this.handleDeletePost.bind(this)
		this.hadleClonePost = this.hadleClonePost.bind(this)
	}

	handleClose = () => this.setState({ setShow: false })
	handleShow = () => this.setState({ setShow: true })

	handleDeletePost() {
		this.handleClose()
		
		deletePost(this.props.postData.postId, (err, data) => {
			console.log(err, data)
			this.props.history.push('/hiremngr/post_manage_post')
		})
	}

	hadleClonePost() {
		this.props.history.push(`/hiremngr/post/clone/${this.props.postData.postId}`)
	}

	render() {
		let {
			postId,
			title='',
			userId="",
			NoOfWeeks,
			currency="",
			priceRange={min:"",max:""},
			address = '',
			profession = '',
			jobCategory,
			view = '0',
			createdDate,
			paymentType,
			workingPref,
			expectedDuration,
		} = this.props.postData


		const { userType = 'guest' } = this.props

		if (userType === 'hiremanager') {
			return (
				<div className="col-xl-4 col-lg-4">
					<div className="sidebar-container">
						<div className="sidebar-widget">
							<div className="job-overview">
								<button onClick={() => this.props.history.push(`/hiremngr/post_manage_bidders/${postId}?title=${title}&postId=${postId}&userId=${userId}&NoOfWeeks=${NoOfWeeks}&currency=${currency}&min=${priceRange.min}&max=${priceRange.max}&createdDate=${createdDate}`)} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">Show Bidders</button>
								<button onClick={this.hadleClonePost} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">Clone Post</button>
								<button onClick={() => this.props.history.push(`/create_quiz/${postId}`)} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">Add questionaire</button>
								<button onClick={this.handleShow} style={{ backgroundColor: '#dc3139' }} className="col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim">delete post</button>

								{/* confirmation modal */}
								<Modal show={this.state.setShow} onHide={this.handleClose}>
									<Modal.Header closeButton>
										<Modal.Title>Please confirm</Modal.Title>
									</Modal.Header>
									<Modal.Body>Once you delete the post, I will not restore.</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={this.handleClose}>
											Close
													</Button>
										<Button variant="danger" onClick={this.handleDeletePost}>
											Delete Post
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
											<i className="icon-material-outline-local-atm"></i>
											<span>Payment Type</span>
											<h5>{paymentType}</h5>
										</li>
										<li>
											<i className="icon-material-outline-local-atm"></i>
											<span>Currency</span>
											<h5>{currency}</h5>
										</li>
										<li>
											<i className="icon-material-outline-local-atm"></i>
											<span>Work Preference</span>
											<h5>{workingPref}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Date Posted</span>
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
		else if (userType === 'freelancer') {
			return (
				<div className="col-xl-4 col-lg-4">
					<div className="sidebar-container">
						<div className="sidebar-widget">
							<div className="job-overview">
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
											<span>profession</span>
											<h5>{profession}</h5>
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
											<span>Date Posted</span>
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
						<div className="sidebar-widget">

							{/* Favourite show */}
							<Favourite postData={this.props.postData} />

							{/* Block Post */}
							<BlockPost postData={this.props.postData} />
						</div>

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
											<span>profession</span>
											<h5>{profession}</h5>
										</li>

										<li>
											<i className="icon-material-outline-local-atm"></i>
											<span>Payment Type</span>
											<h5>{paymentType}</h5>
										</li>
										<li>
											<i className="icon-material-outline-access-time"></i>
											<span>Date Posted</span>
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
					</div>
				</div>
			)
		}


	}

}

