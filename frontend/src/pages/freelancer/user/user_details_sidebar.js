import React, { Fragment } from 'react'
import ls from 'local-storage'
import { Link } from 'react-router-dom'
import { createFollow, updateFollow, patchFollow, getFollows, getUserById, addWishlist, getWishlist, deleteWishlist } from '../../../Actions'
import { daysDiffernce } from '../../../utility/index'
import { FavouriteUser } from './index'
import { BlockUser } from '../../../Components/block/block_user'
import { Rating } from '../../../Components/rating/rating'

import config from '../../../config'
const { baseSocketUrl, displayNameSettings } = config

export class UserDetailsSidebar extends React.Component {
  constructor () {
    super()
    this.state = {
      userData: {},
      wishlistId: '',
      isWishlisted: false,
      isFollowing: false
    }
    this.handleFollow = this.handleFollow.bind(this)
    this.getFollowData = this.getFollowData.bind(this)
  }

  handleFollow () {
    const body = {
      type: 'user',
      userId: ls.get('userId'),
      followTypeId: this.props.userData.id,
      status: 'following'
    }
    alert('##############follow body:', this.props)
    alert(this.props.toString())
    createFollow(body, (err, res) => {
      console.log('result:', err, res)
      if (err) {
        alert('error in user follow creation')
        return
      }
      alert('successfully following')
      window.location.reload()
    })
  }

  getFollowData () {
    const filter = {
      offset: 0,
      limit: 1,
      skip: 0,
      where: {
        userId: ls.get('userId'),
        type: 'user',
        followTypeId: this.props.match.params.userId
      },
      fields: {
        followId: true,
        type: true,
        userId: true,
        followTypeId: true,
        message: true,
        createdDate: true
      }
    }

    console.log('************************************', this.props)

    getFollows(filter, (err, res) => {
      console.log('check reating :', err, res)
      if (err) {
        alert('error in rating fetch:')
      }
      if (Array.isArray(res) && res.length) {
        this.setState({ isFollowing: true })
      }
    })
  }

  componentDidMount () {
    // call method after 1 sec becuse react taks time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getFollowData()
    }, 0)
  }

  render () {
    const {
      address = '',
      jobType,
      jobCategory,
      view = '',
      createdDate,
      currency = '',
      profession = '',
      paymentType,
      expectedDuration,
    } = this.props.userData

    const { userType = 'guest' } = this.props

    if (userType === 'creater' || userType === 'user') {
      return (
        <div className='col-xl-4 col-lg-4'>
          <div className='sidebar-container'>
            <div className='sidebar-widget'>
              <div className='job-overview'>
                {userType === 'creater' && <button onClick={() => this.props.history.push('/freelancer/profile_edit')} className='col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim'>Edit Profile</button>}
                {userType === 'creater' && <button onClick={() => this.props.history.push('/freelancer/user_profile_resume')} className='col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim'>Show Resume</button>}
                {userType === 'creater' && <button onClick={() => this.props.history.push(`/appointment/${ls.get('userId')}`)} className='col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim'>Show Calendar</button>}

                {userType === 'user' && <button onClick={() => this.props.history.push('/freelancer/service_search?userType=creater')} className='col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim'>Show {displayNameSettings.service}s</button>}
                {userType === 'user' && <button onClick={this.handleFollow} className='col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim'>{this.state.isFollowing ? 'Following' : 'Follow'}</button>}
                <div className='job-overview-headline'>Profile Summary</div>
                <div className='job-overview-inner'>
                  <ul>
                    <li>
                      <i className='icon-material-outline-location-on' />
                      <span>Location</span>
                      <h5>{address}</h5>
                    </li>
                    <li>
                      <i className='icon-material-outline-business-center' />
                      <span>Profession</span>
                      <h5>{profession}</h5>
                    </li>
                    <li>
                      <i className='icon-material-outline-business-center' />
                      <span>Industry</span>
                      <h5>{jobCategory}</h5>
                    </li>
                    <li>
                      <i className="icon-material-outline-local-atm" />
                      <span>Currency</span>
                      <h5>{currency}</h5>
                    </li>
                    <li>
                      <i className='icon-material-outline-access-time' />
                      <span>Views</span>
                      <h5>{view}</h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- Sidebar Widget --> */}
            {userType === 'user' && <div className='sidebar-widget'>
              <Rating {...this.props} type='user' ratingTypeId={this.props.match.params.userId} serviceData={{}} />
                                    </div>}
            {userType === 'user' && <div className='sidebar-widget'>
              <BlockUser {...this.props} userData={{ userId: this.props.match.params.userId }} />
              </div>}

          </div>
        </div>
      )
    } else {
      return (
        <div className='col-xl-4 col-lg-4'>
          <div className='sidebar-container'>
            <div className='sidebar-widget'>
              <div className='job-overview'>
                <Link to='/login' className='col-md-12 submit button margin-top-15 apply-now-button popup-with-zoom-anim'>Go to Login</Link>
                <div className='job-overview-headline'>Job Summary</div>
                <div className='job-overview-inner'>
                  <ul>
                    <li>
                      <i className='icon-material-outline-location-on' />
                      <span>Location</span>
                      <h5>{address}</h5>
                    </li>
                    <li>
                      <i className='icon-material-outline-business-center' />
                      <span>Job Type</span>
                      <h5>{jobType}</h5>
                    </li>
                    <li>
                      <i className='icon-material-outline-local-atm' />
                      <span>Payment Type</span>
                      <h5>{paymentType}</h5>
                    </li>
                    <li>
                      <i className='icon-material-outline-access-time' />
                      <span>Expected Duration</span>
                      <h5>{expectedDuration}</h5>
                    </li>
                    <li>
                      <i className='icon-material-outline-access-time' />
                      <span>Date Usered</span>
                      <h5>{daysDiffernce(createdDate, new Date())} days ago</h5>
                    </li>

                    <li>
                      <i className='icon-material-outline-access-time' />
                      <span>Views</span>
                      <h5>{view}</h5>
                    </li>
                    <li>
                      <i className='icon-material-outline-access-time' />
                      <span>Project Category</span>
                      <h5>{jobCategory}</h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- Sidebar Widget --> */}

          </div>
        </div>
      )
    }
  }
}
