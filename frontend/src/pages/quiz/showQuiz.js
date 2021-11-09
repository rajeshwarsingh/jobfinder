import React, { Component } from 'react'
import ls from 'local-storage'
import './style.css'
import QuestionBox from './components/showQuestionBox'
import { getPostById, getProposalById, createProposal } from '../../Actions'
import qs from 'qs'

export class ShowQuiz extends Component {
  constructor () {
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
      perpage: 2,
      pgStart: 0,
      pgEnd: 0
    }
    this.onSelect = this.onSelect.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onPrvious = this.onPrvious.bind(this)
    this.onNext = this.onNext.bind(this)
  }

  onNext () {
    if (this.state.currentPage + 1 <= Math.ceil(this.state.questionnaire.length / this.state.perpage)) {
      this.setState({
        pgStart: this.state.pgEnd,
        pgEnd: (this.state.questionnaire.length > ((this.state.currentPage + 1) * this.state.perpage) ? ((this.state.currentPage + 1) * this.state.perpage) : this.state.questionnaire.length)
      })
      this.setState({ currentPage: this.state.currentPage + 1 })
    }
  }

  onPrvious () {
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

  onSelect (ans, qno) {
    console.log(this.state)
    const givenAns = this.state.givenAns
    givenAns[qno] = ans
    this.setState({ givenAns })
  }

  onSubmit () {
    let skip = 0
    let currect = 0
    let wrong = 0
    this.state.questionnaire.map((questionnaire, i) => {
      if (!this.state.givenAns[i]) {
        skip++
      } else if (questionnaire.answer === this.state.givenAns[i]) {
        currect++
      } else {
        wrong++
      }
    })

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
          givenAns: this.state.givenAns
        }
      },
      userRequest: {
        amount: this.state.amount,
        days: this.state.days,
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
      alert('proposal sent!')
      this.props.history.push(`/freelancer/post/${this.state.postId}`)
    })
  }

  componentDidMount () {
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }

    const { amount = '', days = '', message = '' } = search

    const proposalId = this.props.match.params.proposalId

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
        finalProposalRequest: true
      }
    }

    getProposalById(proposalId, filter, (err, res) => {
      console.log('check post :', err, res)
      if (err) {
        alert(err)
        return
      }
      if (res) {
        console.log('************************', res.proposalId, proposalId, res.proposalId === proposalId)
        if (res.proposalId === proposalId) {
          this.setState({
            postId: (res.postId || ''),
            createrUserId: (res.userId || ''),
            questionnaire: (res.questionnaireObj.questionnaire || []),
            questionnaireSelected: (res.questionnaireSelected || ''),
            userId: ls.get('userId'),
            pgStart: 0,
            pgEnd: (res.questionnaireObj.questionnaire.length > this.state.perpage ? this.state.perpage : res.questionnaireObj.questionnaire.length),
            answer: res.questionnaireObj.answer || {},
            skip: res.questionnaireObj.answer.skip || 0,
            currect: res.questionnaireObj.answer.currect || 0,
            givenAns: res.questionnaireObj.answer.givenAns || {},
            wrong: res.questionnaireObj.answer.wrong || {},
            amount: amount,
            days: days,
            message: message
          })
        }
      }
    })
  }

  render () {
    const showQues = []
    if (this.state.questionnaire) {
      for (let i = this.state.pgStart; i <= this.state.pgEnd - 1; i++) {
        showQues.push(<QuestionBox select={this.onSelect} qno={i} givenAns={this.state.givenAns[i]} quizDetails={this.state.questionnaire[i]} key={i} />)
      }
    }

    return (
      <div>
        <div className='container-quiz'>
          <div className='title-quiz'>
            questionnaire
          </div>
          <div>
            <div style={{ display: 'inline-block' }}>Total Questions: {this.state.questionnaire.length}</div>
            <div style={{ display: 'inline-block' }}>Total skip: {this.state.skip}</div>
            <div style={{ display: 'inline-block' }}>Total currect: {this.state.currect}</div>
            <div style={{ display: 'inline-block' }}>Total wrong: {this.state.wrong}</div>
          </div>
          {showQues}
          <div>
            <button onClick={this.onPrvious} className='button margin-top-10' width='30'>Previous</button>&nbsp;
            <button onClick={this.onNext} className='button margin-top-10'>next</button>&nbsp;
            {/* <button onClick={this.onSubmit} className='button margin-top-10' >Submit</button> */}
          </div>
        </div>
      </div>
    )
  }
}
