import React from 'react'
import GoogleMapReact from 'google-map-react';
import { ServiceProposalRequest, ServiceProposalStatus } from './index'
import config from '../../../config'
const { googlemap = { key: '' } } = config

const AnyReactComponent = ({ text }) => <div style={{width:"fit-content", fontWeight:'bold',color:'blue'}} >{text}</div>

export class ServiceDetailsContent extends React.Component {
    constructor() {
        super();
        this.state = {
            bidAmount: '',
            bidDays: '',
            bidMessage: '',
            currentProposalStatus: 'not-send',
        }
    }

    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {

        let {
            description,
            files,
            location = {
                "lat": '',
                "lng": ''
            },
            address = '',
        } = this.props.serviceData


        const { userType = 'guest' } = this.props

        //all suportive document for the project
        let supportDoc = (files || []).map((item, i) => {
            return <div><a key={i} href={item.url} download>{item.fileName}</a></div>
        })
        if (userType === 'creater') {
            return (
                <div className="col-xl-8 col-lg-8 content-right-offset">

                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Job Description</h3>
                        <p>{description}</p>
                    </div>
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Supporting Documents</h3>
                        {supportDoc}
                    </div>
                    <div className="single-page-section">
                        <div className="margin-bottom-30" style={{ height: '340px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={googlemap.key}
                                defaultCenter={{
                                    lat: location.lat,
                                    lng: location.lng
                                }}
                                defaultZoom={11}
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
                        <h3 className="margin-bottom-25">Job Description</h3>
                        <p>{description}</p>
                    </div>
                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Supporting Documents</h3>
                        {supportDoc}
                    </div>
                    {/* handle proposal */}
                    <div className='row'>
                        <ServiceProposalRequest {...this.props} serviceData={this.props.serviceData} />
                        <ServiceProposalStatus {...this.props} serviceData={this.props.serviceData} />

                    </div>
                    <div className="single-page-section">
                        <div className="margin-bottom-30" style={{ height: '340px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={googlemap.key}
                                defaultCenter={{
                                    lat: location.lat,
                                    lng: location.lng
                                }}
                                defaultZoom={11}
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

                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="col-xl-8 col-lg-8 content-right-offset">

                    <div className="single-page-section">
                        <h3 className="margin-bottom-25">Job Description</h3>
                        <p>{description}</p>
                    </div>
                </div>
            )
        }
    }
}