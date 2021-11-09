import React from 'react'
import { Accordion, Card } from 'react-bootstrap';
import { getUserById, patchUser } from '../../../Actions'
import { UserDetailsSidebar, UserDetailsContent } from './index'
import ls from 'local-storage'
import qs from 'qs'
import config from '../../../config'
import {Resume, SkillSection, MapSection, SummarySection, DocumentsSection} from './resume/resume'
const { baseSocketUrl, baseFrontenUrl, displayNameSettings } = config
const { defaultBg } = config.user

var loadjs = require('loadjs');

export class UserProfileResume extends React.Component {
    constructor() {
        super()
        this.state = {
            userData: {},
            visibleStatus: false
        }
    }

    componentDidMount() {
        

        getUserById(ls.get('userId'), {}, (err, res) => {
            if (err) {
                alert(err)
                return
            }
            if (res && res.id) {
                this.setState({ userData: res })
            }
        })
    }

    render() {
        // alert(JSON.stringify(this.state.userData))
        const {
            email = '',
            firstName = '',
            lastName = '',
            rate = '',
            rateType = '',
            skills = [],
            nationality = '',
            currency = '',
            files = [],
            userBg = {},
            userLogo = {},
            avgRating = '1',
            likedin = ''
        } = this.state.userData


        const allSkills = skills.map(item => item).join(' | ')

        const defaultLogo = require('../../../assets/images/user-avatar-placeholder.png').default
        const logoImg = userLogo.url || defaultLogo

        const logoBg = userBg.url || defaultBg
        // const userType = this.state.userType

        const offlineStyle = {
            position: 'relative',
            height: '26px',
            display: 'flex',
            top: '-1px',
            color: '#fff',
            fontWeight: '500',
            fontSize: '14px',
            fontFamily: 'Feather-Icons',
            backgroundColor: this.state.userData.online === 'Y' ? '#38b653' : 'black',
            textAlign: 'center',
            zIndex: '10',
            fontWeight: '500',
            borderRadius: '4px',
            padding: '0 8px 0 0',
            margin: '0',
            lineHeight: '27px',
        }
        const star = [1, 1, 1, 1, 1].map((item, i) => {
            if ((i + 1) <= (avgRating ? parseInt(avgRating) : 1)) return <span className='star'></span>
            return <span className='star empty'></span>
        })

        return (
            <div className="container">
                
                <div style={{ margin: 20 }}>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <div >
                                    <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/resumeIcon/Profile-ICon.png').default} alt='' /></div>
                                    <div style={{ display: "inline", padding: 5 }}><strong>Profile</strong></div>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>

                                <Resume userData={this.state.userData}/>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                <div >
                                    <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/resumeIcon/skill.png').default} alt='' /></div>
                                    <div style={{ display: "inline", padding: 5 }}><strong>Skills</strong></div>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                <SkillSection userData={this.state.userData}/>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                <div >
                                    <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/resumeIcon/map.jpg').default} alt='' /></div>
                                    <div style={{ display: "inline", padding: 5 }}><strong>Map</strong></div>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                <MapSection userData={this.state.userData}/>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                <div >
                                    <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/resumeIcon/details.png').default} alt='' /></div>
                                    <div style={{ display: "inline", padding: 5 }}><strong>Other Details</strong></div>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                <SummarySection userData={this.state.userData}/>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="4">
                                <div >
                                    <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/resumeIcon/doc.svg').default} alt='' /></div>
                                    <div style={{ display: "inline", padding: 5 }}><strong>Documents</strong></div>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body><DocumentsSection userData={this.state.userData}/></Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        
                    </Accordion>
                </div>
            </div>)
    }

}
































// import React from 'react'
// import { Accordion, Card } from 'react-bootstrap';
// import { getUserById, patchUser } from '../../../Actions'
// import { UserDetailsSidebar, UserDetailsContent } from './index'
// import ls from 'local-storage'
// import qs from 'qs'
// import config from '../../../config'
// const { baseSocketUrl, baseFrontenUrl, displayNameSettings } = config
// const { defaultBg } = config.user

