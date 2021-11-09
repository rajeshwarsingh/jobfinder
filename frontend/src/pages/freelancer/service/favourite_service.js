import React, { Fragment } from 'react'
import ls from 'local-storage'
import { Link } from 'react-router-dom'
import { getServiceById, addFavouriteService, getFavouriteService, deleteFavouriteService, createNotification } from '../../../Actions'
import { daysDiffernce } from '../../../utility/index'
import config from '../../../config'
const { displayNameSettings } = config

export class FavouriteService extends React.Component {
  constructor () {
    super()
    this.state = {
      serviceData: {},
      favouriteServiceId: '',
      isFavouriteService: false
    }
    this.handleBookmark = this.handleBookmark.bind(this)
    this.getFavouriteServicedata = this.getFavouriteServicedata.bind(this)
  }

  handleBookmark () {
    // console.log('check bookmark state:', this.state)
    if (this.state.isFavouriteService) {
      // console.log('favouriteService result:', this.state.favouriteServiceId)
      deleteFavouriteService(this.state.favouriteServiceId, (err, res) => {
        if (err) {
          alert(err)
          return
        }
        this.setState({ favouriteServiceId: '', isFavouriteService: false })
        alert('deleted successfully!')
      })
    } else {
      // console.log('bookmard clicked', this.props);
      const body = {
        serviceId: this.props.serviceData.serviceId || '',
        userId: ls.get('userId') || '',
        title: this.props.serviceData.title || '',
        serviceLogo: this.props.serviceData.serviceLogo || {},
        skills: this.props.serviceData.skills || [],
        priceRange: this.props.serviceData.priceRange || {},
        jobCategory: this.props.serviceData.jobCategory || ''
      }
      // console.log('wislist body:', body)
      addFavouriteService(body, (err, res) => {
        console.log('favouriteService result:', err, res)
        if (err || res.error) {
          alert(err)
          return
        }

        this.setState({ favouriteServiceId: res.favouriteServiceId, isFavouriteService: true })
        alert('added successfully!')
        // notificaiton
        const profile = (ls.get('userProfile')) ? JSON.parse(ls.get('userProfile')) : {}
        const notifiyBody = {
          type: 'service',
          userId: ls.get('userId'),
          notificationTypeId: this.props.serviceData.serviceId,
          message: ` ${profile.firstName} ${profile.lastName} has favourite ${displayNameSettings.service}`,
          status: 'unread',
          notifyId: this.props.serviceData.userId
        }
        createNotification(notifiyBody, () => {
          // this.props.history.push('/freelancer/service_list');
        })
      })
    }
  }

  getFavouriteServicedata () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        serviceId: this.props.serviceData.serviceId,
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

    getFavouriteService(filter, (err, favRes) => {
      // console.log('all favouriteService result:', err,favRes)
      if (err) {
        console.log('error in favouriteService')
      }
      if (favRes.length) {
        this.setState({
          favouriteServiceId: favRes[0].favouriteServiceId ? favRes[0].favouriteServiceId : '',
          isFavouriteService: (!!favRes[0].favouriteServiceId)
        })
      }
    })
  }

  componentDidMount () {
    // call method after 1 sec becuse react taks time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getFavouriteServicedata()
    }, 1000)
  }

  render () {
    const {
      serviceId,
      image,
      title,
      description,
      files,
      location,
      address = '',
      priceRange = { min: '', max: '' },
      jobType,
      jobCategory,
      avgRating,
      review,
      view = '0',
      createdDate,
      currency = '',
      paymentType,
      expectedDuration,
      time = ''
    } = this.props.serviceData

    const { userType = 'guest' } = this.props

    return (
      <div><h3>Favourite</h3>

        {/* <!-- Bookmark Button --> */}
        <button onClick={this.handleBookmark} className='bookmark-button margin-bottom-25'>
          <span className='bookmark-icon' />
          <span className='bookmark-text'>Add Favourite</span>
          <span className='bookmarked-text'>Add Favourite</span>
        </button>
      </div>
    )
  }
}
