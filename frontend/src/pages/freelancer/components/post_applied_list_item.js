import React from 'react'
import { daysDiffernce } from '../../../utility/index'
import { Link } from 'react-router-dom'
import { Rating } from '../../../Components/rating/rating'
import { changeProposalStatus } from '../../../Actions'

export class PostAppliedListItem extends React.Component {
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
    this.handlePostClick = this.handlePostClick.bind(this)
    this.handleCheckIn = this.handleCheckIn.bind(this)
  }

  convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
  }

  checkDays(workingHours) {

    let todays = new Date().getDay()
    let msg = "Not schedule, come later!"
    Object.keys(workingHours).forEach((key) => {
      let day
      switch (key) {
        case 'sun':
          day = 0;
          break;
        case 'mon':
          day = 1;
          break;
        case 'tue':
          day = 2;
          break;
        case 'wed':
          day = 3;
          break;
        case 'thu':
          day = 4;
          break;
        case 'fri':
          day = 5;
          break;
        case 'sat':
          day = 6;
          break;
        default:
          day = 0;
      }

      if (todays === day) {
        var d = new Date();
        let currTime = (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds())
        if (currTime >= workingHours[key]['start'] && currTime <= workingHours[key]['end']) {
          msg = 'progress'
        } else if (currTime < workingHours[key]['start']) {
          msg = 'will start soon'
        } else if (currTime > workingHours[key]['start']) {
          msg = 'over'
        } else { }


      }
    })

    return msg;
  }

  checkNextSession(calendarEvent, workingHours) {
    let msg = "Not schedule, come later!"
    var start = new Date(calendarEvent.start);
    var end = new Date(calendarEvent.end);
    var today = new Date()
    console.log("##############check:", calendarEvent, today, start, end, today >= start && today <= end)
    if (today >= start && today <= end) {

      msg = this.checkDays(workingHours)

    } else {
    }

    return msg
  }


  handlePostClick() {
    this.props.history.push(`/freelancer/post_applied_manage_bid/${this.props.data.postId}`)
  }

  handleCheckIn() {
    
    
    
    let body = {
      checkInTime : new Date(),
      isCheckIn : "checkin",
      checkoutTime : ""
    }

    if(this.props.data.postDetails.isCheckIn==='checkin'){
      body.isCheckIn = "checkout"
      body.checkoutTime = new Date()
    }
    
    changeProposalStatus(this.props.data.postDetails.proposalId, body,(err,res)=>{
      console.log("*********************",err, res)
      window.location.reload()
    })
  }

  render() {
    const mystyle = {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px"
    }

    const {
      postId = '',
      title,
      description,
      skills,
      postLogo = { url: '' },
      paymentType,
      jobCategory,
      currency = 'INR',
      createdDate = '',
      workingHours = { mon: {}, tue: {}, wed: {}, thu: {}, fri: {}, sat: {}, sun: {} },
      NoOfWeeks = "",

    } = this.props.data

    const { zoomMeetingUrls = {}, calendarEvent = { start: "", end: "" }, subscribe = false, currentProposalStatus, finalProposalRequest = { amount: "", days: "", bookingAmount: "", PendingAmount: "" }, isCheckIn = false,checkInTime="",
    checkoutTime="", } = (this.props.data && this.props.data.postDetails) ? this.props.data.postDetails : {}

    const start_url = zoomMeetingUrls.start_url
    const join_url = zoomMeetingUrls.start_url
    const start = (calendarEvent.start ? new Date(calendarEvent.start).toDateString() : ""), end = (calendarEvent.end ? new Date(calendarEvent.end).toDateString() : ""), days = "";

    const showWorkingHours = Object.keys(workingHours).map((item, i) => {
      return (
        <span>
          {item} : {this.convertHMS(workingHours[item].start)} - {this.convertHMS(workingHours[item].end)} /
        </span>
      )
    })

    let allSkills = (skills ? skills : []).map((skill, i) => {
      return <span>{skill}</span>
    })
    let msg = this.checkNextSession(calendarEvent, workingHours)
    if (msg === "over" && this.state.count === 0) {
      this.getRatingDetails(this.state.proposalDetails.userId)
      this.setState({ count: this.state.count + 1 })
    }

    let status =
      currentProposalStatus === 'not-send' ? <span className='dashboard-status-button green'>Not send</span> :
        currentProposalStatus === 'rejected-by-creater' ? <span className='dashboard-status-button green'>Rejected by creater</span> :
          currentProposalStatus === 'sent' ? <span className='dashboard-status-button green'>Sent</span> :
            currentProposalStatus === 'revised' ? <span className='dashboard-status-button green'>Revised</span> :
              currentProposalStatus === 'revised-by-creater' ? <span className='dashboard-status-button green'>Revised by creater</span> :
                currentProposalStatus === 'rejected' ? <span className='dashboard-status-button green'>Rejected</span> :
                  currentProposalStatus === 'rejected-by-creater' ? <span className='dashboard-status-button green'>Rejected</span> :
                    currentProposalStatus === 'attempted-pay' ? <span className='dashboard-status-button green'>Payment Attempted</span> :
                      currentProposalStatus === 'accepted' ? <span className='dashboard-status-button green'>Accepted</span> :
                        currentProposalStatus === 'accepted-by-creater' ? <span className='dashboard-status-button green'>Accepted by creater</span> :
                          currentProposalStatus === 'booked' ? <span className='dashboard-status-button green'>Booked</span> :
                            currentProposalStatus === 'completed' ? <span className='dashboard-status-button green'>Completed</span> :
                              currentProposalStatus === 'completed-paid' ? <span className='dashboard-status-button green'>payment done</span> : <span className='dashboard-status-button green'>unidentified</span>

    return (
      <div href="single-task-page.html" className="task-listing">

        {/* <!-- Job Listing Details --> */}
        <div className="task-listing-details">

          {/* <!-- Details --> */}
          <div className="task-listing-description">
            <div style={{ display: "inline-block", width: "100%" }}>
              <div style={{ display: "inline-block" }}>
                <img height={40} src={postLogo.url || 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg'} alt='' />
              </div>
              <div style={{ display: "inline-block", margin: 10 }}>
                <h3 className="task-listing-title">{title}</h3>
              </div>
              <div style={{ display: "inline-block", margin: 10 }}>
                {status}
              </div>
            </div>
            <ul className="task-icons">
              <li class='button gray' data-tippy-placement='top'><a href={msg === 'progress' ? start_url : '#'} target='_blank'><i className='icon-material-outline-location-on' />Zoom start Url</a> </li>
              <li class='button gray' data-tippy-placement='top'><a href={msg === 'progress' ? join_url : '#'} target='_blank'><i className='icon-material-outline-location-on' />Zoom Join Url</a></li>
              <li><i className="icon-material-outline-access-time"></i> {daysDiffernce(createdDate, new Date())} days ago</li>
            </ul>
            <table bordered={1} style={{ fontFamily: "arial, sans-serif", borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr style={{ backgroundColor: "#dddddd" }}>
                  <th style={mystyle}>Mon</th>
                  <th style={mystyle}>Tue</th>
                  <th style={mystyle}>Wed</th>
                  <th style={mystyle}>Thu</th>
                  <th style={mystyle}>Fri</th>
                  <th style={mystyle}>Sat</th>
                  <th style={mystyle}>Sun</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={mystyle}>{(this.convertHMS(workingHours['mon'].start).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['tue'].start).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['wed'].start).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['thu'].start).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['fri'].start).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['sat'].start).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['sun'].start).toString().substr(0, 5))}</td>
                </tr>
                <tr>
                  <td style={mystyle}>{(this.convertHMS(workingHours['mon'].end).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['tue'].end).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['wed'].end).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['thu'].end).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['fri'].end).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['sat'].end).toString().substr(0, 5))}</td>
                  <td style={mystyle}>{(this.convertHMS(workingHours['sun'].end).toString().substr(0, 5))}</td>
                </tr>

              </tbody>
            </table>
            <div className="task-tags">
              {/* {allSkills} */}
              <span><a target='_blank' href='https://safety.linkedin.com/identifying-abuse/spam-examples'>Report</a></span>
              <span style={{ margin: 2 }}><button>Unsubscribe</button></span>
            </div>
          </div>

        </div>

        <div className="task-listing-bid">
          <div className="task-listing-bid-inner">
            <div className="task-offers">
              <div style={{ marging: 10, padding: 10 }}>
                <div class='notification success closeable'>
                  <p><small>Session {msg}</small></p>
                  <a class='close' href='#' />
                </div>
              </div>
              <span className='bookmark-icon' />
              <ul><li class='button gray' data-tippy-placement='top'>{this.state.defaultRatingPopup && <Rating {...this.props} setShow={this.state.defaultRatingPopup} ratingTypeId={this.state.proposalDetails.userId} serviceData={this.props.serviceData} />}</li></ul>

              {/* <strong>{finalProposalRequest.amount}{currency}</strong> */}
              {/* <span>{paymentType}</span> */}
            </div>
            <Link to={`/freelancer/post/${postId}`} style={{ margin: 5 }} className="button button-sliding-icon ripple-effect">Show Details <i className="icon-material-outline-arrow-right-alt"></i></Link>
            <button onClick={this.handleCheckIn} style={{ margin: 5 }} className="button button-slidionClick-icon ripple-effect">{isCheckIn==='checkin' ? 'Check Out' : 'Check In'} <i className="icon-material-outline-arrow-right-alt"></i></button>
          </div>
        </div>
      </div>
    )
  }
}
