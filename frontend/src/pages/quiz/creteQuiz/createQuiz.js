import React from 'react'
import Select from 'react-select';
import {Table} from 'react-bootstrap'
import { getUserById,createPost, patchPost, createNotification } from '../../../Actions';


const QTYPE = [
  {
    value: "mcq",
    label: "MCQ"
  },
  {
    value: "tf",
    label: "TF"
  },
  {
    value: "mselect",
    label: "mselect"
  },
]

const TF = [
  {
    value: "T",
    label: "True"
  },
  {
    value: "F",
    label: "False"
  },
]
export default class CreateQuiz extends React.Component {

  constructor() {
    super()
    this.state = {
      postid:'',
      passingQuesCount:"",
      quesRow: [],
      question: '',
      op1: '',
      op2: '',
      op3: '',
      op4: '',
      answer: '',
      mop1: '',
      mop2: '',
      mop3: '',
      mop4: '',
      manswer: '',
      selectedQType: '',
      selectedOption: 'tf',
      selectedTFOption: null,
      addQues: false,
      addQuesBtn: true,
      addCancelBtn: false,
      addSubmitBtn: false,
    }

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleTFTypeChange = this.handleTFTypeChange.bind(this)
    this.handleAddQues = this.handleAddQues.bind(this)
    this.handleCancelQues = this.handleCancelQues.bind(this)
    this.handleSubmitQues = this.handleSubmitQues.bind(this)
    this.handleSubmitToDatabase = this.handleSubmitToDatabase.bind(this)
  }

  handleAddQues = () => {
    this.setState({ addQuesBtn: false, addQues: true, addCancelBtn: true, addSubmitBtn: true })
  }

  handleCancelQues = () => {
    this.setState({
      addQuesBtn: true,
      addQues: false,
      addCancelBtn: false,
      addSubmitBtn: false,
      selectedQType: '',
      selectedOption: 'tf',
    })
  }

  handleSubmitQues = () => {
    let quesRowNew = this.state.quesRow || []
    let quesObj = {
      "SrNo": quesRowNew.length+1,
      "qType": "",
      "question": "",
      "option1": "",
      "option2": "",
      "option3": "",
      "option4": "",
      "answer": ""
    }

    if (this.state.selectedOption.value === 'tf') {
      quesObj = {
        "SrNo": quesRowNew.length+1,
        "qType": this.state.selectedOption.value,
        "question": this.state.question,
        "option1": "",
        "option2": "",
        "option3": "",
        "option4": "",
        "answer": this.state.selectedTFOption.value
      }
    } else if (this.state.selectedOption.value === 'mcq') {
      quesObj = {
        "SrNo": quesRowNew.length+1,
        "qType": this.state.selectedOption.value,
        "question": this.state.question,
        "option1": this.state.op1,
        "option2": this.state.op2,
        "option3": this.state.op3,
        "option4": this.state.op4,
        "answer": this.state.answer
      }
    } else if (this.state.selectedOption.value === 'mselect') {
      quesObj = {
        "SrNo": quesRowNew.length+1,
        "qType": this.state.selectedOption.value,
        "question": this.state.question,
        "option1": this.state.mop1,
        "option2": this.state.mop2,
        "option3": this.state.mop3,
        "option4": this.state.mop4,
        "answer": this.state.manswer
      }
    }

    quesRowNew.push(quesObj)

    this.setState({ 
      quesRow:quesRowNew,
      question: '',
      op1: '',
      op2: '',
      op3: '',
      op4: '',
      answer: '',
      mop1: '',
      mop2: '',
      mop3: '',
      mop4: '',
      manswer: '',
      selectedQType: '',
      selectedOption: 'tf',
      selectedTFOption: null,
      addQues: false,
      addQuesBtn: true,
      addCancelBtn: false,
      addSubmitBtn: false,
     })

  }

  handleTypeChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handleTFTypeChange = selectedTFOption => {
    this.setState({ selectedTFOption });
    console.log(`Option selected:`, selectedTFOption);
  };

  handleSubmitToDatabase() {
    let body = {
      questionnaire: this.state.quesRow,
      questionnaireSelected: true,
      passingQuesCount: (this.state.passingQuesCount ? (this.state.passingQuesCount).toString() : '0'),
    }
    patchPost(this.state.postId, body, (errPatch, resPatch) => {
      if(errPatch){
        return alert("Unable to add questionaire",errPatch)
      }
      alert("success")
      return this.props.history.push(`/hiremngr/post/${this.state.postId}`)

    })
  }

  componentDidMount(){
    this.setState({postId:this.props.match.params.postId})
  }

