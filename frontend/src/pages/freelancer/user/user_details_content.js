import React, { Fragment } from 'react'
import GoogleMapReact from 'google-map-react';
import { UserProposalRequest, UserProposalStatus, UserActivePostDetails } from './index'
import config from '../../../config'
const { baseFrontenUrl = '',displayNameSettings, googlemap = { key: '' } } = config

// const AnyReactComponent = ({ text }) => <div className="marker-container no-marker-icon ">'+
// '<div className="marker-card">'+
//    '<div className="front face">' + {text} + '</div>'+
//    '<div className="marker-arrow"></div>'+
// '</div>'+
// '</div>;

const AnyReactComponent = ({ text }) => <div style={{width:"fit-content", fontWeight:'bold',color:'blue'}} >{text}</div>

export class UserDetailsContent extends React.Component {
    constructor() {
        super();
        this.state = {
            bidAmount: '',
            bidDays: '',
            bidMessage: '',
            currentProposalStatus: 'not-send',
        }
    }

    // static defaultProps = {
    //     center: {
    //         lat: 59.95,
    //         lng: 30.33
    //     },
    //     zoom: 11
    // };

    render() {  
        const mystyle = {
            border: "1px solid #dddddd",
            textAlign: "left",
            padding: "8px"
        }
        let {
            about,
            files,
            subSkill,
            location = {
                "lat": 0,
                "lng": 0
            },
            address='',
            questionnaireSelected = '',
        } = this.props.userData


        const { userType = 'guest' } = this.props

        //all suportive document for the project
        let supportDoc = (files || []).map((item, i) => {
            return <div><a key={i} href={item.url} download>{item.fileName}</a></div>
        })
        // console.log('user type***********',userType)
        if (userType === 'creater') {
            return (
                <div className="col-xl-8 col-lg-8 content-right-offset">

                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">About me</h3>
                        <p><span>{about}</span></p>
                    </div>
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Supporting Documents</h3>
                        {supportDoc}
                    </div>

                    {/* <div className="single-page-section"> */}
                    {/* <div className="col-xl-8 col-lg-8 offset-xl-2 offset-lg-2"> */}

                    {/* <section id="contact" className="margin-bottom-60"> */}
                    {/* <h3 className="headline margin-top-15 margin-bottom-35">Sent your Request</h3> */}

                    {/* <div className="row">
                                        <div className="col-md-6">
                                            <div className="">
                                                <input className="with-border" value={this.state.bidAmount} onChange={this.bidAmountChange} name="name" type="text" id="name" placeholder="Your Amount" required="required" />
                                            </div>
                                        </div>
    
                                        <div className="col-md-6">
                                            <div className="">
                                                <input className="with-border" value={this.state.bidDays} onChange={this.bidDaysChange} name="email" type="email" id="email" placeholder="Days" pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$" required="required" />
                                                
                                            </div>
                                        </div>
                                    </div> */}

                    {/* <div className="input-with-icon-left">
                                    <input className="with-border" name="subject" type="text" id="subject" placeholder="Subject" required="required" />
                                    <i className="icon-material-outline-assignment"></i>
                                    </div> */}

                    {/* <div>
                                        <textarea value={this.state.bidMessage} onChange={this.bidMessageChange} className="with-border" name="comments" cols="40" rows="5" id="comments" placeholder="Message" spellcheck="true" required="required"></textarea>
                                    </div>
    
                                    <button className="submit button margin-top-15" id="submit" onClick={this.handleBidRequest} > Send Request</button> */}

                    {/* </section> */}

                    {/* </div> */}
                    {/* </div> */}



                    <div className="single-page-section">
                        <div className="margin-bottom-30" style={{ height: '340px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={googlemap.key}
                                defaultCenter={{
                                    lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                                    lng: parseInt(location.lng) ? parseInt(location.lng) : 0
                                }}
                                center={{
                                    lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                                    lng: parseInt(location.lng) ? parseInt(location.lng) : 0
                                }}
                                defaultZoom={9}
                            >
                                <AnyReactComponent
                                    lat={location.lat}
                                    lng={location.lng}
                                    text={address}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>


                </div>
            )
        }
        else if (userType === 'user') {
            return (
                <div className="col-xl-8 col-lg-8 content-right-offset">

                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">About</h3>
                        <p>{about}</p>
                    </div>
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Supporting Documents</h3>
                        {supportDoc}
                    </div>
                    {/* handle proposal */}
                    <div className='row'>
                        {/* <UserProposalRequest userData={this.props.userData}/> */}
                        {/* <UserProposalStatus userData={this.props.userData}/> */}

                    </div>

                    <div className="single-page-section">
                        <div className="margin-bottom-30" style={{ height: '340px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={googlemap.key}
                                defaultCenter={{
                                    lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                                    lng: parseInt(location.lng) ? parseInt(location.lng) : 0
                                }}
                                center={{
                                    lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                                    lng: parseInt(location.lng) ? parseInt(location.lng) : 0
                                }}
                                defaultZoom={4}
                            >
                                <AnyReactComponent
                                    lat={location.lat}
                                    lng={location.lng}
                                    text={address}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>

                    <div className="single-page-section">
                    
                    <div ><UserActivePostDetails {...this.props} /></div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="col-xl-8 col-lg-8 content-right-offset">

                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">About</h3>
                        <p>{about}</p>
                    </div>
                </div>
            )
        }


    }
}