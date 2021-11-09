import ls from 'local-storage'
import React from 'react'
import {  addWishlist, getWishlist, deleteWishlist } from '../../Actions'
import { daysDiffernce } from '../../utility/index'

export class ShortPostInfo extends React.Component {
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
      showAvgRating: true,
      showReview: true,

      wishlistId: '',
      isWishlisted: false

    }
    this.handlePostClick = this.handlePostClick.bind(this)
    this.handleBookmark = this.handleBookmark.bind(this)
    this.getWishlistdata = this.getWishlistdata.bind(this)
  }

  handleBookmark () {
    if (this.state.isWishlisted) {
      deleteWishlist(this.state.wishlistId, (err, res) => {
        if (err) {
          alert(err)
          return
        }
        this.setState({ wishlistId: '', isWishlisted: false })
        alert('deleted successfully!')
      })
    } else {
      const body = {
        postId: this.props.data.postId || '',
        userId: ls.get('userId') || '',
        title: this.props.data.title || '',
        postLogo: this.props.data.postLogo || {},
        skills: this.props.data.skills || [],
        priceRange: this.props.data.priceRange || {},
        jobCategory: this.props.data.jobCategory || ''
      }
      addWishlist(body, (err, res) => {
        if (err || res.error) {
          alert(err)
          return
        }

        this.setState({ wishlistId: res.wishlistId, isWishlisted: true })
        alert('added successfully!')
      })
    }
  }

  getWishlistdata () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        postId: this.props.data.postId,
        userId: ls.get('userId')
      },
      fields: {
        wishlistId: true,
        postId: true,
        userId: true,
        title: true,
        postLogo: true,
        skills: true,
        priceRange: true,
        jobCategory: true,
        updatedTime: true
      }
    }

    getWishlist(filter, (err, wishRes) => {
      console.log('all wishlist result:', err, wishRes)
      if (err) {
        console.log('error in wishlist')
      }
      if (wishRes.length) {
        this.setState({
          wishlistId: wishRes[0].wishlistId ? wishRes[0].wishlistId : '',
          isWishlisted: (!!wishRes[0].wishlistId)
        })
      }
    })
  }

  handlePostClick () {
    console.log('handle post:', this.props)

    let path = '#'
    switch (this.props.history.location.pathname) {
      case '/freelancer/posts': path = '/freelancer/post/'
        break
      case '/hiremngr/posts' : path = '/hiremngr/post/'
        break
      case '/posts' : path = '/post/'
        break
        default:
          path='/post/'
    }

    this.props.history.push(`${path}${this.props.data.postId}`)
  }

  componentDidMount () {
    setTimeout(() => {
      this.getWishlistdata()
    }, 1000)
  }

  render () {
    console.log(this.props)
    const {
      title,
      skills = [],
      address = '',
      priceRange = { min: '', max: '' },
      jobType = '',
      jobCategory = '',
      currency = 'INR',
      createdDate = '',
    } = this.props.data

    const allSkills = skills.map(item => item).join(' | ')

    return (

      <div href='single-job-page.html' className='job-listing'>

        {/* <!-- Job Listing Details --> */}
        <div className='job-listing-details'>
          {/* <!-- Logo --> */}
          <div className='job-listing-company-logo'>
            <img src={'https://png.pngtree.com/element_our/png_detail/20181011/facebook-social-media-icon-design-template-vector-png_126986.jpg' || ''} alt='' />
          </div>

          {/* <!-- Details --> */}
          <div className='job-listing-description' onClick={this.handlePostClick}>
            <h4 className='job-listing-company'> {allSkills} <span className='verified-badge' title='Verified Employer' data-tippy-placement='top' /></h4>
            <h3 className='job-listing-title'>{title}</h3>
          </div>
        </div>

        {/* <!-- Job Listing Footer --> */}
        <div className='job-listing-footer'>
          {/* <button onClick={this.handleBookmark} className={(this.state.isWishlisted?"bookmark-button margin-bottom-25 bookmarked":"bookmark-button margin-bottom-25")}> */}
          <span onClick={this.handleBookmark} className={(this.state.isWishlisted ? 'bookmark-icon bookmarked' : 'bookmark-icon')} />
          {/* <span className="bookmark-text">Add Favourite</span> */}
          {/* <span className="bookmarked-text">Add Favourite</span> */}
          {/* </button> */}
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
