import React from 'react'
import { ProgressBar, Card, Carousel } from "react-bootstrap"

import '../style.css'

export default class Quiz extends React.Component {
  constructor() {
    super()
    this.state = {
      ansSelected: '',
      mAnsSelected: [],
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      questionnaireSelected1: '',
      questionnaireSelected2: '',
      questionnaireSelected3: '',
      questionnaireSelected4: '',
    }
    this.handleOp1 = this.handleOp1.bind(this)
    this.handleOp2 = this.handleOp2.bind(this)
    this.handleOp3 = this.handleOp3.bind(this)
    this.handleOp4 = this.handleOp4.bind(this)
  }

  handleOp1(e) {

    if (this.props.quizDetails.qType === 'mselect') {

      let mAnsSelected = this.state.mAnsSelected || [];

      if (this.state.questionnaireSelected1 === 1) {
        const index = mAnsSelected.indexOf("1");
        if (index > -1) {
          mAnsSelected.splice(index, 1);
        }
      } else {
        mAnsSelected.push("1")
      }

      this.setState({ mAnsSelected, questionnaireSelected1: (this.state.questionnaireSelected1 === 1 ? '' : 1) })

      this.props.select(mAnsSelected, this.props.qno)
      return
    }


    this.setState({
      ansSelected: e.currentTarget.value
    })

    this.props.select(e.currentTarget.value, this.props.qno)
  }

  handleOp2(e) {

    if (this.props.quizDetails.qType === 'mselect') {
      // alert(this.state.questionnaireSelected2)
      let mAnsSelected = this.state.mAnsSelected || [];
      if (this.state.questionnaireSelected2 === 2) {
        const index = mAnsSelected.indexOf("2");
        if (index > -1) {
          mAnsSelected.splice(index, 1);
        }
      } else {
        mAnsSelected.push("2")
      }
      this.setState({ mAnsSelected, questionnaireSelected2: (this.state.questionnaireSelected2 === 2 ? '' : 2) })

      this.props.select(mAnsSelected, this.props.qno)
      return
    }


    this.setState({
      ansSelected: e.currentTarget.value
    })

    this.props.select(e.currentTarget.value, this.props.qno)
  }

  handleOp3(e) {

    if (this.props.quizDetails.qType === 'mselect') {
      let mAnsSelected = this.state.mAnsSelected || [];
      if (this.state.questionnaireSelected3 === 3) {
        const index = mAnsSelected.indexOf("3");
        if (index > -1) {
          mAnsSelected.splice(index, 1);
        }
      } else {
        mAnsSelected.push("3")
      }

      this.setState({ mAnsSelected, questionnaireSelected3: (this.state.questionnaireSelected3 === 3 ? '' : 3) })

      this.props.select(mAnsSelected, this.props.qno)
      return
    }


    this.setState({
      ansSelected: e.currentTarget.value
    })
    this.props.select(e.currentTarget.value, this.props.qno)
  }

  handleOp4(e) {

    if (this.props.quizDetails.qType === 'mselect') {
      // alert(this.state.questionnaireSelected4)
      let mAnsSelected = this.state.mAnsSelected || [];
      if (this.state.questionnaireSelected4 === 4) {
        const index = mAnsSelected.indexOf("4");
        if (index > -1) {
          mAnsSelected.splice(index, 1);
        }
      } else {
        mAnsSelected.push("4")
      }
      this.setState({ mAnsSelected, questionnaireSelected4: (this.state.questionnaireSelected4 === 4 ? '' : 4) })

      this.props.select(mAnsSelected, this.props.qno)
      return
    }


    this.setState({
      ansSelected: e.currentTarget.value
    })
    this.props.select(e.currentTarget.value, this.props.qno)
  }

