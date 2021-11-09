import React from 'react'
import { Link } from 'react-router-dom'
import {Table} from 'react-bootstrap';
import qs from 'qs'
import Select, { components } from 'react-select'
import { getProposalByPost } from '../../../Actions'
import config from '../../../config'
const { displayNameSettings } = config

export class ShowQuestionaire extends React.Component {
    constructor() {
        super()
        this.state = {
            proposalData: [],
            showProposalData: [],
            slectedPassStatus: 'all',
            postId: '',
            checkRateAll: true,
            checkRateFive: false,
            checkRateFour: false,
            checkRateThree: false,
            checkRateTwo: false,
            checkRateOne: false
        }

        this.handleRateAll = this.handleRateAll.bind(this)
        this.handleRateFive = this.handleRateFive.bind(this)
        this.handleRateFour = this.handleRateFour.bind(this)
        this.handleRateThree = this.handleRateThree.bind(this)
        this.handleRateTwo = this.handleRateTwo.bind(this)
        this.handleRateOne = this.handleRateOne.bind(this)
        this.handleRatingFilter = this.handleRatingFilter.bind(this)

        this.onPassStatusChange = this.onPassStatusChange.bind(this)
        this.allProposalDetails = this.allProposalDetails.bind(this)
    }



    handleRatingFilter() {
        let finalData = this.state.proposalData

        if (this.state.slectedPassStatus === "all") {
            finalData = finalData
        } else if (this.state.slectedPassStatus === "pass") {
            finalData = finalData.filter(item => item.questionnaireObj.answer.currect >= 3)
        } else if (this.state.slectedPassStatus === "failed") {
            finalData = finalData.filter(item => item.questionnaireObj.answer.currect < 3)
        } else { }

        if (this.state.checkRateAll) {
            this.setState({
                showProposalData: finalData.filter((item) => parseInt(item.avgRating ? item.avgRating : "0") > 0)
            })
            return;
        }
        this.setState({
            showProposalData: finalData.filter((item) => {
                if (
                    (this.state.checkRateOne && item.avgRating === "1") ||
                    (this.state.checkRateTwo && item.avgRating === "2") ||
                    (this.state.checkRateThree && item.avgRating === "3") ||
                    (this.state.checkRateFour && item.avgRating === "4") ||
                    (this.state.checkRateFive && item.avgRating === "5")
                ) {
                    return item
                }

            }).filter(item => item !== 'undefined')
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.checkRateAll !== prevState.checkRateAll || this.state.checkRateFive !== prevState.checkRateFive || this.state.checkRateFour !== prevState.checkRateFour || this.state.checkRateThree !== prevState.checkRateThree || this.state.checkRateTwo !== prevState.checkRateTwo || this.state.checkRateOne !== prevState.checkRateOne) {
            this.handleRatingFilter()
        }
    }

    handleRateAll() {
        if (this.state.checkRateAll) {
            this.setState({
                checkRateAll: false, checkRateFive: false, checkRateFour: false, checkRateThree: false, checkRateThree: false,
                checkRateTwo: false, checkRateOne: false
            })
        } else {
            this.setState({
                checkRateAll: true, checkRateFive: true, checkRateFour: true, checkRateThree: true, checkRateThree: true,
                checkRateTwo: true, checkRateOne: true
            })
        }
    }

    handleRateFive() {
        if (this.state.checkRateFive) {
            this.setState({ checkRateFive: false })
        } else {
            this.setState({ checkRateFive: true })
        }
    }

    handleRateFour() {
        if (this.state.checkRateFour) {
            this.setState({ checkRateFour: false })
        } else {
            this.setState({ checkRateFour: true })
        }
    }

    handleRateThree() {
        if (this.state.checkRateThree) {
            this.setState({ checkRateThree: false })
        } else {
            this.setState({ checkRateThree: true })
        }
    }

    handleRateTwo() {
        if (this.state.checkRateTwo) {
            this.setState({ checkRateTwo: false })
        } else {
            this.setState({ checkRateTwo: true })
        }
    }

    handleRateOne() {
        if (this.state.checkRateOne) {
            this.setState({ checkRateOne: false })
        } else {
            this.setState({ checkRateOne: true })
        }
    }


    allProposalDetails() {
        let search = this.props.history.location.search
        if (search.length && search[0] === '?') {
            search = search.substr(1, search.length)
            search = qs.parse(search)
        }

        const { postId = '' } = search
        this.setState({ postId })

        getProposalByPost(postId, (err, res) => {
            if (res) {
                this.setState({ proposalData: (res ? res : []), showProposalData: (res ? res : []) })
            }
        })
    }

    onPassStatusChange(e) {
        if (e.value === "all") {
            this.setState({ showProposalData: this.state.proposalData })
        } else if (e.value === "pass") {
            this.setState({ showProposalData: this.state.proposalData.filter(item => item.questionnaireObj.answer.currect >= item.questionnaireObj.answer.passingQuesCount) })
        } else if (e.value === "failed") {
            this.setState({ showProposalData: this.state.proposalData.filter(item => item.questionnaireObj.answer.currect < item.questionnaireObj.answer.passingQuesCount) })
        } else { }
        this.setState({ slectedPassStatus: e.value })
    }

    componentDidMount() {
        this.allProposalDetails()
    }

    render() {

        const customStyles = {
            control: base => ({
                ...base,
                height: 48,
                minHeight: 48
            })
        };

        const options = [
            { value: 'all', label: 'all' },
            { value: 'pass', label: 'pass' },
            { value: 'failed', label: 'failed' }
        ]

        const questRow = (Array.isArray(this.state.showProposalData) ? this.state.showProposalData : []).map((item, i) => {
            const { answer = {} } = (item.questionnaireObj ? item.questionnaireObj : {})
            const { currect, skip, wrong, passingQuesCount } = answer
            console.log("@@@@@@",this.props)
            return <tr>
                <td>{i + 1}</td>
                <td><Link to={`/freelancer/search_details/${item.userId}?currPraposalId=${item.proposalId}`}>{item.userName}</Link></td>
                <td>
                    <span class={currect >= passingQuesCount ? "dashboard-status-button green" : "dashboard-status-button red"}>{currect >= passingQuesCount ? "PASS" : "FAILD"}</span></td>
                <td>{item.questionnaireObj.questionnaire.length}</td>
                <td>{currect}</td>
                <td>{skip}</td>
                <td>{wrong}</td>
                <td>{passingQuesCount}</td>
                <td>{item.avgRating}</td>
            </tr>
        })
        return (
            <>
                <li>
                    <div className="row" style={{ width: "100%" }}>
                        <div className="col-xl-3">total : 10 pass, 12 failed</div>
                        <div className="col-xl-2">
                            <div className="submit-field">
                                <Select
                                    placeholder="Select"
                                    value={options.find(obj => obj.value === this.state.selectedPayType)}
                                    options={options}
                                    onChange={this.onPassStatusChange}
                                    styles={customStyles}
                                    isSearchable={false}
                                    defaultValue={options[0]}
                                />
                            </div>
                        </div>
                        <div className="col-xl-2">
                            <div className="submit-field">
                                <div className="checkbox">
                                    <input type="checkbox" onChange={this.handleRateAll} id="chekcboxall" checked={this.state.checkRateAll} />
                                    <label htmlFor="chekcboxall"><span className="checkbox-icon"></span> Rating All</label>
                                </div>
                            </div>
                        </div>
                        {!this.state.checkRateAll && <div className="col-xl-1">
                            <div className="submit-field">
                                <div className="checkbox">
                                    <input type="checkbox" onChange={this.handleRateFive} id="chekcbox5" checked={this.state.checkRateFive} />
                                    <label htmlFor="chekcbox5"><span className="checkbox-icon"></span> 5</label>
                                </div>
                            </div>
                        </div>}
                        {!this.state.checkRateAll && <div className="col-xl-1">
                            <div className="submit-field">
                                <div className="checkbox">
                                    <input type="checkbox" onChange={this.handleRateFour} id="chekcbox4" checked={this.state.checkRateFour} />
                                    <label htmlFor="chekcbox4"><span className="checkbox-icon"></span> 4</label>
                                </div>
                            </div>
                        </div>}
                        {!this.state.checkRateAll && <div className="col-xl-1">
                            <div className="submit-field">
                                <div className="checkbox">
                                    <input type="checkbox" onChange={this.handleRateThree} id="chekcbox3" checked={this.state.checkRateThree} />
                                    <label htmlFor="chekcbox3"><span className="checkbox-icon"></span> 3</label>
                                </div>
                            </div>
                        </div>}
                        {!this.state.checkRateAll && <div className="col-xl-1">
                            <div className="submit-field">
                                <div className="checkbox">
                                    <input type="checkbox" onChange={this.handleRateTwo} id="chekcbox2" checked={this.state.checkRateTwo} />
                                    <label htmlFor="chekcbox2"><span className="checkbox-icon"></span> 2</label>
                                </div>
                            </div>
                        </div>}
                        {!this.state.checkRateAll && <div className="col-xl-1">
                            <div className="submit-field">
                                <div className="checkbox">
                                    <input type="checkbox" onChange={this.handleRateOne} id="chekcbox1" checked={this.state.checkRateOne} />
                                    <label htmlFor="chekcbox1"><span className="checkbox-icon"></span> 1</label>
                                </div>
                            </div>
                        </div>}

                    </div>
                    <Table striped bordered hover>
                        <thead>

                            <tr>
                                <th>SrNo</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Total Questions</th>
                                <th>Currect</th>
                                <th>skip</th>
                                <th>wrong</th>
                                <th>Passing</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questRow}

                        </tbody>
                    </Table>
                </li>
            </>
        )
    }
}

