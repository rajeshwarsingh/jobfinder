import React, { Fragment } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { daysDiffernce } from '../../utility/index'
import { createRating, getRatings, patchRating, createNotification } from '../../Actions'
import ls from 'local-storage'
import { ToastContainer, toast } from 'react-toastify';
export class Rating extends React.Component {
	constructor() {
		super();
		this.state = {
			setShow: false,
			setEditShow: false,
			rating: 1,
			ratingComment: '',
			ratingData: [],
			ratingFlag: 'new' //new or edit
		}
		this.handleClose = this.handleClose.bind(this)
		this.handleShow = this.handleShow.bind(this)

		this.handleEditClose = this.handleEditClose.bind(this)
		this.handleEditShow = this.handleEditShow.bind(this)

		this.handleRating = this.handleRating.bind(this)
		this.onRatingComment = this.onRatingComment.bind(this)
		this.handleRatingSubmit = this.handleRatingSubmit.bind(this)
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

	handleRatingSubmit() {
		console.log('check***',this.state.ratingFlag)
		if (this.state.ratingFlag === 'new') {
			let userDetails = JSON.parse(ls.get('userProfile'))
			let body = {
				type: this.props.type,
				userId: ls.get('userId'),
				userName: userDetails.firstName +' ' + userDetails.lastName,
				ratingTypeId: this.props.ratingTypeId,
				message: this.state.ratingComment,
				rating: (this.state.rating).toString()
			}
			alert(JSON.stringify(body))
			// return
			createRating(body, (err, res) => {
				if (err) {
					console.log('error in rating update:', err)
					this.notifyErr('someting went wrong!')
					return
				}

				// SENT NOTIFICATION TO OWNER
				// if(res.proposalId && this.state.passingQuesCount>=currect){
					let userProfile = ls.get('userProfile')
					userProfile = (userProfile.length)?JSON.parse(userProfile):{}  
					let readedUsers = []
					readedUsers.push(ls.get('userId'))
					let notifiyBody = {
						userId:ls.get('userId'),
						type:body.type,
						subtype:"rating-sent",
						data:res,
						notificationTypeId:body.ratingTypeId,
						message:`${userProfile.firstName} ${userProfile.lastName} has rate you`,
						status:"unread",
						createrUserId:this.props.ratingTypeId,
						readedUsers:readedUsers
					}
					createNotification(notifiyBody,()=>{})
				//   }

				// console.log('show api result:', err, res)
				this.handleClose()
				console.log('rating updated')
				this.notifySucc('rating updated!')
				setTimeout(() => {return window.location.reload()}, 1000)
				
				
			})
		}
		else if (this.state.ratingFlag == 'edit') {
			let body = {
				message: this.state.ratingComment,
				rating: (this.state.rating).toString()
			}
			// alert(JSON.stringify(body))
			patchRating(this.state.ratingData.ratingId, body, (err, res) => {
				if (err) {
					console.log('error in rating fetch:')
					this.notifyErr('something went wrong!')
					return
				}

				console.log('show api result:', err, res)
				this.handleClose()
				this.notifySucc('rating updated!')
				setTimeout(() => {return window.location.reload()}, 1000)
			})
		}

	}

	onRatingComment(e) {
		if(this.state.ratingComment.length >100) return alert("can't be greater that 100 characters")
		
		this.setState({ ratingComment: e.target.value })
	}

	handleRating(e) {
		// alert(e.target.value +)
		// console.log('check rating:', e.target.value)

		this.setState({ rating: e.target.value })
	}

	handleClose = () => this.setState({ setShow: false })
	
	handleShow = () => {
		this.setState({ setShow: true });
	}

	handleEditClose = () => this.setState({ setEditShow: false })
	
	handleEditShow = (e) => {
		this.setState({ setEditShow: true,rating: e.target.value });
	}

	componentDidMount() {

		
		let filter = {
			"offset": 0,
			"limit": 1,
			"skip": 0,
			"where": {
				userId: ls.get('userId'),
				type: this.props.type,
				ratingTypeId: this.props.ratingTypeId
			},
			"fields": {
				"ratingId": true,
				"type": true,
				"ratingTypeId": true,
				"message": true,
				"rating": true,
				"createdDate": true,
			}
		}
		getRatings(filter, (err, res) => {
			// console.log('check reating :', err, res);
			if (err) {
				console.log('error in rating fetch:')
				this.notifyErr('something went wrong!')
			}
			if (Array.isArray(res) && res.length) {
				// alert()
				this.setState({ ratingComment: res[0].message, rating: res[0].rating, ratingFlag: 'edit', ratingData: res[0] })
			}
			return
		})

		this.setState({setShow:this.props.setShow})
	}

	render() {
		// alert(this.state.rating+(parseInt(this.state.rating)>=4))
		const color = '#00B0F0'
		return (
			<Fragment>
				<div className="content">
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
					<ul className="dashboard-box-list">
						{!(this.state.ratingData && this.state.ratingData.ratingId) &&
							<li>
								<div className="boxed-list-item">
									{/* <!-- Content --> */}
									<div className="item-content">
										<h4>Review and Give Rating</h4>
										<span className="company-not-rated margin-bottom-5">Not Rated</span>
									</div>
								</div>

								<Button style={{ display: 'inline-block', backgroundColor: color, fontSize: '13px', fontWeight: '600', lineHeight: '20px' }} variant="primary" onClick={this.handleShow}>
									<i className="icon-material-outline-thumb-up"></i> Leave a Review
								</Button>&nbsp;

								<Modal show={this.state.setShow} onHide={this.handleClose}>
									<Modal.Header closeButton>
										{/* <div className="welcome-text"> */}
										{/* <!-- Welcome Text --> */}

									</Modal.Header>
									<Modal.Body>
										<div className="welcome-text">
											<h3>Leave a Review</h3>
											{/* <span>Rate <a href="#">Peter Valentín</a> for the project <a href="#">Simple Chrome Extension</a> </span> */}
										</div>
										<form method="post" id="change-review-form">
											<div className="feedback-yes-no">
												<strong>Your Rating</strong>
												<div className="leave-rating">
													{/* <input type="radio" name="rating" id="rating-1" value="1" onClick={this.handleRating} />
													<label for="rating-1" className="icon-material-outline-star" ></label>
													<input type="radio" name="rating" id="rating-2" value="2" onClick={this.handleRating} />
													<label for="rating-2" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-3" value="3" onClick={this.handleRating} />
													<label for="rating-3" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-4" value="4" onClick={this.handleRating} />
													<label for="rating-4" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-5" value="5" onClick={this.handleRating} />
													<label for="rating-5" className="icon-material-outline-star"></label> */}

													
													<input type="radio" name="rating" id="rating-5" value="5" onClick={this.handleRating} />
													<label for="rating-5" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-4" value="4" onClick={this.handleRating} />
													<label for="rating-4" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-3" value="3" onClick={this.handleRating} />
													<label for="rating-3" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-2" value="2" onClick={this.handleRating} />
													<label for="rating-2" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-1" value="1" onClick={this.handleRating} />
													<label for="rating-1" className="icon-material-outline-star" ></label>
												</div><div className="clearfix"></div>
											</div>

											<textarea value={this.state.ratingComment} onChange={this.onRatingComment} className="with-border" placeholder="Comment" name="message" id="message" cols="7" required></textarea>

										</form>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={this.handleClose}>
											Close
								</Button>
										<Button style={{ backgroundColor: color }} variant="primary" onClick={this.handleRatingSubmit}>
											Save Changes
								</Button>
									</Modal.Footer>
								</Modal>
							</li>}
						{this.state.ratingData && this.state.ratingData.ratingId &&
							<li>
								<div className="boxed-list-item">
									{/* <!-- Content --> */}
									<div className="item-content">
										<h4>Review and Edit Rating</h4>
										<div className="item-details margin-top-10">
											<div className="star-rating" data-rating={this.state.ratingData.rating}></div>
											<div className="detail-item"><i className="icon-material-outline-date-range"></i> {daysDiffernce(this.state.ratingData.createdDate, new Date())} days ago</div>
										</div>
										<div className="item-description">
											<p>{this.state.ratingData.message}</p>
										</div>
									</div>
								</div>
								<div><Button style={{ display: 'inline-block', backgroundColor: color, fontSize: '13px', fontWeight: '600', lineHeight: '20px' }} variant="primary" onClick={this.handleEditShow}>
									<i className="icon-material-outline-thumb-up"></i> Edit Review
								</Button>&nbsp;
								{false && <Button style={{ display: 'inline-block', backgroundColor: color, fontSize: '13px', fontWeight: '600', lineHeight: '20px' }} variant="primary" onClick={()=> this.props.history.push(`/allrating/${this.state.ratingData.ratingTypeId}`)}>
										<i className="icon-material-outline-thumb-up"></i> View all reviews
								</Button>}</div>
								<Modal show={this.state.setEditShow} onHide={this.handleEditClose}>
									<Modal.Header closeButton>
										{/* <div className="welcome-text"> */}
										{/* <!-- Welcome Text --> */}

									</Modal.Header>
									<Modal.Body>
										<div className="welcome-text">
											<h3>Leave a Review</h3>
											{/* <span>Rate <a href="#">Peter Valentín</a> for the project <a href="#">Simple Chrome Extension</a> </span> */}
										</div>
										<form method="post" id="change-review-form">
											<div className="feedback-yes-no">
												<strong>Your Rating</strong>
												<div className="leave-rating">
													{/* {alert(this.state.rating+'@@@@@@@@@@' +parseInt(this.state.rating)>=5)} */}
													<input type="radio" name="rating" id="rating-5" value="5" onClick={this.handleEditShow} checked={(parseInt(this.state.rating)>=5)} />
													<label for="rating-5" className="icon-material-outline-star"></label>
													
													<input type="radio" name="rating" id="rating-4" value="4" onClick={this.handleEditShow} checked={(parseInt(this.state.rating)>=4)} />
													<label for="rating-4" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-3" value="3" onClick={this.handleEditShow} checked={(parseInt(this.state.rating)>=3)} />
													<label for="rating-3" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-2" value="2" onClick={this.handleEditShow} checked={(parseInt(this.state.rating)>=2)} />
													<label for="rating-2" className="icon-material-outline-star"></label>
													<input type="radio" name="rating" id="rating-1" value="1" onClick={this.handleEditShow} checked={(parseInt(this.state.rating)>=1)} />
													<label for="rating-1" className="icon-material-outline-star" ></label>
													
												</div><div className="clearfix"></div>
											</div>

											<textarea value={this.state.ratingComment} onChange={this.onRatingComment} className="with-border" placeholder="Comment" name="message" id="message" cols="7" required></textarea>

										</form>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={this.handleEditClose}>
											Close
								</Button>
										<Button style={{ backgroundColor: color }} variant="primary" onClick={this.handleRatingSubmit}>
											Save Changes
								</Button>
									</Modal.Footer>
								</Modal>
							</li>}
					</ul>
				</div>
			</Fragment>
		)
	}

}

