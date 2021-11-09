import React from 'react'
import ls from 'local-storage'
import { addWishlist, getWishlist, deleteWishlist } from '../../Actions'

export class Favourite extends React.Component {
  constructor () {
    super()
    this.state = {
      postData: {},
      wishlistId: '',
      isWishlisted: false
    }
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
        postId: this.props.postData.postId || '',
        userId: ls.get('userId') || '',
        title: this.props.postData.title || '',
        postLogo: this.props.postData.postLogo || {},
        skills: this.props.postData.skills || [],
        priceRange: this.props.postData.priceRange || {},
        jobCategory: this.props.postData.jobCategory || ''
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
        postId: this.props.postData.postId,
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

  componentDidMount () {
    setTimeout(() => {
      this.getWishlistdata()
    }, 1000)
  }

  render () {
    return (
      <div><h3>Favourite</h3>

        {/* <!-- Bookmark Button --> */}
        <button onClick={this.handleBookmark} className={(this.state.isWishlisted ? 'bookmark-button margin-bottom-25 bookmarked' : 'bookmark-button margin-bottom-25')}>
          <span className='bookmark-icon' />
          <span className='bookmark-text'>Add Favourite</span>
          <span className='bookmarked-text'>Add Favourite</span>
        </button>
      </div>
    )
  }
}
