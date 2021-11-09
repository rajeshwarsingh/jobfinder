import React, { Fragment } from 'react'
import ls from 'local-storage'
import { Link } from 'react-router-dom'
import { getUserById, addFavouriteUser, getFavouriteUser, deleteFavouriteUser } from '../../../Actions'
import { daysDiffernce } from '../../../utility/index'

export class FavouriteUser extends React.Component {
  constructor () {
    super()
    this.state = {
      userData: {},
      favouriteUserId: '',
      isFavouriteUsered: false
    }
    this.handleBookmark = this.handleBookmark.bind(this)
    this.getFavouriteUserdata = this.getFavouriteUserdata.bind(this)
  }

  handleBookmark () {
    // console.log('check bookmark state:', this.state)
    if (this.state.isFavouriteUsered) {
      // console.log('favouriteUser result:', this.state.favouriteUserId)
      deleteFavouriteUser(this.state.favouriteUserId, (err, res) => {
        if (err) {
          alert(err)
          return
        }
        this.setState({ favouriteUserId: '', isFavouriteUsered: false })
        alert('deleted successfully!')
      })
    } else {
      // console.log('bookmard clicked', this.props);
      const body = {
        userId: this.props.userData.userId || '',
        userId: ls.get('userId') || '',
        title: this.props.userData.title || '',
        userLogo: this.props.userData.userLogo || {},
        skills: this.props.userData.skills || [],
        priceRange: this.props.userData.priceRange || {},
        jobCategory: this.props.userData.jobCategory || ''
      }
      // console.log('wislist body:', body)
      addFavouriteUser(body, (err, res) => {
        console.log('favouriteUser result:', err, res)
        if (err || res.error) {
          alert(err)
          return
        }

        this.setState({ favouriteUserId: res.favouriteUserId, isFavouriteUsered: true })
        alert('added successfully!')
      })
    }
  }

  getFavouriteUserdata () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        userId: this.props.userData.userId,
        userId: ls.get('userId')
      },
      fields: {
        favouriteUserId: true,
        userId: true,
        userId: true,
        title: true,
        userLogo: true,
        skills: true,
        priceRange: true,
        jobCategory: true,
        updatedTime: true
      }
    }

    getFavouriteUser(filter, (err, favRes) => {
      // console.log('all favouriteUser result:', err,favRes)
      if (err) {
        console.log('error in favouriteUser')
      }
      if (favRes.length) {
        this.setState({
          favouriteUserId: favRes[0].favouriteUserId ? favRes[0].favouriteUserId : '',
          isFavouriteUsered: (!!favRes[0].favouriteUserId)
        })
      }
    })
  }

  componentDidMount () {
    // call method after 1 sec becuse react taks time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getFavouriteUserdata()
    }, 1000)
  }

  render () {
    const {
      userId,
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
    } = this.props.userData

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
