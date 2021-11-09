import ls from 'local-storage'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import request from 'superagent'
import { createJob } from '../../Actions'
const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dkydl3enp/upload'

export class HiremngrJobPostCreate extends React.Component {
  constructor () {
    super()
    this.state = {
      uploadedFile: [],
      uploadedPhotos: [],
      company: '',
      title: '',
      location: '',
      jobFunTypeSelected: '',
      empTypeSelected: '',
      compIndusSelected: '',
      senioritySelected: '',
      description: '',
      skills: [],
      files: []
    }

    this.photoId = 1
    this.files = []
    this.onCompanyChanged = this.onCompanyChanged.bind(this)
    this.onTitleChanged = this.onTitleChanged.bind(this)
    this.onLocationChanged = this.onLocationChanged.bind(this)
    this.onJobFuctionChanged = this.onJobFuctionChanged.bind(this)
    this.onEmpTypeChanged = this.onEmpTypeChanged.bind(this)
    this.onCompIndusChanged = this.onCompIndusChanged.bind(this)
    this.onSeniorityChanged = this.onSeniorityChanged.bind(this)
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this)
    this.onSkillsChanged = this.onSkillsChanged.bind(this)
    this.handleJobPost = this.handleJobPost.bind(this)
  }

  onCompanyChanged (e) {
    console.log('&&&&&&&&&&&', e)
    this.setState({ company: e.target.value })
  }

  onTitleChanged (e) {
    console.log(e.target.value)
    this.setState({ title: e.target.value })
  }

  onLocationChanged (e) {
    console.log(e.target.value)
    this.setState({ location: e.target.value })
  }

  onJobFuctionChanged (e) {
    console.log('check :', e.target.value)
    this.setState({ jobFunTypeSelected: e.target.value })
  }

  onEmpTypeChanged (e) {
    this.setState({ empTypeSelected: e.target.value })
  }

  onCompIndusChanged (e) {
    console.log('**onpay', e.value)
    this.setState({ compIndusSelected: e.target.value })
  }

  onSeniorityChanged (e) {
    this.setState({ senioritySelected: e.target.value })
  }

  onDescriptionChanged (e) {
    console.log('desc: ', e.target.value)
    this.setState({ description: e.target.value })
  }

  onSkillsChanged (e) {
    this.setState({ skills: e.target.value })
  }

  onPhotoSelected (files) {
    console.log('check file**', files)
    // console.log('check values**',this.state.company, this.state.title, this.state.location, this.state.jobFunTypeSelected,
    // this.state.empTypeSelected,this.state.compIndusSelected,this.state.senioritySelected,this.state.onDescriptionChanged,
    // this.state.onSkillsChanged)

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

  handleJobPost (e) {
    e.preventDefault()
    // console.log('check values**',this.state.company, this.state.title, this.state.location, this.state.jobFunTypeSelected,
    // this.state.empTypeSelected,this.state.compIndusSelected,this.state.senioritySelected,this.state.description,
    // this.state.skills)
    console.log('########################', this.state)
    // return
    console.log('########################', this.state)
    if (!this.state.title) {
      alert('Title can not be blank!', this.state.title)
      return
    }

    const body = {
      hireMngrId: ls.get('userId'),
      companyName: this.state.company,
      title: this.state.title,
      location: this.state.location,
      jobFunType: this.state.jobFunTypeSelected,
      empType: this.state.empTypeSelected,
      compIndus: this.state.compIndusSelected,
      seniority: this.state.senioritySelected,
      description: this.state.description,
      skills: this.state.skills,
      files: this.state.files
    }
    console.log('body :', body)

    createJob(body, (err, res) => {
      console.log('createJob result :', err, res)

      if (err || res.error) {
        alert((res.error && res.error.message))
        return
      }
      alert('Job post created successfully!')
      // if(res.jobId)
      // this.props.history.push(`/hiremngr/post/${res.postId}`)
    })
  }

  render () {
    const filesUploaded = this.state.files.map(item => item.fileName).join(', ')
    // console.log(this,'props***********')
    const jobFunTypes = [
      {
        label: 'Accounting',
        value: 'accounting'
      },
      {
        label: 'Engineering',
        value: 'engineering'
      },
      {
        label: 'Analist',
        value: 'analist'
      },
      {
        label: 'Bussiness Development',
        value: 'bussiness-development'
      }
    ]

    const empType = [
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
    const companyIndustry = [
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
    const seniority = [
      {
        label: 'internship',
        value: 'internship'
      },
      {
        label: 'Entry Level',
        value: 'entry-level'
      },
      {
        label: 'Associate',
        value: 'associate'
      },
      {
        label: 'Mid Senior Level',
        value: 'mid-senior-level'
      },
      {
        label: 'Executive',
        value: 'executive'
      },
      {
        label: 'Not Applicable',
        value: 'not-applicable'
      }
    ]

    // value={payTypes.filter(option => option.value === this.state.selectedPayType)}

    const jobFunOptions = jobFunTypes.map((item, i) => {
      return <option value={item.value} key={i} selected={item.value === this.state.jobFunTypeSelected}>{item.label}</option>
    })

    const empTypeOptions = empType.map((item, i) => {
      return <option value={item.value} key={i} selected={this.state.empTypeSelected}>{item.label}</option>
    })
    const compIndusOptions = companyIndustry.map((item, i) => {
      return <option value={item.value} key={i} selected={this.state.compIndusSelected}>{item.label}</option>
    })
    const seniorityOptions = seniority.map((item, i) => {
      return <option value={item.value} key={i} selected={this.state.senioritySelected}>{item.label}</option>
    })

    return (

      <>
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
                  <h5>Company</h5>
                  <input type='text' name='company' value={this.state.company} onChange={this.onCompanyChanged} className='with-border' />
                </div>
                        </div>

                          <div className='col-xl-4'>
                          <div className='submit-field'>
                  <h5>Job Title</h5>
                  <input type='text' value={this.state.title} onChange={this.onTitleChanged} className='with-border' />
                </div>
                        </div>
                          <div className='col-xl-4'>
                          <div className='submit-field'>
                  <h5>Location</h5>
                  <div className='input-with-icon'>
                  <div id='autocomplete-container'>
                  <input id='autocomplete-input' value={this.state.location} onChange={this.onLocationChanged} className='with-border' type='text' placeholder='Type Address' />
                </div>
                  <i className='icon-material-outline-location-on' />
                </div>
                </div>
                        </div>

                          <div className='col-xl-4'>
                          <div className='submit-field'>
                  <h5>Job function</h5>
                  <select className='selectpicker with-border' title='Select Job Type' onChange={this.onJobFuctionChanged}>
                  {jobFunOptions}
                </select>
                  {/* <select className="selectpicker with-border" value={payTypes.filter(option => option.value === this.state.selectedPayType)} onChange={this.onPayTypesChange} options={payTypes} data-size="7" title="Select Job Type"/> */}
                </div>
                        </div>
                          <div className='col-xl-4'>
                          <div className='submit-field'>
                  <h5>Employment Type</h5>
                  <select className='selectpicker with-border' title='Select Job Type' onChange={this.onEmpTypeChanged}>
                  {empTypeOptions}
                </select>
                </div>
                        </div>
                          <div className='col-xl-4'>
                          <div className='submit-field'>
                  <h5>Company industry</h5>
                  <select className='selectpicker with-border' title='Select Job Type' onChange={this.onCompIndusChanged}>
                  {compIndusOptions}
                </select>
                </div>
                        </div>
                          <div className='col-xl-4'>
                          <div className='submit-field'>
                  <h5>Seniority level</h5>
                  <select className='selectpicker with-border' title='Select Job Type' onChange={this.onSeniorityChanged}>
                  {seniorityOptions}
                </select>
                </div>
                        </div>

                          <div className='col-xl-12'>
                          <div className='submit-field'>
                  <h5>Job Description</h5>
                  <textarea cols='30' rows='5' value={this.state.description} onChange={this.onDescriptionChanged} className='with-border' />
                  <div className='uploadButton margin-top-30'>
                  {/* <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple /> */}
                  <input className='uploadButton-input' type='file' id='fileupload' accept='image/*,application/pdf,video/*,text/plain,text/html,audio/*' multiple='multiple' ref={fileInputEl => (this.fileInputEl = fileInputEl)} onChange={() => this.onPhotoSelected(this.fileInputEl.files)} />
                  <label className='uploadButton-button ripple-effect' htmlFor='fileupload'>Upload Files</label>
                  {filesUploaded}
                  <span className='uploadButton-file-name'>Images or documents that might be helpful in describing your job</span>
                </div>
                </div>
                        </div>

                          <div className='col-xl-4'>
                          <div className='submit-field'>
                  <h5>Skills  <i className='help-icon' data-tippy-placement='right' title='Maximum of 10 tags' /></h5>
                  <div className='keywords-container'>
                  <div className='keyword-input-container'>
                  <input onChange={this.onSkillsChanged} type='text' value={this.state.skills} className='keyword-input with-border' placeholder='e.g. job title, responsibilites' />
                  <button className='keyword-input-button ripple-effect'><i className='icon-material-outline-add' /></button>
                </div>
                  <div className='keywords-list'>
                  {/* <!-- keywords go here --> */}
                </div>
                  <div className='clearfix' />
                </div>

                </div>
                        </div>

                        </div>
                  </div>
                </div>
              </div>

              <div className='col-xl-12'>
                <button onClick={this.handleJobPost} className='button ripple-effect big margin-top-30'><i className='icon-feather-plus' /> Post a Job</button>&nbsp;
                <button className='button dark ripple-effect big margin-top-30'> Cancel</button>
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
      </>
    )
  }
}
