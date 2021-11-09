import React from 'react'
import { getPostById, getUserById, patchUser, patchPost } from '../../Actions'
import { PostDetailsSidebar, PostDetailsContent } from './index'
import ls from 'local-storage'
import qs from 'qs'
import config from '../../config'
const { defaultLogo, defaultBg } = config.post

export class PostDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      postData: {}
    }
  }

  componentDidMount() {
    let search = this.props.history.location.search
    if (search.length && search[0] === '?') {
      search = search.substr(1, search.length)
      search = qs.parse(search)
    }

    let { userType = 'guest' } = search

    if (userType === 'hiremanager') {
      userType = 'hiremanager'
    } else if (ls.get('userId')) {
      userType = 'freelancer'
    } else {
      userType = 'guest'
    }

    const postId = this.props.match.params.postId
    getPostById(postId, {}, (err, res) => {
      if (err) {
        alert(err)
        return
      }
      if (res && res.postId) {
        this.setState({ postData: res })
      }
      // UPDATE POST VIEW
      if (res.view || res.view === '0' || res.view === 0) {
        let view = parseInt(res.view)
        if (typeof view === 'number') {
          view = view + 1
          patchPost(postId, { view: view.toString() }, () => {
            // log here
          })
        }
      }
    })

    // UPDATE USER RECENT VIEW
    const filter = {
      offset: 0,
      limit: 100,
      skip: 0,
      fields: {
        userId: true,
        id: true,
        recentViewedPost: true
      }
    }
    getUserById(ls.get('userId'), filter, (err, data) => {
      console.log('check user detsils for view:', err, data)
      if (err) {
        console.log('Error in user fetch', err)
        return
      }
      if (data.id) {
        let recentViewedPost = (data.recentViewedPost || '').split(',')

        // post data
        if (recentViewedPost.includes(postId)) return

        if (recentViewedPost.length >= 3) recentViewedPost.shift()
        recentViewedPost.push(postId)
        recentViewedPost = recentViewedPost.join(',')

        // patchUser
        patchUser(ls.get('userId'), { recentViewedPost }, (errU, resU) => {
          console.log('recent view updated successfully!')
        })
      }
    })
  }

  render() {
    // Identify User Type
    let userType = 'guest'
    if (this.props.userType === 'hiremanager') userType = 'hiremanager' // for creater
    if (this.props.userType !== 'hiremanager' && ls.get('userId')) userType = 'freelancer' // for guest
    if (this.props.userType !== 'hiremanager' && userType !== 'freelancer') userType = 'guest' // for guest

    const {
      postLogo = { url: '' },
      postBg = { url: '' },
      title,
      skills = [],
      avgRating = '1',
      questionnaireSelected = '',
      jobCategory = [],
      profession = [],
    } = this.state.postData

    const allSkills = skills.map(item => item).join(' | ')
    const allJobCategory = jobCategory.map(item => item).join(' | ')
    const allJobProfession = profession.map(item => item).join(' | ')
    const logoImg = postLogo.url || defaultLogo
    const logoBg = postBg.url || defaultBg

    return (
      <>

        {/* <!-- Titlebar================================================== --> */}
        <div className='single-page-header' data-background-image={logoBg}>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='single-page-header-inner'>
                  <div className='left-side'>
                    <div className='header-image'><a href='single-company-profile.html'><img src={logoImg} alt='' /></a></div>
                    <div className='header-details'>
                      <h3>{title}</h3>
                      {/* <h5>About the Employer</h5> */}
                      <ul>
                        <li><label>Job Category:<i className='icon-material-outline-business' /> {allJobCategory}</label></li>
                        <li><label>Profession:<i className='icon-material-outline-business' /> {allJobProfession}</label></li>
                        <div><span>Skills : {allSkills}</span>
                        </div>
                        {questionnaireSelected && <li><div className='verified-badge-with-title'>Need to qualify</div></li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Page Content================================================== --> */}
        <div className='container'>
          <div className='row'>

            {/* <!-- Content --> */}
            <PostDetailsContent {...this.props} postData={this.state.postData} />

            {/* <!-- Sidebar --> */}
            <PostDetailsSidebar {...this.props} postData={this.state.postData} />

          </div>
        </div>

      </>
    )
  }
}
