import React, { Fragment } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createFraudReport, getFraudReports } from '../../Actions'
import ls from 'local-storage'

export class FraudReport extends React.Component {
	constructor() {
		super();
		this.state = {
			fraudreportData:[],
			setShow: false,
			reportMessage:''
		}

		this.handleClose = this.handleClose.bind(this)
		this.handleShow = this.handleShow.bind(this)
		this.handleReportfraud = this.handleReportfraud.bind(this)
		this.onReportMessage = this.onReportMessage.bind(this)
	}

	onReportMessage(e) {
		this.setState({ reportMessage: e.target.value })
	}

	handleReportfraud() {
			let userDetails = JSON.parse(ls.get('userProfile'))
			let body = {
				type: 'service',
				userId: ls.get('userId'),
				userName: userDetails.firstName + ' ' + userDetails.lastName,
				fraudReportTypeId: this.props.serviceData.serviceId,
				message: this.state.reportMessage
			}
			createFraudReport(body, (err, res) => {
				if (err) {
					alert('error in rating update:', err)
					return
				}

				console.log('show api result:', err, res)
				this.handleClose()
				alert('rating updated')
				window.location.reload()
				return
			})

	}

	handleClose = () => this.setState({ setShow: false })
	handleShow = () => this.setState({ setShow: true })

	componentDidMount() {
		let filter = {
			"offset": 0,
			"limit": 1,
			"skip": 0,
			"where": {
				userId: ls.get('userId'),
				type: 'service',
				fraudReportTypeId: this.props.serviceData.serviceId
			},
			"fields": {
				"fraudReportId": true,
				"type": true,
				"fraudReportTypeId": true,
				"message": true,
				"createdDate": true,
			}
		}
		getFraudReports(filter, (err, res) => {
			console.log('check reating :', err, res);
			if (err) {
				alert('error in rating fetch:')
			}
			if (Array.isArray(res) && res.length) {
				this.setState({ fraudreportData: res })
			}
			return
		})
	}


	render() {
		const color = '#00B0F0'
		return (
			<Fragment>
				<div className="content">
					<ul className="dashboard-box-list">
						<li>
							<div className="boxed-list-item">
								{/* <!-- Content --> */}
								<div className="item-content">
									<h4>Report</h4><br />
									{/* <a href="#small-dialog-2" className="popup-with-zoom-anim button ripple-effect margin-top-5 margin-bottom-10"><i className="icon-material-outline-thumb-up"></i> Report this service</a> */}
									{this.state.fraudreportData.length<=0 && <Button style={{ display: 'inline-block', backgroundColor: color, fontSize: '13px', fontWeight: '600', lineHeight: '20px' }} variant="primary" onClick={this.handleShow}>
										<i className="icon-material-outline-thumb-up"></i> Report this service
									</Button>}
									{this.state.fraudreportData.length>0 && <b>Already sent!</b>}

									<Modal show={this.state.setShow} onHide={this.handleClose}>
										<Modal.Header closeButton>
											{/* <div className="welcome-text"> */}
											{/* <!-- Welcome Text --> */}

										</Modal.Header>
										<Modal.Body>
											<div className="welcome-text">
												<h3>Leave your message</h3>
												{/* <span>Rate <a href="#">Peter Valentín</a> for the project <a href="#">Simple Chrome Extension</a> </span> */}
											</div>
											<form method="post" id="change-review-form">
												<div className="feedback-yes-no">
													<strong>report</strong>
													<div className="clearfix"></div>
												</div>

												<textarea value={this.state.reportMessage} onChange={this.onReportMessage} className="with-border" placeholder="Message" name="message" id="message" cols="7" required></textarea>

											</form>
										</Modal.Body>
										<Modal.Footer>
											<Button variant="secondary" onClick={this.handleClose}>
												Close
											</Button>
											<Button style={{ backgroundColor: color }} variant="primary" onClick={this.handleReportfraud}>
												Send
											</Button>
										</Modal.Footer>
									</Modal>
								</div>
							</div>


						</li>
					</ul>
				</div>
			</Fragment>
		)


	}

}

