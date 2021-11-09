
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getJobById, getJobs } from '../../Actions'

export class JobDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      jobId: '',
      hireMngrId: '',
      companyName: '',
      title: '',
      location: '',
      jobFunType: '',
      empType: '',
      compIndus: '',
      seniority: '',
      description: '',
      skills: [],
      files: [],
      createdDate: ''
    }
  }

  componentDidMount() {
    console.log('*******', this.props.match.params.jobId)
    getJobById(this.props.match.params.jobId, (err, res) => {
      console.log('check post :', err, res)
      if (err) {
        alert(err)
        return
      }
      this.setState({
        jobId: res.jobId || '',
        hireMngrId: res.hireMngrId || '',
        companyName: res.companyName || '',
        title: res.title || '',
        location: res.location || '',
        jobFunType: res.jobFunType || '',
        empType: res.empType || '',
        compIndus: res.compIndus || '',
        seniority: res.seniority || '',
        description: res.description || '',
        skills: res.skills || '',
        files: res.files || [],
        createdDate: res.createdDate || ''
      })
    })
  }

  render() {
    // const jobs = this.state.jobs.map((item, i) => {
    //     // console.log('check ',data)
    //     return <JobSearchItem key={i} job={item} {...this.props} />
    // })

    return (
      <>
        {/* <!-- Titlebar================================================== --> */}
        <div className='single-page-header' data-background-image='images/single-job.jpg'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='single-page-header-inner'>
                  <div className='left-side'>
                    <div className='header-image'><a href='single-company-profile.html'><img src='images/company-logo-03a.png' alt='' /></a></div>
                    <div className='header-details'>
                      <h3>{this.state.title}</h3>
                      <h5>About the Employer</h5>
                      <ul>
                        <li><a href='single-company-profile.html'><i className='icon-material-outline-business' /> {this.state.companyName}</a></li>
                        <li><div className='star-rating' data-rating='4.9' /></li>
                        <li><img className='flag' src='images/flags/gb.svg' alt='' /> {this.state.location}</li>
                        <li><div className='verified-badge-with-title'>Verified</div></li>
                      </ul>
                    </div>
                  </div>
                  <div className='right-side'>
                    <div className='salary-box'>
                      <div className='salary-type'>Annual Salary</div>
                      <div className='salary-amount'>$35k - $38k</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Page Content================================================== --> */}
        <div className='container'>
          <div className='row'>

            {/* <!-- Content --> */}
            <div className='col-xl-8 col-lg-8 content-right-offset'>

              <div className='single-page-section'>
                <h3 className='margin-bottom-25'>Job Description</h3>
                <p>{this.state.description}</p>
              </div>

              <div className='single-page-section'>
                <h3 className='margin-bottom-30'>Location</h3>
                <div id='single-job-map-container'>
                  <div id='singleListingMap' data-latitude='51.507717' data-longitude='-0.131095' data-map-icon='im im-icon-Hamburger' />
                  <a href='#' id='streetView'>Street View</a>
                </div>
              </div>

            </div>

            {/* <!-- Sidebar --> */}
            <div className='col-xl-4 col-lg-4'>
              <div className='sidebar-container'>

                <a href='#small-dialog' className='apply-now-button popup-with-zoom-anim'>Apply Now <i className='icon-material-outline-arrow-right-alt' /></a>

                {/* <!-- Sidebar Widget --> */}
                <div className='sidebar-widget'>
                  <div className='job-overview'>
                    <div className='job-overview-headline'>Job Summary</div>
                    <div className='job-overview-inner'>
                      <ul>
                        <li>
                          <i className='icon-material-outline-location-on' />
                          <span>Location</span>
                          <h5>{this.state.location}</h5>
                        </li>
                        <li>
                          <i className='icon-material-outline-business-center' />
                          <span>Job Type</span>
                          <h5>{this.state.empType}</h5>
                        </li>
                        <li>
                          <i className='icon-material-outline-local-atm' />
                          <span>Salary</span>
                          <h5>$35k - $38k</h5>
                        </li>
                        <li>
                          <i className='icon-material-outline-access-time' />
                          <span>Date Posted</span>
                          <h5>{this.state.createdDate}</h5>
                        </li>
                      </ul>
                    </div>
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
      </>
    )
  }
}
