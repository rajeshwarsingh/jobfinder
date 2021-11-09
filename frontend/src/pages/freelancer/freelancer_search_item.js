import ls from 'local-storage'
import React from 'react'
import { addFavouriteUser, getFavouriteUser, deleteFavouriteUser } from '../../Actions'
import config from '../../config'
const { baseFrontenUrl,displayNameSettings } = config
var loadjs = require('loadjs');

export class FreelancerSearchItem extends React.Component {
  constructor () {
    super()

    this.state = {
      favouriteUserId: '',
      isFavourate: false
    }

    this.handleFavourate = this.handleFavourate.bind(this)
    this.getFavouriteUserData = this.getFavouriteUserData.bind(this)
  }

  handleFavourate () {
    if (this.state.isFavourate) {
      deleteFavouriteUser(this.state.favouriteUserId, (err, res) => {
        if (err) {
          alert(err)
          return
        }
        this.setState({ favouriteUserId: '', isFavourate: false })
        alert('deleted successfully!')
      })
    } else {
      const body = {
        freelancerId: this.props.user.id || '',
        userId: ls.get('userId') || '',
        title: this.props.user.firstName + this.props.user.lastName || '',
        userLogo: this.props.user.userLogo || {},
        skills: this.props.user.skills || [],
        priceRange: this.props.user.priceRange || {},
        jobCategory: this.props.user.jobCategory || []
      }
      addFavouriteUser(body, (err, res) => {
        console.log('wishlist result:', err, res)
        if (err || res.error) {
          alert(err)
          return
        }

        this.setState({ favouriteUserId: res.favouriteUserId, isFavourate: true })
        alert('added successfully!')
      })
    }
  }

  getFavouriteUserData () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        freelancerId: this.props.user.id,
        userId: ls.get('userId')
      },
      fields: {
        favouriteUserId: true,
        freelancerId: true,
        userId: true,
        title: true,
        postLogo: true,
        skills: true,
        priceRange: true,
        jobCategory: true,
        updatedTime: true
      }
    }

    getFavouriteUser(filter, (err, wishRes) => {
      console.log('all wishlist result:', err, wishRes)
      if (err) {
        console.log('error in wishlist')
      }
      if (wishRes.length) {
        this.setState({
          favouriteUserId: wishRes[0].favouriteUserId ? wishRes[0].favouriteUserId : '',
          isFavourate: (!!wishRes[0].favouriteUserId)
        })
      }
    })
  }

  componentDidMount () {
    // call method after 1 sec becuse react taks time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getFavouriteUserData()
    }, 1000)
  }

  render () {
    const {
      id = '',
      userLogo = {},
      firstName = '',
      lastName = '',
      avgRating = '',
      address = '',
      jobFunType = ''
    } = this.props.user
    return (
      <>
        {/* <!-- Job Listing --> */}
        {/* <!--Freelancer --> */}
        <div className='freelancer'>

          {/* <!-- Overview --> */}
          <div className='freelancer-overview'>
            <div className='freelancer-overview-inner'>

              {/* <!-- Bookmark Icon --> */}
              <span onClick={this.handleFavourate} className={(this.state.isFavourate ? 'bookmark-icon bookmarked' : 'bookmark-icon')} />

              {/* <!-- Avatar --> */}
              <div className='freelancer-avatar'>
                <div className='verified-badge' />
                <a href={`/freelancer/search_details/${id}`}><img src={userLogo.url} alt='' /></a>
              </div>

              {/* <!-- Name --> */}
              <div className='freelancer-name'>
                <h4><a href={`/freelancer/search_details/${id}`}>{firstName} {lastName} <img className='flag' src={userLogo.url} alt='' title='United Kingdom' data-tippy-placement='top' /></a></h4>
                <span>{jobFunType}</span>
              </div>

              {/* <!-- Rating --> */}
              <div className='freelancer-rating'>
                <div className='star-rating' data-rating={avgRating} />
              </div>
            </div>
          </div>

          {/* <!-- Details --> */}
          <div className='freelancer-details'>
            <div className='freelancer-details-list'>
              <ul>
                <li>Location <strong><i className='icon-material-outline-location-on' /> {address}</strong></li>
                {/* <li>Rate <strong>{rate} / {rateType}</strong></li> */}
                {/* <li>Job Success <strong>95%</strong></li> */}
              </ul>
            </div>
            <a href={`/freelancer/search_details/${id}`} className='button button-sliding-icon ripple-effect'>View Profile <i className='icon-material-outline-arrow-right-alt' /></a>
          </div>
        </div>
        {/* <!-- Freelancer / End --> */}
      </>
    )
  }
}
