import ls from 'local-storage'
import React from 'react'
import qs from 'qs'

import { ToastContainer, toast } from 'react-toastify'
import { changeProposalStatus, getProposalById, getPostById, getRatings, patchRating, CancelPaypalSubscription } from '../../../Actions'
import { Rating } from '../../../Components/rating/rating'
import config from '../../../config'
const { displayNameSettings } = config

export class UserActivePostDetails extends React.Component {
  constructor() {
    super()

    this.state = {
      praposalDetails: {},
      postDetails: {},
      defaultRatingPopup: false,
      count: 0
    }
    this.checkNextSession = this.checkNextSession.bind(this)
    this.getRatingDetails = this.getRatingDetails.bind(this)
    this.handleSubscribe = this.handleSubscribe.bind(this)
    this.handleBlock = this.handleBlock.bind(this)
  }

  notifyErr = (msg) => toast.error(msg, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	  });
	
	  notifySucc = (msg) => toast.success(msg, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
      });

  convertHMS(value) {
    const sec = parseInt(value, 10) // convert value to number if it's string
    let hours = Math.floor(sec / 3600) // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60) //  get seconds
    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    return hours + ':' + minutes + ':' + seconds // Return is HH : MM : SS
  }

  getProposaldata() {
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }

    const { currPraposalId = '' } = search

    const filter = {
      offset: 0,
      limit: 1,
      skip: 0,
      fields: {
        proposalId: true,
        postId: true,
        questionnaireSelected: true,
        userId: true,
        proposalTime: true,
        currentProposalStatus: true,
        questionnaireObj: true,
        finalProposalRequest: true,
        zoomMeetingUrls: true,
        subscriptionID: true,
        subscribe: true,
        subscriptionID: true,
        calendarEvent: true
      }
    }

    getProposalById(currPraposalId, filter, (err, praposalDetails) => {
      if (err) {
        alert(err)
        return
      }
      if (praposalDetails) {
        getPostById(praposalDetails.postId, {}, (err, postDetails) => {
          console.log('check postDetails :', err, postDetails)
          if (err) {
            alert(err)
            return
          }

          this.setState({ praposalDetails, postDetails })
        })
      }
    })
  }

  getRatingDetails(ratingTypeId) {
    // alert("check2")
    const filter = {
      offset: 0,
      limit: 1,
      skip: 0,
      where: {
        userId: ls.get('userId'),
        type: 'user',
        ratingTypeId: ratingTypeId
      },
      fields: {
        ratingId: true,
        type: true,
        ratingTypeId: true,
        message: true,
        rating: true,
        createdDate: true
      }
    }

    getRatings(filter, (err, res) => {
      console.log('check reating1 :', Array.isArray(res) && res.length === 0)
      if (err) {
        alert('error in rating fetch:')
      }

      if (Array.isArray(res) && res.length === 0) {
        // alert('asfdsaf')
        this.setState({ defaultRatingPopup: true })
      }
    })
  }

  componentDidMount() {
    // call method after 1 sec becuse react taks time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getProposaldata()
    }, 0)
  }

  checkDays(workingHours) {
    const todays = new Date().getDay()
    let msg = 'Not schedule, come later!'
    Object.keys(workingHours).forEach((key) => {
      let day
      const flag = false
      switch (key) {
        case 'sun':
          day = 0
          break
        case 'mon':
          day = 1
          break
        case 'tue':
          day = 2
          break
        case 'wed':
          day = 3
          break
        case 'thu':
          day = 4
          break
        case 'fri':
          day = 5
          break
        case 'sat':
          day = 6
          break
        case 'sun':
          day = 7
          break
      }

      if (todays === day) {
        const d = new Date()
        const currTime = (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds())
        // alert(currTime)
        if (currTime >= workingHours[key].start && currTime <= workingHours[key].end) {
          msg = 'progress'
        } else if (currTime < workingHours[key].start) {
          msg = 'will start soon'
        } else if (currTime > workingHours[key].start) {
          msg = 'over'
        } else { }
      }
    })

    return msg
  }

  checkNextSession(calendarEvent, workingHours) {
    let msg = 'Not schedule, come later!'
    const start = new Date(calendarEvent.start)
    const end = new Date(calendarEvent.end)
    const today = new Date()

    if (today >= start && today <= end) {
      msg = this.checkDays(workingHours)
      // alert(msg)
    } else {
      // alert('expire')
    }

    return msg
  }

  handleSubscribe() {
    // alert()
    // console.log('asfd', this.state.praposalDetails.subscriptionID, this.state, this.state.praposalDetails.proposalId, this.state.praposalDetails)

    CancelPaypalSubscription({ subscriptionId: this.state.praposalDetails.subscriptionID }, (subsErr, subsData) => {
      if (subsErr) {
        console.log(subsErr)
        return
      }
      changeProposalStatus(this.state.praposalDetails.proposalId, { subscribe: false }, (err, res) => {
        if (err) {
          alert('something went wrong!')
        } else {
          this.notifySucc('successfully unsubscribed!')
          setTimeout(() => {
              
              this.props.history.push('/freelancer/dashboard')
            }
              , 3000)
            }
      })
    })
  }

  handleBlock() {
    alert('need to handle block')
  }

  render() {
    const mystyle = {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px"
    }

    const { zoomMeetingUrls = {}, postId = '', userId = '', createrUserId = '', calendarEvent = { start: '', end: '' }, subscribe = false, subscriptionID = "" } = this.state.praposalDetails
    const { title = '', postLogo = {}, description = '', NoOfWeeks = '', workingHours = {} } = this.state.postDetails

    const start_url = zoomMeetingUrls.start_url
    const join_url = zoomMeetingUrls.start_url
    const start = (calendarEvent.start ? new Date(calendarEvent.start).toDateString() : ''); const end = (calendarEvent.end ? new Date(calendarEvent.end).toDateString() : ''); const days = ''

    const showWorkingHours = Object.keys(workingHours).map((item, i) => {
      // alert(workingHours[item])
      return (
        <span>
          {item} : {this.convertHMS(workingHours[item].start)} - {this.convertHMS(workingHours[item].end)} /
        </span>
      )
    })


    const msg = this.checkNextSession(calendarEvent, workingHours)
    if (msg === 'over' && this.state.count === 0) {
      this.getRatingDetails(this.state.praposalDetails.userId)
      this.setState({ count: this.state.count + 1 })
    }

    if (subscribe === false) {
      return (
        <div style={{ marging: 10, padding: 10 }}>
          <div class='notification success closeable'>
            <p>Not Subscribed</p>
            {/* <a class='close' href='#' /> */}
          </div>
        </div>
      )
    }

    return (
      <div>
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
        <div style={{ 'backgroundColor': 'blanchedalmond' }} className="boxed-list-headline">
          <h3><i className="icon-line-awesome-inbox"></i> {displayNameSettings.post}s</h3>
        </div>
        {/* // <!-- Task --> */}
        <div href="single-task-page.html" className="task-listing">

          {/* <!-- Job Listing Details --> */}
          <div className="task-listing-details">

            {/* <!-- Details --> */}
            <div className="task-listing-description">
              <div style={{ display: "inline-block", width: "100%" }}>
                <div style={{ display: "inline-block" }}>
                  <img height={40} src={'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg' || ''} alt='' />
                </div>
                <div style={{ display: "inline-block" }}>
                  <h3 className="task-listing-title">{title}</h3>
                </div>
              </div>


              {/* <h3 className="task-listing-title">{title}</h3> */}
              <ul className="task-icons">
                <li class='button gray' data-tippy-placement='top'><a href={start_url} target='_blank'><i className='icon-material-outline-location-on' />Zoom start Url</a> </li>
                <li class='button gray' data-tippy-placement='top'><a href={join_url} target='_blank'><i className='icon-material-outline-location-on' />Zoom Join Url</a></li>
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
              {/* <p className="task-listing-text">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster.</p> */}
              <div className="task-tags">
                <span><a target='_blank' href='https://safety.linkedin.com/identifying-abuse/spam-examples'>Report</a></span>
                <span style={{ margin: 2 }}><button onClick={this.handleSubscribe}>Unsubscribe</button></span>
              </div>
            </div>

          </div>

          <div className="task-listing-bid">
            <div className="task-listing-bid-inner">
              <div className="task-offers">
                <div style={{ marging: 10, padding: 10 }}>
                  <div class='notification success closeable'>
                    <p>Session {msg}</p>
                    <a class='close' href='#' />
                  </div>
                </div>
                <span className='bookmark-icon' />
                <ul><li class='button gray' data-tippy-placement='top'>{this.state.defaultRatingPopup &&
                  <Rating {...this.props} setShow={this.state.defaultRatingPopup} ratingTypeId={this.state.praposalDetails.userId} serviceData={this.props.serviceData} />}</li></ul>
                {/* <strong>$1,000 - $2,500</strong> */}
                {/* <span>Fixed Price</span> */}
              </div>
              {/* <span className="button button-sliding-icon ripple-effect">Bid Now <i className="icon-material-outline-arrow-right-alt"></i></span> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
