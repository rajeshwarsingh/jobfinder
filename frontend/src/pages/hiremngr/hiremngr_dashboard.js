import ls from 'local-storage'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import qs from 'qs'
import { Accordion, Card } from 'react-bootstrap';
import { findNotificationByUserId } from '../../Actions'

export class HiremngrDashboard extends React.Component {
  constructor () {
    super()
    //   this.state = {color: "red"};
  }

  render () {
    const userProfile = JSON.parse(ls.get('userProfile'))
    return (
      <Fragment>
          {/* <!-- Dashboard Content================================================== --> */}
          <div className="dashboard-content-container" data-simplebar>
          <ToastContainer
          position="top-right"
          autoClose={5000}
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
              <div className="dashboard-content-inner" >
                  
                  {/* <!-- Dashboard Headline --> */}
                  <div className="dashboard-headline">
                      <h3>Howdy, {userProfile.firstName}!</h3>
                      <span>We are glad to see you again!</span><br/>

                      <div className="col-xl-12">
                          {/* <div className="section-headline border-top margin-top-55 padding-top-45 margin-bottom-25">
                              <h4>Tooltips</h4>
                          </div> */}
                          <div className="notification notice">
                              <p> <strong>{userProfile.firstName}</strong> Please <a href="/freelancer/profile_edit">Edit Your Profile</a></p>
                          </div>
                      </div>
                      
                      <div className='row'>
                                <div class="col-xl-12 col-md-12">
                                    <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
                                        frameborder='0'
                                        allow='autoplay; encrypted-media'
                                        allowfullscreen
                                        title='video'
                                    />
                                </div>
                                <div class="col-xl-12 col-md-12">

                                    <div class="section-headline border-top margin-top-45 padding-top-45 margin-bottom-30">
                                        <h4>Some Definitions</h4>
                                    </div>

                                    <div class="accordion js-accordion">
                                        <Accordion defaultActiveKey="0">
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    <strong>Joblem</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>A short piece of work (few hours) that needs to be done (i.e. a job post).</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                                    <strong>Jobber</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="1">
                                                    <Card.Body>A skilled individual seeking a short piece of work (few hours) i.e. seeking a Joblem.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                                    <strong>Jobster</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="2">
                                                    <Card.Body>A company or individual seeking help for a short piece of work (few hours) i.e. seeking a Jobber.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                                    <strong>Joblot</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="3">
                                                    <Card.Body>A small (1hr to 1 week) fixed-price well defined service/solution e.g. logo design.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="4">
                                                    <strong>Jobboard</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="4">
                                                    <Card.Body>Place where joblems are posted.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="5">
                                                    <strong>Jobspace</strong>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="5">
                                                    <Card.Body>Place where Joblots are posted.</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </div>

                                </div>
                            </div>
                            </div>

                 
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

      </Fragment >)
}
}

