import ls from 'local-storage'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getUserById } from '../../Actions'

export class FreelancerProfileView extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      mobile: '',
      about: '',
      rate: '',
      rateType: '',
      skills: '',
      nationality: '',
      location: '',
      jobFunType: '',
      empType: '',
      compIndus: '',
      seniority: '',
      handleProfile: '',
      files: [],
      pic: {}
    }
  }

  componentDidMount() {
    const userId = ls.get('userId')

    getUserById(userId, {}, (err, res) => {
      console.log('createJob result :', err, res)

      if (err || res.error) {
        alert((res.error && res.error.message))
        return
      }

      this.setState({
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
        mobile: res.mobile,
        about: res.about,
        rate: res.rate,
        rateType: res.rateType,
        skills: res.skills,
        nationality: res.nationality,
        location: res.location,
        jobFunType: res.jobFunType,
        empType: res.empType,
        compIndus: res.compIndus,
        seniority: res.seniority,
        files: res.files,
        pic: res.pic
      })
    })
  }

  render() {

    const skills = this.state.skills

    const Attachments = this.state.files.map((item, i) => {
      return <a href={item.url} target='_blank' key={i} className='attachment-box ripple-effect'><span>{item.fileName}</span><i>{item.format}</i></a>
    })

    return (
      <>
        {/* <!-- Dashboard Content================================================== --> */}
        <div class='dashboard-content-container' data-simplebar>
          <div class='dashboard-content-inner'>
            {/* <!-- Dashboard Headline --> */}
            <div className='single-page-header freelancer-header' data-background-image={require('../../assets/images/single-freelancer.jpg')}>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='single-page-header-inner'>
                      <div className='left-side'>
                        <div className='header-image freelancer-avatar'><img src={`${this.state.pic.url}`} alt='' /></div>
                        <div className='header-details'>
                          <h3>{`${this.state.firstName} ${this.state.lastName}`} <span>{`${this.state.jobFunType}`}</span></h3>
                          <ul>
                            {/* <li><div className="star-rating" data-rating="5.0"></div></li> */}
                            <li><img className='flag' src='images/flags/de.svg' alt='' /> {`${this.state.nationality}`}</li>
                            <li><div className='verified-badge-with-title'>Verified</div></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Row --> */}
            <div className='row'>

              {/* <!-- Content --> */}
              <div className='col-xl-8 col-lg-8 content-right-offset'>

                {/* <!-- Page Content --> */}
                <div className='single-page-section'>
                  <h3 className='margin-bottom-25'>About Me</h3>
                  {`${this.state.about}`}
                </div>

              </div>

              {/* <!-- Sidebar --> */}
              <div className='col-xl-4 col-lg-4'>
                <div className='sidebar-container'>

                  {/* <!-- Profile Overview --> */}
                  <div className='profile-overview'>
                    <div className='overview-item'><strong>{this.state.rate}$</strong><span>{this.state.rateType}</span></div>
                    {/* <div className="overview-item"><strong>53</strong><span>Jobs Done</span></div> */}
                    {/* <div className="overview-item"><strong>22</strong><span>Rehired</span></div> */}
                  </div>

                  {/* <!-- Button --> */}
                  <button onClick={() => { this.props.history.push('/freelancer/profile_edit') }} classNameName='col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim'>Edit profile </button>

                  {/* <!-- Freelancer Indicators --> */}
                  <div className='sidebar-widget'>
                    <div className='freelancer-indicators'>

                      {/* <!-- Indicator --> */}
                      {/* <div className="indicator">
                                                <strong>88%</strong>
                                                <div className="indicator-bar" data-indicator-percentage="88"><span></span></div>
                                                <span>Job Success</span>
                                            </div> */}

                      {/* <!-- Indicator --> */}
                      {/* <div className="indicator">
                                                <strong>100%</strong>
                                                <div className="indicator-bar" data-indicator-percentage="100"><span></span></div>
                                                <span>Recommendation</span>
                                            </div> */}

                      {/* <!-- Indicator --> */}
                      {/* <div className="indicator">
                                                <strong>90%</strong>
                                                <div className="indicator-bar" data-indicator-percentage="90"><span></span></div>
                                                <span>On Time</span>
                                            </div> */}

                      {/* <!-- Indicator --> */}
                      {/* <div className="indicator">
                                                <strong>80%</strong>
                                                <div className="indicator-bar" data-indicator-percentage="80"><span></span></div>
                                                <span>On Budget</span>
                                            </div> */}
                    </div>
                  </div>

                  {/* <!-- Widget --> */}
                  <div className='sidebar-widget'>
                    <h3>Social Profiles</h3>
                    <div className='freelancer-socials margin-top-25'>
                      <ul>
                        <li><a href='#' title='Dribbble' data-tippy-placement='top'><i className='icon-brand-dribbble' /></a></li>
                        <li><a href='#' title='Twitter' data-tippy-placement='top'><i className='icon-brand-twitter' /></a></li>
                        <li><a href='#' title='Behance' data-tippy-placement='top'><i className='icon-brand-behance' /></a></li>
                        <li><a href='#' title='GitHub' data-tippy-placement='top'><i className='icon-brand-github' /></a></li>

                      </ul>
                    </div>
                  </div>

                  {/* <!-- Widget --> */}
                  <div className='sidebar-widget'>
                    <h3>Skills</h3>
                    <div className='task-tags'>
                      {skills}
                    </div>
                  </div>

                  {/* <!-- Widget --> */}
                  <div className='sidebar-widget'>
                    <h3>Attachments</h3>
                    <div className='attachments-container'>
                      {Attachments}
                    </div>
                  </div>

                  {/* <!-- Sidebar Widget --> */}
                  <div className='sidebar-widget'>
                    {/* <h3>Bookmark or Share</h3> */}

                    {/* <!-- Bookmark Button --> */}
                    {/* <button className="bookmark-button margin-bottom-25">
                                            <span className="bookmark-icon"></span>
                                            <span className="bookmark-text">Bookmark</span>
                                            <span className="bookmarked-text">Bookmarked</span>
                                        </button> */}

                    {/* <!-- Copy URL --> */}
                    <div className='copy-url'>
                      <input id='copy-url' type='text' value='' className='with-border' />
                      <button className='copy-url-button ripple-effect' data-clipboard-target='#copy-url' title='Copy to Clipboard' data-tippy-placement='top'><i className='icon-material-outline-file-copy' /></button>
                    </div>

                    {/* <!-- Share Buttons --> */}
                    {/* <div className='share-buttons margin-top-25'>
                      <div className='share-buttons-trigger'><i className='icon-feather-share-2' /></div>
                      <div className='share-buttons-content'>
                        <span>Interesting? <strong>Share It!</strong></span>
                        <ul className='share-buttons-icons'>
                          <li><a href='#' data-button-color='#3b5998' title='Share on Facebook' data-tippy-placement='top'><i className='icon-brand-facebook-f' /></a></li>
                          <li><a href='#' data-button-color='#1da1f2' title='Share on Twitter' data-tippy-placement='top'><i className='icon-brand-twitter' /></a></li>
                          <li><a href='#' data-button-color='#dd4b39' title='Share on Google Plus' data-tippy-placement='top'><i className='icon-brand-google-plus-g' /></a></li>
                          <li><a href='#' data-button-color='#0077b5' title='Share on LinkedIn' data-tippy-placement='top'><i className='icon-brand-linkedin-in' /></a></li>
                        </ul>
                      </div>
                    </div> */}
                  </div>

                </div>
              </div>

            </div>
          </div>
          {/* <!-- Row / End --> */}

          {/* <!-- Footer --> */}
          <div class='dashboard-footer-spacer' />
          <div class='small-footer margin-top-15'>
            <div class='small-footer-copyrights'>
              © 2021 <strong>jobviously</strong>. All Rights Reserved.
            </div>
            <ul class='footer-social-links'>
              <li>
                <a href='#' title='Facebook' data-tippy-placement='top'>
                  <i class='icon-brand-facebook-f' />
                </a>
              </li>
              <li>
                <a href='#' title='Twitter' data-tippy-placement='top'>
                  <i class='icon-brand-twitter' />
                </a>
              </li>
              <li>
                <a href='#' title='Google Plus' data-tippy-placement='top'>
                  <i class='icon-brand-google-plus-g' />
                </a>
              </li>
              <li>
                <a href='#' title='LinkedIn' data-tippy-placement='top'>
                  <i class='icon-brand-linkedin-in' />
                </a>
              </li>
            </ul>
            <div class='clearfix' />
          </div>
          {/* <!-- Footer / End --> */}

        </div>

      </>
    )
  }
}