  render() {

    let tr = this.state.quesRow.map((item, i) => {
      return (<tr>
                <td>{item.SrNo}</td>
                <td>{item.question}</td>
                <td>{item.qType}</td>
                <td>{item.option1}</td>
                <td>{item.option2}</td>
                <td>{item.option3}</td>
                <td>{item.option4}</td>
                <td>{item.answer}</td>
                <td><button className="button">Delete</button></td>
        </tr>)
    })

    // alert(JSON.stringify(this.state.quesRow) )

    return (
      <div className="container">

        {/* add forms */}
        <div className="row">
          <div className="col-xl-12">
            <div className="submit-field">
              {this.state.addQuesBtn && <button className="button" style={{ margin: 10 }} onClick={this.handleAddQues} type="button">Add question</button>}
              {this.state.addCancelBtn && <button className="button dark" style={{ margin: 10 }} onClick={this.handleCancelQues} type="button">Cancel</button>}
              {this.state.addSubmitBtn && <button className="button" style={{ margin: 10 }} onClick={this.handleSubmitQues} type="button">Save</button>}
            </div>
          </div>
          <div className="col-xl-12">
            {this.state.addQues &&
              <div className="row">
                <div className="col-xl-12">
                  <div className="submit-field">
                    <Select
                      placeholder="Select Question Type"
                      value={QTYPE.find(obj => obj.value === this.state.selectedOption)}
                      onChange={this.handleTypeChange}
                      isSearchable={true}
                      options={QTYPE} />
                  </div>
                </div>
                <div className="col-xl-12">
                  <input type="input" onChange={(e) => this.setState({ question: e.target.value })} placeholder="Enter question" />
                </div>
                <div className="col-xl-12">

                  {/* IF True and False */}
                  {this.state.selectedOption.value === 'tf' &&
                    <div style={{ marginTop: 10 }} className="row">
                      <div className="col-xl-4">
                        <div className="submit-field">
                          <Select
                            placeholder="Select your answer"
                            value={QTYPE.find(obj => obj.value === this.state.selectedTFOption)}
                            onChange={this.handleTFTypeChange}
                            isSearchable={true}
                            options={TF} />
                        </div>
                      </div>
                    </div>}

                  {/* IF Multiple choice */}
                  {this.state.selectedOption.value === 'mcq' &&
                    <div style={{ marginTop: 10 }} className="row">
                      <div className="col-xl-3">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ op1: e.target.value })} type="text" placeholder="Option one" />
                        </div>
                      </div>

                      <div className="col-xl-3">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ op2: e.target.value })} type="text" placeholder="Option two" />
                        </div>
                      </div>

                      <div className="col-xl-3">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ op3: e.target.value })} type="text" placeholder="Option three" />
                        </div>
                      </div>

                      <div className="col-xl-3">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ op4: e.target.value })} type="text" placeholder="Option four" />
                        </div>
                      </div>

                      <div className="col-xl-3">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ answer: e.target.value })} type="number" placeholder="Currect Answer eg. 2" />
                        </div>
                      </div>

                    </div>}

                  {/* IF Mult select */}
                  {this.state.selectedOption.value === 'mselect' &&
                    <div style={{ marginTop: 10 }} className="row">
                      <div className="col-xl-3">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ mop1: e.target.value })} type="text" placeholder="Option one" />
                        </div>
                      </div>

                      <div className="col-xl-3">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ mop2: e.target.value })} type="text" placeholder="Option two" />
                        </div>
                      </div>

                      <div className="col-xl-3">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ mop3: e.target.value })} type="text" placeholder="Option three" />
                        </div>
                      </div>

                      <div className="col-xl-3">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ mop4: e.target.value })} type="text" placeholder="Option four" />
                        </div>
                      </div>

                      <div className="col-xl-6">
                        <div className="submit-field">
                          <input onChange={(e) => this.setState({ manswer: e.target.value })} type="text" placeholder="multiple currect ans comma-seprated eg. 2,3,4" />
                        </div>
                      </div>
                    </div>}
                </div>

              </div>}</div>
        </div>
        <div className="row">
          <div className="col-xl-4">
              <input value={this.state.passingQuesCount} onChange={(e)=>this.setState({passingQuesCount:e.target.value})} className="with-border" type="number" placeholder="Passing question counts" />
            
          </div>
          <div className="col-xl-8">
            <button className={`button ${this.state.quesRow.length===0?'dark':''}`} disabled={this.state.quesRow.length===0} onClick={this.handleSubmitToDatabase}>Submit to database</button>
          </div>
        </div>
        

        <div style={{ margin: 5, padding: 20 }}>
          <Table style={{maxWidth:"720px"}} striped bordered hover size="sm">
            <thead>
              <tr>
                <th>qNo</th>
                <th>Question</th>
                <th>Type</th>
                <th>optOne</th>
                <th>optTwo</th>
                <th>optThree</th>
                <th>optFour</th>
                <th>Answer</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tr}
            </tbody>
          </Table>
        </div>


      </div>
    )
  }
}