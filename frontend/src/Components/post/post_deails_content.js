import React from 'react'
import GoogleMapReact from 'google-map-react'
import { ToastContainer, toast } from 'react-toastify'
import { patchPost } from '../../Actions';
import { ProposalRequest, ActivePostDetails } from './index'
import config from '../../config'
import { CSVReader } from 'react-papaparse'
var loadjs = require('loadjs');
const { googlemap = { key: '' } } = config

// const AnyReactComponent = ({ text }) => <div className="marker-container no-marker-icon ">'+
// '<div className="marker-card">'+
//    '<div className="front face">' + {text} + '</div>'+
//    '<div className="marker-arrow"></div>'+
// '</div>'+
// '</div>;
const AnyReactComponent = ({ text }) => <div style={{width:"fit-content", fontWeight:'bold',color:'blue'}} >{text}</div>

export class PostDetailsContent extends React.Component {
    constructor() {
        super();
        this.state = {
            bidAmount: '',
            bidDays: '',
            bidMessage: '',
            currentProposalStatus: 'not-send',
            questionnaireSelected: true,
            questionnaire: [],
            passingQuesCount: "",
        }
        this.passingQuesChange = this.passingQuesChange.bind(this)
    }

    notifyErr = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    notifySucc = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    passingQuesChange(e) {
        this.setState({ passingQuesCount: e.target.value });
    };

    handleQuestionnaireDrop = (data) => {

        let questionnaire = data.map((item, i) => item.data)
        let quesArr = []
        for (let i = 0; i < questionnaire.length; i++) {
            if (i !== 0) {
                let row = questionnaire[i]

                let obj = {}
                row.forEach((item, j) => {
                    obj[questionnaire[0][j]] = row[j]
                })
                quesArr.push(obj)
            }
        }
        quesArr = (quesArr ? quesArr : []).filter(item => item["SrNo"] !== (""))
        let body = {
            questionnaire: quesArr,
            passingQuesCount: (this.state.passingQuesCount ? (this.state.passingQuesCount).toString() : '0'),
        }
        if (this.state.questionnaireSelected && (this.state.passingQuesCount === "" || isNaN(this.state.passingQuesCount))) {
            return this.notifyErr('please provide questionaire passing question count!')
        }
        patchPost(this.props.postData.postId, body, (errPatch, resPatch) => {
            if (errPatch) {
                return this.notifySucc('Post created successfully!')

            } else {
                this.notifySucc('Questionaire updated successfully!')
                setTimeout(() => {
                    return window.location.reload()
                }, 2000)
            }
        })
    }

    handleQuestionnaireError = (err, file, inputElem, reason) => {
        this.setState({ questionnaire: [] })
    }

    handleQuestionnaireRemoveFile = (data) => {

        this.setState({ questionnaire: [] })
    }

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

