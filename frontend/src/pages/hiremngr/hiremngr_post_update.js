import ls from 'local-storage'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import request from 'superagent'
import Select from 'react-select'
import { updatePost, getPostById } from '../../Actions'
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dkydl3enp/upload'

export class HiremngrPostUpdate extends React.Component {
  constructor () {
    super()
    this.state = {
      postId: '',
      uploadedFile: [],
      uploadedPhotos: [],
      title: '',
      description: '',
      files: [],
      mainSkill: '',
      subSkills: '',
      selectedPayType: 'Pay-Fixed',
      selectedJobType: 'Full',
      selctedJobCategory: 'Clerical & Data Entry',
      priceRange: '',
      location: ''
    }

    this.photoId = 1
    this.files = []
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onMainSkillsChange = this.onMainSkillsChange.bind(this)
    this.onPayTypesChange = this.onPayTypesChange.bind(this)
    this.onPriceRangeChange = this.onPriceRangeChange.bind(this)
    this.onJobTypeChange = this.onJobTypeChange.bind(this)
    this.onJobCategoryChange = this.onJobCategoryChange.bind(this)
    this.onLocationChange = this.onLocationChange.bind(this)
    this.onChangeSubStills = this.onChangeSubStills.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  onTitleChange (e) {
    console.log(e.target.value)
    this.setState({ title: e.target.value })
  }

  onDescriptionChange (e) {
    this.setState({ description: e.target.value })
  }

  onMainSkillsChange (e) {
    this.setState({ mainSkill: e.target.value })
  }

  onPayTypesChange (e) {
    console.log('**onpay', e.value)
    this.setState({ selectedPayType: e.value })
  }

  onPriceRangeChange (e) {
    this.setState({ priceRange: e.target.value })
  }

  onJobTypeChange (e) {
    this.setState({ selectedJobType: e.value })
  }

  onJobCategoryChange (e) {
    this.setState({ selctedJobCategory: e.value })
  }

  onLocationChange (e) {
    this.setState({ location: e.target.value })
  }

  onChangeSubStills (e) {
    this.setState({ subSkills: e.target.value })
  }

  onPhotoSelected (files) {
    console.log('check file**', files)
    const url = cloudinaryUrl
    const title = 'title'

    for (const file of files) {
      const photoId = this.photoId++
      const fileName = file.name
      request.post(url)
        .field('upload_preset', 'hhg4asuq')
        .field('file', file)
        .field('folder', '/jugaad')
        .field('multiple', true)
        .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
        .field('context', title ? `photo=${title}` : '')
        .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
        .end((error, response) => {
          this.onPhotoUploaded(photoId, fileName, response)
        })
    }
  }

  onPhotoUploadProgress (id, fileName, progress) {
    console.log('onPhotoUploadProgress :', id, fileName, progress)
    // this.props.onUpdateUploadedPhoto({
    //     id: id,
    //     fileName: fileName,
    //     progress: progress,
    // });
  }

  onPhotoUploaded (id, fileName, response) {
    console.log('onPhotoUploaded :', id, fileName, response)
    const newResponse = response.body
    let files = []
    files = [...this.state.files,
      {
        publicId: newResponse.public_id,
        url: newResponse.url,
        format: newResponse.format,
        fileName: fileName
      }
    ]
    this.setState({ files })
    // this.state.onUpdateUploadedPhoto({
    //     id: id,
    //     fileName: fileName,
    //     response: response,
    // });

    // this.props.onPhotosUploaded([response.body]);
  }

  handlePost (e) {
    e.preventDefault()
    console.log('########################', this.state)
    if (!this.state.title) {
      alert('Title can not be blank!', this.state.title)
      return
    }

    const body = {}

    body.hireMngrId = ls.get('userId')
    if (this.state.title) body.title = this.state.title
    if (this.state.description) body.description = this.state.description
    if (this.state.image) body.image = this.state.image
    if (this.state.files) body.files = this.state.files
    if (this.state.mainSkill) body.mainSkill = this.state.mainSkill
    if (this.state.subSkills) body.subSkill = Array.isArray(this.state.subSkills) ? this.state.subSkills : this.state.subSkills.split(',')
    if (this.state.selectedPayType) body.paymentType = this.state.selectedPayType
    if (this.state.priceRange) body.priceRange = this.state.priceRange
    if (this.state.selectedJobType) body.jobType = this.state.selectedJobType
    if (this.state.selctedJobCategory) body.jobCategory = this.state.selctedJobCategory
    if (this.state.location) body.location = this.state.location
    // if(body.title) body.complexicity=''
    // if(body.title) body.price=''
    // if(body.title) body.geometry=[]
    // if(body.title) body.review=''
    // if(body.title) body.avgRating=''
    // if(body.title) body.author=''

    console.log('body :', body)

    updatePost(this.state.postId, body, (err, res) => {
      console.log('createPost result :', err, res)

      if (err || res.error) {
        alert((res && res.error && res.error.message))
        return
      }
      if (res) { this.props.history.push(`/hiremngr/post/${res}`) }
    })
  }

  componentDidMount () {
    console.log('***********************did mount')
    getPostById(this.props.match.params.postId, {}, (err, res) => {
      console.log('check post :', err, res)
      if (err) {
        alert(err)
        return
      }

      if (res.postId) {
        this.setState({
          postId: res.postId,
          title: res.title,
          description: res.description,
          files: res.files,
          mainSkill: res.mainSkill,
          subSkills: res.subSkill,
          selectedPayType: res.paymentType,
          selectedJobType: res.jobType,
          selctedJobCategory: res.jobCategory,
          priceRange: res.priceRange,
          location: res.location
        })
      }
    })
  }

  render () {
    const filesUploaded = this.state.files.map(item => item.fileName).join(', ')
    // console.log(this,'props***********')

    const category = [
      {
        label: 'Clerical & Data Entry',
        value: 'Clerical & Data Entry'
      },
      {
        label: 'Counseling',
        value: 'Counseling'
      },
      {
        label: 'Human Resources',
        value: 'Human Resources'
      },
      {
        label: 'Investigative',
        value: 'Investigative'
      },
      {
        label: 'IT and Computers',
        value: 'IT and Computers'
      }
    ]

    const jobTypes = [
      {
        label: 'Full',
        value: 'Full'
      },
      {
        label: 'Time',
        value: 'Time'
      },
      {
        label: 'Freelance',
        value: 'Freelance'
      },
      {
        label: 'Part Time',
        value: 'Part-Time'
      },
      {
        label: 'Internship',
        value: 'Internship'
      },
      {
        label: 'Temporary',
        value: 'Temporary'
      }
    ]

    const payTypes = [
      {
        label: 'Pay Fixed',
        value: 'Pay-Fixed'
      },
      {
        label: 'By the Hour',
        value: 'BY-The-Hour'
      }
    ]

    return (
      <>
        {/* <!-- Dashboard Container --> */}
        <div className='dashboard-container'>

          {/* <!-- Dashboard Sidebar================================================== --> */}
          <div className='dashboard-sidebar'>
            <div className='dashboard-sidebar-inner' data-simplebar>
              <div className='dashboard-nav-container'>

                {/* <!-- Responsive Navigation Trigger --> */}
                <a href='#' className='dashboard-responsive-nav-trigger'>
                  <span className='hamburger hamburger--collapse'>
                        <span className='hamburger-box'>
                        <span className='hamburger-inner' />
                      </span>
                      </span>
                  <span className='trigger-title'>Dashboard Navigation</span>
                </a>

                {/* <!-- Navigation --> */}
                <div className='dashboard-nav'>
                  <div className='dashboard-nav-inner'>

                        <ul data-submenu-title='Start'>
                        <li><a href='dashboard.html'><i className='icon-material-outline-dashboard' /> Dashboard</a></li>
                        {/* <li><a href="dashboard-messages.html"><i className="icon-material-outline-question-answer"></i> Messages <span className="nav-tag">2</span></a></li>
                                        <li><a href="dashboard-bookmarks.html"><i className="icon-material-outline-star-border"></i> Bookmarks</a></li>
                                        <li><a href="dashboard-reviews.html"><i className="icon-material-outline-rate-review"></i> Reviews</a></li> */}
                      </ul>

                        {/* <ul data-submenu-title="Organize and Manage">
                                        <li className="active-submenu"><a href="#"><i className="icon-material-outline-business-center"></i> Jobs</a>
                                            <ul>
                                                <li><a href="dashboard-manage-jobs.html">Manage Jobs <span className="nav-tag">3</span></a></li>
                                                <li><a href="dashboard-manage-candidates.html">Manage Candidates</a></li>
                                                <li><a href="dashboard-post-a-job.html">Post a Job</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#"><i className="icon-material-outline-assignment"></i> Tasks</a>
                                            <ul>
                                                <li><a href="dashboard-manage-tasks.html">Manage Tasks <span className="nav-tag">2</span></a></li>
                                                <li><a href="dashboard-manage-bidders.html">Manage Bidders</a></li>
                                                <li><a href="dashboard-my-active-bids.html">My Active Bids <span className="nav-tag">4</span></a></li>
                                                <li><a href="dashboard-post-a-task.html">Post a Task</a></li>
                                            </ul>
                                        </li>
                                    </ul> */}

                        <ul data-submenu-title='Account'>
                        <li><Link to='/user/account/view'><i className='icon-material-outline-settings' /> Settings</Link></li>
                        <li><Link href='/'><i className='icon-material-outline-power-settings-new' /> Logout</Link></li>
                      </ul>

                      </div>
                </div>
                {/* <!-- Navigation / End --> */}

              </div>
            </div>
          </div>
          {/* <!-- Dashboard Sidebar / End --> */}

          {/* <!-- Dashboard Content================================================== --> */}
          <div className='dashboard-content-container' data-simplebar>
            <div className='dashboard-content-inner'>

              {/* <!-- Dashboard Headline --> */}
              <div className='dashboard-headline'>
                <h3>Post a Job</h3>

                {/* <!-- Breadcrumbs --> */}
                <nav id='breadcrumbs' className='dark'>
                  <ul>
                        <li><a href='#'>Home</a></li>
                        <li><a href='#'>Dashboard</a></li>
                        <li>Post a Job</li>
                      </ul>
                </nav>
              </div>

              {/* <!-- Row --> */}
              <div className='row'>

                {/* <!-- Dashboard Box --> */}
                <div className='col-xl-12'>
                  <div className='dashboard-box margin-top-0'>

                        {/* <!-- Headline --> */}
                        <div className='headline'>
                        <h3><i className='icon-feather-folder-plus' /> Job Submission Form</h3>
                      </div>

                        <div className='content with-padding padding-bottom-10'>
                        <div className='row'>

                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Job Title</h5>
                                    <input type='text' value={this.state.title} onChange={this.onTitleChange} className='with-border' />
                                  </div>
                              </div>
                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Main Skill</h5>
                                    <input type='text' value={this.state.mainSkill} onChange={this.onMainSkillsChange} className='with-border' />
                                  </div>
                              </div>

                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Sub Skills optional</h5>
                                    <input type='text' value={this.state.subSkills} onChange={this.onChangeSubStills} className='with-border' />
                                  </div>
                              </div>

                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Payment Type</h5>
                                    <Select className='selectpicker with-border' value={payTypes.filter(option => option.value === this.state.selectedPayType)} onChange={this.onPayTypesChange} options={payTypes} data-size='7' title='Select Job Type' />
                                  </div>
                              </div>
                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Price Rance - Min-Max</h5>
                                    <input type='text' value={this.state.priceRange} onChange={this.onPriceRangeChange} className='with-border' />
                                  </div>
                              </div>

                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Job Type</h5>
                                    <Select className='selectpicker with-border' value={jobTypes.filter(option => option.value === this.state.selectedJobType)} onChange={this.onJobTypeChange} options={jobTypes} data-size='7' title='Select Job Type' />
                                  </div>
                              </div>

                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Industry</h5>
                                    <Select className='selectpicker with-border' value={category.filter(option => option.value === this.state.selctedJobCategory)} onChange={this.onJobCategoryChange} options={category} data-size='7' title='Select Category' />
                                  </div>
                              </div>

                            <div className='col-xl-4'>
                                <div className='submit-field'>
                                    <h5>Location</h5>
                                    <div className='input-with-icon'>
                                        <div id='autocomplete-container'>
                                            <input id='autocomplete-input' value={this.state.location} onChange={this.onLocationChange} className='with-border' type='text' placeholder='Type Address' />
                                          </div>
                                        <i className='icon-material-outline-location-on' />
                                      </div>
                                  </div>
                              </div>

                            {/* <div className="col-xl-4">
                                                <div className="submit-field">
                                                    <h5>Salary</h5>
                                                    <div className="row">
                                                        <div className="col-xl-6">
                                                            <div className="input-with-icon">
                                                                <input className="with-border" type="text" placeholder="Min" />
                                                                <i className="currency">USD</i>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <div className="input-with-icon">
                                                                <input className="with-border" type="text" placeholder="Max" />
                                                                <i className="currency">USD</i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                            <div>

                                <div className='col-xl-12'>
                                    <div className='submit-field'>
                                        <h5>Job Description</h5>
                                        <textarea cols='30' rows='5' value={this.state.description} onChange={this.onDescriptionChange} className='with-border' />
                                        <div className='uploadButton margin-top-30'>
                                            {/* <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple /> */}
                                            <input className='uploadButton-input' type='file' id='fileupload' accept='image/*,application/pdf,video/*,text/plain,text/html,audio/*' multiple='multiple' ref={fileInputEl => (this.fileInputEl = fileInputEl)} onChange={() => this.onPhotoSelected(this.fileInputEl.files)} />

                                            <label className='uploadButton-button ripple-effect' htmlFor='fileupload'>Upload Files</label>
                                            {/* <span>{this.state.files.map(item => item.fileName).join(',')}</span> */}
                                            {filesUploaded}
                                            <span className='uploadButton-file-name'>Images or documents that might be helpful in describing your job</span>
                                          </div>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </div>
                      </div>

                  <div className='col-xl-12'>
                        <button href='#' className='button ripple-effect big margin-top-30' onClick={this.handlePost}><i className='icon-feather-plus' /> Post a Job</button>
                      </div>

                </div>
                {/* <!-- Row / End --> */}

                {/* <!-- Footer --> */}
                <div className='dashboard-footer-spacer' />
                <div className='small-footer margin-top-15'>
                  <div className='small-footer-copyrights'>
                        © 2021 <strong>jobviously</strong>. All Rights Reserved.
                      </div>
                  <ul className='footer-social-links'>
                        <li>
                        <a href='#' title='Facebook' data-tippy-placement='top'>
                            <i className='icon-brand-facebook-f' />
                          </a>
                      </li>
                        <li>
                        <a href='#' title='Twitter' data-tippy-placement='top'>
                            <i className='icon-brand-twitter' />
                          </a>
                      </li>
                        <li>
                        <a href='#' title='Google Plus' data-tippy-placement='top'>
                            <i className='icon-brand-google-plus-g' />
                          </a>
                      </li>
                        <li>
                        <a href='#' title='LinkedIn' data-tippy-placement='top'>
                            <i className='icon-brand-linkedin-in' />
                          </a>
                      </li>
                      </ul>
                  <div className='clearfix' />
                </div>
                {/* <!-- Footer / End --> */}

              </div>
            </div>
            {/* <!-- Dashboard Content / End --> */}

          </div>
        </div>
        {/* <!-- Dashboard Container / End --> */}
      </>
    )
  }
}
