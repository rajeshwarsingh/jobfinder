import ls from 'local-storage'
import React, { Fragment } from 'react';
import request from 'superagent';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Select, { components } from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import { Accordion, Card } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay'
import { createService, patchService, createNotification } from '../../../Actions';
import { Industry_sectors, Profession, Currency } from '../../../utility/master_data'
import config from '../../../config'
const { cloudinary, displayNameSettings } = config
const { apiUrl, uploadPreset } = cloudinary
var Spinner = require('react-spinkit');

const PaymentTypes = [
    {
        label: 'Pay Fixed',
        value: 'Pay-Fixed'
    }
]

const Working_Preference = [
    {
        label: 'zoom',
        value: 'zoom'
    },
    {
        label: 'physical',
        value: 'physical'
    }
]

const Menu = props => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
        <components.Menu {...props}>
            {optionSelectedLength < 3 ? (
                props.children
            ) : (
                    <div style={{ margin: 15 }}>Max limit achieved</div>
                )}
        </components.Menu>
    );
};


export class FreelancerServiceCreate extends React.Component {

    constructor() {
        super();
        this.state = {
            servicePicUpload: null,
            serviceBgPicUpload: null,
            filesUpload: [],
            uploadedResourceFiles: [],// resource files uploaded need to call update service api
            title: '',
            description: '',
            skillItem: '', //need for ui skills input
            files: [],
            skills: [],
            selectedPayType: '',
            professionSelected: [],
            selctedJobCategory: [],
            selectedCurrency: '',
            selctedWorkingPref: '',
            min: '',
            max: '',
            expectedDuration: '',
            location: { lan: 0, lng: 0 },
            address: '', //for google location
            spinner: false,
            spinnerMsg: `Please wait, ${displayNameSettings.service} creating...`,
            eventKey: "0"
        };
        this.photoId = 1;
        this.files = [];
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onPayTypesChange = this.onPayTypesChange.bind(this)
        this.onPriceRangeChange = this.onPriceRangeChange.bind(this)
        this.onProfessionChanged = this.onProfessionChanged.bind(this)
        this.onJobCategoryChange = this.onJobCategoryChange.bind(this)
        this.onWorkPrefChange = this.onWorkPrefChange.bind(this)
        this.onPicSelected = this.onPicSelected.bind(this)
        this.onBgPicSelected = this.onBgPicSelected.bind(this)
        this.skillItemChange = this.skillItemChange.bind(this)
        this.OnSkillItemClicked = this.OnSkillItemClicked.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.onCurrencyChange = this.onCurrencyChange.bind(this)
        this.handleMax = this.handleMax.bind(this)
        this.handleMin = this.handleMin.bind(this)
        this.expectedDurationChange = this.expectedDurationChange.bind(this)
        this.onWorkPrefChange = this.onWorkPrefChange.bind(this)
        this.handleService = this.handleService.bind(this)
    }

    notifyErr = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    notifySucc = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    handleChange = address => {
        this.setState({ address });
    };

    //price range min and max
    handleMin(e) {
        this.setState({ min: e.target.value });
    };

    handleMax(e) {
        this.setState({ max: e.target.value });
    };

    //project duration
    expectedDurationChange(e) {
        this.setState({ expectedDuration: e.target.value });
    };

