import React from 'react'
import ls from 'local-storage'
import { Post } from './components'
import { getPosts } from '../../Actions'
import config from '../../config'
const { displayNameSettings } = config

export class HiremngrManagePost extends React.Component {
  constructor() {
    super()
    this.state = {
      postsData: []
    }
  }

  componentDidMount() {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        userId: ls.get('userId')
      },
      fields: {
        postId: true,
        userId: true,
        title: true,
        skills: true,
        postLogo:true,
        paymentType: true,
        priceRange: true,
        currency: true,
        jobType: true,
        expectedDuration: true,
        questionnaireSelected:true,
        NoOfWeeks:true,
        review: true,
        avgRating: true,
        createdDate: true
      }
    }

    getPosts(filter, (err, res) => {
      if (res) {
        this.setState({ postsData: res || [] })
        ls.set('countPostMng', res.length)
      }
    })
  }

  render() {
    const showPosts = this.state.postsData.map((item, i) => {
      return <Post userType='hiremanager' key={i} post={item} {...this.props} />
    })

    return (
      <>
        {/* <!-- Dashboard Content================================================== --> */}
        <div className='dashboard-content-container' data-simplebar>
          <div className='dashboard-content-inner'>

            {/* <!-- Dashboard Headline --> */}
            <div className='dashboard-headline'>
              <h3>Manage {displayNameSettings.post}s</h3>

              {/* <!-- Breadcrumbs --> */}
              <nav id='breadcrumbs' className='dark'>
                <ul>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>Dashboard</a></li>
                  <li>Manage {displayNameSettings.post}s</li>
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
                    <h3><i className='icon-material-outline-assignment' /> My {displayNameSettings.post}s</h3>
                  </div>
                  {/* Show all posts */}
                  <div className='content'>
                    <ul className='dashboard-box-list'>
                      {showPosts}
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
