import ls from 'local-storage'
import React from 'react'
import { createProposal, getProposal, createNotification } from '../../Actions'

export class ProposalRequest extends React.Component {
  constructor () {
    super()
    this.state = {
      bidAmount: '0',
      bidHours: '0',
      bidMessage: '',
      currentProposalStatus: 'not-send'
    }

    this.bidAmountChange = this.bidAmountChange.bind(this)
    this.bidDaysChange = this.bidDaysChange.bind(this)
    this.handleBidRequest = this.handleBidRequest.bind(this)
    this.bidMessageChange = this.bidMessageChange.bind(this)
    this.handleBidQualifyRequest = this.handleBidQualifyRequest.bind(this)
    this.getProposaldata = this.getProposaldata.bind(this)
  }

  bidAmountChange (e) {
    this.setState({ bidAmount: e.target.value })
  }

  bidDaysChange (e) {
    this.setState({ bidHours: e.target.value })
  }

  bidMessageChange (e) {
    this.setState({ bidMessage: e.target.value })
  }

  handleBidRequest () {
    // validation
    if (!this.state.bidAmount || parseInt(this.state.bidAmount) === 0) {
      alert('please add proposal amount!')
      return
    }

    if (!this.state.bidHours || parseInt(this.state.bidHours) === 0) {
      alert('please add proposal Days!')
      return
    }

    const amount = this.state.bidAmount * this.state.bidHours
    const body = {
      postId: this.props.postData.postId,
      userId: ls.get('userId'),
      proposalTime: new Date(),
      paymentType: '',
      paymentAmount: '',
      currentProposalStatus: 'sent',
      createrUserId: this.props.postData.userId,
      userRequest: {
        amount: amount,
        days: this.state.bidHours,
        message: this.state.bidMessage,
        questionnaireSelected: false
      },
      createrUserRequest: {},
      finalProposalRequest: {}
    }

    createProposal(body, (err, res) => {
      if (err || res.error) {
        return alert(err || res.error)
        
      }

      alert('proposal sent!')

      // notificaiton
      const profile = (ls.get('userProfile')) ? JSON.parse(ls.get('userProfile')) : {}
                let readedUsers = []
                readedUsers.push(ls.get('userId'))
                let notifiyBody = {
                    type: 'post',
                    subtype: 'proposal-sent',
                    userId: ls.get('userId'),
                    notificationTypeId: this.props.postData.postId,
                    message: ` ${profile.firstName} ${profile.lastName} has sent post Proposal`,
                    status: "unread",
                    notifyId: this.props.postData.userId,
                    createrUserId: this.props.postData.userId,
                    readedUsers: readedUsers
                }


      createNotification(notifiyBody, () => {
        window.location.reload(false)
      })
    })
  }

  handleBidQualifyRequest () {
    // validation
    if (!this.state.bidAmount || this.state.bidAmount < 1) {
      alert('Please add proposal amount!')
      return
    }

    if (!this.state.bidHours) {
      alert('Please add proposal Days!')
      return
    }
    const amount = this.state.bidAmount * this.state.bidHours
    this.props.history.push(`/quiz/${this.props.postData.postId}?amount=${amount}&hours=${this.state.bidHours}&message=${this.state.bidMessage}`)
  }

  convertHMS (value) {
    const sec = parseInt(value, 10) // convert value to number if it's string
    let hours = Math.floor(sec / 3600) // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60) //  get seconds
    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    return hours + ':' + minutes + ':' + seconds // Return is HH : MM : SS
  }