    //address and location selection google map
    handleSelect = address => {
        console.log(address)
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({ location: latLng, address })
            })
            .catch(error => {
                this.setState({ location: { lat: '', lng: '' } })
                console.error('Error', error)
            });
    };

    skillItemChange(e) {
        this.setState({ skillItem: e.target.value })
    }

    onCurrencyPressed(e) {
        let PressChar = String.fromCharCode(e.keyCode);
        var letters = /^[A-Za-z]+$/;

        if (PressChar.match(letters)) {
            let selectedItem = Currency.filter((item) => {
                if (item.value[0] === PressChar) {
                    return item.value
                }
            })
            this.setState({ selectedCurrency: selectedItem[0].value })
        }
    }

    onCurrencyChange(e) {
        this.setState({ selectedCurrency: e.value })
    }

    OnSkillItemClicked() {
        if (this.state.skills.length > 49) return alert('More than 50 skills not allowed!')
        if (this.state.skillItem.trim() && this.state.skills.indexOf(this.state.skillItem.toLowerCase()) === -1) {
            this.setState({ skills: [...this.state.skills, this.state.skillItem.toLowerCase()], skillItem: '' })
        }
    }

    onKeyUp(event) {
        if (event.key === 'Enter') {
            if (this.state.skills.length > 49) return alert('More than 50 skills not allowed!')
            if (this.state.skillItem.trim() && this.state.skills.indexOf(this.state.skillItem.toLowerCase()) === -1) {
                this.setState({ skills: [...this.state.skills, this.state.skillItem.toLowerCase()], skillItem: '' })
            }
        }
    }

    onProfessionChanged(value, { action, removedValue }) {

        if ((value ? value : []).length > 3) {
            return this.notifyErr('3 professions allow!')
        }
        let profession = (value ? value : []).map(item => {
            return item.value
        })

        this.setState({ professionSelected: profession })
    }

    onJobCategoryChange(value, { action, removedValue }) {

        if ((value ? value : []).length > 3) {
            return this.notifyErr('3 Job Categories allow!')
        }
        let jobcategory = (value ? value : []).map(item => {
            return item.value
        })
        console.log(jobcategory.join(','))
        this.setState({ selctedJobCategory: jobcategory })
    }

    onTitleChange(e) {
        console.log(e.target.value)
        this.setState({ title: e.target.value })
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value })
    }

    onPayTypesChange(e) {
        this.setState({ selectedPayType: e.value })
    }

    onPriceRangeChange(e) {
        this.setState({ priceRange: e.target.value })
    }

    onWorkPrefChange(e) {
        this.setState({ selctedWorkingPref: e.value })
    }

    // suporting files
    onPhotoSelected(files) {
        let allFiles = []
        for (let file of files) {
            allFiles.push(file)
        }
        this.setState({ filesUpload: allFiles })
        return
    }

    uploadResourceFiles(files, service, cb) {
        let fileUploadedCount = 0
        for (let file of files) {

            const fileName = file.name
            request.post(apiUrl)
                .field('file', file)
                .field('upload_preset', uploadPreset)
                .field('folder', `/jugaad/service/${service.serviceId}/resource`)
                .field('multiple', true)
                // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
                // .field('context', title ? `photo=${title}` : '')
                // .on('progress', (progress) => this.onPicUploadProgress(fileName, progress))
                .end((error, response) => {
                    fileUploadedCount++
                    if (error) {
                        return cb(error)
                    }

                    let newResponse = response.body
                    let uploadedResourceFile = {
                        publicId: newResponse.public_id,
                        url: newResponse.url,
                        format: newResponse.format,
                        fileName: fileName
                    }

                    this.setState({ uploadedResourceFiles: [...this.state.uploadedResourceFiles, uploadedResourceFile] })
                    if (files.length === fileUploadedCount) {
                        return cb(null, this.state.uploadedResourceFiles)
                    }
                });
        }
    }
    //end supporting files

    //Service pic
    onPicSelected(e) {
        let file = e.target.files[0]
        if (file.size > 11000000) return alert("Size must be less than 11MB!")
        this.setState({ servicePicUpload: file })

        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('servicePic');
            output.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        return
    }

    uploadServicePic(file, service, cb) {
        const fileName = service.serviceId
        console.log("***apiUrl:", apiUrl)
        request.post(apiUrl)
            .field('file', file)
            .field('upload_preset', uploadPreset)
            .field('public_id', 'logo-' + service.serviceId)
            .field('folder', `/jugaad/service/${service.serviceId}`)
            // .field('use_filename', true)
            // .field('unique_filename', true)
            .field('resource_type', 'image')
            // .field('overwrite', true)
            .field('multiple', false)
            // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
            // .field('context', title ? `photo=${title}` : '')
            // .on('progress', (progress) => this.onPicUploadProgress(fileName, progress))
            .end((error, response) => {
                console.log('error in upload sercie pic:', error, response)
                if (error) {
                    return cb(error)
                }
                let newResponse = response.body
                let servicePic = {
                    publicId: newResponse.public_id,
                    url: newResponse.url,
                    format: newResponse.format,
                    fileName: fileName
                }
                return cb(null, servicePic)
            });
    }
    //end service pic

    //service bg Pic

    onBgPicSelected(e) {
        let file = e.target.files[0]
        if (file.size > 11000000) return alert("Size must be less than 11MB!")
        this.setState({ serviceBgPicUpload: file })

        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('BgServicePic');
            output.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        return
    }

    uploadBgServicPic(file, service, cb) {
        const fileName = service.servicetId

        request.post(apiUrl)
            .field('file', file)
            .field('upload_preset', uploadPreset)
            .field('public_id', 'bg-' + service.servicetId)
            .field('folder', `/jugaad/service/${service.serviceId}`)
            // .field('use_filename', true)
            // .field('unique_filename', true)
            .field('resource_type', 'image')
            // .field('overwrite', true)
            .field('multiple', false)
            // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
            // .field('context', title ? `photo=${title}` : '')
            // .on('progress', (progress) => this.onPicUploadProgress(fileName, progress))
            .end((error, response) => {
                if (error) {
                    return cb(error)
                }
                let newResponse = response.body
                let serviceBgPic = {
                    publicId: newResponse.public_id,
                    url: newResponse.url,
                    format: newResponse.format,
                    fileName: fileName
                }
                return cb(null, serviceBgPic)
            });
    }
    //end service pic

    handleService(e) {
        e.preventDefault()


        if (!this.state.title) {
            return this.notifyErr('Title can not be blank!')
        }

        if (this.state.skills.length <= 0) {
            return this.notifyErr('please add skills!')
        }

        // if (!this.state.min ||  !this.state.max) {
        //     return this.notifyErr('please check min and max price value')
        // }

        if (!this.state.min || this.state.min < 0) {
            return this.notifyErr('please check price value')
        }

        if (!this.state.expectedDuration || this.state.expectedDuration < 0) {
            return this.notifyErr(`please check expected duration of ${displayNameSettings.service}`)
        }

        // if(!this.state.location.lat  || !this.state.location.lng){
        //     return this.notifyErr(`please check location`)
        // }

        // if (this.state.min > this.state.max) {
        //     return this.notifyErr('please check min and max price value')
        // }

        if (!this.state.selectedCurrency) {
            return this.notifyErr('please select Currency')
        }

        // if (!this.state.selectedPayType) {
        //     return this.notifyErr('please select Payment Type')
        // }

        // if (!this.state.selctedJobCategory) {
        //     return this.notifyErr('please select category')
        // }

        let lat = isNaN(parseInt(this.state.location.lat)) ? 0 : this.state.location.lat
        let lng = isNaN(parseInt(this.state.location.lng)) ? 0 : this.state.location.lng

        let body = {
            userId: ls.get('userId'),
            title: this.state.title || '',
            description: this.state.description || '',
            serviceLogo: {},
            serviceBg: {},
            files: [],
            skills: this.state.skills,
            paymentType: this.state.selectedPayType,
            priceRange: { min: this.state.min, max: this.state.max },
            currency: this.state.selectedCurrency,
            profession: this.state.professionSelected,
            jobCategory: this.state.selctedJobCategory,
            location: { lat, lng },
            address: this.state.address,
            expectedDuration: this.state.expectedDuration,
            view: '0',
            avgRating: "1",
            workingPref: this.state.selctedWorkingPref,
        }

        this.setState({ spinner: true })
        createService(body, (err, apiRes) => {
            console.log('createService apiResult :', err, apiRes)
            let res = apiRes

            if (err) {
                console.log(err);
                return this.notifySucc('something went wrong, please try again later.');
            }

            // SEND NOTIFICAITON
            if (res.serviceId) {
                let readedUsers = []
                readedUsers.push(ls.get('userId'))
                let notifiyBody = {
                    userId: ls.get('userId'),
                    type: 'service',
                    subtype: "create",
                    data: { skills: body.skills },
                    notificationTypeId: res.serviceId,
                    message: `${displayNameSettings.service}:${body.title} Created`,
                    status: "unread",
                    createrUserId: ls.get('userId'),
                    readedUsers: readedUsers
                }
                createNotification(notifiyBody, () => { })
            }

            let asignOpration = 0
            if (this.state.servicePicUpload) asignOpration++
            if (this.state.serviceBgPicUpload) asignOpration++
            if (this.state.filesUpload.length) asignOpration++
            let completeOp = 0
            //upload service picture
            if (this.state.servicePicUpload) {
                console.log('*****************please check')
                this.uploadServicePic(this.state.servicePicUpload, res, (errServicePic, servicePic) => {
                    console.log("error:", errServicePic, servicePic)
                    completeOp++

                    if (errServicePic) {
                        console.log('image upload fail!', errServicePic)
                        if (completeOp === asignOpration) {
                            console.log(`${displayNameSettings.service} created successfully!`)
                            this.notifySucc(`${displayNameSettings.service} created successfully!`)
                            setTimeout(() => {
                                this.setState({ spinner: false })
                                return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                            }, 2000)
                        }

                    } else {
                        //call patch serviceapi
                        let patchBody = { serviceLogo: servicePic }
                        console.log('patch :', patchBody)
                        patchService(res.serviceId, patchBody, (errPatch, resPatch) => {
                            if (errPatch) {
                                console.log('Error in upload service!')
                                if (completeOp === asignOpration) {
                                    console.log('service created successfully!')
                                    this.notifySucc(`${displayNameSettings.service} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                                    }, 2000)
                                }
                            } else {
                                if (completeOp === asignOpration) {
                                    console.log(`${displayNameSettings.service} created successfully!`)
                                    this.notifySucc(`${displayNameSettings.service} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                                    }, 2000)
                                }
                            }

                        })
                    }

                })
            }

            //upload bg service picture
            if (this.state.serviceBgPicUpload) {
                // console.log('serviceBgPicUpload');
                this.uploadBgServicPic(this.state.serviceBgPicUpload, res, (errBgServicePic, serviceBgPic) => {
                    completeOp++
                    if (errBgServicePic) {
                        console.log('background image upload fail!', errBgServicePic)
                        if (completeOp === asignOpration) {
                            console.log(`${displayNameSettings.service} created successfully!`)
                            this.notifySucc(`${displayNameSettings.service} created successfully!`)
                            setTimeout(() => {
                                this.setState({ spinner: false })
                                return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                            }, 2000)
                        }
                    } else {
                        //call patch serviceapi
                        let patchBody = { serviceBg: serviceBgPic }
                        console.log('patch :', patchBody)
                        patchService(res.serviceId, patchBody, (errPatch, resPatch) => {
                            if (errPatch) {
                                console.log('Error in upload service!')
                                if (completeOp === asignOpration) {
                                    console.log('service created successfully!')
                                    this.notifySucc(`${displayNameSettings.service} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                                    }, 2000)
                                }
                            } else {

                                // console.log('Service created successfully!',resPatch)
                                if (completeOp === asignOpration) {
                                    console.log('service created successfully!')
                                    this.notifySucc(`${displayNameSettings.service} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                                    }, 2000)
                                }
                            }
                        })
                    }
                })
            }

            //upload resource file
            if (this.state.filesUpload.length) {
                this.uploadResourceFiles(this.state.filesUpload, res, (errFile, files) => {
                    completeOp++
                    if (errFile) {
                        console.log('Resource files upload fail!', errFile)
                        if (completeOp === asignOpration) {
                            console.log('service created successfully!')
                            this.notifySucc(`${displayNameSettings.service} created successfully!`)
                            setTimeout(() => {
                                this.setState({ spinner: false })
                                return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                            }, 2000)
                        }
                    } else {
                        //call patch serviceapi
                        let patchBody = { files }
                        console.log('patch :', patchBody)
                        patchService(res.serviceId, patchBody, (errPatch, resPatch) => {
                            if (errPatch) {
                                console.log('Error in upload service!')
                                if (completeOp === asignOpration) {
                                    console.log('service created successfully!')
                                    this.notifySucc(`${displayNameSettings.service} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                                    }, 2000)
                                }
                            } else {
                                if (completeOp === asignOpration) {
                                    console.log('service created successfully!')
                                    this.notifySucc(`${displayNameSettings.service} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                                    }, 2000)
                                }
                            }
                        })
                    }

                })
            }

            if (completeOp === asignOpration) {
                console.log('Service created successfully!')
                this.notifySucc(`${displayNameSettings.service} created successfully!`)
                setTimeout(() => {
                    this.setState({ spinner: false })
                    return this.props.history.push(`/freelancer/service/${res.serviceId}?userType=creater`)
                }, 2000)
            }
        })
    }

    componentDidMount() {
        const userProfile = JSON.parse(ls.get('userProfile'))
        if(!userProfile.likedin){
            alert('please add linked Id in your profile to proceed!')
            return this.props.history.push(`/freelancer/profile_edit`)
        }

        this.setState({
            selectedPayType: PaymentTypes[0]['value'],
            selectedCurrency: Currency[0]['value'],
            selctedWorkingPref: Working_Preference[0]['value'],
        })
        var outputPic = document.getElementById('servicePic');
        outputPic.src = require("../../../assets/images/company-logo-05.png").default

        var outputBg = document.getElementById('BgServicePic');
        outputBg.src = require("../../../assets/images/job-category-04.jpg").default

    }

    render() {
        console.log('state:', this.state)

        const customStyles = {
            control: base => ({
                ...base,
                height: 48,
                minHeight: 48
            }),
            multiValue: (base, state) => {
                return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
            },
            multiValueLabel: (base, state) => {
                return state.data.isFixed
                    ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 4 }
                    : base;
            },
            multiValueRemove: (base, state) => {
                return state.data.isFixed ? { ...base, display: 'none' } : base;
            },
        };

        const filesUploaded = this.state.filesUpload.map(item => item.name).join(', ')
        const skills = this.state.skills.map((item, i) => {
            return (<span key={i} className='keyword'>
                <span onClick={() => {
                    let newSkills = this.state.skills
                    const index = newSkills.indexOf(item);
                    if (index > -1) {
                        newSkills.splice(index, 1);
                        this.setState({ skills: newSkills })
                    }

                }} key={i} className='keyword-remove' style={{ 'height': 'auto' }}></span>
                <span key={i} className='keyword-text'>{item}</span>
            </span>)
        })

        const isValidNewOption = (inputValue, selectValue) =>
            inputValue.length > 0 && selectValue.length < 3;

        const industrySelectedValues = Industry_sectors.filter(item => this.state.selctedJobCategory.includes(item.value))
        const professionSelectedValues = Profession.filter(item => this.state.professionSelected.includes(item.value))



        return (
            <Fragment>
                {/* <!-- Dashboard Container --> */}
                <div className="dashboard-container">
                    <LoadingOverlay
                        active={this.state.spinner}
                        spinner={<Spinner name="line-scale" color="white" />}
                        text={this.state.spinnerMsg}
                    >
                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        {/* Same as */}
                        <ToastContainer />
                        {/* <!-- Dashboard Content================================================== --> */}
                        <div className="dashboard-content-container" data-simplebar>
                            <div className="dashboard-content-inner" >

                                {/* <!-- Dashboard Headline --> */}
                                <div className="dashboard-headline">
                                    <h3>Create a {displayNameSettings.service}</h3>

                                    {/* <!-- Breadcrumbs --> */}
                                    <nav id="breadcrumbs" className="dark">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#">Dashboard</a></li>
                                            <li>Create {displayNameSettings.service}</li>
                                        </ul>
                                    </nav>
                                </div>

                                {/* <!-- Row --> */}
                                <div className="row">

                                    {/* <!-- Dashboard Box --> */}

                                    <div className="dashboard-box margin-top-0">

                                        {/* <!-- Headline --> */}
                                        <div className="headline">
                                            <h3><i className="icon-feather-folder-plus"></i> {displayNameSettings.service} Submission Form</h3>
                                        </div>

                                        <div className="content with-padding padding-bottom-10">
                                            <div style={{ width: "1400px" }}></div>
                                            <div className="row">

                                                <div className="col-xl-12">
                                                    <Accordion defaultActiveKey="0">
                                                        <Card>
                                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                              {/* <div>
                                                                <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/image.png"/></div>
                                                                <div style={{ display: "inline", padding: 5 }}><strong>Image & Job title</strong></div>
                                                              </div> */}

                                                              <div style={{ display: "flex" }} onClick={() => { this.setState({ eventKey: "0" }) }}>
                                                                    <div style={{ flexGrow: 1 }}>
                                                                    <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/image.png"/></div>
                                                                    <div style={{ display: "inline", padding: 5 }}><strong>Image & Job title</strong></div>
                                                                    </div>
                                                                    <div><h1>{this.state.eventKey === "0" ? "-" : "+"}</h1></div>
                                                                </div>

                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey="0">
                                                                <Card.Body>
                                                                    <div className="row" style={{ minHeight: "400px" }}>
                                                                        {/* service Picture */}
                                                                        <div className="col-xl-6">
                                                                            <div className="submit-field">
                                                                                <div className="uploadButton margin-top-30">
                                                                                    <input className="uploadButton-input" type="file" id="picupload" accept="image/png, image/jpeg" ref={picInputEl => (this.PicInputEl = picInputEl)} onChange={this.onPicSelected} />
                                                                                    <label className="uploadButton-button ripple-effect" htmlFor="picupload">{displayNameSettings.service} Picture</label>
                                                                                    <div style={{ borderStyle: 'outset', borderColor: '', margin: 5, padding: 5, borderWidth: 5 }}><img id="servicePic" style={{ maxWidth: 80, height: 80 }} alt="your image" /></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* Background picture */}
                                                                        <div className="col-xl-6">
                                                                            <div className="submit-field">
                                                                                <div className="uploadButton margin-top-30">
                                                                                    <input className="uploadButton-input" type="file" id="bgpicupload" accept="image/png, image/jpeg" ref={picInputEl => (this.PicInputEl = picInputEl)} onChange={this.onBgPicSelected} />
                                                                                    <label className="uploadButton-button ripple-effect" htmlFor="bgpicupload">Background Picture</label>
                                                                                    <div style={{ borderStyle: 'outset', borderColor: '', margin: 5, padding: 5, borderWidth: 5 }}><img id="BgServicePic" style={{ maxWidth: 80, height: 80 }} alt="your image" /></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-xl-12">
                                                                        <div className="col-xl-4">
                                                                            <div className="submit-field">
                                                                                <h5>Job Title</h5>
                                                                                <input type="text" value={this.state.title} onChange={this.onTitleChange} className="with-border" />
                                                                            </div>
                                                                        </div>
                                                                        </div>

                                                                        <div className="col-xl-12">
                                                                        <div className="col-xl-4">
                                                                            <div className="submit-field">
                                                                                <h5>Skills <span></span>  <i className="help-icon" data-tippy-placement="right" title="add atlease 3 skills"></i></h5>
                                                                                <div className="keywords-container">
                                                                                    <div className="keyword-input-container">
                                                                                        <input value={this.state.skillItem} onKeyUp={this.onKeyUp} onChange={this.skillItemChange} type="text" className="keyword-input with-border" placeholder="e.g. job title, responsibilites" />
                                                                                        <button onClick={this.OnSkillItemClicked} className="keyword-input-button ripple-effect"><i className="icon-material-outline-add"></i></button>
                                                                                    </div>
                                                                                    <div className="keywords-list" style={{ 'maxHeight': 'auto', 'height': 'auto' }}>
                                                                                        {skills}
                                                                                    </div>
                                                                                    <div className="clearfix"></div>
                                                                                </div>
                                                                                </div>
                                                                                </div>
                                                                        </div>

                                                                    </div></Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                        <Card>
                                                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                                              {/* <div>
                                                                <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/dotty/80/000000/experience-skill.png"/></div>
                                                                <div style={{ display: "inline", padding: 5 }}><strong>Profession & Skills</strong></div>
                                                              </div> */}

                                                              <div style={{ display: "flex" }} onClick={() => { this.setState({ eventKey: "1" }) }}>
                                                                    <div style={{ flexGrow: 1 }}>
                                                                    <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/dotty/80/000000/experience-skill.png"/></div>
                                                                    <div style={{ display: "inline", padding: 5 }}><strong>Profession & Skills</strong></div>
                                                                    </div>
                                                                    <div><h1>{this.state.eventKey === "1" ? "-" : "+"}</h1></div>
                                                                </div>

                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey="1">
                                                                <Card.Body>
                                                                    <div className="row" style={{ minHeight: "400px" }}>
                                                                        <div className="col-xl-12">
                                                                        <div className="col-xl-4">
                                                                            <div className="submit-field">
                                                                                <h5>Profession</h5>
                                                                                <Select
                                                                                    isValidNewOption={isValidNewOption}
                                                                                    components={{ Menu }}
                                                                                    onChange={this.onProfessionChanged}
                                                                                    closeMenuOnSelect={false}
                                                                                    isMulti
                                                                                    options={Profession}
                                                                                    value={professionSelectedValues}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        </div>


                                                                        <div className="col-xl-12">
                                                                        <div className="col-xl-4">
                                                                            <div className="submit-field">
                                                                                <h5>Industry</h5>
                                                                                <Select
                                                                                    isValidNewOption={isValidNewOption}
                                                                                    components={{ Menu }}
                                                                                    onChange={this.onJobCategoryChange}
                                                                                    closeMenuOnSelect={false}
                                                                                    isMulti
                                                                                    options={Industry_sectors}
                                                                                    value={industrySelectedValues}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                        <Card>
                                                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                                              {/* <div>
                                                                <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/dotty/80/000000/price-tag-euro.png"/></div>
                                                                <div style={{ display: "inline", padding: 5 }}><strong>Price, Currency & duration</strong></div>
                                                              </div> */}

                                                              <div style={{ display: "flex" }} onClick={() => { this.setState({ eventKey: "2" }) }}>
                                                                    <div style={{ flexGrow: 1 }}>
                                                                    <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/dotty/80/000000/price-tag-euro.png"/></div>
                                                                    <div style={{ display: "inline", padding: 5 }}><strong>Price, Currency & duration</strong></div>
                                                                    </div>
                                                                    <div><h1>{this.state.eventKey === "2" ? "-" : "+"}</h1></div>
                                                                </div>

                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey="2">
                                                                <Card.Body>
                                                                    <div className="row" style={{ minHeight: "400px" }}>
                                                                        <div className="col-xl-12">
                                                                        <div className="col-xl-4">
                                                                            <div className="submit-field">
                                                                                <h5>Currency</h5>
                                                                                <Select
                                                                                    placeholder="Select Payment Type"
                                                                                    value={Currency.find(obj => obj.value === this.state.selectedCurrency)}
                                                                                    options={Currency}
                                                                                    onChange={this.onCurrencyChange}
                                                                                    // onKeyDown={this.onCurrencyPressed}
                                                                                    // styles={customStyles}
                                                                                    isSearchable={true}
                                                                                />

                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-12">
                                                                        <div className="col-xl-4">
                                                                            <div className="submit-field">
                                                                                <h5>Price</h5>
                                                                                <div className="row">
                                                                                    <div className="col-xl-6">
                                                                                        <div className="input-with-icon">
                                                                                            <input value={this.state.min} onChange={this.handleMin} className="with-border" type="number" placeholder="Price" />
                                                                                            <i className="currency">{this.state.selectedCurrency}</i>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                        {/* expected duration */}
                                                                        <div className="col-xl-4">
                                                                            <div className="submit-field">
                                                                                <h5>Expected Duration</h5>
                                                                                <input type="number" value={this.state.expectedDuration} onChange={this.expectedDurationChange} className="with-border" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                        <Card>
                                                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                                            {/* <div>
                                                                <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/worldwide-location.png"/></div>
                                                                <div style={{ display: "inline", padding: 5 }}><strong>Location & work preference</strong></div>
                                                              </div> */}

                                                              <div style={{ display: "flex" }} onClick={() => { this.setState({ eventKey: "3" }) }}>
                                                                    <div style={{ flexGrow: 1 }}>
                                                                    <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/worldwide-location.png"/></div>
                                                                    <div style={{ display: "inline", padding: 5 }}><strong>Location & work preference</strong></div>
                                                                    </div>
                                                                    <div><h1>{this.state.eventKey === "3" ? "-" : "+"}</h1></div>
                                                                </div>

                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey="3">
                                                                <Card.Body> <div className="row" style={{ minHeight: "400px" }}>
                                                                    <div className="col-xl-12">
                                                                    <div className="col-xl-4">
                                                                        <div className="submit-field">
                                                                            <h5>Location</h5>
                                                                            <PlacesAutocomplete
                                                                                value={this.state.address}
                                                                                onChange={this.handleChange}
                                                                                onSelect={this.handleSelect}
                                                                            >
                                                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                                    <div>
                                                                                        <input
                                                                                            {...getInputProps({
                                                                                                placeholder: 'Search Places ...',
                                                                                                className: 'location-search-input',
                                                                                            })}
                                                                                        />
                                                                                        <div className="autocomplete-dropdown-container">
                                                                                            {loading && <div>Loading...</div>}
                                                                                            {suggestions.map(suggestion => {
                                                                                                const className = suggestion.active
                                                                                                    ? 'suggestion-item--active'
                                                                                                    : 'suggestion-item';
                                                                                                // inline style for demonstration purpose
                                                                                                const style = suggestion.active
                                                                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                                                return (
                                                                                                    <div
                                                                                                        {...getSuggestionItemProps(suggestion, {
                                                                                                            className,
                                                                                                            style,
                                                                                                        })}
                                                                                                    >
                                                                                                        <span>{suggestion.description}</span>
                                                                                                    </div>
                                                                                                );
                                                                                            })}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </PlacesAutocomplete>
                                                                        </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-xl-4">
                                                                        <div className="submit-field">
                                                                            <h5>Working Preference</h5>
                                                                            <Select
                                                                                placeholder="Select Preference"
                                                                                value={Working_Preference.find(obj => obj.value === this.state.selctedWorkingPref)}
                                                                                options={Working_Preference}
                                                                                onChange={this.onWorkPrefChange}
                                                                                // styles={customStyles}
                                                                                defaultValue={Working_Preference[0]}
                                                                                isSearchable={true}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div></Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                        <Card>
                                                            <Accordion.Toggle as={Card.Header} eventKey="4">
                                                            {/* <div>
                                                                <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/job.png"/></div>
                                                                <div style={{ display: "inline", padding: 5 }}><strong>Job description</strong></div>
                                                              </div> */}

                                                              <div style={{ display: "flex" }} onClick={() => { this.setState({ eventKey: "4" }) }}>
                                                                    <div style={{ flexGrow: 1 }}>
                                                                    <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/job.png"/></div>
                                                                <div style={{ display: "inline", padding: 5 }}><strong>Job description</strong></div>
                                                                    </div>
                                                                    <div><h1>{this.state.eventKey === "4" ? "-" : "+"}</h1></div>
                                                                </div>

                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey="4">
                                                                <Card.Body>
                                                                    <div className="row">
                                                                        <div className="col-xl-4">
                                                                            <div className="submit-field">
                                                                                <h5>Payment Type</h5>
                                                                                <Select
                                                                                    placeholder="Select Payment Type"
                                                                                    value={PaymentTypes.find(obj => obj.value === this.state.selectedPayType)}
                                                                                    options={PaymentTypes}
                                                                                    onChange={this.onPayTypesChange}
                                                                                    styles={customStyles}
                                                                                    isSearchable={false}
                                                                                />

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-12">
                                                                            <div className="submit-field">
                                                                                <h5>Job Description</h5>
                                                                                <textarea cols="30" rows="5" value={this.state.description} onChange={this.onDescriptionChange} className="with-border"></textarea>
                                                                                <div className="uploadButton margin-top-30">
                                                                                    <input className="uploadButton-input" type="file" id="fileupload" accept="image/*,application/pdf,video/*,text/plain,text/html,audio/*,.txt" multiple="multiple" ref={fileInputEl => (this.fileInputEl = fileInputEl)} onChange={() => this.onPhotoSelected(this.fileInputEl.files)} />
                                                                                    <label className="uploadButton-button ripple-effect" htmlFor="fileupload">Upload Files</label>
                                                                                    {filesUploaded}
                                                                                    <span className="uploadButton-file-name">Images or documents that might be helpful in describing your job</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>

                                                    </Accordion>
                                                </div>
                                                <div className="col-xl-12">
                                                    <button className="button ripple-effect big margin-top-30" onClick={this.handleService}><i className="icon-feather-plus"></i>Create a {displayNameSettings.service}</button>
                                                &nbsp;<button className="button dark big margin-top-30" > Cancel</button>
                                                </div>

                                                <div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Row / End --> */}

                                    {/* <!-- Footer --> */}
                                    <div className="dashboard-footer-spacer"></div>
                                    {/* <!-- Footer / End --> */}

                                </div>
                            </div>
                            {/* <!-- Dashboard Content / End --> */}

                        </div>

                    </LoadingOverlay>
                </div>
                {/* <!-- Dashboard Container / End --> */}
            </Fragment >);
    }
}
