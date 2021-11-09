import ls from 'local-storage'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getServices, getUserById } from '../../../Actions'
import { Service } from './service_item'

export class FreelancerServiceView extends Component {
  constructor () {
    super()
    this.state = {
      services: []
    }
  }

  componentDidMount () {
    getServices({}, (err, res) => {
      console.log('show all services:', err, res)
      this.setState({ services: res })
    })
  }

  render () {

    const ServiceList = this.state.services.map((item, i) => {
      return <Service {...this.props} service={item} />
    })

    return (
      <>
        <div className='dashboard-content-container' data-simplebar>
          <div className='dashboard-content-inner'>
            <div class='container'>
              <div className='row'>
                <div className='col-xl-12 col-lg-8 content-right-offset'>
                  <Link to='/freelancer/service/create' class='button button-sliding-icon ripple-effect'>Create Service <i class='icon-material-outline-arrow-right-alt' /></Link>
                </div>

                <div className='col-xl-12 col-lg-8 content-right-offset'>

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

                  {/* <!-- Tasks Container --> */}
                  <div className='tasks-list-container margin-top-35'>

                    {ServiceList}

                    {/* <!-- Pagination --> */}
                    <div className='clearfix' />
                    <div className='row'>
                          <div className='col-md-12'>
                              {/* <!-- Pagination --> */}
                              <div className='pagination-container margin-top-30 margin-bottom-60'>
                                  <nav className='pagination'>
                                          <ul>
                                          <li className='pagination-arrow'><a href='#' className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-left' /></a></li>
                                          <li><a href='#' className='ripple-effect'>1</a></li>
                                          <li><a href='#' className='current-page ripple-effect'>2</a></li>
                                          <li><a href='#' className='ripple-effect'>3</a></li>
                                          <li><a href='#' className='ripple-effect'>4</a></li>
                                          <li className='pagination-arrow'><a href='#' className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-right' /></a></li>
                                        </ul>
                                        </nav>
                                </div>
                            </div>
                        </div>
                    {/* <!-- Pagination / End --> */}

                  </div>
                  {/* <!-- Tasks Container / End --> */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
