import React from 'react'
import '../style.css'

export default class Quiz extends React.Component {
  constructor () {
    super()
    this.state = {
      ansSelected: '',
      option1: false,
      option2: false,
      option3: false,
      option4: false
    }
    this.handleOp1 = this.handleOp1.bind(this)
    this.handleOp2 = this.handleOp2.bind(this)
    this.handleOp3 = this.handleOp3.bind(this)
    this.handleOp4 = this.handleOp4.bind(this)
  }

  handleOp1 (e) {
    // this.setState({
    //   ansSelected: e.currentTarget.value
    // });

    // this.props.select(e.currentTarget.value, this.props.qno)
  }

  handleOp2 (e) {
    // this.setState({
    //   ansSelected: e.currentTarget.value
    // });
    // this.props.select(e.currentTarget.value, this.props.qno)
  }

  handleOp3 (e) {
    // this.setState({
    //   ansSelected: e.currentTarget.value
    // });
    // this.props.select(e.currentTarget.value, this.props.qno)

  }

  handleOp4 (e) {
    // this.setState({
    //   ansSelected: e.currentTarget.value
    // });
    // this.props.select(e.currentTarget.value, this.props.qno)
  }

  render () {
    const {
      question = '',
      option1 = '',
      option2 = '',
      option3 = '',
      option4 = ''
    } = this.props.quizDetails

    const { qno, givenAns } = this.props
    console.log('check:', givenAns, option1)
    return (
      <div className='questionBox-quiz'>
        <div className='col-xl-12 col-md-4'>

          <div className='section-headline margin-top-25 margin-bottom-12'>
            <h5>{`${qno + 1}. ${question}`}</h5>
          </div>

          <div className='radio'>
            <input id={`radio-1${qno}`} value={option1} type='radio' onChange={this.handleOp1} checked={(givenAns === option1)} />
            <label htmlFor={`radio-1${qno}`}><span className='radio-label' /> {option1}</label>
          </div>

          <div className='radio'>
            <input id={`radio-2${qno}`} value={option2} type='radio' onChange={this.handleOp2} checked={(givenAns === option2)} />
            <label htmlFor={`radio-2${qno}`}><span className='radio-label' /> {option2}</label>
          </div>

          <div className='radio'>
            <input id={`radio-3${qno}`} value={option3} type='radio' onChange={this.handleOp3} checked={(givenAns === option3)} />
            <label htmlFor={`radio-3${qno}`}><span className='radio-label' /> {option3}</label>
          </div>

          <div className='radio'>
            <input id={`radio-4${qno}`} value={option4} type='radio' onChange={this.handleOp4} checked={(givenAns === option4)} />
            <label htmlFor={`radio-4${qno}`}><span className='radio-label' /> {option4}</label>
          </div>
        </div>
      </div>
    )
  }
}
