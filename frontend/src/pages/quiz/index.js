import React, { Component } from 'react'
import { ProgressBar, Card, Carousel } from "react-bootstrap"
import ls from 'local-storage'
import './style.css'
import QuestionBox from './components/QuestionBox'
import { getPostById, createProposal, createNotification } from '../../Actions'
import qs from 'qs'
import config from '../../config'
const { displayNameSettings, cloudinary } = config

export class Quiz extends Component {
  constructor() {
    super()
    this.state = {
      postId: '',
      createrUserId: '',
      questionnaireSelected: false,
      postId: '',
      userId: '',
      questionnaire: [],
      score: 0,
      responses: 0,
      givenAns: {},
      currentPage: 1,
      perpage: 1,
      pgStart: 0,
      pgEnd: 0,
      currentQuestionNo: 0,
    }
    this.onSelect = this.onSelect.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onPrvious = this.onPrvious.bind(this)
    this.onNext = this.onNext.bind(this)
  }

  onNext() {
    if (this.state.currentPage + 1 <= Math.ceil(this.state.questionnaire.length / this.state.perpage)) {
      this.setState({
        pgStart: this.state.pgEnd,
        pgEnd: (this.state.questionnaire.length > ((this.state.currentPage + 1) * this.state.perpage) ? ((this.state.currentPage + 1) * this.state.perpage) : this.state.questionnaire.length)
      })
      this.setState({ currentPage: this.state.currentPage + 1 })
    }
  }

  onPrvious() {
    if (this.state.currentPage > 1) {
      const pgStart = this.state.pgStart - this.state.perpage
      const pgEnd = this.state.pgStart
      this.setState({
        pgStart: pgStart,
        pgEnd: pgEnd
      })
      this.setState({ currentPage: this.state.currentPage - 1 })
    }
  }

  onSelect(ans, qno) {
    console.log(this.state)
    const givenAns = this.state.givenAns
    givenAns[qno] = ans
    this.setState({ givenAns })
  }

  onSubmit() {
    let skip = 0
    let currect = 0
    let wrong = 0
    this.state.questionnaire.map((questionnaire, i) => {
      if (!this.state.givenAns[i]) {
        skip++
      } else if (questionnaire.answer === this.state.givenAns[i]) {
        currect++
      } else {
        if (questionnaire.qType === "mselect") {
          
          let ans = questionnaire.answer.split(',')
          
          if (ans.length === this.state.givenAns[i].length) {
            let flag = 'right'
            ans.forEach(element => {
              console.log("#########",typeof element,this.state.givenAns[i], (this.state.givenAns[i]).includes(element))
              if ((this.state.givenAns[i]).includes((element).toString())) flag = 'right'
              else flag = 'wrong'
            });
            if (flag === 'wrong') wrong++
            else currect++
          }else{
            wrong++
          }
        } else if (questionnaire.qType === "mcq") {
          let ans = ''
          if (this.state.givenAns[i] === questionnaire.option1) ans = 1
          else if (this.state.givenAns[i] === questionnaire.option2) ans = 2
          else if (this.state.givenAns[i] === questionnaire.option3) ans = 3
          else if (this.state.givenAns[i] === questionnaire.option4) ans = 4
          else { }

          if (ans === parseInt(questionnaire.answer)) currect++
          else wrong++


          // && parseInt(questionnaire.answer)===this.state.givenAns[i]
          // currect++
          // console.log(questionnaire.answer , this.state.givenAns[i])

          // if(mAnsSelected.indexOf(this.state.givenAns[i]) === parseInt(questionnaire.answer)) currect++
          // else wrong++

        } else if (questionnaire.qType === "tf" && (questionnaire.answer) === this.state.givenAns[i]) {
          currect++
        } else {
          wrong++
        }
      }
    })

    console.log("**********************final", currect, wrong, skip, this.state.questionnaire, this.state.givenAns)
    // return
    const body = {
      postId: this.state.postId,
      userId: ls.get('userId'),
      proposalTime: new Date(),
      paymentType: '',
      paymentAmount: '',
      currentProposalStatus: 'sent',
      createrUserId: this.state.createrUserId,
      questionnaireSelected: true,
      questionnaireObj: {
        questionnaire: this.state.questionnaire,
        questionnaireSelected: this.state.questionnaireSelected,
        answer: {
          skip,
          currect,
          wrong,
          givenAns: this.state.givenAns,
          passingQuesCount: this.state.passingQuesCount
        }
      },
      userRequest: {
        amount: this.state.amount,
        hours: this.state.hours,
        message: this.state.message
      },
      createrUserRequest: {},
      finalProposalRequest: {}
    }

    createProposal(body, (err, res) => {
      if (err || res.error) {
        alert(err || res.error)
        return
      }


      if (res.proposalId && this.state.passingQuesCount >= currect) {
        let userProfile = ls.get('userProfile')
        userProfile = (userProfile.length) ? JSON.parse(userProfile) : {}
        let readedUsers = []
        readedUsers.push(ls.get('userId'))
        let notifiyBody = {
          userId: ls.get('userId'),
          type: 'post',
          subtype: "proposal-sent",
          data: {},
          notificationTypeId: this.state.postId,
          message: `${displayNameSettings.post}:${userProfile.firstName} ${userProfile.lastName} passed questionaire and sent proposal`,
          status: "unread",
          createrUserId: this.state.createrUserId,
          readedUsers: readedUsers
        }
        createNotification(notifiyBody, () => { })
      }

      alert('proposal sent!')
      this.props.history.push(`/freelancer/post/${this.state.postId}`)
    })
  }

