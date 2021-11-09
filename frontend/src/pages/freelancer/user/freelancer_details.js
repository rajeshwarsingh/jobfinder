import React from 'react'
import { getUserById, patchUser } from '../../../Actions'
import { UserDetailsSidebar, UserDetailsContent } from './index'
import ls from 'local-storage'
import qs from 'qs'
import config from '../../../config'
const { baseSocketUrl, baseFrontenUrl, displayNameSettings } = config
const { defaultBg } = config.user

var loadjs = require('loadjs');

export class FreelancerSearchDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      userData: {},
      userType: 'guest',
      visibleStatus: false
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId

    // Identify User Type
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }

    let { userType = 'guest' } = search
    if (userType === 'creater' || userId === ls.get('userId')) {
      userType = 'creater'
    } else if (ls.get('userId')) {
      userType = 'user'
    } else {
      userType = 'guest'
    }

    this.setState({ userType })

    getUserById(userId, {}, (err, res) => {
      if (err) {
        alert(err)
        return
      }
      if (res && res.id) {
        this.setState({ userData: res, userType })
      }
      // UPDATE user VIEW
      if (res.view || res.view === '0' || res.view === 0) {
        let view = parseInt(res.view)
        if (typeof view === 'number') {
          view = view + 1
          patchUser(userId, { view: view.toString() }, () => {
            // log here
          })
        }
      } else {
        patchUser(userId, { view: "0" }, () => {
          // log here
        })
      }
    })

    // UPDATE USER RECENT VIEW
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      fields: {
        userId: true,
        id: true,
        recentViewedUser: true
      }
    }
    getUserById(ls.get('userId'), filter, (err, data) => {
      if (err) {
        console.log('Error in user fetch', err)
        return
      }
      if (data.id) {
        let recentViewedUser = (data.recentViewedUser || '').split(',')
        if (recentViewedUser.length >= 3) recentViewedUser.shift()
        recentViewedUser.push(userId)
        recentViewedUser = recentViewedUser.join(',')
        patchUser(ls.get('userId'), { recentViewedUser }, (errU, resU) => {
          console.log('recent view updated successfully!')
        })
      }
    })
  }

  render() {

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
      likedin=''
    } = this.state.userData


    const allSkills = skills.map(item => item).join(' | ')

    const defaultLogo = require('../../../assets/images/user-avatar-placeholder.png').default
    const logoImg = userLogo.url || defaultLogo

    const logoBg = userBg.url || defaultBg
    const userType = this.state.userType

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
    if (userType === 'creater') {
      return (
        <>

          {/* <!-- Titlebar================================================== --> */}
          <div className='single-page-header' data-background-image={logoBg}>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='single-page-header-inner'>
                    <div className='left-side'>
                      <div className='header-image'><a href='#'><img src={logoImg} alt='' /></a></div>
                      <div className='header-details'>
                        <h3>{firstName} {lastName}</h3>
                        <ul>
                          <li><a href='#'><i className='icon-material-outline-business' /> {nationality}</a></li>
                          <li>Rating:<div className='star-rating' >{star}</div></li><br/>
                          <li>{email} </li>
                          <li>LinkedIn : {likedin} </li>
                          <div><span>Skills : {allSkills}</span>

                          </div>

                        </ul>
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
              <UserDetailsContent userType={this.state.userType} {...this.props} userData={this.state.userData} />

              {/* <!-- Sidebar --> */}
              <UserDetailsSidebar userType={this.state.userType} {...this.props} userData={this.state.userData} />

            </div>
          </div>

        </>
      )
    } else if (userType === 'user') {
      return (
        <>

          {/* <!-- Titlebar================================================== --> */}
          <div className='single-page-header' data-background-image={logoBg}>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='single-page-header-inner'>
                    <div className='left-side'>
                      <div className='header-image'><a href='#'><img src={logoImg} alt='' /></a></div>
                      <div className='header-details'>
                        <h3>{firstName} {lastName}</h3>
                        {/* <h5>About the Employer</h5> */}
                        <ul>
                          {this.state.userData.online === 'Y' &&
                            <li><div style={offlineStyle}><i className='icon-feather-eye' />   &nbsp;online</div></li>}
                          {(!this.state.userData.online || this.state.userData.online === 'N') &&
                            <li><div style={offlineStyle} class=''><i className='icon-feather-eye-off' />   &nbsp;Offline</div></li>}
                          <li><a href='#'><i className='icon-material-outline-business' /> {nationality}</a></li>
                          <li>Rating:<div className='star-rating' >{star}</div></li>
                          <li>{email} </li>
                          <li>LinkedIn : {likedin} </li>
                          <div><span>Skills : {allSkills}</span>

                          </div>

                          {/* <li><img className="flag" src={require("../../assets/images/flags/gb.svg")} alt="" /> United Kingdom</li> */}
                          {/* {questionnaireSelected && <li><div className="verified-badge-with-title">Need to qualify</div></li>} */}
                        </ul>
                      </div>
                    </div>
                    {/* <div className='right-side'>
                      <div className='salary-box'>
                        <div className='salary-type'>Price Range</div>

                        <div className='salary-amount'>{rate}{currency}/{rateType}</div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Page Content================================================== --> */}
          <div className='container'>
            <div className='row'>

              {/* <!-- Content --> */}
              <UserDetailsContent userType={this.state.userType} {...this.props} userData={this.state.userData} />

              {/* <!-- Sidebar --> */}
              <UserDetailsSidebar userType={this.state.userType} {...this.props} userData={this.state.userData} />

            </div>
          </div>

        </>
      )
    } else {
      return (
        <>

          {/* <!-- Titlebar================================================== --> */}
          <div className='single-page-header' data-background-image={logoBg}>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='single-page-header-inner'>
                    <div className='left-side'>
                      <div className='header-image'><a href='#'><img src={logoImg} alt='' /></a></div>
                      <div className='header-details'>
                        <h3>{firstName} {lastName}</h3>
                        {/* <h5>About the Employer</h5> */}
                        <ul>
                          <li><a href='#'><i className='icon-material-outline-business' /> {nationality}</a></li>
                          <li><div className='star-rating' data-rating={avgRating} /></li>
                          <li>{email} </li>
                          <div><span>Skills : {allSkills}</span>

                          </div>

                          {/* <li><img className="flag" src={require("../../assets/images/flags/gb.svg")} alt="" /> United Kingdom</li> */}
                          {/* {questionnaireSelected && <li><div className="verified-badge-with-title">Need to qualify</div></li>} */}
                        </ul>
                      </div>
                    </div>
                    <div className='right-side'>
                      <div className='salary-box'>
                        <div className='salary-type'>Price Range</div>

                        <div className='salary-amount'>{rate}{currency}/{rateType}</div>
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
              <UserDetailsContent userType={this.state.userType} {...this.props} userData={this.state.userData} />

              {/* <!-- Sidebar --> */}
              <UserDetailsSidebar userType={this.state.userType} {...this.props} userData={this.state.userData} />

            </div>
          </div>

        </>
      )
    }
  }
}
