import React from 'react'
import { getPosts } from '../../Actions'
import { ShortPostInfo } from './shortPostInfo'

export class PostList extends React.Component {
  constructor() {
    super()
    this.state = {
      postsData: []
    }
  }

  componentDidMount() {
    getPosts({}, (err, res) => {
      this.setState({ postsData: res })
    })
  }

  render() {
    const posts = this.state.postsData.map((item, i) => {
      return <ShortPostInfo key={i} data={item} {...this.props} />
    })

    return (
      <>

        {/* <!-- Page Content================================================== --> */}
        <div className='full-page-container'>

          <div className='full-page-sidebar'>
            <div className='full-page-sidebar-inner' data-simplebar>
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
              {/* <!-- Sidebar Container / End --> */}

              {/* <!-- Search Button --> */}
              <div className='sidebar-search-button-container'>
                <button className='button ripple-effect'>Search</button>
              </div>
              {/* <!-- Search Button / End--> */}

            </div>
          </div>
          {/* <!-- Full Page Sidebar / End --> */}

          {/* <!-- Full Page Content --> */}
          <div className='full-page-content-container' data-simplebar>
            <div className='full-page-content-inner'>

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

              <div className='listings-container grid-layout margin-top-35'>

                {posts}

              </div>

              {/* <!-- Pagination --> */}
              <div className='clearfix' />
              <div className='pagination-container margin-top-20 margin-bottom-20'>
                <nav className='pagination'>
                  <ul>
                    <li className='pagination-arrow'><a href='/' className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-left' /></a></li>
                    <li><a href='/' className='ripple-effect'>1</a></li>
                    <li><a href='/' className='ripple-effect current-page'>2</a></li>
                    <li><a href='/' className='ripple-effect'>3</a></li>
                    <li><a href='/' className='ripple-effect'>4</a></li>
                    <li className='pagination-arrow'><a href='/' className='ripple-effect'><i className='icon-material-outline-keyboard-arrow-right' /></a></li>
                  </ul>
                </nav>
              </div>
              <div className='clearfix' />
              {/* <!-- Pagination / End --> */}

              {/* <!-- Footer --> */}
              <div className='small-footer margin-top-15'>
                <div className='small-footer-copyrights'>
                  © 2021 <strong>jobviously</strong>. All Rights Reserved.
                </div>
                <ul className='footer-social-links'>
                  <li>
                    <a href='/' title='Facebook' data-tippy-placement='top'>
                      <i className='icon-brand-facebook-f' />
                    </a>
                  </li>
                  <li>
                    <a href='/' title='Twitter' data-tippy-placement='top'>
                      <i className='icon-brand-twitter' />
                    </a>
                  </li>
                  <li>
                    <a href='/' title='Google Plus' data-tippy-placement='top'>
                      <i className='icon-brand-google-plus-g' />
                    </a>
                  </li>
                  <li>
                    <a href='/' title='LinkedIn' data-tippy-placement='top'>
                      <i className='icon-brand-linkedin-in' />
                    </a>
                  </li>
                </ul>
                <div className='clearfix' />
              </div>
              {/* <!-- Footer / End --> */}

            </div>
          </div>
          {/* <!-- Full Page Content / End --> */}

        </div>
      </>
    )
  }
}
