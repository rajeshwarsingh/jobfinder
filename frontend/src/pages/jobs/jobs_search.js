
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getJobs } from '../../Actions'
import { JobSearchItem } from './index'

export class JobSearch extends React.Component {
  constructor () {
    super()
    this.state = {
      jobs: []
    }
  }

  componentDidMount () {
    getJobs({}, (err, res) => {
      console.log('show all jobs:', err, res)
      this.setState({ jobs: res || [] })
    })
  }

  render () {
    const jobs = this.state.jobs.map((item, i) => {
      // console.log('check ',data)
      return <JobSearchItem key={i} job={item} {...this.props} />
    })

    return (
      <>
        {/* <!-- Page Content================================================== --> */}
        <div className='container'>
          <div className='row'>
            <div className='col-xl-3 col-lg-4'>
              <div className='sidebar-container'>

                {/* <!-- Location --> */}
                <div className='sidebar-widget'>
                  <h3>Location</h3>
                  <div className='input-with-icon'>
                    <div id='autocomplete-container'>
                <input id='autocomplete-input' type='text' placeholder='Location' />
              </div>
                    <i className='icon-material-outline-location-on' />
                  </div>
                </div>

                {/* <!-- Keywords --> */}
                <div className='sidebar-widget'>
                  <h3>Keywords</h3>
                  <div className='keywords-container'>
                    <div className='keyword-input-container'>
                <input type='text' className='keyword-input' placeholder='e.g. job title' />
                <button className='keyword-input-button ripple-effect'><i className='icon-material-outline-add' /></button>
              </div>
                    <div className='keywords-list'>
                {/* <!-- keywords go here --> */}
              </div>
                    <div className='clearfix' />
                  </div>
                </div>

                {/* <!-- Category --> */}
                <div className='sidebar-widget'>
                  <h3>Category</h3>
                  <select className='selectpicker default' multiple data-selected-text-format='count' data-size='7' title='All Categories'>
                    <option>Admin Support</option>
                    <option>Customer Service</option>
                    <option>Data Analytics</option>
                    <option>Design & Creative</option>
                    <option>Legal</option>
                    <option>Software Developing</option>
                    <option>IT & Networking</option>
                    <option>Writing</option>
                    <option>Translation</option>
                    <option>Sales & Marketing</option>
                  </select>
                </div>

                {/* <!-- Job Types --> */}
                <div className='sidebar-widget'>
                  <h3>Job Type</h3>

                  <div className='switches-list'>
                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Freelance</label>
              </div>

                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Full Time</label>
              </div>

                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Part Time</label>
              </div>

                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Internship</label>
              </div>
                    <div className='switch-container'>
                <label className='switch'><input type='checkbox' /><span className='switch-button' /> Temporary</label>
              </div>
                  </div>

                </div>

                {/* <!-- Salary --> */}
                <div className='sidebar-widget'>
                  <h3>Salary</h3>
                  <div className='margin-top-55' />

                  {/* <!-- Range Slider --> */}
                  <input className='range-slider' type='text' value='' data-slider-currency='$' data-slider-min='1500' data-slider-max='15000' data-slider-step='100' data-slider-value='[1500,15000]' />
                </div>

                {/* <!-- Tags --> */}
                <div className='sidebar-widget'>
                  <h3>Tags</h3>

                  <div className='tags-container'>
                    <div className='tag'>
                <input type='checkbox' id='tag1' />
                <label for='tag1'>front-end dev</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag2' />
                <label for='tag2'>angular</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag3' />
                <label for='tag3'>react</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag4' />
                <label for='tag4'>vue js</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag5' />
                <label for='tag5'>web apps</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag6' />
                <label for='tag6'>design</label>
              </div>
                    <div className='tag'>
                <input type='checkbox' id='tag7' />
                <label for='tag7'>wordpress</label>
              </div>
                  </div>
                  <div className='clearfix' />
                </div>

              </div>
            </div>
            <div className='col-xl-9 col-lg-8 content-left-offset'>

              <h3 className='page-title'>Search Results</h3>

              <div className='notify-box margin-top-15'>
                <div className='switch-container'>
                  <label className='switch'><input type='checkbox' /><span className='switch-button' /><span className='switch-text'>Turn on email alerts for this search</span></label>
                </div>

                <div className='sort-by'>
                  <span>Sort by:</span>
                  <select className='selectpicker hide-tick'>
                    <option>Relevance</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Random</option>
                  </select>
                </div>
              </div>

              <div className='listings-container margin-top-35'>

                {jobs}

                {/* <!-- Pagination --> */}
                <div className='clearfix' />
                <div className='row'>
                  <div className='col-md-12'>
                    {/* <!-- Pagination --> */}
                    <div className='pagination-container margin-top-30 margin-bottom-60'>
                <nav className='pagination'>
                            <ul>
                                <li className='pagination-arrow'><a href='#'><i className='icon-material-outline-keyboard-arrow-left' /></a></li>
                                <li><a href='#'>1</a></li>
                                <li><a href='#' className='current-page'>2</a></li>
                                <li><a href='#'>3</a></li>
                                <li><a href='#'>4</a></li>
                                <li className='pagination-arrow'><a href='#'><i className='icon-material-outline-keyboard-arrow-right' /></a></li>
                              </ul>
                          </nav>
              </div>
                  </div>
                </div>
                {/* <!-- Pagination / End --> */}

              </div>

            </div>
          </div>
        </div>
      </>
    )
  }
}
