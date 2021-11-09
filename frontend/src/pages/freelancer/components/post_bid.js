import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getPostById, getProposal, getUserById, changeProposalStatus } from '../../../Actions'
import { daysDiffernce } from '../../../utility/index'
import config from '../../../config'
const { baseSocketUrl, displayNameSettings } = config

export class PostBid extends React.Component {
  constructor () {
    super()
    this.state = {
      proposalDetails: {},
      userDetails: {},
      post: {}
    }
    // this.handleOfferAccept = this.handleOfferAccept.bind(this)
    // this.handleOfferReject = this.handleOfferReject.bind(this)
    this.getPostdata = this.getPostdata.bind(this)
  }

  // handleOfferAccept() {
  //     let body = {
  //         currentProposalStatus: 'accepted'
  //     }
  //     changeProposalStatus(this.state.proposalDetails.proposalId, body, (err, res) => {
  //         if (err || res.error) {
  //             alert('error in proposal handle')
  //             return
  //         }
  //         console.log(res.proposalId)
  //         alert('successfully accepted!')

  //         this.props.history.push('/hiremngr/post_manage_post')
  //     })
  // }

  // handleOfferReject() {
  //     let body = {
  //         currentProposalStatus: 'Rejected'
  //     }
  //     changeProposalStatus(this.state.proposalDetails.proposalId, body, (err, res) => {
  //         if (err || res.error) {
  //             alert('error in proposal handle')
  //             return
  //         }
  //         console.log(res.proposalId)
  //         alert('successfully rejected!')

  //         this.props.history.push('/hiremngr/post_manage_post')
  //     })
  // }

  getPostdata () {
    const postId = this.props.Bid.postId
    const filter = {
      offset: 0,
      limit: 1,
      skip: 0,
      fields: {
        postId: true,
        questionnaireSelected: true,
        // "questionnaire": true,
        userId: true,
        title: true,
        description: true,
        skills: true,
        location: true,
        address: true,
        priceRange: true,
        jobType: true,
        jobCategory: true,
        avgRating: true,
        review: true,
        currency: true,
        createdDate: true
      }
    }

    getPostById(postId, filter, (err, res) => {
      console.log('check post :', err, res)
      if (err) {
        alert(err)
        return
      }
      if (res) {
        if (res.postId === postId) this.setState({ post: res })
      }
    })
  }

  componentDidMount () {
    // call method after 1 sec becuse react taks time to load the parents props data, wheres as key will be there
    setTimeout(() => {
      this.getPostdata()
    }, 1000)
  }

  render () {
    // console.log(this.props)
    const {
      postId,
      title,
      description,
      skills = [],
      location = { lat: '', lag: '' },
      address = '',
      priceRange = { min: '', max: '' },
      jobType = '',
      jobCategory = '',
      avgRating,
      review,
      currency = 'INR',
      createdDate = '',
      time = ''
    } = this.state.post

    const allSkills = skills.map(item => item).join(' | ')

    // description = description.length >90?description.substr(0,40):description

    return (
      <li>
        {/* <!-- Job Listing --> */}
        <div class='job-listing'>

          {/* <!-- Job Listing Details --> */}
          <div class='job-listing-details'>

            {/* <!-- Details --> */}
            <div class='job-listing-description'>
              <h3 class='job-listing-title'><a href={`/freelancer/post/${this.state.post.postId}`}>{title}</a></h3>

              {/* <!-- Job Listing Footer --> */}
              <div class='job-listing-footer'>
                <ul>
                  <li><i class='icon-material-outline-date-range' />{daysDiffernce(createdDate, new Date())} days a go</li>
                  <li><i class='icon-material-outline-date-range' />{jobType}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Buttons --> */}
        <div class='buttons-to-right always-visible'>
          <Link to={`/freelancer/post/${this.state.post.postId}`} class='button ripple-effect'>Show {displayNameSettings.post} Details </Link>
          {/* <a href="#" className="button gray ripple-effect ico" title="Edit" data-tippy-placement="top"><i className="icon-feather-edit"></i></a> */}
          {/* <a href="#" className="button gray ripple-effect ico" title="Remove" data-tippy-placement="top"><i className="icon-feather-trash-2"></i></a> */}
        </div>
      </li>
    )
  }
}
