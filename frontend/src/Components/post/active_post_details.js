import ls from 'local-storage'
import React from 'react'
import qs from 'qs'
import { changeProposalStatus, getProposal, getPostById, getRatings, CancelPaypalSubscription } from '../../Actions'
import { ToastContainer, toast } from 'react-toastify';
import { Rating } from '../rating/rating'
import config from '../../config'
// import { BlockUser } from '../../Components/block/block_user'
const { displayNameSettings } = config

export class ActivePostDetails extends React.Component {
    constructor() {
        super();

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
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
    }

    getProposaldata() {

        let search = this.props.history.location.search
        if (search.length && search[0] === '?') {
            search = search.substr(1, search.length)
            search = qs.parse(search);
        }

        let filter = {
            "offset": 0,
            "limit": 1,
            "skip": 0,
            "where": {
                postId: this.props.match.params.postId,
                userId: ls.get('userId'),
                subscribe: true
            },
            fields: {
                proposalId: true,
                postId: true,
                questionnaireSelected: true,
                userId: true,
                createrUserId:true,
                proposalTime: true,
                currentProposalStatus: true,
                questionnaireObj: true,
                finalProposalRequest: true,
                zoomMeetingUrls: true,
                subscribe: true,
                subscriptionID:true,
                calendarEvent: true,
                isCheckIn:true,
                checkInTime:true,
                checkoutTime:true,
            }
        }

        getProposal(filter, (err, praposalDetails) => {
            if (err) {
                alert(err)
                return
            }
            if (Array.isArray(praposalDetails) && praposalDetails.length) {

                getPostById(this.props.match.params.postId, {}, (err, postDetails) => {
                    if (err) {
                        alert(err)
                        return
                    }
                    this.setState({ praposalDetails: praposalDetails[0], postDetails })
                })

            }
        })
    }

    getRatingDetails(ratingTypeId) {
        let filter = {
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
                createdDate: true,
            }
        }

        getRatings(filter, (err, res) => {
            if (err) {
                console.log('error in rating fetch:')
                return this.notifyErr('something went wrong!')
                
            }

            if (Array.isArray(res) && res.length === 0) {
                this.setState({ defaultRatingPopup: true })
            }

        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.getProposaldata()
        }, 0);
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
                // alert(currTime)
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

        if (today >= start && today <= end) {

            msg = this.checkDays(workingHours)

        } else {
        }

        return msg
    }

    handleSubscribe() {
        
        CancelPaypalSubscription({subscriptionId:this.state.praposalDetails.subscriptionID}, (subsErr, subsData)=>{
          if(subsErr){
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

        const { zoomMeetingUrls = {}, calendarEvent = { start: "", end: "" }, subscribe = false,isCheckIn="",checkoutTime="",checkInTime="" } = this.state.praposalDetails
        const { title = '', workingHours = {} } = this.state.postDetails

        const start_url = zoomMeetingUrls.start_url
        const join_url = zoomMeetingUrls.start_url
        
        let msg = this.checkNextSession(calendarEvent, workingHours)
        if (msg === "over" && this.state.count === 0) {
            this.getRatingDetails(this.state.praposalDetails.userId)
            this.setState({ count: this.state.count + 1 })
        }

        if (subscribe === false) {
            return (<div style={{ marging: 10, padding: 10 }}>
                <div className="notification success closeable">
                    <p>Not Subscribed</p>
                </div>
            </div>)
        }

        return (
            <div>
                <div style={{ 'backgroundColor': 'blanchedalmond' }} className="boxed-list-headline">
                    <h3><i className="icon-line-awesome-inbox"></i> {displayNameSettings.post}s</h3>
                </div>
                {/* // <!-- Task --> */}
                <div href="#" className="task-listing">

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

                            <ul className="task-icons">
                                <li class='button gray' data-tippy-placement='top'><a href={msg === 'progress' ? start_url : '#'} target='_blank'><i className='icon-material-outline-location-on' />Zoom start Url</a> </li>
                                <li class='button gray' data-tippy-placement='top'><a href={msg === 'progress' ? join_url : '#'} target='_blank'><i className='icon-material-outline-location-on' />Zoom Join Url</a></li>
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
                                {isCheckIn && <span style={{ margin: 2 }}><button>{isCheckIn==='checkin'?`${isCheckIn} at ${new Date(checkInTime).toLocaleString()}`:`${isCheckIn} at ${new Date(checkoutTime).toLocaleString()}`}</button></span>}
                                <span className='bookmark-icon' />
                                <ul><li class='button gray' data-tippy-placement='top'>{this.state.defaultRatingPopup && <Rating {...this.props} setShow={this.state.defaultRatingPopup} type='post'  ratingTypeId={this.state.praposalDetails.createrUserId} serviceData={this.props.serviceData} />}</li></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}