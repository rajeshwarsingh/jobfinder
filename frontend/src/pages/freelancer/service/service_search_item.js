import ls from 'local-storage'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { daysDiffernce } from '../../../utility/index'
import { getJobs, addFavouriteService, getFavouriteService, deleteFavouriteService, createNotification } from '../../../Actions'
import config from '../../../config'
const {displayNameSettings} = config 

export class ServiceSearchItem extends React.Component {
  constructor () {
    super()
    this.state = {
      showImage: true,
      showTitle: true,
      showDescription: true,
      showLocation: true,
      showPriceRange: true,
      showJobType: true,
      showJobCategory: true,
      showLocation: true,
      showAvgRating: true,
      showReview: true,
      favouriteServiceId: '',
      isFavourate: false
    }
    this.handleServiceClick = this.handleServiceClick.bind(this)
    this.handleFavourate = this.handleFavourate.bind(this)
    this.getFavouriteServiceData = this.getFavouriteServiceData.bind(this)
  }

  handleFavourate () {
    if (this.state.isFavourate) {
      deleteFavouriteService(this.state.favouriteServiceId, (err, res) => {
        if (err) {
          alert(err)
          return
        }
        this.setState({ favouriteServiceId: '', isFavourate: false })
        alert('deleted successfully!')
      })
    } else {
      const body = {
        serviceId: this.props.servicesData.serviceId || '',
        userId: ls.get('userId') || '',
        title: this.props.servicesData.title || '',
        serviceLogo: this.props.servicesData.serviceLogo || {},
        skills: this.props.servicesData.skills || [],
        priceRange: this.props.servicesData.priceRange || {},
        jobCategory: this.props.servicesData.jobCategory || ''
      }
      addFavouriteService(body, (err, res) => {
        console.log('wishlist result:', err, res)
        if (err || res.error) {
          alert(err)
          return
        }

        this.setState({ favouriteServiceId: res.favouriteServiceId, isFavourate: true })
        // SEND NOTIFICAITON
        if(res.favouriteServiceId){
          let userProfile = ls.get('userProfile')
          userProfile = (userProfile.length)?JSON.parse(userProfile):{}  
          let readedUsers = []
          readedUsers.push(ls.get('userId'))
          
          let notifiyBody = {
              userId:ls.get('userId'),
              type:'service',
              subtype:"fav",
              data:{},
              notificationTypeId:this.props.servicesData.serviceId,
              message:`${displayNameSettings.service}:${userProfile.firstName} ${userProfile.lastName} has Favourite ${this.props.servicesData.title}`,
              status:"unread",
              createrUserId:this.props.servicesData.userId,
              readedUsers:readedUsers
          }
          createNotification(notifiyBody,()=>{})
      }
      return
        alert('added successfully!')
      })
    }
  }

  getFavouriteServiceData () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        serviceId: this.props.servicesData.serviceId,
        userId: ls.get('userId')
      },
      fields: {
        favouriteServiceId: true,
        serviceId: true,
        userId: true,
        title: true,
        serviceLogo: true,
        skills: true,
        priceRange: true,
        jobCategory: true,
        updatedTime: true
      }
    }

    getFavouriteService(filter, (err, wishRes) => {
      console.log('all wishlist result:', err, wishRes)
      if (err) {
        console.log('error in wishlist')
      }
      if (wishRes.length) {
        this.setState({
          favouriteServiceId: wishRes[0].favouriteServiceId ? wishRes[0].favouriteServiceId : '',
          isFavourate: (!!wishRes[0].favouriteServiceId)
        })
      }
    })
  }

  handleServiceClick () {
    this.props.history.push(`/freelancer/service/${this.props.servicesData.serviceId}`)
  }

  componentDidMount () {
    // call method after 1 sec becuse react taks time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getFavouriteServiceData()
    }, 1000)
  }

  render () {
    console.log(this.props)
    const {
      title,
      skills = [],
      address = '',
      priceRange = { min: '', max: '' },
      jobType,
      jobCategory,
      currency = '',
      createdDate = ''
    } = this.props.servicesData

    const allSkills = skills.map(item => item).join(' | ')

    return (
      <div href='single-job-page.html' className='job-listing' >

        {/* <!-- Job Listing Details --> */}
        <div className='job-listing-details' onClick={this.handleServiceClick}>
          {/* <!-- Logo --> */}
          <div className='job-listing-company-logo'>
            <img src={'https://png.pngtree.com/element_our/png_detail/20181011/facebook-social-media-icon-design-template-vector-png_126986.jpg' || ''} alt='' />
          </div>

          {/* <!-- Details --> */}
          <div className='job-listing-description'>
            <h4 className='job-listing-company'>{allSkills} <span className='verified-badge' title='Verified Employer' data-tippy-placement='top' /></h4>
            <h3 className='job-listing-title'>{title}</h3>
          </div>
        </div>

        {/* <!-- Job Listing Footer --> */}
        <div className='job-listing-footer'>
          <span className='bookmark-icon' />
          <span onClick={this.handleFavourate} className={(this.state.isFavourate ? 'bookmark-icon bookmarked' : 'bookmark-icon')} />
          <ul>
            <li><i className='icon-material-outline-location-on' /> {address}</li>
            <li><i className='icon-material-outline-business-center' /> {jobType}</li>
            <li><i className='icon-material-outline-account-balance-wallet' /> {`${priceRange.min}-${priceRange.max}/${currency}`}</li>
            <li><i className='icon-material-outline-access-time' /> {daysDiffernce(createdDate, new Date())} days ago</li>
            <li><i className='icon-material-outline-access-time' /> {jobCategory}</li>
          </ul>
        </div>
      </div>

    )
  }
}
