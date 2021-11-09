import React from 'react'
import { Link } from 'react-router-dom'
import { getProposal } from '../../../Actions'
import { daysDiffernce } from '../../../utility/index'

export class Post extends React.Component {
  constructor () {
    super()
    this.state = {
      proposalCount: 0
    }
    this.manageBidderClick = this.manageBidderClick.bind(this)
  }

  manageBidderClick () {
    const { postId = '', userId = '', title = '', currency = {}, priceRange = {},NoOfWeeks="", createdDate = '' } = this.props.post
    this.props.history.push(`/hiremngr/post_manage_bidders/${postId}?title=${title}&postId=${postId}&userId=${userId}&NoOfWeeks=${NoOfWeeks}&currency=${currency}&min=${priceRange.min}&max=${priceRange.max}&createdDate=${createdDate}`)
  }

  componentDidMount () {
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      where: {
        postId: this.props.post.postId
      },
      fields: {
        postId: true
      }
    }

    getProposal(filter, (err, res) => {
      console.log('show all Bidders:', err, res)
      if (res) {
        this.setState({ proposalCount: res ? res.length : 0 })
      }
    })
  }

  render () {
    const { postId = '',questionnaireSelected,userId='', title = '',postLogo={url:''}, priceRange = { min: '', max: '' }, currency, createdDate } = this.props.post
    return (
      <>
        <li>
          {/* <!-- Job Listing --> */}
          <div className='job-listing width-adjustment'>

            {/* <!-- Job Listing Details --> */}
            
            <div className='job-listing-details'>
              <a href="#" className="job-listing-company-logo">
                <img height={90} src={postLogo.url} alt=""/>
							</a>
                <div className="job-listing-description">
                  <h3 className="job-listing-title"><Link to={`/hiremngr/post/${postId}`}><strong>{title}</strong></Link></h3>

                  <div className="job-listing-footer">
                    <ul>
                      {questionnaireSelected && <li><i className="icon-material-outline-business-center"></i> <strong>
                        <Link to={`/hiremngr/post_questionaire_list/${postId}?title=${title}&postId=${postId}&userId=${userId}&currency=${currency}&min=${priceRange.min}&max=${priceRange.max}&createdDate=${createdDate}`}>All questionaire</Link>
                        </strong>
                      </li>}
                      <li><i className='icon-material-outline-access-time' /> {daysDiffernce(createdDate, new Date())} days ago</li>
                    </ul>
                  </div>
                </div>
           </div>
          </div>

          {/* <!-- Task Details --> */}
          <ul className='dashboard-task-info'>
            <li><strong>{this.state.proposalCount}</strong><span>Bids</span></li>
          </ul>

          {/* <!-- Buttons --> */}
          <div className='buttons-to-right always-visible'>
            <button onClick={this.manageBidderClick} className='button ripple-effect'><i className='icon-material-outline-supervisor-account' /> Manage Bidders <span className='button-info'>{this.state.proposalCount}</span></button>
          </div>
        </li>
      </>
    )
  }
}