// var loadjs = require('loadjs');

// export class UserProfileResume extends React.Component {
//     constructor() {
//         super()

//     }

//     componentDidMount() {

//     }

//     render() {
//         return (
//             <div className="container">
//                 <div style={{ margin: 20 }}>
//                     <Accordion defaultActiveKey="0">
//                         <Card>
//                             <Accordion.Toggle as={Card.Header} eventKey="0">
//                                 <div >
//                                     <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/company-logo-03.png').default} alt='' /></div>
//                                     <div style={{ display: "inline", padding: 5 }}><strong>Profile</strong></div>
//                                 </div>
//                             </Accordion.Toggle>
//                             <Accordion.Collapse eventKey="0">
//                                 <Card.Body>


//                                 </Card.Body>
//                             </Accordion.Collapse>
//                         </Card>
//                         <Card>
//                             <Accordion.Toggle as={Card.Header} eventKey="1">
//                                 <div >
//                                     <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/company-logo-03.png').default} alt='' /></div>
//                                     <div style={{ display: "inline", padding: 5 }}><strong>Price, Currency & duration</strong></div>
//                                 </div>
//                             </Accordion.Toggle>
//                             <Accordion.Collapse eventKey="1">
//                                 <Card.Body>A skilled individual seeking a short piece of work (few hours) i.e. seeking a Joblem.</Card.Body>
//                             </Accordion.Collapse>
//                         </Card>
//                         <Card>
//                             <Accordion.Toggle as={Card.Header} eventKey="2">
//                                 <div >
//                                     <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/company-logo-03.png').default} alt='' /></div>
//                                     <div style={{ display: "inline", padding: 5 }}><strong>Price, Currency & duration</strong></div>
//                                 </div>
//                             </Accordion.Toggle>
//                             <Accordion.Collapse eventKey="2">
//                                 <Card.Body>A company or individual seeking help for a short piece of work (few hours) i.e. seeking a Jobber.</Card.Body>
//                             </Accordion.Collapse>
//                         </Card>
//                         <Card>
//                             <Accordion.Toggle as={Card.Header} eventKey="3">
//                                 <div >
//                                     <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/company-logo-03.png').default} alt='' /></div>
//                                     <div style={{ display: "inline", padding: 5 }}><strong>Price, Currency & duration</strong></div>
//                                 </div>
//                             </Accordion.Toggle>
//                             <Accordion.Collapse eventKey="3">
//                                 <Card.Body>A small (1hr to 1 week) fixed-price well defined service/solution e.g. logo design.</Card.Body>
//                             </Accordion.Collapse>
//                         </Card>
//                         <Card>
//                             <Accordion.Toggle as={Card.Header} eventKey="4">
//                                 <div >
//                                     <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/company-logo-03.png').default} alt='' /></div>
//                                     <div style={{ display: "inline", padding: 5 }}><strong>Price, Currency & duration</strong></div>
//                                 </div>
//                             </Accordion.Toggle>
//                             <Accordion.Collapse eventKey="4">
//                                 <Card.Body>Place where joblems are posted.</Card.Body>
//                             </Accordion.Collapse>
//                         </Card>
//                         <Card>
//                             <Accordion.Toggle as={Card.Header} eventKey="5">
//                                 <div >
//                                     <div style={{ display: "inline" }}><img width="50" src={require('../../../assets/images/company-logo-03.png').default} alt='' /></div>
//                                     <div style={{ display: "inline", padding: 5 }}><strong>Price, Currency & duration</strong></div>
//                                 </div>
//                             </Accordion.Toggle>
//                             <Accordion.Collapse eventKey="5">
//                                 <Card.Body>Place where Joblots are posted.</Card.Body>
//                             </Accordion.Collapse>
//                         </Card>
//                     </Accordion>
//                 </div>
//             </div>)

//     }
// }