  getProposaldata () {
    if (!ls.get('userId') || !this.props.postData.postId || !this.props.postData.userId) {
      this.setState({ proposal: {}, currentProposalStatus: 'not-send' })
      return
    }

    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        userId: ls.get('userId'),
        postId: this.props.postData.postId,
        createrUserId: this.props.postData.userId
      },
      fields: {
        proposalId: true,
        postId: true,
        userId: true,
        createrUserId: true,
        currentProposalStatus: true,
        proposalTime: false,
        paymentType: false,
        freelancerRequest: false,
        hiremngrRequest: false,
        finalProposalRequest: false,
        updatedTime: false
      }
    }

    getProposal(filter, (err, res) => {
      console.log('get proposal details:', err, res)
      if (err) {
        alert('error in fetching proposal details!', err)
        return
      }

      if (res && res.length && res[0].proposalId) {
        this.setState({ currentProposalStatus: res[0].currentProposalStatus, proposal: res })
      } else {
        this.setState({ proposal: {}, currentProposalStatus: 'not-send' })
      }
    })
  }

  componentDidMount () {
    // call method after 1 sec becuse react taks time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getProposaldata()
    }, 1000)
  }

  render () {
    const mystyle = {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px"
  }
    const {
      paymentType,
      currency = '',
      questionnaireSelected = '',
      workingHours = {},
    } = this.props.postData

    let TotalHours = 0

    Object.keys(workingHours).map((key) => {
      TotalHours = TotalHours + workingHours[key].end - workingHours[key].start
      return ''
    })

    // d = Number(TotalHours);
    TotalHours = Math.floor(TotalHours / 3600)

    // alert(TotalHours)

    const showWorkingHours = Object.keys(workingHours).map((item, i) => {
      // alert(workingHours[item])
      return (
        <span>
          {item} : {this.convertHMS(workingHours[item].start)} - {this.convertHMS(workingHours[item].end)} /
        </span>
      )
    })

    const workingTable =  
    (workingHours && Object.keys(workingHours).length?(<table bordered={1} style={{ fontFamily: "arial, sans-serif", borderCollapse: "collapse", width: "100%" }}>
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
</table>):<div></div>)

    if (TotalHours !== this.state.bidHours) this.setState({ bidHours: TotalHours })

    // this.setState({ bidHours: TotalHours })

    // return request component-----------

    { /* User can apply 1 time only and with status is 'not-send' */ }
    if (this.state.currentProposalStatus === 'not-send') {
      return (
        <div className='single-page-section'>
          {/* <div className="col-xl-8 col-lg-8 offset-xl-2 offset-lg-2"> */}

          {/* <section id="contact" className="margin-bottom-60"> */}
          <h3 className='headline margin-top-15 margin-bottom-35'>Send your request</h3>
          Total Working Hours 
          {workingTable}
          {paymentType}
          <div className='row'>
            <div className='col-md-6'>
              <div className='input-with-icon'>

                <input className='with-border' value={this.state.bidAmount} onChange={this.bidAmountChange} name='name' type='text' id='name' placeholder='Your Amount' required='required' />
                <i className='currency'>{currency}</i>
                {/* <i className="icon-material-outline-account-circle"></i> */}
              </div>
            </div>

            <div className='col-md-6'>
              <div className='input-with-icon'>
                <input disabled className='with-border' value={TotalHours} onChange={this.bidDaysChange} name='email' type='email' id='email' placeholder='Days' pattern='^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$' required='required' />
                <i className='currency'>Hours</i>
                {/* <i className="icon-material-outline-email"></i> */}
              </div>
            </div>
          </div>

          <div>
            <textarea value={this.state.bidMessage} onChange={this.bidMessageChange} className='with-border' name='comments' cols='40' rows='5' id='comments' placeholder='Message' spellCheck='true' required='required' />
          </div>

          {/* <div>Final proposal: {paymentType === 'BY-The-Hour' ? (this.state.bidAmount * this.state.bidHours) : this.state.bidAmount}</div> */}
          {console.log(this.state.bidAmount, this.state.bidHours)}
          <div>Final proposal: {this.state.bidAmount * this.state.bidHours}</div>

          {/* if questionnaire Selected */}
          {questionnaireSelected && (<div><div>You need to qualify for this project</div>
            <button className='submit button margin-top-15' id='submit' onClick={this.handleBidQualifyRequest}> Give quiz and apply</button>
          </div>)}

          {/* if questionnaire Selected */}
          {!questionnaireSelected && (<div>
            <button className='submit button margin-top-15' id='submit' onClick={this.handleBidRequest}> Ask for Project</button>
          </div>)}

          {/* </section> */}

          {/* </div> */}
        </div>
      )
    } else if (this.state.currentProposalStatus === 'sent') {
      return (
        <div className='single-page-section'>
          Total Working Hours 
          {workingTable}
          <div className='notification success closeable'>You Have already applied!</div>
        </div>
      )
    } else if (this.state.currentProposalStatus === 'accepted') {
      return (
        <div className='single-page-section'>
          Total Working Hours 
          {workingTable}
          <div className='notification success closeable'>Congratulations!, Your request had been accepted, still need to pay.</div>
        </div>
      )
    } else if (this.state.currentProposalStatus === 'rejected') {
      return (
        <div className='single-page-section'>
          Total Working Hours 
          {workingTable}
          <div className='notification error closeable'>Sorry, Your request had been rejected!</div>
        </div>
      )
    } else {
      return (
        <div className='single-page-section'>
          Total Working Hours 
          {workingTable}
        </div>
      )
    }
  }
}
