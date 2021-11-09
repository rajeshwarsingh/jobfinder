import { getUserById,getNotificationById, patchNotification, findNotificationByUserId } from '../Actions'
import ls from 'local-storage'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import config from '../config'
const { baseSocketUrl, baseFrontenUrl, displayNameSettings } = config
const ENDPOINT = baseSocketUrl

var loadjs = require('loadjs');


export class HeaderHiremngr extends Component {
  constructor() {
    super()
    this.state = {
      userProfile: {},
      online: 'Y',
      notificationData: [],
      activeFindJobber: false,
      activeFindJoblot: false,
      activeFindJoblem: false,
      activeJobspace: false,
      activeCreatejoblot: false,
      activeHirejobster: false
    }

    this.getNotificationData = this.getNotificationData.bind(this)
    this.markNotificationRead = this.markNotificationRead.bind(this)
  }

  getNotificationData() {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        status: 'unread'
      },
      fields: {
        notificationId: true,
        type: true,
        userId: true,
        notifyId: true,
        notificationTypeId: true,
        message: true,
        status: true,
        createdDate: true,
        createdDate: true
      }
    }

    findNotificationByUserId(ls.get('userId'),{}, (err, res) => {
      if (err) {
        alert('error in notification')
        return
      }

      if (Array.isArray(res)) {
        this.setState({ notificationData: res })
      }
    })
  }

  // componentWillMount() {
	// 	loadjs(baseFrontenUrl+'/js/bootstrap-select.min.js');
	// 	loadjs(baseFrontenUrl+'/js/bootstrap-slider.min.js');
	// 	loadjs(baseFrontenUrl+'/js/chart.min.js');
	// 	loadjs(baseFrontenUrl+'/js/clipboard.min.js');
	// 	loadjs(baseFrontenUrl+'/js/counterup.min.js');
	// 	loadjs(baseFrontenUrl+'/js/counterup.min.js');
	// 	loadjs(baseFrontenUrl+'/js/custom.js');
	// 	loadjs(baseFrontenUrl+'/js/infobox.min.js');
	// 	loadjs(baseFrontenUrl+'/js/jquery-3.3.1.min.js');
	// 	loadjs(baseFrontenUrl+'/js/jquery-3.4.1.min.js');
	// 	loadjs(baseFrontenUrl+'/js/jquery-migrate-3.1.0.min.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-autocomplete.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-control-geocoder.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-gesture-handling.min.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-hireo.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet-markercluster.min.js');
	// 	loadjs(baseFrontenUrl+'/js/leaflet.min.js');
	// 	loadjs(baseFrontenUrl+'/js/magnific-popup.min.js');
	// 	loadjs(baseFrontenUrl+'/js/maps.js');
	// 	loadjs(baseFrontenUrl+'/js/markerclusterer.js');
	// 	loadjs(baseFrontenUrl+'/js/mmenu.min.js');
	// 	loadjs(baseFrontenUrl+'/js/simplebar.min.js');
	// 	loadjs(baseFrontenUrl+'/js/snackbar.js');
	// 	loadjs(baseFrontenUrl+'/js/tippy.all.min.js');
  // }

  componentDidMount() {
    
    const socket = socketIOClient(ENDPOINT , { query: `userId=${ls.get('userId')}` });

    socket.on("FromAPI", data => {
      alert(data)
    });

    loadjs(baseFrontenUrl+'/js/custom.js');
    
    setTimeout(() => {
      this.getNotificationData()
    }, 1000)

    const userProfile = ls.get('userProfile') ? JSON.parse(ls.get('userProfile')) : ''
    this.setState({ userProfile })
    
    // UPDATE USER RECENT VIEW
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      fields: {
        userId: true,
        id: true,
        online: true,
        lastLogin: true
      }
    }
    getUserById(ls.get('userId'), filter, (err, data) => {
      if (err) {
        console.log('Error in user fetch', err)
        return
      }
      if (data.id) {
        this.setState({ online: data.online ? data.online : this.state.online })
      }
    })
  }

  markNotificationRead(item) {
    getNotificationById(item.notificationId,{},(err,res)=>{
      if(err){
        return 
      }
      
      let readedUsers =(res.readedUsers && Array.isArray(res.readedUsers)?res.readedUsers:[])
      readedUsers.push(ls.get('userId'))
      
      patchNotification(item.notificationId, {  readedUsers:readedUsers }, () => {

        if(res.type === 'post' && res.subtype === 'create'){
          return this.props.history.push(`/freelancer/post/${res.notificationTypeId}`)
        }

        if(res.type === 'post' && res.subtype === 'proposal-sent'){
          return this.props.history.push(`/hiremngr/post_manage_post`)
        }
        
        if(res.type === 'post' && res.subtype === 'rating-sent'){
          return this.props.history.push(`/allrating/${res.data.ratingId}?ratingType=individual&ratingId=${res.data.ratingId}`)
        }

        if(res.type === 'service' && res.subtype === 'create'){
          return this.props.history.push(`/freelancer/service/${res.notificationTypeId}`)
        }

        if(res.type === 'service' && res.subtype === 'edit'){
          return this.props.history.push(`/freelancer/service/${res.notificationTypeId}`)
        }

        if(res.type === 'service' && res.subtype === 'proposal-sent'){
          return this.props.history.push(`/freelancer/service_manage_bidders/${item.notificationTypeId}`)
        }

        if(res.type === 'service' && res.subtype === 'proposal-revised'){
          return this.props.history.push(`/freelancer/service/${res.notificationTypeId}`)
        }

        if(res.type === 'service' && res.subtype === 'fav'){
          return this.props.history.push(`/freelancer/service/${res.notificationTypeId}`)
        }
        
        const redirectRoute = item.type === 'service' ? `/freelancer/service_manage_bidders/${item.notificationTypeId}`
          : item.type === 'post' ? `/hiremngr/post_manage_bidders/${item.notificationTypeId}`
            : '#'
        this.getNotificationData()
        this.props.history.push(redirectRoute)
      })
    })
    
  }

  render() {
    let activeObj = {
      activeFindJobber: true,
      activeFindJoblot: false,
      activeFindJoblem: false,
      activeJobspace: false,
      activeCreatejoblot: false,
      activeHirejobster: false
    }

    if (this.props.history.location.pathname === '/freelancer/search') {
      activeObj = {
        activeFindJobber: true,
        activeFindJoblot: false,
        activeFindJoblem: false,
        activeJobspace: false,
        activeCreatejoblot: false,
        activeHirejobster: false
      }
    } else if (this.props.history.location.pathname === '/freelancer/service_search') {
      activeObj = {
        activeFindJobber: false,
        activeFindJoblot: true,
        activeFindJoblem: false,
        activeJobspace: false,
        activeCreatejoblot: false,
        activeHirejobster: false
      }
    } else if (this.props.history.location.pathname === '/freelancer/posts') {
      activeObj = {
        activeFindJobber: false,
        activeFindJoblot: false,
        activeFindJoblem: true,
        activeJobspace: false,
        activeCreatejoblot: false,
        activeHirejobster: false
      }
    } else if (this.props.history.location.pathname === '/freelancer/dashboard') {
      activeObj = {
        activeFindJobber: false,
        activeFindJoblot: false,
        activeFindJoblem: false,
        activeJobspace: true,
        activeCreatejoblot: false,
        activeHirejobster: false
      }
    } else if (this.props.history.location.pathname === '/freelancer/service/create') {
      activeObj = {
        activeFindJobber: false,
        activeFindJoblot: false,
        activeFindJoblem: false,
        activeJobspace: false,
        activeCreatejoblot: true,
        activeHirejobster: false
      }
    } else if (this.props.history.location.pathname === '/hiremngr/dashboard') {
      activeObj = {
        activeFindJobber: false,
        activeFindJoblot: false,
        activeFindJoblem: false,
        activeJobspace: false,
        activeCreatejoblot: false,
        activeHirejobster: true
      }
    } else {
      activeObj = {
        activeFindJobber: true,
        activeFindJoblot: false,
        activeFindJoblem: false,
        activeJobspace: false,
        activeCreatejoblot: false,
        activeHirejobster: false
      }
    }

    const showNotifications = this.state.notificationData.map((item, i) => {
      return (
        <li className='notifications-not-read'>
          <Link>
            <span className='notification-icon'><i className='icon-material-outline-group' /></span>
            <span onClick={() => this.markNotificationRead(item)} className='notification-text'>
              <strong className='color'>{item.message}</strong>
            </span>
          </Link>
        </li>
      )
    })

    let userLogo = require('../assets/images/user-avatar-placeholder.png').default
    if (this.state.userProfile && this.state.userProfile.userLogo) userLogo = this.state.userProfile.userLogo.url

    return (
      <header id='header-container' className='fullwidth'>

        {/* <!-- Header --> */}
        <div id='header'>
          <div className='container'>

            {/* <!-- Left Side Content --> */}
            <div className='left-side'>

              {/* <!-- Logo --> */}
              <div id='logo'>
                <a href='/Home' style={{display: "grid"}}><img src={require('../assets/images/JBLogo.svg').default} alt='' /></a>
              </div>

              {/* <!-- Main Navigation --> */}
              <nav id='navigation'>
                <ul id='responsive'>

                  <li><Link to='/hiremngr/dashboard' className='current'>Hire Manager Dashboard</Link>
                  </li>

                  <li><Link to='/hiremngr/post/create'>Create {displayNameSettings.post}</Link></li>

                  <li><Link to='/freelancer/dashboard'><lable style={{ color: 'red' }}>Switch to {displayNameSettings.freelancer}</lable></Link></li>
                  <li><Link to='/logout'>Logout</Link>
                  </li>

                </ul>
              </nav>
              <div className='clearfix' />
              {/* <!-- Main Navigation / End --> */}

            </div>
            {/* <!-- Left Side Content / End --> */}

            {/* <!-- Right Side Content / End --> */}
            <div className='right-side'>

              {/* <!--  User Notifications --> */}
              <div className='header-widget hide-on-mobile'>

                {/* <!-- Notifications --> */}
                <div className='header-notifications'>

                  {/* <!-- Trigger --> */}
                  <div className='header-notifications-trigger'>
                    <a href='#'><i className='icon-feather-bell' /><span>{this.state.notificationData.length}</span></a>
                  </div>

                  {/* <!-- Dropdown --> */}
                  <div className='header-notifications-dropdown'>

                    <div className='header-notifications-headline'>
                      <h4>Notifications</h4>
                      <button className='mark-as-read ripple-effect-dark' title='Mark all as read' data-tippy-placement='left'>
                        <i className='icon-feather-check-square' />
                      </button>
                    </div>

                    <div className='header-notifications-content'>
                      <div className='header-notifications-scroll' data-simplebar>
                        <ul>{showNotifications}</ul>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
              {/* <!--  User Notifications / End --> */}

              {/* <!-- User Menu --> */}
              <div className='header-widget'>

                {/* <!-- Messages --> */}
                <div className='header-notifications user-menu'>
                  <div className='header-notifications-trigger'>
                    <a href='#'><div className='user-avatar status-online'><img src={userLogo} alt='' /></div></a>
                  </div>

                  {/* <!-- Dropdown --> */}
                  <div className='header-notifications-dropdown'>

                    {/* <!-- User Status --> */}
                    <div className='user-status'>

                      {/* <!-- User Name / Avatar --> */}
                      <div className='user-details'>
                        <div className='user-avatar status-online'><img src={userLogo} alt='' /></div>
                        <div className='user-name'>

                          {this.state.userProfile.firstName} {this.state.userProfile.lastName}
                        </div>
                      </div>

                      {/* <!-- User Status Switcher --> */}
                      {this.state.online === 'Y' && <div className='status-switch' id='snackbar-user-status'>
                        <label onClick={() => this.setState({ online: 'Y' })} className='user-online current-status'>Online</label>
                        <label onClick={() => this.setState({ online: 'N' })} className='user-invisible'>Invisible</label>
                        {/* <!-- Status Indicator --> */}
                        <span className='status-indicator' aria-hidden='true' />
                      </div>}
                      {
                        this.state.online === 'N' && <div className='status-switch' id='snackbar-user-status'>
                          <label onClick={() => this.setState({ online: 'Y' })} className='user-online'>Online</label>
                          <label onClick={() => this.setState({ online: 'N' })} className='user-invisible current-status'>Invisible</label>
                          {/* <!-- Status Indicator --> */}
                          <span className='status-indicator right' aria-hidden='true' />
                        </div>
                      }
                    </div>

                    <ul className='user-menu-small-nav'>
                      <li><a href='/freelancer/dashboard'><i className='icon-material-outline-dashboard' /> Login: {this.state.userProfile.lastLogin ? new Date(this.state.userProfile.lastLogin).toLocaleString() : ''}  </a></li>
                      <li><a href='/freelancer/setting'><i className='icon-material-outline-settings' /> Settings</a></li>
                      <li><a href='/pricingPlan'><i className='icon-material-outline-settings' /> {this.state.userProfile.planType==='premium'?(<span className="small-label">Premium</span>):<span style={{backgroundColor:'gray', color:'white'}} className="small-label">basic</span>}</a></li>
                      <li><a href='/logout'><i className='icon-material-outline-power-settings-new' /> Logout</a></li>
                    </ul>

                  </div>
                </div>

              </div>
              {/* <!-- User Menu / End --> */}

              {/* <!-- Mobile Navigation Button --> */}
              <span className='mmenu-trigger'>
                <button className='hamburger hamburger--collapse' type='button'>
                  <span className='hamburger-box'>
                    <span className='hamburger-inner' />
                  </span>
                </button>
              </span>

            </div>
            {/* <!-- Right Side Content / End --> */}

          </div>
        </div>
        {/* <!-- Header / End --> */}

      </header>
    )
  }
}

export default HeaderHiremngr
