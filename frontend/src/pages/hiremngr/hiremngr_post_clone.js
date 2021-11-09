import ls from 'local-storage'
import React, { Fragment } from 'react';
import request from 'superagent';
import { CSVReader } from 'react-papaparse'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Select,{components} from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay'
import { WorkingHours } from './components'
import { createPost, patchPost, getPostById, createNotification } from '../../Actions';
import { Industry_sectors,Profession, Currency, jobTypes } from '../../utility/master_data'
import config from '../../config'
const {displayNameSettings, cloudinary} = config
const { apiUrl, uploadPreset } = cloudinary
var Spinner = require('react-spinkit');

const PaymentTypes = [

    {
        label: 'Hourly',
        value: 'hourly'
    }
]

const Working_Preference = [
    {
        label: 'zoom',
        value: 'zoom'
    }
]

const initialValue = {
    mon: { start: 0, end: 82800 },
    tue: { start: 0, end: 82800 },
    wed: { start: 0, end: 82800 },
    thu: { start: 0, end: 82800 },
    fri: { start: 0, end: 82800 },
    sat: { start: 0, end: 82800 },
    sun: { start: 0, end: 82800 }
}

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

export class HiremngrPostClone extends React.Component {

    constructor() {
        super();
        this.state = {
            postLogo: {},
            postBg: {},

            postPicUpload: null, //temparary store pics
            postBgPicUpload: null, //temparary store bg pics
            filesUpload: [], //tempalrary store files
            uploadedResourceFiles: [],// resource files uploaded need to call update post api
            title: '',
            description: '',
            skillItem: '', //need for ui skills input
            files: [],
            skills: [],
            selectedPayType: '',
            selectedJobType: '',
            professionSelected: [],
            selctedJobCategory: [],
            selectedCurrency: '',
            selctedWorkingPref: '',
            min: '',
            max: '',
            expectedDuration: '',
            location: {},
            questionnaire: [],
            questionnaireSelected: false,
            passingQuesCount:"",
            address: '', //for google location
            spinner: false,
            spinnerMsg: `Please wait, ${displayNameSettings.service} creating...`,
            workingHours: initialValue,
            NoOfWeeks: 1,
        };

        this.photoId = 1;
        this.files = [];
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onPayTypesChange = this.onPayTypesChange.bind(this)
        this.onPriceRangeChange = this.onPriceRangeChange.bind(this)
        this.onJobTypeChange = this.onJobTypeChange.bind(this)
        this.onWorkPrefChange = this.onWorkPrefChange.bind(this)
        this.onProfessionChanged = this.onProfessionChanged.bind(this)
        // this.onProfessionKeyPressed =this.onProfessionKeyPressed.bind(this)
        this.onCurrencyPressed = this.onCurrencyPressed.bind(this)
        this.onJobCategoryChange = this.onJobCategoryChange.bind(this)
        this.handleQuesnre = this.handleQuesnre.bind(this)
        this.onPicSelected = this.onPicSelected.bind(this)
        this.onBgPicSelected = this.onBgPicSelected.bind(this)
        this.skillItemChange = this.skillItemChange.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.OnSkillItemClicked = this.OnSkillItemClicked.bind(this)
        this.onCurrencyChange = this.onCurrencyChange.bind(this)
        // this.handleMax = this.handleMax.bind(this)
        // this.handleMin = this.handleMin.bind(this)
        this.expectedDurationChange = this.expectedDurationChange.bind(this)
        this.setWorkingHoursDetails = this.setWorkingHoursDetails.bind(this)
        this.setNoOfWeek = this.setNoOfWeek.bind(this)
        this.passingQuesChange = this.passingQuesChange.bind(this)
        this.onJobCategoryPressed = this.onJobCategoryPressed.bind(this)
        this.getClonedPostDetails = this.getClonedPostDetails.bind(this)
        this.handlePost = this.handlePost.bind(this)
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

    setWorkingHoursDetails(workingHours) {
        this.setState({
            workingHours,
        })
    }

    onWorkPrefChange(e){
        this.setState({ selctedWorkingPref: e.value })
    }

    setNoOfWeek(NoOfWeeks) {
        this.setState({
            NoOfWeeks,
        })
    }

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

    passingQuesChange(e){
        this.setState({ passingQuesCount: e.target.value });
    };

    //project duration
    expectedDurationChange(e) {

        this.setState({ expectedDuration: e.target.value });
    };

    //address and location selection google map
    handleSelect = address => {
        // console.log(address)
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({ location: latLng, address })

                console.log('Success', latLng)
            })
            .catch(error => {
                this.setState({ location: { lat: '', lng: '' } })
                console.error('Error', error)
            });
    };

    skillItemChange(e) {
        this.setState({ skillItem: e.target.value })
    }

    onKeyUp(event) {
        if (event.key === 'Enter') {
            if(this.state.skills.length>49)return alert('More than 50 skills not allowed!')
            if(this.state.skillItem.trim() && this.state.skills.indexOf(this.state.skillItem.toLowerCase())===-1){
                this.setState({ skills: [...this.state.skills, this.state.skillItem.toLowerCase()], skillItem: '' })
            }
        }
      }

    onProfessionChanged(value, { action, removedValue }) {

        if((value?value:[]).length>3){
            return this.notifyErr('3 professions allow!')
        }
        let profession = (value?value:[]).map(item=>{
            return item.value
        })

        this.setState({ professionSelected: profession })
    }

    // onProfessionKeyPressed(e) {
    //     let PressChar = String.fromCharCode(e.keyCode);
    //     var letters = /^[A-Za-z]+$/;

    //     if(PressChar.match(letters)){
    //         let selectedItem = Profession.filter((item)=>{
    //             if(item.value[0]===PressChar){
    //                 return item.value
    //             }
    //         })
    //         this.setState({ professionSelected: selectedItem[0].value })
    //     }
    // }

    onJobCategoryChange(value, { action, removedValue }) {

        if((value?value:[]).length>3){
            return this.notifyErr('3 Job Categories allow!')
        }
        let jobcategory = (value?value:[]).map(item=>{
            return item.value
        })
        console.log(jobcategory.join(','))
        this.setState({ selctedJobCategory: jobcategory })
    }

    onCurrencyPressed(e) {
        let PressChar = String.fromCharCode(e.keyCode);
        var letters = /^[A-Za-z]+$/;

        if(PressChar.match(letters)){
            let selectedItem = Currency.filter((item)=>{
                if(item.value[0]===PressChar){
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
        if(this.state.skills.length>49)return alert('More than 50 skills not allowed!')
        if(this.state.skillItem.trim() && this.state.skills.indexOf(this.state.skillItem.toLowerCase())===-1){
            this.setState({ skills: [...this.state.skills, this.state.skillItem.toLowerCase()], skillItem: '' })
        }
    }

    //questionary
    handleQuestionnaireDrop = (data) => {
        console.log('questionanry---------------------------')
        console.log(data)
        let questionnaire = data.map((item, i) => item.data)
        let quesArr = []
        for (let i = 0; i < questionnaire.length; i++) {
            if (i !== 0) {
                let row = questionnaire[i]
                console.log(row)
                let obj = {}
                row.forEach((item, j) => {
                    obj[questionnaire[0][j]] = row[j]
                })
                quesArr.push(obj)
            }
        }
        this.setState({ questionnaire: quesArr })
    }

    handleQuestionnaireError = (err, file, inputElem, reason) => {
        console.log(err)
        this.setState({ questionnaire: [] })
    }

    handleQuestionnaireRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
        this.setState({ questionnaire: [] })
    }
    //end questionary

    onTitleChange(e) {
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

    onJobTypeChange(e) {
        this.setState({ selectedJobType: e.value })
    }

    onJobCategoryPressed(e) {
        let PressChar = String.fromCharCode(e.keyCode);
        var letters = /^[A-Za-z]+$/;

        if(PressChar.match(letters)){
            let selectedItem = Profession.filter((item)=>{
                if(item.value[0]===PressChar){
                    return item.value
                }
            })
            this.setState({ professionSelected: selectedItem[0].value })
        }
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

    uploadResourceFiles(files, post, cb) {
        let fileUploadedCount = 0
        for (let file of files) {

            const fileName = file.name
            request.post(apiUrl)
                .field('file', file)
                .field('upload_preset', uploadPreset)
                .field('folder', `/jugaad/post/${post.postId}/resource`)
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

    //post pic
    onPicSelected(e) {
        let file = e.target.files[0]
        this.setState({ postPicUpload: file })

        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('postPic');
            output.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        return
    }

    uploadPostPic(file, post, cb) {
        const fileName = post.postId

        request.post(apiUrl)
            .field('file', file)
            .field('upload_preset', uploadPreset)
            .field('public_id', 'logo-' + post.postId)
            .field('folder', `/jugaad/post/${post.postId}`)
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
                let postPic = {
                    publicId: newResponse.public_id,
                    url: newResponse.url,
                    format: newResponse.format,
                    fileName: fileName
                }
                return cb(null, postPic)
            });
    }
    //end post pic

    //post bg Pic

    onBgPicSelected(e) {
        let file = e.target.files[0]
        this.setState({ postBgPicUpload: file })

        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('bgpostPic');
            output.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        return
    }

    uploadBgPostPic(file, post, cb) {
        const fileName = post.postId

        request.post(apiUrl)
            .field('file', file)
            .field('upload_preset', uploadPreset)
            .field('public_id', 'bg-' + post.postId)
            .field('folder', `/jugaad/post/${post.postId}`)
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
                let postBgPic = {
                    publicId: newResponse.public_id,
                    url: newResponse.url,
                    format: newResponse.format,
                    fileName: fileName
                }
                return cb(null, postBgPic)
            });
    }
    //end post pic

    handleQuesnre() {
        if (this.state.questionnaireSelected) {
            this.setState({ questionnaireSelected: false })
        } else {
            this.setState({ questionnaireSelected: true })
        }

    }


    handlePost(e) {
        e.preventDefault()
        
        if (!this.state.title) {
            return this.notifyErr('Title can not be blank!')
        }

        if (!this.state.description) {
            return this.notifyErr('Description must have 100 charactors can not be blank!')
        }

        if (this.state.skills.length <= 0) {
            return this.notifyErr('please add skills!')
        }

        if(!this.state.location.lat  || !this.state.location.lng){
            return this.notifyErr(`please check location`)
        }

        if (this.state.questionnaireSelected && (this.state.questionnaire <= 0)) {
            return this.notifyErr('Please upload the questionnaire else uncheck the questionnaire!')
        }

        if (this.state.questionnaireSelected && (this.state.passingQuesCount===""|| isNaN(this.state.passingQuesCount))) {
            return this.notifyErr('please provide questionaire passing question count!')
        }

        if (!this.state.selectedCurrency) {
            return this.notifyErr('please select Currency')
        }

        if (!this.state.selectedPayType) {
            return this.notifyErr('please select Payment Type')
        }

        if (!this.state.selctedJobCategory) {
            return this.notifyErr('please select category')
        }

        if (this.state.NoOfWeeks <= 0) {
            return this.notifyErr('No of week must be greater thatn 0')
        }

        if (Object.keys(this.state.workingHours).length <= 0) {
            return this.notifyErr('select atleast one day in week for working')
        }

        this.setState({ spinner: true })
        let body = {
            userId: ls.get('userId'),
            title: this.state.title,
            description: this.state.description,
            postLogo: this.state.postLogo || {},
            postBg: this.state.postBg || {},
            files: [],
            skills: this.state.skills,
            paymentType: this.state.selectedPayType,
            priceRange: { min: this.state.min, max: this.state.max },
            currency: this.state.selectedCurrency,
            profession: this.state.professionSelected,
            NoOfWeeks: this.state.NoOfWeeks.toString(),
            workingHours:this.state.workingHours,
            jobCategory: this.state.selctedJobCategory,
            location: this.state.location,
            address: this.state.address,
            expectedDuration: this.state.expectedDuration,
            view: '0',
            avgRating: "1",
            questionnaire: this.state.questionnaire,
            questionnaireSelected: this.state.questionnaireSelected,
            passingQuesCount:(this.state.passingQuesCount?(this.state.passingQuesCount).toString():'0'),
            workingPref: this.state.selctedWorkingPref
        }

        createPost(body, (err, apiRes) => {
            let res = apiRes

            if (err) {
                alert(err);
                return;
            }

            // SEND NOTIFICAITON
            if(res.postId){
                let readedUsers = []
                readedUsers.push(ls.get('userId'))
                let notifiyBody = {
                    userId:ls.get('userId'),
                    type:'post',
                    subtype:"create",
                    data:{skills:body.skills},
                    notificationTypeId:res.postId,
                    message:`${displayNameSettings.post}:${body.title} Created`,
                    status:"unread",
                    createrUserId:ls.get('userId'),
                    readedUsers:readedUsers
                }
                createNotification(notifiyBody,()=>{})
            }
            
            let asignOpration = 0
            if (this.state.postPicUpload) asignOpration++
            if (this.state.postBgPicUpload) asignOpration++
            if (this.state.filesUpload.length) asignOpration++

            let comleteOpration = 0
            //upload post picture
            if (this.state.postPicUpload) {
                this.uploadPostPic(this.state.postPicUpload, res, (errPostPic, postPic) => {
                    comleteOpration++

                    if (errPostPic) {
                        console.log('image upload fail!', errPostPic)
                        if (comleteOpration === asignOpration) {
                            console.log(`${displayNameSettings.post} created successfully!`)
                            this.notifySucc(`${displayNameSettings.post} created successfully!`)
                            setTimeout(() => {
                                this.setState({ spinner: false })
                                return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
                            }, 2000)
                        }

                    } else {
                        //call patch postapi
                        let patchBody = { postLogo: postPic }
                        console.log('patch :', patchBody)
                        patchPost(res.postId, patchBody, (errPatch, resPatch) => {
                            if (errPatch) {
                                console.log('Error in upload post!')
                                if (comleteOpration === asignOpration) {
                                    console.log(`${displayNameSettings.post} created successfully!`)
                                    this.notifySucc(`${displayNameSettings.post} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
                                    }, 2000)
                                }
                            } else {
                                if (comleteOpration === asignOpration) {
                                    console.log(`${displayNameSettings.post} created successfully!`)
                                    this.notifySucc(`${displayNameSettings.post} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
                                    }, 2000)
                                }
                            }

                        })
                    }

                })
            }

            //upload bg post picture
            if (this.state.postBgPicUpload) {
                // console.log('postBgPicUpload');
                this.uploadBgPostPic(this.state.postBgPicUpload, res, (errBgPostPic, postBgPic) => {
                    comleteOpration++
                    if (errBgPostPic) {
                        console.log('background image upload fail!', errBgPostPic)
                        if (comleteOpration === asignOpration) {
                            console.log(`${displayNameSettings.post} created successfully!`)
                            this.notifySucc(`${displayNameSettings.post} created successfully!`)
                            setTimeout(() => {
                                this.setState({ spinner: false })
                                return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
                            }, 2000)
                        }
                    } else {
                        //call patch postapi
                        let patchBody = { postBg: postBgPic }
                        console.log('patch :', patchBody)
                        patchPost(res.postId, patchBody, (errPatch, resPatch) => {
                            if (errPatch) {
                                console.log('Error in upload post!')
                                if (comleteOpration === asignOpration) {
                                    console.log(`${displayNameSettings.post} created successfully!`)
                                    this.notifySucc(`${displayNameSettings.post} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
                                    }, 2000)
                                }
                                // return
                            } else {
                                if (comleteOpration === asignOpration) {
                                    console.log(`${displayNameSettings.post} created successfully!`)
                                    this.notifySucc(`${displayNameSettings.post} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
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
                    comleteOpration++
                    if (errFile) {
                        console.log('Resource files upload fail!', errFile)
                        if (comleteOpration === asignOpration) {
                            console.log(`${displayNameSettings.post} created successfully!`)
                            this.notifySucc(`${displayNameSettings.post} created successfully!`)
                            setTimeout(() => {
                                this.setState({ spinner: false })
                                return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
                            }, 2000)
                        }
                    } else {
                        //call patch postapi
                        let patchBody = { files }
                        console.log('patch :', patchBody)
                        patchPost(res.postId, patchBody, (errPatch, resPatch) => {
                            if (errPatch) {
                                console.log('Error in upload post!')
                                if (comleteOpration === asignOpration) {
                                    console.log(`${displayNameSettings.post} created successfully!`)
                                    this.notifySucc(`${displayNameSettings.post} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
                                    }, 2000)
                                }
                            } else {
                                if (comleteOpration === asignOpration) {
                                    console.log(`${displayNameSettings.post} created successfully!`)
                                    this.notifySucc(`${displayNameSettings.post} created successfully!`)
                                    setTimeout(() => {
                                        this.setState({ spinner: false })
                                        return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
                                    }, 2000)
                                }
                            }

                            // alert(`${displayNameSettings.post} created successfully!`,resPatch)
                            // return
                        })
                    }

                })
            }

            if (comleteOpration === asignOpration) {
                console.log(`${displayNameSettings.post} created successfully!`)
                this.notifySucc(`${displayNameSettings.post} created successfully!`)
                setTimeout(() => {
                    this.setState({ spinner: false })
                    return this.props.history.push(`/hiremngr/post/${res.postId}?userType=creater`)
                }, 2000)
            }
        })
    }

    getClonedPostDetails() {
        getPostById(this.props.match.params.postId, {}, (err, res) => {

            if (err) {
                console.log('getClonedPostDetails :', err, res)
                return
            }

            if (res.postId) {
                this.setState({
                    postPicUpload: null,
                    postBgPicUpload: null,
                    filesUpload: [],
                    uploadedResourceFiles: [],// resource files uploaded need to call update post api
                    postLogo: res.postLogo || {},
                    postBg: res.postBg || {},
                    title: res.title || '',
                    description: res.description || '',
                    files: res.files || [],
                    skills: res.skills || [],
                    selectedPayType: res.paymentType || '',
                    selectedJobType: res.jobType || '',
                    professionSelected: res.profession || [],
                    selctedJobCategory: res.jobCategory || [],
                    selectedCurrency: res.currency || '',                    
                    selctedWorkingPref: res.workingPref || '',
                    min: res.priceRange.min,
                    max: res.priceRange.max,
                    expectedDuration: res.expectedDuration,
                    location: res.location,
                    address: res.address,
                    questionnaire: res.questionnaire,
                    questionnaireSelected: res.questionnaireSelected ? res.questionnaireSelected : false,
                    passingQuesCount:res.passingQuesCount || '',
                    spinner: false,
                    spinnerMsg: `Please wait, ${displayNameSettings.service} creating...`,
                    workingHours: initialValue,
                    NoOfWeeks: 1,
                });
            }


        })
    }

    componentDidMount() {
        this.getClonedPostDetails();

        this.setState({
            selectedPayType: PaymentTypes[0]['value'],
            selectedJobType: jobTypes[0]['value'],
            selctedWorkingPref:Working_Preference[0]['value'],
            selectedCurrency: Currency[0]['value'],
        })

        setTimeout(()=>{
            var output = document.getElementById('postPic');
        output.src = this.state.postLogo.url || 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg';

        var output = document.getElementById('bgpostPic');
        output.src = this.state.postBg.url || 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/post-background_wd2tbh.jpg';
        },2000)
        

    }

    render() {
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

        const industrySelectedValues = Industry_sectors.filter(item=>this.state.selctedJobCategory.includes(item.value))
        const  professionSelectedValues= Profession.filter(item=>this.state.professionSelected.includes(item.value))
        

        // const currencyOptions = Currency.map((item, i) => {
        //     // console.log('check:', item.value === this.state.selectedCurrency)
        //     return <option value={item.value} key={i} >{item.label}</option>
        // })

        // const payTypesOptions = PaymentTypes.map((item, i) => {
        //     // console.log('check:', item.value === this.state.selectedPayType)
        //     return <option value={item.value} key={i} >{item.label}</option>
        // })

        // const jobCategoryOptions = Industry_sectors.map((item, i) => {
        //     // console.log('check:', item.value === this.state.selctedJobCategory)
        //     return <option value={item.value} key={i} ></option>
        // })

        // const jobTypesOptions = jobTypes.map((item, i) => {
        //     // console.log('check:', item.value === this.state.selectedJobType)
        //     return <option value={item.value} key={i} >{item.label}</option>
        // })


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
                        {/* <!-- Dashboard Content================================================== --> */}
                        <div className="dashboard-content-container" data-simplebar>
                            <div className="dashboard-content-inner" >

                                {/* <!-- Dashboard Headline --> */}
                                <div className="dashboard-headline">
                                    <h3>Clone {displayNameSettings.post}</h3>

                                    {/* <!-- Breadcrumbs --> */}
                                    <nav id="breadcrumbs" className="dark">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#">Dashboard</a></li>
                                            <li>Clone {displayNameSettings.post}</li>
                                        </ul>
                                    </nav>
                                </div>

                                {/* <!-- Row --> */}
                                <div className="row">

                                    {/* <!-- Dashboard Box --> */}

                                    <div className="dashboard-box margin-top-0">

                                        {/* <!-- Headline --> */}
                                        <div className="headline">
                                            <h3><i className="icon-feather-folder-plus"></i> Please review and clone the {displayNameSettings.post}</h3>
                                        </div>

                                        <div className="content with-padding padding-bottom-10">
                                            <div className="row">
                                                {/* post Picture */}
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <div className="uploadButton margin-top-30">
                                                            <input className="uploadButton-input" type="file" id="picupload" accept="image/png, image/jpeg" ref={picInputEl => (this.PicInputEl = picInputEl)} onChange={this.onPicSelected} />
                                                            <label className="uploadButton-button ripple-effect" htmlFor="picupload">{displayNameSettings.post} Picture</label>
                                                            <img id="postPic" style={{ maxWidth: 80, height: 80 }} alt="your image" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Background picture */}
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <div className="uploadButton margin-top-30">
                                                            <input className="uploadButton-input" type="file" id="bgpicupload" accept="image/png, image/jpeg" ref={picInputEl => (this.PicInputEl = picInputEl)} onChange={this.onBgPicSelected} />
                                                            <label className="uploadButton-button ripple-effect" htmlFor="bgpicupload">Background Picture</label>
                                                            <img id="bgpostPic" style={{ maxWidth: 80, height: 80 }} alt="your image" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Job Title</h5>
                                                        <input type="text" value={this.state.title} onChange={this.onTitleChange} className="with-border" />
                                                    </div>
                                                </div>

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
                                                        {/* <select className="selectpicker with-border" onChange={this.onPayTypesChange} >
                                                        {payTypesOptions}
                                                    </select> */}
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Currency</h5>
                                                        <Select
                                                            placeholder="Select Payment Type"
                                                            value={Currency.find(obj => obj.value === this.state.selectedCurrency)}
                                                            options={Currency}
                                                            onChange={this.onCurrencyChange}
                                                            styles={customStyles}
                                                            isSearchable={false}
                                                        />
                                                        {/* <select className="selectpicker with-border" onChange={this.onCurrencyChange}>
                                                        {currencyOptions}
                                                    </select> */}
                                                    </div>
                                                </div>

                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Skills <span></span>  <i className="help-icon" data-tippy-placement="right" title="add atlease 3 skills"></i></h5>
                                                        <div className="keywords-container">
                                                            <div className="keyword-input-container">
                                                                <input value={this.state.skillItem} onChange={this.skillItemChange} type="text" className="keyword-input with-border" placeholder="e.g. job title, responsibilites" />
                                                                <button onClick={this.OnSkillItemClicked} className="keyword-input-button ripple-effect"><i className="icon-material-outline-add"></i></button>
                                                            </div>
                                                            <div className="keywords-list" style={{ 'maxHeight': 'auto', 'height': 'auto' }}>
                                                                {skills}
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* working hours */}
                                                <div className="col-xl-12">
                                                    <WorkingHours setWorkingHoursDetails={this.setWorkingHoursDetails} setNoOfWeek={this.setNoOfWeek} />
                                                </div>

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

                                                        // placeholder="Select Category"
                                                        // isMulti
                                                        // value={Industry_sectors.find(obj => obj.value === this.state.selctedJobCategory)}
                                                        // options={Industry_sectors}
                                                        // className="basic-multi-select"
                                                        // isValidNewOption={isValidNewOption}
                                                        // components={{ Menu }}
                                                        // onChange={this.onJobCategoryChange}
                                                        // styles={customStyles}
                                                        // isSearchable={false}
                                                    />
                                                    </div>
                                                </div>

                                                {/* expected duration */}
                                                {/* <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Expected Duration</h5>
                                                        <input type="text" value={this.state.expectedDuration} onChange={this.expectedDurationChange} className="with-border" />
                                                    </div>
                                                </div> */}

                                                {/* <div className="col-xl-4">
                                                <div className="submit-field">
                                                    <h5>Job Type</h5>
                                                    <Select
                                                        placeholder="Select Category"
                                                        value={jobTypes.find(obj => obj.value === this.state.selectedJobType)}
                                                        options={jobTypes}
                                                        onChange={this.onJobTypeChange}
                                                        styles={customStyles}
                                                        isSearchable={false}
                                                    />
                                                    
                                                </div>
                                            </div> */}
                                            
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

                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Working Preference</h5>
                                                        <Select
                                                            placeholder="Select Preference"
                                                            value={Working_Preference.find(obj => obj.value === this.state.selctedWorkingPref)}
                                                            options={Working_Preference}
                                                            onChange={this.onWorkPrefChange}
                                                            styles={customStyles}
                                                            isSearchable={false}
                                                            defaultValue={Working_Preference[0]}
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

                                                {this.state.questionnaireSelected && <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <CSVReader
                                                            onDrop={this.handleQuestionnaireDrop}
                                                            onError={this.handleQuestionnaireError}
                                                            addRemoveButton
                                                            onRemoveFile={this.handleQuestionnaireRemoveFile}
                                                        >
                                                            <span>Drop CSV file here or click to upload.</span>
                                                        </CSVReader>
                                                    </div>
                                                    <div className="single-page-section">
                                                        <h3>Download Sample Questionnaire csv</h3>
                                                        <div className="attachments-container">
                                                            <a href="https://res.cloudinary.com/dkydl3enp/raw/upload/v1603222837/jugaad/questionnaire/questionnaire_nf0zpk.csv" className="attachment-box ripple-effect"><span>Questionnaire</span><i>CSV</i></a>
                                                        </div>
                                                    </div>
                                                </div>}

                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <div className="checkbox">
                                                            <input type="checkbox" onChange={this.handleQuesnre} id="chekcbox1" checked={this.state.questionnaireSelected} />
                                                            <label for="chekcbox1"><span className="checkbox-icon"></span> Check to add questionary!</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.questionnaireSelected &&<div className="col-xl-4">
                                                    <div className="submit-field">
                                                    <input value={this.state.passingQuesCount} onChange={this.passingQuesChange}  className="with-border" type="number" placeholder="Passing question counts" />
                                                    </div>
                                                </div>}

                                                <div className="col-xl-12">
                                                    <button className="button ripple-effect big margin-top-30" onClick={this.handlePost}><i className="icon-feather-plus"></i> Clone {displayNameSettings.post}</button>
                                                &nbsp;<button onClick={() => this.props.history.push('/freelancer/posts')} className="button dark big margin-top-30" > Cancel</button>
                                                </div>

                                                <div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Row / End --> */}

                                    {/* <!-- Footer --> */}
                                    <div className="dashboard-footer-spacer"></div>
                                    <div className="small-footer margin-top-15">
                                        <div className="small-footer-copyrights">
                                            © 2021 <strong>jobviously</strong>. All Rights Reserved.
				                    </div>
                                        <ul className="footer-social-links">
                                            <li>
                                                <a href="#" title="Facebook" data-tippy-placement="top">
                                                    <i className="icon-brand-facebook-f"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="Twitter" data-tippy-placement="top">
                                                    <i className="icon-brand-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="Google Plus" data-tippy-placement="top">
                                                    <i className="icon-brand-google-plus-g"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="LinkedIn" data-tippy-placement="top">
                                                    <i className="icon-brand-linkedin-in"></i>
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="clearfix"></div>
                                    </div>
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