    render() {
        const mystyle = {
            border: "1px solid #dddddd",
            textAlign: "left",
            padding: "8px"
        }
        const {
            description,
            files,
            location = {
                "lat": '',
                "lng": ''
            },
            address = '',
            workingHours = { "mon": "", "tue": "", "wed": "", "thu": "", "fri": "", "sat": "", "sun": "" },
            NoOfWeeks
        } = this.props.postData
        const { userType = '' } = this.props

        let supportDoc = (files || []).map((item, i) => {
            return <div><a key={i} href={item.url} download>{item.fileName}</a></div>
        })

        if (userType === 'hiremanager') {
            return (
                <div className="col-xl-8 col-lg-8 content-right-offset">
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />

                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Job Description</h3>
                        <p>{description}</p>
                    </div>

                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Working Hours  </h3> <small><label>Total Weeks: {NoOfWeeks}</label></small>
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
                                    <td style={mystyle}>{(workingHours['mon']?this.convertHMS(workingHours['mon'].start).toString().substr(0, 5):'')}</td>
                                    <td style={mystyle}>{(workingHours['tue']?this.convertHMS(workingHours['tue'].start).toString().substr(0, 5):'')}</td>
                                    <td style={mystyle}>{(workingHours['wed']?this.convertHMS(workingHours['wed'].start).toString().substr(0, 5):'')}</td>
                                    <td style={mystyle}>{(workingHours['thu']?this.convertHMS(workingHours['thu'].start).toString().substr(0, 5):'')}</td>
                                    <td style={mystyle}>{(workingHours['fri']?this.convertHMS(workingHours['fri'].start).toString().substr(0, 5):'')}</td>
                                    <td style={mystyle}>{(workingHours['sat']?this.convertHMS(workingHours['sat'].start).toString().substr(0, 5):'')}</td>
                                    <td style={mystyle}>{(workingHours['sun']?this.convertHMS(workingHours['sun'].start).toString().substr(0, 5):'')}</td>
                                </tr>
                                <tr>
                                    <td style={mystyle}>{(workingHours['mon']?this.convertHMS(workingHours['mon'].end).toString().substr(0, 5):"")}</td>
                                    <td style={mystyle}>{(workingHours['tue']?this.convertHMS(workingHours['tue'].end).toString().substr(0, 5):"")}</td>
                                    <td style={mystyle}>{(workingHours['wed']?this.convertHMS(workingHours['wed'].end).toString().substr(0, 5):"")}</td>
                                    <td style={mystyle}>{(workingHours['thu']?this.convertHMS(workingHours['thu'].end).toString().substr(0, 5):"")}</td>
                                    <td style={mystyle}>{(workingHours['fri']?this.convertHMS(workingHours['fri'].end).toString().substr(0, 5):"")}</td>
                                    <td style={mystyle}>{(workingHours['sat']?this.convertHMS(workingHours['sat'].end).toString().substr(0, 5):"")}</td>
                                    <td style={mystyle}>{(workingHours['sun']?this.convertHMS(workingHours['sun'].end).toString().substr(0, 5):"")}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Supporting Documents</h3>
                        {supportDoc}
                    </div>
                    {this.state.questionnaireSelected && <div className='row' >
                        <div className="submit-field">
                            <CSVReader
                                onDrop={this.handleQuestionnaireDrop}
                                onError={this.handleQuestionnaireError}
                                addRemoveButton
                                onRemoveFile={this.handleQuestionnaireRemoveFile}
                            >
                                <span>Drop CSV file here or click to upload.</span>
                            </CSVReader>
                        </div>
                        <div style={{ margin: 15 }} className="submit-field">
                            <h3>Sample Questionnaire csv</h3>
                            <div className={"row"}>
                                <div className="col-xl-4">
                                    <div style={{ display: "inline-block" }} className="attachments-container">
                                        <a href="https://res.cloudinary.com/dkydl3enp/raw/upload/v1603222837/jugaad/questionnaire/questionnaire_nf0zpk.csv" className="attachment-box ripple-effect"><span>Questionnaire</span><i>CSV</i></a>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    Passing Counts
                            <input value={this.state.passingQuesCount} onChange={this.passingQuesChange} className="with-border" type="number" placeholder="0" />
                                </div>
                            </div>


                        </div>


                    </div>}

                    <div className="single-page-section">
                        <div className="margin-bottom-30" style={{ height: '340px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={googlemap.key}
                                defaultCenter={{
                                    lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                                    lng: parseInt(location.lng) ? parseInt(location.lng) : 0
                                }}
                                center={{
                                    lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                                    lng: parseInt(location.lng) ? parseInt(location.lng) : 0
                                }}
                                defaultZoom={4}
                            >
                                <AnyReactComponent
                                    lat={location.lat}
                                    lng={location.lng}
                                    text={address}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>


                </div>
            )
        }
        else if (userType === 'freelancer') {
            return (
                <div className="col-xl-8 col-lg-8 content-right-offset">

                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Job Description</h3>
                        <p>{description}</p>
                    </div>
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Supporting Documents</h3>
                        {supportDoc}
                    </div>
                    {<ProposalRequest {...this.props} postData={this.props.postData} />}

                    <div className="single-page-section">
                        <div className="margin-bottom-30" style={{ height: '340px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={googlemap.key}
                                defaultCenter={{
                                    lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                                    lng: parseInt(location.lng) ? parseInt(location.lng) : 0
                                }}
                                center={{
                                    lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                                    lng: parseInt(location.lng) ? parseInt(location.lng) : 0
                                }}
                                defaultZoom={4}
                            >
                                <AnyReactComponent
                                    lat={location.lat}
                                    lng={location.lng}
                                    text={address}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>

                    <div className="single-page-section">

                        <div><ActivePostDetails {...this.props} /></div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="col-xl-8 col-lg-8 content-right-offset">

                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Job Description</h3>
                        <p>{description}</p>
                    </div>
                </div>
            )
        }


    }
}