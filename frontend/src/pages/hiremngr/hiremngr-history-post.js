
import React, { Fragment } from 'react'
import ls from 'local-storage'
import { Post } from './components'
import { getPosts } from '../../Actions'

export class HiremngrManagePost extends React.Component {
  constructor () {
    super()
    this.state = {
      postsData: []
    }
  }

  componentDidMount () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
		  hireMngrId: ls.get('userId')

      },
      fields: {
			  postId: true,
			  hireMngrId: true,
			  title: true,
			  description: false,
			  images: false,
			  files: false,
			  mainSkill: false,
			  subSkills: false,
			  paymentType: false,
			  priceRange: false,
			  price: false,
			  jobType: false,
			  jobCategory: false,
			  location: false,
			  expectedDuration: false,
			  geometry: false,
			  review: false,
			  avgRating: false,
			  author: false,
		  createdDate: true,
		  date: true
      }
		  }

    getPosts(filter, (err, res) => {
      console.log('show all posts:', err, res)
      this.setState({ postsData: res })
    })
  }

  render () {
    console.log('postdata** :', this.state.postsData)
    const showPosts = this.state.postsData.map((item, i) => {
      return <Post key={i} post={item} {...this.props} />
    })

    return (
      <>
        {/* <!-- Dashboard Content================================================== --> */}
        <div className='dashboard-content-container' data-simplebar>
          <div className='dashboard-content-inner'>

            {/* <!-- Dashboard Headline --> */}
            <div className='dashboard-headline'>
              <h3>Manage Posts</h3>

              {/* <!-- Breadcrumbs --> */}
              <nav id='breadcrumbs' className='dark'>
                <ul>
                  <li><a href='#'>Home</a></li>
                  <li><a href='#'>Dashboard</a></li>
                  <li>Manage Posts</li>
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
                <h3><i className='icon-material-outline-assignment' /> My Posts</h3>
              </div>

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
