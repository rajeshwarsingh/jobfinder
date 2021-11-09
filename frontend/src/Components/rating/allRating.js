import React from 'react'
import { daysDiffernce } from '../../utility/index'
import { getRatings } from '../../Actions'
import qs from 'qs'

export class AllRating extends React.Component {
  constructor () {
    super()
    this.state = {
      ratingData: [],
      limit: 10,
      skip: 0,
      currentPage: 1
    }

    this.onPreviousClick = this.onPreviousClick.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
    this.getRatingData = this.getRatingData.bind(this)
  }

  onPreviousClick () {
    if (this.state.currentPage > 1) {
      const skip = this.state.limit * (this.state.currentPage - 2)
      const currentPage = this.state.currentPage - 1
      this.setState({ skip, currentPage })
    }
  }

  onNextClick () {
    const skip = this.state.limit * (this.state.currentPage)
    const currentPage = this.state.currentPage + 1
    this.setState({ skip, currentPage })
  }

  getRatingData () {

    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }
    const {ratingType='', ratingId=''} = search
    
    const filter = {
      offset: 0,
      limit: this.state.limit,
      skip: this.state.skip,
      where: {
        type: 'service',
        ratingTypeId: this.props.match.params.ratingTypeId
      },
      fields: {
        ratingId: true,
        type: true,
        ratingTypeId: true,
        message: true,
        rating: true,
        createdDate: true,
        userName: true
      }
    }

    if(ratingType==='individual'){
      filter.where = {
        ratingId:ratingId
      }
    }

    getRatings(filter, (err, res) => {
      console.log('check reating :', err, res)
      if (err) {
        alert('error in rating fetch:')
      }
      if (Array.isArray(res)) {
        this.setState({ ratingData: res })
      }
    })
  }

  componentDidMount () {
    this.getRatingData()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.skip !== prevState.skip) {
      this.getRatingData()
    }
  }

  render () {
    const allReviews = this.state.ratingData.map((item, i) => {
      return (
        <li>
          <div class='boxed-list-item'>
            {/* <!-- Content --> */}
            <div class='item-content'>
              <h4>{item.userName}</h4>
              <div class='item-details margin-top-10'>
                <div class='star-rating' data-rating={item.rating} />
                <div class='detail-item'><i class='icon-material-outline-date-range' />{daysDiffernce(item.createdDate, new Date())} days ago</div>
              </div>
              <div class='item-description'>
                <p>{item.message}</p>
              </div>
            </div>
          </div>
          {/* <a href="#small-dialog-1" className="popup-with-zoom-anim button gray ripple-effect margin-top-5 margin-bottom-10"><i className="icon-feather-edit"></i> Edit Review</a> */}
        </li>
      )
    })

    return (
      <>
        {/* <!-- Dashboard Content================================================== --> */}
        <div class='dashboard-content-container' data-simplebar>
          <div class='dashboard-content-inner'>

            {/* <!-- Dashboard Headline --> */}
            <div class='dashboard-headline'>
              <h3>Reviews</h3>

              {/* <!-- Breadcrumbs --> */}
              <nav id='breadcrumbs' class='dark'>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/">Dashboard</a></li>
                  <li>Reviews</li>
                </ul>
              </nav>
            </div>

            {/* <!-- Row --> */}
            <div class='row'>

              {/* <!-- Dashboard Box --> */}
              <div class='col-xl-12'>

                <div class='dashboard-box margin-top-0'>

                  {/* <!-- Headline --> */}
                  <div class='headline'>
                    <h3><i class='icon-material-outline-business' /> All ratings</h3>
                  </div>

                  <div class='content'>
                    <div className='row'>

                          <div className='col-xl-6'>
                              <ul class='dashboard-box-list'>
                                  {allReviews}

                                </ul>
                            </div>

                        </div>
                  </div>
                </div>

                {/* <!-- Pagination --> */}
                <div className='clearfix' />
                <div className='pagination-container margin-top-20 margin-bottom-20'>
                  <nav className='pagination'>
                    <ul>
                          <li onClick={this.onPreviousClick} className='pagination-arrow'><i className='icon-material-outline-keyboard-arrow-left' /></li>
                          <li>{this.state.currentPage}</li>
                          <li onClick={this.onNextClick} className='pagination-arrow'><i className='icon-material-outline-keyboard-arrow-right' /></li>
                        </ul>
                  </nav>
                </div>
                <div className='clearfix' />
                {/* <!-- Pagination / End --> */}

              </div>

            </div>
            {/* <!-- Row / End --> */}

            {/* <!-- Footer --> */}
            <div class='dashboard-footer-spacer' />
            <div class='small-footer margin-top-15'>
              <div class='small-footer-copyrights'>
                © 2019 <strong>Hireo</strong>. All Rights Reserved.
              </div>
              <ul class='footer-social-links'>
                <li>
                  <a href="/" title='Facebook' data-tippy-placement='top'>
                    <i class='icon-brand-facebook-f' />
                  </a>
                </li>
                <li>
                  <a href="/" title='Twitter' data-tippy-placement='top'>
                    <i class='icon-brand-twitter' />
                  </a>
                </li>
                <li>
                  <a href="/" title='Google Plus' data-tippy-placement='top'>
                    <i class='icon-brand-google-plus-g' />
                  </a>
                </li>
                <li>
                  <a href="/" title='LinkedIn' data-tippy-placement='top'>
                    <i class='icon-brand-linkedin-in' />
                  </a>
                </li>
              </ul>
              <div class='clearfix' />
            </div>
            {/* <!-- Footer / End --> */}

          </div>
        </div>
        {/* <!-- Dashboard Content / End --> */}
      </>
    )
  }
}