export class HiremngrQuesionaireList extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
        let search = this.props.history.location.search
        if (search.length && search[0] === '?') {
            search = search.substr(1, search.length)
            search = qs.parse(search)
        }

        const { title } = search
        this.setState({ title })
    }


    render() {
        return (
            <>
                {/* <!-- Dashboard Content================================================== --> */}
                <div className='dashboard-content-container' data-simplebar>
                    <div className='dashboard-content-inner'>

                        {/* <!-- Dashboard Headline --> */}
                        <div className='dashboard-headline'>
                            <h3>Questionnaire of {displayNameSettings.post}s</h3>

                            {/* <!-- Breadcrumbs --> */}
                            <nav id='breadcrumbs' className='dark'>
                                <ul>
                                    <li><a href='#'>Home</a></li>
                                    <li><a href='#'>Dashboard</a></li>
                                    <li>Questionnaire of {displayNameSettings.post}s</li>
                                </ul>
                            </nav>
                        </div>

                        {/* <!-- Row --> */}
                        <div className='row'>

                            {/* <!-- Dashboard Box --> */}
                            <div className='col-xl-12'>
                                <div className='dashboard-box margin-top-0'>

                                    {/* <!-- Headline --> */}
                                    <div className='headline'>
                                        <div style={{ display: "inline-block", width: "100%" }}>
                                            <div style={{ float: "left" }}>
                                                <h3 style={{ display: "inline-block" }}><i className='icon-material-outline-assignment' /> Questionnaire result of <strong><u>{this.state.title}</u></strong></h3>
                                            </div>
                                            <div style={{ float: "right" }}>
                                                <button className="button dark ripple-effect" onClick={() => this.props.history.goBack()}><i className="icon-material-outline-arrow-back"></i> back</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Show all posts */}
                                    <div className='content'>
                                        <ul className='dashboard-box-list'>
                                            <ShowQuestionaire {...this.props} />
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <!-- Row / End --> */}

                        {/* <!-- Footer --> */}
                        <div className='dashboard-footer-spacer' />
                        <div className='small-footer margin-top-15'>
                            <div className='small-footer-copyrights'>
                                © 2021 <strong>jobviously</strong>. All Rights Reserved.
                            </div>
                            <ul className='footer-social-links'>
                                <li>
                                    <a href='#' title='Facebook' data-tippy-placement='top'>
                                        <i className='icon-brand-facebook-f' />
                                    </a>
                                </li>
                                <li>
                                    <a href='#' title='Twitter' data-tippy-placement='top'>
                                        <i className='icon-brand-twitter' />
                                    </a>
                                </li>
                                <li>
                                    <a href='#' title='Google Plus' data-tippy-placement='top'>
                                        <i className='icon-brand-google-plus-g' />
                                    </a>
                                </li>
                                <li>
                                    <a href='#' title='LinkedIn' data-tippy-placement='top'>
                                        <i className='icon-brand-linkedin-in' />
                                    </a>
                                </li>
                            </ul>
                            <div className='clearfix' />
                        </div>
                        {/* <!-- Footer / End --> */}

                    </div>
                </div>
                {/* <!-- Dashboard Content / End --> */}
            </>

        )
    }
}