  componentDidMount() {
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }

    const { amount = '', hours = '', message = '' } = search

    const postId = this.props.match.params.postId

    const filter = {
      offset: 0,
      limit: 1,
      skip: 0,
      fields: {
        postId: true,
        questionnaireSelected: true,
        questionnaire: true,
        userId: true,
        passingQuesCount: true

      }
    }

    getPostById(postId, filter, (err, res) => {
      if (err) {
        alert(err)
        return
      }
      if (res) {
        if (res.postId === postId) {
          this.setState({
            postId: (res.postId || ''),
            createrUserId: (res.userId || ''),
            questionnaire: (res.questionnaire || []),
            questionnaireSelected: (res.questionnaireSelected || ''),
            postId: (res.postId || ''),
            userId: ls.get('userId'),
            pgStart: 0,
            pgEnd: (res.questionnaire.length > this.state.perpage ? this.state.perpage : res.questionnaire.length),
            amount: amount,
            hours: hours,
            message: message,
            passingQuesCount: res.passingQuesCount
          })
        }
      }
    })
  }

  render() {
    const showQues = []
    let currentQuestionNo = 0
    let progressBar = ''
    if (this.state.questionnaire) {
      for (let i = this.state.pgStart; i <= this.state.pgEnd - 1; i++) {
        currentQuestionNo = i + 1
        progressBar = <ProgressBar striped variant="success" now={(currentQuestionNo / this.state.questionnaire.length) * 100} label={`${(currentQuestionNo / this.state.questionnaire.length) * 100}%`} />
        showQues.push(<QuestionBox givenAns={this.state.givenAns} select={this.onSelect} qno={i} quizDetails={this.state.questionnaire[i]} key={i} />)
      }
    }

    const CardQuestion = (
      <Card style={{}}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            {showQues}
          </Card.Text>
        </Card.Body>
      </Card>
    )
    
    return (
      <div>
        <div className='container-quiz'>
          <div className='title-quiz'>
            questionnaire
          </div>
          <div style={{ margin: 10, padding: 10 }}>
            {progressBar}
          </div>
          <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: "20%", textAlign: "right", alignSelf: "center" }}><button onClick={this.onPrvious} className='button' width='30'><i className="icon-material-outline-arrow-back"></i> Previous</button></div>
            <div style={{ width: "60%", margin: 10, padding: 10 }}>{showQues}</div>
            <div style={{ width: "20%", alignSelf: "center" }}><button onClick={this.onNext} className='button'>next  <i className="icon-material-outline-arrow-forward"></i></button></div>

          </div>

          {/* <div>Total Questions: {this.state.questionnaire.length}</div> */}
          {/* {showQues} */}

          <div style={{ textAlign: "center" }}>
            {/* <button onClick={this.onPrvious} className='button margin-top-10' width='30'>Previous</button>&nbsp; */}
            {/* <button onClick={this.onNext} className='button margin-top-10'>next</button>&nbsp; */}
            <button onClick={this.onSubmit} className='button margin-top-10'>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

export * from './showQuiz'
