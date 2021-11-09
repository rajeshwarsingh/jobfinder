import ls from "local-storage";
import React, { Fragment } from "react";
import request from "superagent";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Select, { components } from "react-select";
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { Accordion, Card } from "react-bootstrap";
import { patchUser, getUserById, setUserDetails } from "../../../Actions";
import {
  Industry_sectors,
  Profession,
  Nationality,
  Currency,
  jobTypes,
  PaymentTypes,
} from "../../../utility/master_data";
import config from "../../../config";
const { apiUrl, uploadPreset } = config.cloudinary;
var Spinner = require("react-spinkit");

const Menu = (props) => {
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

export class FreelancerProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      about: "",
      rate: "",
      rateTypeSelected: "",
      skills: [],
      skillItem: "", //need for ui skills input
      nationalitySelected: "",
      location: { lat: 0, lng: 0 },
      professionSelected: [],
      selctedJobCategory: [],
      empTypeSelected: "",
      senioritySelected: "",
      handleProfile: "",
      files: [],
      pic: {},
      userPicUpload: null,
      userBgPicUpload: null,
      filesUpload: [],
      uploadedResourceFiles: [], // resource files uploaded need to call update user api
      selectedPayType: "",
      selectedJobType: "",
      selectedCurrency: "",
      address: "", //for google location,
      spinner: false,
      spinnerMsg: "Please wait updating your profile...",
      userLogo: "",
      linkedin: "",
      eventKey: "0"
    };

    this.photoId = 1;
    this.files = [];
    this.pic = {};
    this.onNationalityChanged = this.onNationalityChanged.bind(this);
    this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
    this.onLastNameChanged = this.onLastNameChanged.bind(this);
    this.onAboutChanged = this.onAboutChanged.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
    this.onRateChanged = this.onRateChanged.bind(this);
    this.onJobCategoryChange = this.onJobCategoryChange.bind(this);
    this.onNationalityPressed = this.onNationalityPressed.bind(this);
    this.onJobRateTypeChanged = this.onJobRateTypeChanged.bind(this);
    this.skillItemChange = this.skillItemChange.bind(this);
    this.OnSkillItemClicked = this.OnSkillItemClicked.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onLocationChanged = this.onLocationChanged.bind(this);
    this.onProfessionChanged = this.onProfessionChanged.bind(this);
    this.onPicSelected = this.onPicSelected.bind(this);
    this.onBgPicSelected = this.onBgPicSelected.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.onlinkedinChanged = this.onlinkedinChanged.bind(this);
  }

  notifyErr = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  notifySucc = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  onlinkedinChanged(e) {
    this.setState({ linkedin: e.target.value });
  }
  onNationalityChanged(e) {
    this.setState({ nationalitySelected: e.value });
  }

  onFirstNameChanged(e) {
    this.setState({ firstName: e.target.value });
  }

  onLastNameChanged(e) {
    console.log(e.target.value);
    this.setState({ lastName: e.target.value });
  }

  onAboutChanged(e) {
    this.setState({ about: e.target.value });
  }

  onCurrencyChange(e) {
    this.setState({ selectedCurrency: e.value });
  }

  onRateChanged(e) {
    if (parseInt(e.target.value) > 100) {
      return alert("Hourly rate can not be greater than 100");
    }
    this.setState({ rate: e.target.value });
  }

  onJobRateTypeChanged(e) {
    this.setState({ rateTypeSelected: e.value });
  }

  skillItemChange(e) {
    this.setState({ skillItem: e.target.value });
  }

  OnSkillItemClicked() {
    if (this.state.skills.length > 49)
      return alert("More than 50 skills not allowed!");
    if (
      this.state.skillItem.trim() &&
      this.state.skills.indexOf(this.state.skillItem.toLowerCase()) === -1
    ) {
      this.setState({
        skills: [...this.state.skills, this.state.skillItem.toLowerCase()],
        skillItem: "",
      });
    }
  }

  onKeyUp(event) {
    if (event.key === "Enter") {
      if (this.state.skills.length > 49)
        return alert("More than 50 skills not allowed!");
      if (
        this.state.skillItem.trim() &&
        this.state.skills.indexOf(this.state.skillItem.toLowerCase()) === -1
      ) {
        this.setState({
          skills: [...this.state.skills, this.state.skillItem.toLowerCase()],
          skillItem: "",
        });
      }
    }
  }

  onLocationChanged(e) {
    this.setState({ location: e.target.value });
  }

  onProfessionChanged(value, { action, removedValue }) {
    if ((value ? value : []).length > 3) {
      return this.notifyErr("3 professions allow!");
    }
    let profession = (value ? value : []).map((item) => {
      return item.value;
    });

    this.setState({ professionSelected: profession });
  }

  onJobCategoryChange(value, { action, removedValue }) {
    if ((value ? value : []).length > 3) {
      return this.notifyErr("3 Job Categories allow!");
    }
    let jobCategory = (value ? value : []).map((item) => {
      return item.value;
    });

    this.setState({ selctedJobCategory: jobCategory });
  }

  onNationalityPressed(e) {
    let PressChar = String.fromCharCode(e.keyCode);
    var letters = /^[A-Za-z]+$/;

    if (PressChar.match(letters)) {
      let selectedItem = Nationality.filter((item) => {
        if (item.value[0] === PressChar) {
          return item.value;
        }
      });
      this.setState({ nationalitySelected: selectedItem[0].value });
    }
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  //address and location selection google map
  handleSelect = (address) => {
    console.log(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({ location: latLng, address });
      })
      .catch((error) => {
        this.setState({ location: { lat: "", lng: "" } });
      });
  };

  // suporting files
  onPhotoSelected(files) {
    let allFiles = [];
    for (let file of files) {
      allFiles.push(file);
    }
    this.setState({ filesUpload: allFiles });
    return;
  }

  uploadResourceFiles(files, user, cb) {
    let fileUploadedCount = 0;
    for (let file of files) {
      const fileName = file.name;
      request
        .post(apiUrl)
        .field("file", file)
        .field("upload_preset", uploadPreset)
        .field("folder", `/jugaad/user/${user.userId}/resource`)
        .field("multiple", true)
        // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
        // .field('context', title ? `photo=${title}` : '')
        // .on('progress', (progress) => this.onPicUploadProgress(fileName, progress))
        .end((error, response) => {
          fileUploadedCount++;
          if (error) {
            return cb(error);
          }

          let newResponse = response.body;
          let uploadedResourceFile = {
            publicId: newResponse.public_id,
            url: newResponse.url,
            format: newResponse.format,
            fileName: fileName,
          };

          this.setState({
            uploadedResourceFiles: [
              ...this.state.uploadedResourceFiles,
              uploadedResourceFile,
            ],
          });
          if (files.length === fileUploadedCount) {
            return cb(null, this.state.uploadedResourceFiles);
          }
        });
    }
  }
  //end supporting files

  //User pic
  onPicSelected(e) {
    let file = e.target.files[0];
    if (file.size > 11000000) return alert("Size must be less than 11MB!");

    this.setState({ userPicUpload: file });

    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("userPic");
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    return;
  }

  uploadUserPic(file, user, cb) {
    const fileName = user.userId;
    console.log("***apiUrl:", apiUrl);
    request
      .post(apiUrl)
      .field("file", file)
      .field("upload_preset", uploadPreset)
      .field("public_id", "logo-" + user.userId)
      .field("folder", `/jugaad/user/${user.userId}`)
      // .field('use_filename', true)
      // .field('unique_filename', true)
      .field("resource_type", "image")
      // .field('overwrite', true)
      .field("multiple", false)
      // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
      // .field('context', title ? `photo=${title}` : '')
      // .on('progress', (progress) => this.onPicUploadProgress(fileName, progress))
      .end((error, response) => {
        console.log("error in upload sercie pic:", error, response);
        if (error) {
          return cb(error);
        }
        let newResponse = response.body;
        let userPic = {
          publicId: newResponse.public_id,
          url: newResponse.url,
          format: newResponse.format,
          fileName: fileName,
        };
        return cb(null, userPic);
      });
  }
  //end user pic

  //user bg Pic

  onBgPicSelected(e) {
    let file = e.target.files[0];
    if (file.size > 11000000) return alert("Size must be less than 11MB!");
    this.setState({ userBgPicUpload: file });

    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("BgUserPic");
      output.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    return;
  }

  uploadBgServicPic(file, user, cb) {
    const fileName = user.usertId;

    request
      .post(apiUrl)
      .field("file", file)
      .field("upload_preset", uploadPreset)
      .field("public_id", "bg-" + user.usertId)
      .field("folder", `/jugaad/user/${user.userId}`)
      // .field('use_filename', true)
      // .field('unique_filename', true)
      .field("resource_type", "image")
      // .field('overwrite', true)
      .field("multiple", false)
      // .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
      // .field('context', title ? `photo=${title}` : '')
      // .on('progress', (progress) => this.onPicUploadProgress(fileName, progress))
      .end((error, response) => {
        if (error) {
          return cb(error);
        }
        let newResponse = response.body;
        let userBgPic = {
          publicId: newResponse.public_id,
          url: newResponse.url,
          format: newResponse.format,
          fileName: fileName,
        };
        return cb(null, userBgPic);
      });
  }
  //end user pic

  handleProfile(e) {
    e.preventDefault();

    // if (!this.state.nationalitySelected) {
    //     this.notifyErr('please provide nationality.')
    //     return
    // }

    if (!this.state.firstName) {
      this.notifyErr("please provide first name");
      return;
    }

    if (!this.state.lastName) {
      this.notifyErr("please provide last name");
      return;
    }

    // if(this.state.location.lat)

    // if(!this.state.location.lat  || !this.state.location.lng){
    //     return this.notifyErr(`please check location!`)
    // }

    if (!this.state.selectedCurrency) {
      alert("plese select Currency");
      return;
    }

    // if (!this.state.rate) {
    //     this.notifyErr('please provide your rate')
    //     return
    // }

    // if (!this.state.rateTypeSelected) {
    //     this.notifyErr('please select rate per hours or fix')
    //     return
    // }

    // if (this.state.skills.length <= 0) {
    //     alert('please add skills!', this.state.title)
    //     return
    // }

    // if(!this.state.location.lat  || !this.state.location.lng){
    //     return this.notifyErr(`please check location`)
    // }

    this.setState({ spinner: true });

    let lat = isNaN(parseInt(this.state.location.lat))
      ? 0
      : this.state.location.lat;
    let lng = isNaN(parseInt(this.state.location.lng))
      ? 0
      : this.state.location.lng;

    let body = {
      userId: ls.get("userId"),
      userLogo: this.state.userLogo || {},
      userBg: this.state.userBg || {},
      files: this.state.files || [],
      nationality: this.state.nationalitySelected,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      about: this.state.about,
      likedin: this.state.linkedin,
      currency: this.state.selectedCurrency,
      rate: this.state.rate,
      rateType: this.state.rateTypeSelected,
      skills: this.state.skills,
      location: { lat, lng },
      address: this.state.address,
      profession: this.state.professionSelected,
      jobCategory: this.state.selctedJobCategory,
    };

    console.log("body :", body);

    patchUser(ls.get("userId"), body, (err, apiRes) => {
      console.log("createUser apiResult :", err, apiRes);

      if (err) {
        alert(err);
        return;
      }

      //UPDATE PROFILE
      setUserDetails(body.userId, () => { });

      let res = { userId: apiRes };
      console.log(
        "check condition:",
        this.state.userPicUpload,
        this.state.userBgPicUpload,
        this.state.filesUpload.length
      );
      let asignOpration = 0;
      if (this.state.userPicUpload) asignOpration++;
      if (this.state.userBgPicUpload) asignOpration++;
      if (this.state.filesUpload.length) asignOpration++;
      let completeOp = 0;
      //upload user picture
      if (this.state.userPicUpload) {
        console.log("*****************please check");
        this.uploadUserPic(
          this.state.userPicUpload,
          res,
          (errUserPic, userPic) => {
            console.log("error:", errUserPic, userPic);
            completeOp++;

            if (errUserPic) {
              console.log("image upload fail!", errUserPic);
              if (completeOp === asignOpration) {
                console.log("user created successfully!");
                this.notifySucc("Profile successfully updated!");
                setTimeout(() => {
                  this.setState({ spinner: false });
                  return this.props.history.push(
                    `/freelancer/search_details/${ls.get(
                      "userId"
                    )}?userType=creater`
                  );
                }, 2000);
              }
            }
            //call patch userapi
            let patchBody = { userLogo: userPic };
            console.log("patch :", patchBody);
            patchUser(res.userId, patchBody, (errPatch, resPatch) => {
              if (errPatch) {
                console.log("Error in upload user!");
                if (completeOp === asignOpration) {
                  console.log("user created successfully!");
                  this.notifySucc("Profile successfully updated!");
                  setTimeout(() => {
                    this.setState({ spinner: false });
                    return this.props.history.push(
                      `/freelancer/search_details/${ls.get(
                        "userId"
                      )}?userType=creater`
                    );
                  }, 2000);
                }
              }
              if (completeOp === asignOpration) {
                console.log("user created successfully!");
                this.notifySucc("Profile successfully updated!");
                setTimeout(() => {
                  this.setState({ spinner: false });
                  return this.props.history.push(
                    `/freelancer/search_details/${ls.get(
                      "userId"
                    )}?userType=creater`
                  );
                }, 2000);
              }
            });
          }
        );
      }

      //upload bg user picture
      if (this.state.userBgPicUpload) {
        // console.log('userBgPicUpload');
        this.uploadBgServicPic(
          this.state.userBgPicUpload,
          res,
          (errBgUserPic, userBgPic) => {
            completeOp++;
            if (errBgUserPic) {
              console.log("background image upload fail!", errBgUserPic);
              if (completeOp === asignOpration) {
                console.log("user created successfully!");
                this.notifySucc("Profile successfully updated!");
                setTimeout(() => {
                  this.setState({ spinner: false });
                  return this.props.history.push(
                    `/freelancer/search_details/${ls.get(
                      "userId"
                    )}?userType=creater`
                  );
                }, 2000);
              }
            }

            //call patch userapi
            let patchBody = { userBg: userBgPic };
            console.log("patch :", patchBody);
            patchUser(res.userId, patchBody, (errPatch, resPatch) => {
              if (errPatch) {
                console.log("Error in upload user!");
                if (completeOp === asignOpration) {
                  console.log("user created successfully!");
                  this.notifySucc("Profile successfully updated!");
                  setTimeout(() => {
                    this.setState({ spinner: false });
                    return this.props.history.push(
                      `/freelancer/search_details/${ls.get(
                        "userId"
                      )}?userType=creater`
                    );
                  }, 2000);
                }
                // return
              }
              if (completeOp === asignOpration) {
                console.log("user created successfully!");
                this.notifySucc("Profile successfully updated!");
                setTimeout(() => {
                  this.setState({ spinner: false });
                  return this.props.history.push(
                    `/freelancer/search_details/${ls.get(
                      "userId"
                    )}?userType=creater`
                  );
                }, 2000);
              }
              // return
            });
          }
        );
      }

      //upload resource file
      if (this.state.filesUpload) {
        this.uploadResourceFiles(
          this.state.filesUpload,
          res,
          (errFile, files) => {
            completeOp++;
            if (errFile) {
              console.log("Resource files upload fail!", errFile);
              if (completeOp === asignOpration) {
                console.log("user created successfully!");
                this.notifySucc("Profile successfully updated!");
                setTimeout(() => {
                  this.setState({ spinner: false });
                  return this.props.history.push(
                    `/freelancer/search_details/${ls.get(
                      "userId"
                    )}?userType=creater`
                  );
                }, 2000);
              }
            }

            let patchBody = { files: [...files, ...this.state.files] };
            console.log("patch :", patchBody);
            patchUser(res.userId, patchBody, (errPatch, resPatch) => {
              if (errPatch) {
                console.log("Error in upload user!");
                this.notifySucc("Profile successfully updated!");
                setTimeout(() => {
                  this.setState({ spinner: false });
                  return this.props.history.push(
                    `/freelancer/search_details/${ls.get(
                      "userId"
                    )}?userType=creater`
                  );
                }, 2000);
              }
              if (completeOp === asignOpration) {
                console.log("user created successfully!");
                this.notifySucc("Profile successfully updated!");
                setTimeout(() => {
                  this.setState({ spinner: false });
                  return this.props.history.push(
                    `/freelancer/search_details/${ls.get(
                      "userId"
                    )}?userType=creater`
                  );
                }, 2000);
              }
            });
          }
        );
      }

      if (completeOp === asignOpration) {
        console.log("user created successfully!");
        this.notifySucc("Profile successfully updated!");
        setTimeout(() => {
          this.setState({ spinner: false });
          return this.props.history.push(
            `/freelancer/search_details/${ls.get("userId")}?userType=creater`
          );
        }, 2000);
      }
    });
  }

  componentDidMount() {
    let userId = ls.get("userId");

    getUserById(userId, {}, (err, res) => {
      console.log("createJob result :", err, res);

      if (err || (res && res.error)) {
        alert(err || (res && res.error && res.error.message));
        return;
      }

      this.setState({
        email: res.email || "",
        firstName: res.firstName || "",
        lastName: res.lastName || "",
        about: res.about || "",
        rate: res.rate || "",
        rateTypeSelected: res.rateType || "",
        skills: res.skills || [],
        nationalitySelected: res.nationality || "",
        location: res.location || this.state.location,
        address: res.address || this.state.address,
        professionSelected: res.profession || [],
        selctedJobCategory: res.jobCategory || [],
        empTypeSelected: res.empType || "",
        senioritySelected: res.seniority || "",
        files: res.files || "",
        userLogo: res.userLogo || "",
        userBg: res.userBg,
        pic: res.pic || "",
        selectedPayType: PaymentTypes[0]["value"] || "",
        selectedJobType: jobTypes[0]["value"] || "",
        selectedCurrency: Currency[0]["value"] || "",
        linkedin: res.linkedin || "",
      });

      var outputPic = document.getElementById("userPic");
      outputPic.src = require("../../../assets/images/user-avatar-placeholder.png").default;
      if (res && res.userLogo.url) outputPic.src = res.userLogo.url;

      var BgUserPic = document.getElementById("BgUserPic");
      BgUserPic.src = require("../../../assets/images/job-category-04.jpg").default;
      if (res && res.userBg && res.userBg.url) BgUserPic.src = res.userBg.url;
    });
  }

  render() {
    const customStyles = {
      control: (base) => ({
        ...base,
        height: 48,
        minHeight: 48,
      }),
      multiValue: (base, state) => {
        return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
      },
      multiValueLabel: (base, state) => {
        return state.data.isFixed
          ? { ...base, fontWeight: "bold", color: "white", paddingRight: 4 }
          : base;
      },
      multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: "none" } : base;
      },
    };

    let filesUploaded = this.state.filesUpload
      .map((item) => item.name)
      .join(", ");
    filesUploaded = [
      ...filesUploaded,
      ...[
        (Array.isArray(this.state.files) ? this.state.files : [])
          .map((item) => item.fileName)
          .join(", "),
      ],
    ];
    const allSkills = this.state.skills.map((item, i) => {
      return (
        <span key={i} className="keyword">
          <span
            onClick={() => {
              let newSkills = this.state.skills;
              const index = newSkills.indexOf(item);
              if (index > -1) {
                newSkills.splice(index, 1);
                this.setState({ skills: newSkills });
              }
            }}
            key={i}
            className="keyword-remove"
            style={{ height: "auto" }}
          ></span>
          <span key={i} className="keyword-text">
            {item}
          </span>
        </span>
      );
    });

    const isValidNewOption = (inputValue, selectValue) =>
      inputValue.length > 0 && selectValue.length < 3;

    const industrySelectedValues = Industry_sectors.filter((item) =>
      this.state.selctedJobCategory.includes(item.value)
    );
    const professionSelectedValues = Profession.filter((item) =>
      this.state.professionSelected.includes(item.value)
    );

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
              <div className="dashboard-content-inner">
                {/* <!-- Dashboard Headline --> */}
                <div className="dashboard-headline">
                  <h3>Edit profile</h3>
                  {/* <!-- Breadcrumbs --> */}
                  <nav id="breadcrumbs" className="dark">
                    <ul>
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">Dashboard</a>
                      </li>
                      <li>Edit profile</li>
                    </ul>
                  </nav>
                </div>

                {/* <!-- Row --> */}
                <div className="row">
                  {/* <!-- Dashboard Box --> */}

                  <div className="dashboard-box margin-top-0">
                    {/* <!-- Headline --> */}
                    <div className="headline">
                      <h3>
                        <i className="icon-feather-folder-plus"></i> Edit
                        Profile Form
                      </h3>
                    </div>

                    <div className="content with-padding padding-bottom-10">
                      <div style={{ width: "1400px" }}></div>
                      <div className="row">
                        <Accordion defaultActiveKey="0">
                          <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                              {/* <div>
                                <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/information.png" /></div>
                                <div style={{ display: "inline", padding: 5 }}><strong>Basic Information</strong></div>
                              </div> */}

                              <div style={{ display: "flex" }} onClick={() => { this.setState({ eventKey: "0" }) }}>
                                  <div style={{ flexGrow: 1 }}>
                                  <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/information.png" /></div>
                                  <div style={{ display: "inline", padding: 5 }}><strong>Basic Information</strong></div>
                                  </div>
                                  <div><h1>{this.state.eventKey === "0" ? "-" : "+"}</h1></div>
                              </div>

                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                <div
                                  // style={{ minHeight: "400px" }}
                                  className="row"
                                >
                                  {/* user Picture */}
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <div className="uploadButton margin-top-30">
                                        <input
                                          className="uploadButton-input"
                                          type="file"
                                          id="picupload"
                                          accept="image/png, image/jpeg"
                                          ref={(picInputEl) =>
                                            (this.PicInputEl = picInputEl)
                                          }
                                          onChange={this.onPicSelected}
                                        />
                                        <label
                                          className="uploadButton-button ripple-effect"
                                          htmlFor="picupload"
                                        >
                                          User Picture
                                        </label>
                                        {/* <img id="userPic" style={{ maxWidth: 80, height: 80 }} alt="your image" /> */}
                                        <div
                                          style={{
                                            borderStyle: "outset",
                                            borderColor: "",
                                            margin: 5,
                                            padding: 5,
                                            borderWidth: 5,
                                          }}
                                        >
                                          <img
                                            id="userPic"
                                            style={{ maxWidth: 80, height: 80 }}
                                            alt="your image"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Background picture */}
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <div className="uploadButton margin-top-30">
                                        <input
                                          className="uploadButton-input"
                                          type="file"
                                          id="bgpicupload"
                                          accept="image/png, image/jpeg"
                                          ref={(picInputEl) =>
                                            (this.PicInputEl = picInputEl)
                                          }
                                          onChange={this.onBgPicSelected}
                                        />
                                        <label
                                          className="uploadButton-button ripple-effect"
                                          htmlFor="bgpicupload"
                                        >
                                          Background Picture
                                        </label>
                                        <div
                                          style={{
                                            borderStyle: "outset",
                                            borderColor: "",
                                            margin: 5,
                                            padding: 5,
                                            borderWidth: 5,
                                          }}
                                        >
                                          <img
                                            id="BgUserPic"
                                            style={{ maxWidth: 80, height: 80 }}
                                            alt="background"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  // style={{ minHeight: "400px" }}
                                  className="row"
                                >
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>First Name</h5>
                                      <input
                                        type="text"
                                        value={this.state.firstName}
                                        onChange={this.onFirstNameChanged}
                                        className="with-border"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>Last Name</h5>
                                      <input
                                        type="text"
                                        name="company"
                                        value={this.state.lastName}
                                        onChange={this.onLastNameChanged}
                                        className="with-border"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  // style={{ minHeight: "400px" }}
                                  className="row"
                                >
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>Email</h5>
                                      <input
                                        type="text"
                                        value={this.state.email}
                                        disabled
                                        className="with-border"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>LinkedIn</h5>
                                      <input
                                        type="text"
                                        value={this.state.linkedin}
                                        onChange={this.onlinkedinChanged}
                                        className="with-border"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>

                          <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                              {/* <div>
                                <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/about.png" /></div>
                                <div style={{ display: "inline", padding: 5 }}><strong>About</strong></div>
                              </div> */}

                              <div style={{ display: "flex" }} onClick={() => { this.setState({ eventKey: "1" }) }}>
                                  <div style={{ flexGrow: 1 }}>
                                  <div style={{ display: "inline" }}><img width="40" src="https://img.icons8.com/carbon-copy/100/000000/about.png" /></div>
                                <div style={{ display: "inline", padding: 5 }}><strong>About</strong></div>
                                  </div>
                                  <div><h1>{this.state.eventKey === "1" ? "-" : "+"}</h1></div>
                              </div>

                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                              <Card.Body>
                                <div
                                  style={{ minHeight: "400px" }}
                                  className="row"
                                >
                                  <div className="col-xl-12">
                                    <div className="submit-field">
                                      <h5>About Me</h5>
                                      <textarea
                                        cols="30"
                                        rows="5"
                                        value={this.state.about}
                                        onChange={this.onAboutChanged}
                                        className="with-border"
                                      ></textarea>
                                      <div className="uploadButton margin-top-30">
                                        <input
                                          className="uploadButton-input"
                                          type="file"
                                          id="fileupload"
                                          accept="image/*,application/pdf,video/*,text/plain,text/html,audio/*"
                                          multiple="multiple"
                                          ref={(fileInputEl) =>
                                            (this.fileInputEl = fileInputEl)
                                          }
                                          onChange={() =>
                                            this.onPhotoSelected(
                                              this.fileInputEl.files
                                            )
                                          }
                                        />
                                        <label
                                          className="uploadButton-button ripple-effect"
                                          htmlFor="fileupload"
                                        >
                                          Upload Documents
                                        </label>
                                        <div>
                                          {filesUploaded
                                            ? filesUploaded
                                            : "documents that might be helpful for your profile"}
                                        </div>
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
                                <div style={{ display: "inline" }}> <img width="40" src="https://img.icons8.com/carbon-copy/100/000000/worldwide-location.png" /></div>
                                <div style={{ display: "inline", padding: 5 }}> <strong> Currency, Nationality & Location </strong> </div>
                              </div> */}

                              <div style={{ display: "flex" }} onClick={() => { this.setState({ eventKey: "2" }) }}>
                                  <div style={{ flexGrow: 1 }}>
                                  <div style={{ display: "inline" }}> <img width="40" src="https://img.icons8.com/carbon-copy/100/000000/worldwide-location.png" /></div>
                                <div style={{ display: "inline", padding: 5 }}> <strong> Currency, Nationality & Location </strong> </div>
                                  </div>
                                  <div><h1>{this.state.eventKey === "2" ? "-" : "+"}</h1></div>
                              </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                              <Card.Body>
                                <div
                                  style={{ minHeight: "300px" }}
                                  className="row"
                                >
                                  <div className="col-xl-12">
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>Nationality</h5>
                                      <Select
                                        placeholder="Select Nationality"
                                        defaultValue={Nationality[0]}
                                        value={Nationality.find(
                                          (obj) =>
                                            obj.value ===
                                            this.state.nationalitySelected
                                        )}
                                        options={Nationality}
                                        onChange={this.onNationalityChanged}
                                        isSearchable={true}
                                      />
                                    </div>
                                  </div>
                                  </div>
                                  <div className="col-xl-12">
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>Currency</h5>
                                      <Select
                                        placeholder="Select Category"
                                        value={Currency.find(
                                          (obj) =>
                                            obj.value ===
                                            this.state.selectedCurrency
                                        )}
                                        options={Currency}
                                        onChange={this.onCurrencyChange}
                                        // styles={customStyles}
                                        isSearchable={true}
                                      />
                                    </div>
                                  </div>
                                  </div>

                                  <div className="col-xl-12">
                                  <div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>Location</h5>
                                      <PlacesAutocomplete
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        onSelect={this.handleSelect}
                                      >
                                        {({
                                          getInputProps,
                                          suggestions,
                                          getSuggestionItemProps,
                                          loading,
                                        }) => (
                                          <div>
                                            <input
                                              {...getInputProps({
                                                placeholder:
                                                  "Search Places ...",
                                                className:
                                                  "location-search-input",
                                              })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                              {loading && <div>Loading...</div>}
                                              {suggestions.map((suggestion) => {
                                                const className = suggestion.active
                                                  ? "suggestion-item--active"
                                                  : "suggestion-item";
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                  ? {
                                                    backgroundColor:
                                                      "#fafafa",
                                                    cursor: "pointer",
                                                  }
                                                  : {
                                                    backgroundColor:
                                                      "#ffffff",
                                                    cursor: "pointer",
                                                  };
                                                return (
                                                  <div
                                                    {...getSuggestionItemProps(
                                                      suggestion,
                                                      {
                                                        className,
                                                        style,
                                                      }
                                                    )}
                                                  >
                                                    <span>
                                                      {suggestion.description}
                                                    </span>
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
                                </div>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>

                          <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                              {/* <div>
                                <div style={{ display: "inline" }}>
                                  <img
                                    width="40"
                                    src="https://img.icons8.com/dotty/80/000000/experience-skill.png"
                                  />
                                </div>
                                <div style={{ display: "inline", padding: 5 }}>
                                  <strong>
                                    Skills, Profession & Job Categories
                                  </strong>
                                </div>
                              </div> */}

                              <div style={{ display: "flex" }} onClick={() => { this.setState({ eventKey: "3" }) }}>
                                  <div style={{ flexGrow: 1 }}>
                                  <div style={{ display: "inline" }}>
                                  <img
                                    width="40"
                                    src="https://img.icons8.com/dotty/80/000000/experience-skill.png"
                                  />
                                </div>
                                <div style={{ display: "inline", padding: 5 }}>
                                  <strong>
                                    Skills, Profession & Job Categories
                                  </strong>
                                </div>
                                  </div>
                                  <div><h1>{this.state.eventKey === "3" ? "-" : "+"}</h1></div>
                              </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                              <Card.Body>
                                <div
                                  style={{ minHeight: "300px" }}
                                  className="row"
                                >
                                  <div className="col-xl-12">
                                    </div><div className="col-xl-4">
                                    <div className="submit-field">
                                      <h5>
                                        Skills <span></span>{" "}
                                        <i
                                          className="help-icon"
                                          data-tippy-placement="right"
                                          title="add atlease 3 skills"
                                        ></i>
                                      </h5>
                                      <div className="keywords-container">
                                        <div className="keyword-input-container">
                                          <input
                                            value={this.state.skillItem}
                                            onKeyUp={this.onKeyUp}
                                            onChange={this.skillItemChange}
                                            type="text"
                                            className="keyword-input with-border"
                                            placeholder="e.g. c++, js"
                                          />
                                          <button
                                            onClick={this.OnSkillItemClicked}
                                            className="keyword-input-button ripple-effect"
                                          >
                                            <i className="icon-material-outline-add"></i>
                                          </button>
                                        </div>
                                        <div
                                          className="keywords-list"
                                          style={{
                                            maxHeight: "auto",
                                            height: "auto",
                                          }}
                                        >
                                          {allSkills}
                                        </div>
                                        <div className="clearfix"></div>
                                      </div>
                                    </div>
                                    </div>
                                  </div>
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
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                        <div className="col-xl-12">
                          <button
                            className="button ripple-effect big margin-top-30"
                            onClick={this.handleProfile}
                          >
                            <i className="icon-feather-plus"></i> Save
                          </button>
                          &nbsp;
                          <button
                            onClick={() =>
                              this.props.history.push(
                                `/freelancer/search_details/${ls.get(
                                  "userId"
                                )}?userType=creater`
                              )
                            }
                            className="button dark big margin-top-30"
                          >
                            {" "}
                            Cancel
                          </button>
                        </div>

                        <div></div>
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
                        <a
                          href="#"
                          title="Google Plus"
                          data-tippy-placement="top"
                        >
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
      </Fragment>
    );
  }
}