  render() {
    let {
      question = '',
      option1 = '',
      option2 = '',
      option3 = '',
      option4 = '',
      qType = '',
    } = this.props.quizDetails

    if (qType === "tf") {
      option1 = 'T'
      option2 = 'F'
    }
    const { qno, givenAns = {} } = this.props
    if (!this.state.ansSelected) {
      let fake = givenAns[qno] ? this.setState({ ansSelected: givenAns[qno] }) : ""
    }

    console.log("###############", this.state.ansSelected, "###", option1)
    const CardQuestion = (
      <Card style={{}}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            {/* {showQues} */}
          </Card.Text>
          {/* <Card.Link href="#">Card Link</Card.Link> */}
          {/* <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
      </Card>
    )

    // alert(this.state.mAnsSelected)
    return (

      <Card style={{}}>
        <Card.Body>
          <Card.Title><div className='section-headline margin-top-25 margin-bottom-12'>
            <h5>{`${qno + 1}. ${question}`}</h5>
          </div></Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
          <Card.Text>
            <div className='questionBox-quiz'>
              {qType === 'tf' && <div className='col-xl-12 col-md-4'>
                <div className='radio'>
                  <input id={`radio-1${qno}`} value={option1} type='radio' onChange={this.handleOp1} checked={(this.state.ansSelected === option1)} />
                  <label htmlFor={`radio-1${qno}`}><span className='radio-label' /> {option1 === 'T' ? 'true' : 'false'}</label>
                </div><br />

                <div className='radio'>
                  <input id={`radio-2${qno}`} value={option2} type='radio' onChange={this.handleOp2} checked={(this.state.ansSelected === option2)} />
                  <label htmlFor={`radio-2${qno}`}><span className='radio-label' /> {option2 === 'T' ? 'true' : 'false'}</label>
                </div><br />
              </div>}

              {qType === 'mcq' && <div className='col-xl-12 col-md-4'>
                <div className='radio'>
                  <input id={`radio-1${qno}`} value={option1} type='radio' onChange={this.handleOp1} checked={(this.state.ansSelected === option1)} />
                  <label htmlFor={`radio-1${qno}`}><span className='radio-label' /> {option1}</label>
                </div><br />

                <div className='radio'>
                  <input id={`radio-2${qno}`} value={option2} type='radio' onChange={this.handleOp2} checked={(this.state.ansSelected === option2)} />
                  <label htmlFor={`radio-2${qno}`}><span className='radio-label' /> {option2}</label>
                </div><br />

                <div className='radio'>
                  <input id={`radio-3${qno}`} value={option3} type='radio' onChange={this.handleOp3} checked={(this.state.ansSelected === option3)} />
                  <label htmlFor={`radio-3${qno}`}><span className='radio-label' /> {option3}</label>
                </div><br />

                <div className='radio'>
                  <input id={`radio-4${qno}`} value={option4} type='radio' onChange={this.handleOp4} checked={(this.state.ansSelected === option4)} />
                  <label htmlFor={`radio-4${qno}`}><span className='radio-label' /> {option4}</label>
                </div><br />
              </div>}


              {qType === 'mselect' && <div className='col-xl-12 col-md-4'>

                <div className="checkbox">
                  <input type="checkbox" onChange={this.handleOp1} id="chekcbox1" checked={(this.state.questionnaireSelected1 === 1)} />
                  <label htmlFor="chekcbox1"><span className="checkbox-icon"></span> {option1}</label>
                </div><br />

                <div className="checkbox">
                  <input type="checkbox" onChange={this.handleOp2} id="chekcbox2" checked={(this.state.questionnaireSelected2 === 2)} />
                  <label htmlFor="chekcbox2"><span className="checkbox-icon"></span> {option2}</label>
                </div><br />

                <div className="checkbox">
                  <input type="checkbox" onChange={this.handleOp3} id="chekcbox3" checked={(this.state.questionnaireSelected3 === 3)} />
                  <label htmlFor="chekcbox3"><span className="checkbox-icon"></span> {option3}</label>
                </div><br />

                <div className="checkbox">
                  <input type="checkbox" onChange={this.handleOp4} id="chekcbox4" checked={(this.state.questionnaireSelected4 === 4)} />
                  <label htmlFor="chekcbox4"><span className="checkbox-icon"></span> {option4}</label>
                </div><br />



                {/* <div className='radio'>
                  <input id={`radio-1${qno}`} value={option1} type='radio' onChange={this.handleOp1} checked={(this.state.ansSelected === option1)} />
                  <label htmlFor={`radio-1${qno}`}><span className='radio-label' /> {option1}</label>
                </div><br />

                <div className='radio'>
                  <input id={`radio-2${qno}`} value={option2} type='radio' onChange={this.handleOp2} checked={(this.state.ansSelected === option2)} />
                  <label htmlFor={`radio-2${qno}`}><span className='radio-label' /> {option2}</label>
                </div><br />

                <div className='radio'>
                  <input id={`radio-3${qno}`} value={option3} type='radio' onChange={this.handleOp3} checked={(this.state.ansSelected === option3)} />
                  <label htmlFor={`radio-3${qno}`}><span className='radio-label' /> {option3}</label>
                </div><br />

                <div className='radio'>
                  <input id={`radio-4${qno}`} value={option4} type='radio' onChange={this.handleOp4} checked={(this.state.ansSelected === option4)} />
                  <label htmlFor={`radio-4${qno}`}><span className='radio-label' /> {option4}</label>
                </div><br /> */}
              </div>}
            </div>
          </Card.Text>
          {/* <Card.Link href="#">Card Link</Card.Link> */}
          {/* <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
      </Card>
    )
  }
}
