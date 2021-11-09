import "./css/bootstrap.min.css?ver=1.2.0";
import "./css/aos.css?ver=1.2.0";
import "./css/main.css?ver=1.2.0";
import React, { Fragment } from "react";
import GoogleMapReact from "google-map-react";
import { Accordion, Card } from "react-bootstrap";

import { Profession } from "../../../../utility/master_data";
// import { UserProposalRequest, UserProposalStatus, UserActivePostDetails } from './index'
import config from "../../../../config";
const { baseFrontenUrl = "", displayNameSettings, d = { key: "" } } = config;
// import React from "react";
// import config from '../'
var loadjs = require("loadjs");

// import '/css/font-awesome/css/all.min.css?ver=1.2.0'
const AnyReactComponent = ({ text }) => (
  <div style={{ width: "fit-content", fontWeight: "bold", color: "blue" }}>
    {text}
  </div>
);

export class Resume1 extends React.Component {
  componentWillMount() {
    loadjs("scripts/bootstrap.bundle.min.js?ver=1.2.0");
    loadjs("scripts/aos.js?ver=1.2.0");
    loadjs("scripts/main.js?ver=1.2.0");
    // loadjs(baseFrontenUrl+'/js/bootstrap-slider.min.js');
    // loadjs(baseFrontenUrl+'/js/chart.min.js');
    // loadjs(baseFrontenUrl+'/js/clipboard.min.js');
    // loadjs(baseFrontenUrl+'/js/counterup.min.js');
    // loadjs(baseFrontenUrl+'/js/counterup.min.js');
    // loadjs(baseFrontenUrl+'/js/custom.js');
    // loadjs(baseFrontenUrl+'/js/infobox.min.js');
    // loadjs(baseFrontenUrl+'/js/jquery-3.3.1.min.js');
    // loadjs(baseFrontenUrl+'/js/jquery-3.4.1.min.js');
    // loadjs(baseFrontenUrl+'/js/jquery-migrate-3.1.0.min.js');
    // loadjs(baseFrontenUrl+'/js/leaflet-autocomplete.js');
    // loadjs(baseFrontenUrl+'/js/leaflet-control-geocoder.js');
    // loadjs(baseFrontenUrl+'/js/leaflet-gesture-handling.min.js');
    // loadjs(baseFrontenUrl+'/js/leaflet-hireo.js');
    // loadjs(baseFrontenUrl+'/js/leaflet-markercluster.min.js');
    // loadjs(baseFrontenUrl+'/js/leaflet.min.js');
    // loadjs(baseFrontenUrl+'/js/magnific-popup.min.js');
    // loadjs(baseFrontenUrl+'/js/maps.js');
    // loadjs(baseFrontenUrl+'/js/markerclusterer.js');
    // loadjs(baseFrontenUrl+'/js/mmenu.min.js');
    // loadjs(baseFrontenUrl+'/js/simplebar.min.js');
    // loadjs(baseFrontenUrl+'/js/snackbar.js');
    // loadjs(baseFrontenUrl+'/js/tippy.all.min.js');
  }

  render() {
    return (
      <div id="top">
        <header class="d-print-none">
          <div class="container text-center text-lg-left">
            <div class="py-3 clearfix">
              <h1 class="site-title mb-0">Joyce Harrison</h1>
              <div class="site-nav">
                <nav role="navigation">
                  <ul class="nav justify-content-center">
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="https://twitter.com/templateflip"
                        title="Twitter"
                      >
                        <i class="fab fa-twitter"></i>
                        <span class="menu-title sr-only">Twitter</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="https://www.facebook.com/templateflip"
                        title="Facebook"
                      >
                        <i class="fab fa-facebook"></i>
                        <span class="menu-title sr-only">Facebook</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="https://www.instagram.com/templateflip"
                        title="Instagram"
                      >
                        <i class="fab fa-instagram"></i>
                        <span class="menu-title sr-only">Instagram</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="https://github.com/templateflip"
                        title="Github"
                      >
                        <i class="fab fa-github"></i>
                        <span class="menu-title sr-only">Github</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <div class="page-content">
          <div class="container">
            <div class="cover shadow-lg bg-white">
              <div class="cover-bg p-3 p-lg-4 text-white">
                <div class="row">
                  <div class="col-lg-4 col-md-5">
                    <div class="avatar hover-effect bg-white shadow-sm p-1">
                      <img src="images/avatar.jpg" width="200" height="200" />
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-7 text-center text-md-start">
                    <h2 class="h1 mt-2" data-aos="fade-left" data-aos-delay="0">
                      Joyce Harrison
                    </h2>
                    <p data-aos="fade-left" data-aos-delay="100">
                      Graphic Designer & Web Developer
                    </p>
                    <div
                      class="d-print-none"
                      data-aos="fade-left"
                      data-aos-delay="200"
                    >
                      <a
                        class="btn btn-light text-dark shadow-sm mt-1 me-1"
                        href="right-resume.pdf"
                        target="_blank"
                      >
                        Download CV
                      </a>
                      <a class="btn btn-success shadow-sm mt-1" href="#contact">
                        Hire Me
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="about-section pt-4 px-3 px-lg-4 mt-1">
                <div class="row">
                  <div class="col-md-6">
                    <h2 class="h3 mb-3">About Me</h2>
                    <p>
                      Hello! I’m Joyce Harrison. I am passionate about UI/UX
                      design and Web Design. I am a skilled Front-end Developer
                      and master of Graphic Design tools such as Photoshop and
                      Sketch.
                    </p>
                  </div>
                  <div class="col-md-5 offset-md-1">
                    <div class="row mt-2">
                      <div class="col-sm-4">
                        <div class="pb-1">Age</div>
                      </div>
                      <div class="col-sm-8">
                        <div class="pb-1 text-secondary">28</div>
                      </div>
                      <div class="col-sm-4">
                        <div class="pb-1">Email</div>
                      </div>
                      <div class="col-sm-8">
                        <div class="pb-1 text-secondary">Joyce@company.com</div>
                      </div>
                      <div class="col-sm-4">
                        <div class="pb-1">Phone</div>
                      </div>
                      <div class="col-sm-8">
                        <div class="pb-1 text-secondary">+0718-111-0011</div>
                      </div>
                      <div class="col-sm-4">
                        <div class="pb-1">Address</div>
                      </div>
                      <div class="col-sm-8">
                        <div class="pb-1 text-secondary">
                          140, City Center, New York, U.S.A
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="d-print-none" />
              <div class="skills-section px-3 px-lg-4">
                <h2 class="h3 mb-3">Professional Skills</h2>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-2">
                      <span>HTML</span>
                      <div class="progress my-1">
                        <div
                          class="progress-bar bg-primary"
                          role="progressbar"
                          data-aos="zoom-in-right"
                          data-aos-delay="100"
                          data-aos-anchor=".skills-section"
                          style={{ width: "90%" }}
                          aria-valuenow="90"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <span>CSS</span>
                      <div class="progress my-1">
                        <div
                          class="progress-bar bg-primary"
                          role="progressbar"
                          data-aos="zoom-in-right"
                          data-aos-delay="200"
                          data-aos-anchor=".skills-section"
                          style={{ width: "85%" }}
                          aria-valuenow="85"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <span>JavaScript</span>
                      <div class="progress my-1">
                        <div
                          class="progress-bar bg-primary"
                          role="progressbar"
                          data-aos="zoom-in-right"
                          data-aos-delay="300"
                          data-aos-anchor=".skills-section"
                          style={{ width: "75%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-2">
                      <span>Adobe Photoshop</span>
                      <div class="progress my-1">
                        <div
                          class="progress-bar bg-success"
                          role="progressbar"
                          data-aos="zoom-in-right"
                          data-aos-delay="400"
                          data-aos-anchor=".skills-section"
                          style={{ width: "80%" }}
                          aria-valuenow="90"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <span>Sketch</span>
                      <div class="progress my-1">
                        <div
                          class="progress-bar bg-success"
                          role="progressbar"
                          data-aos="zoom-in-right"
                          data-aos-delay="500"
                          data-aos-anchor=".skills-section"
                          style={{ width: "85%" }}
                          aria-valuenow="85"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <span>Adobe XD</span>
                      <div class="progress my-1">
                        <div
                          class="progress-bar bg-success"
                          role="progressbar"
                          data-aos="zoom-in-right"
                          data-aos-delay="600"
                          data-aos-anchor=".skills-section"
                          style={{ width: "75%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="d-print-none" />
              <div class="work-experience-section px-3 px-lg-4">
                <h2 class="h3 mb-4">Work Experience</h2>
                <div class="timeline">
                  <div class="timeline-card timeline-card-primary card shadow-sm">
                    <div class="card-body">
                      <div class="h5 mb-1">
                        Frontend Developer{" "}
                        <span class="text-muted h6">at Creative Agency</span>
                      </div>
                      <div class="text-muted text-small mb-2">
                        May, 2015 - Present
                      </div>
                      <div>
                        Leverage agile frameworks to provide a robust synopsis
                        for high level overviews. Iterative approaches to
                        corporate strategy foster collaborative thinking to
                        further the overall value proposition.
                      </div>
                    </div>
                  </div>
                  <div class="timeline-card timeline-card-primary card shadow-sm">
                    <div class="card-body">
                      <div class="h5 mb-1">
                        Graphic Designer{" "}
                        <span class="text-muted h6">at Design Studio</span>
                      </div>
                      <div class="text-muted text-small mb-2">
                        June, 2013 - May, 2015
                      </div>
                      <div>
                        Override the digital divide with additional
                        clickthroughs from DevOps. Nanotechnology immersion
                        along the information highway will close the loop on
                        focusing solely on the bottom line.
                      </div>
                    </div>
                  </div>
                  <div class="timeline-card timeline-card-primary card shadow-sm">
                    <div class="card-body">
                      <div class="h5 mb-1">
                        Junior Web Developer{" "}
                        <span class="text-muted h6">at Indie Studio</span>
                      </div>
                      <div class="text-muted text-small mb-2">
                        Jan, 2011 - May, 2013
                      </div>
                      <div>
                        User generated content in real-time will have multiple
                        touchpoints for offshoring. Organically grow the
                        holistic world view of disruptive innovation via
                        workplace diversity and empowerment.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="d-print-none" />
              <div class="page-break"></div>
              <div class="education-section px-3 px-lg-4 pb-4">
                <h2 class="h3 mb-4">Education</h2>
                <div class="timeline">
                  <div class="timeline-card timeline-card-success card shadow-sm">
                    <div class="card-body">
                      <div class="h5 mb-1">
                        Masters in Information Technology{" "}
                        <span class="text-muted h6">
                          from International University
                        </span>
                      </div>
                      <div class="text-muted text-small mb-2">2011 - 2013</div>
                      <div>
                        Leverage agile frameworks to provide a robust synopsis
                        for high level overviews. Iterative approaches to
                        corporate strategy foster collaborative thinking to
                        further the overall value proposition.
                      </div>
                    </div>
                  </div>
                  <div class="timeline-card timeline-card-success card shadow-sm">
                    <div class="card-body">
                      <div class="h5 mb-1">
                        Bachelor of Computer Science{" "}
                        <span class="text-muted h6">from Regional College</span>
                      </div>
                      <div class="text-muted text-small mb-2">2007 - 2011</div>
                      <div>
                        Override the digital divide with additional
                        clickthroughs from DevOps. Nanotechnology immersion
                        along the information highway will close the loop on
                        focusing solely on the bottom line.
                      </div>
                    </div>
                  </div>
                  <div class="timeline-card timeline-card-success card shadow-sm">
                    <div class="card-body">
                      <div class="h5 mb-1">
                        Science and Mathematics{" "}
                        <span class="text-muted h6">from Mt. High Scool</span>
                      </div>
                      <div class="text-muted text-small mb-2">1995 - 2007</div>
                      <div>
                        User generated content in real-time will have multiple
                        touchpoints for offshoring. Organically grow the
                        holistic world view of disruptive innovation via
                        workplace diversity and empowerment.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="d-print-none" />
              <div class="contant-section px-3 px-lg-4 pb-4" id="contact">
                <h2 class="h3 text mb-3">Contact</h2>
                <div class="row">
                  <div class="col-md-7 d-print-none">
                    <div class="my-2">
                      <form
                        action="https://formspree.io/your@email.com"
                        method="POST"
                      >
                        <div class="row">
                          <div class="col-6">
                            <input
                              class="form-control"
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Your Name"
                              required
                            />
                          </div>
                          <div class="col-6">
                            <input
                              class="form-control"
                              type="email"
                              id="email"
                              name="_replyto"
                              placeholder="Your E-mail"
                              required
                            />
                          </div>
                        </div>
                        <div class="form-group my-2">
                          <textarea
                            class="form-control"
                            style={{
                              resize: "none",
                            }}
                            id="message"
                            name="message"
                            rows="4"
                            placeholder="Your Message"
                            required
                          ></textarea>
                        </div>
                        <button class="btn btn-primary mt-2" type="submit">
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mt-2">
                      <h3 class="h6">Address</h3>
                      <div class="pb-2 text-secondary">
                        140, City Center, New York, U.S.A
                      </div>
                      <h3 class="h6">Phone</h3>
                      <div class="pb-2 text-secondary">+0718-111-0011</div>
                      <h3 class="h6">Email</h3>
                      <div class="pb-2 text-secondary">Joyce@company.com</div>
                    </div>
                  </div>
                  <div class="col d-none d-print-block">
                    <div class="mt-2">
                      <div>
                        <div class="mb-2">
                          <div class="text-dark">
                            <i class="fab fa-twitter mr-1"></i>
                            <span>https://twitter.com/templateflip</span>
                          </div>
                        </div>
                        <div class="mb-2">
                          <div class="text-dark">
                            <i class="fab fa-facebook mr-1"></i>
                            <span>https://www.facebook.com/templateflip</span>
                          </div>
                        </div>
                        <div class="mb-2">
                          <div class="text-dark">
                            <i class="fab fa-instagram mr-1"></i>
                            <span>https://www.instagram.com/templateflip</span>
                          </div>
                        </div>
                        <div class="mb-2">
                          <div class="text-dark">
                            <i class="fab fa-github mr-1"></i>
                            <span>https://github.com/templateflip</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="pt-4 pb-4 text-muted text-center d-print-none">
          <div class="container">
            <div class="my-3">
              <div class="h4">Joyce Harrison</div>
              <div class="footer-nav">
                <nav role="navigation">
                  <ul class="nav justify-content-center">
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="https://twitter.com/templateflip"
                        title="Twitter"
                      >
                        <i class="fab fa-twitter"></i>
                        <span class="menu-title sr-only">Twitter</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="https://www.facebook.com/templateflip"
                        title="Facebook"
                      >
                        <i class="fab fa-facebook"></i>
                        <span class="menu-title sr-only">Facebook</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="https://www.instagram.com/templateflip"
                        title="Instagram"
                      >
                        <i class="fab fa-instagram"></i>
                        <span class="menu-title sr-only">Instagram</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        href="https://github.com/templateflip"
                        title="Github"
                      >
                        <i class="fab fa-github"></i>
                        <span class="menu-title sr-only">Github</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div class="text-small">
              <div class="mb-1">&copy; Right Resume. All rights reserved.</div>
              <div>
                Design -{" "}
                <a href="https://templateflip.com/" target="_blank">
                  TemplateFlip
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export class Resume extends React.Component {
  componentWillMount() {
    loadjs("scripts/bootstrap.bundle.min.js?ver=1.2.0");
    loadjs("scripts/aos.js?ver=1.2.0");
    loadjs("scripts/main.js?ver=1.2.0");
  }

  render() {
    console.log("@@@@@@@@@@@@");
    const {
      userLogo = { url: "" },
      about = "",
      email = "",
      firstName = "",
      lastName = "",
      profession = [],
      address = "",
      likedin,
    } = this.props.userData;
    const Profession = profession.map((item, i) => {
      if (i === profession.length - 1) return item;
      return item + ", ";
    });
    return (
      <div id="top">
        <header class="d-print-none">
          <div class="container text-center text-lg-left">
            <div class="py-3 clearfix">
              <h1 class="site-title mb-0">
                {firstName} {lastName}
              </h1>
              <div class="site-nav">
                {/* <nav role="navigation">
                  <ul class="nav justify-content-center">
                    <li class="nav-item"><a class="nav-link" href="https://twitter.com/templateflip" title="Twitter"><i class="fab fa-twitter"></i><span class="menu-title sr-only">Twitter</span></a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="https://www.facebook.com/templateflip" title="Facebook"><i class="fab fa-facebook"></i><span class="menu-title sr-only">Facebook</span></a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="https://www.instagram.com/templateflip" title="Instagram"><i class="fab fa-instagram"></i><span class="menu-title sr-only">Instagram</span></a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="https://github.com/templateflip" title="Github"><i class="fab fa-github"></i><span class="menu-title sr-only">Github</span></a>
                    </li>
                  </ul>
                </nav> */}
              </div>
            </div>
          </div>
        </header>
        <div class="page-content">
          <div class="container">
            <div class="cover shadow-lg bg-white">
              <div class="cover-bg p-3 p-lg-4 text-white">
                <div class="row">
                  <div class="col-lg-3 col-md-5">
                    <img
                      class="resume-avatar"
                      src={userLogo.url}
                      alt="user img"
                    />
                  </div>
                  <div class="col-lg-8 col-md-7 text-center text-md-start">
                    <h2 class="resume-heading h1 mt-2" data-aos-delay="0">
                      {firstName} {lastName}
                    </h2>
                    <p data-aos-delay="100">{Profession}</p>
                    <div
                      class="d-print-none"
                      data-aos="fade-left"
                      data-aos-delay="200"
                    >
                      <a
                        class="btn btn-light text-dark shadow-sm mt-1 me-1"
                        href="right-resume.pdf"
                        target="_blank"
                      >
                        Download CV
                      </a>
                      <a class="btn btn-success shadow-sm mt-1" href="#contact">
                        Hire Me
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="about-section pt-4 px-3 px-lg-4 mt-1">
                <div class="row">
                  <div class="col-md-6">
                    <h2 class="h3 mb-3">About Me</h2>
                    <p>{about}</p>
                  </div>
                  <div class="col-md-5 offset-md-1">
                    <div class="row mt-2">
                      {/* <div class="col-sm-4">
                        <div class="pb-1">Age</div>
                      </div> */}
                      {/* <div class="col-sm-8">
                        <div class="pb-1 text-secondary">28</div>
                      </div> */}
                      <div class="col-sm-4">
                        <div class="pb-1">Email</div>
                      </div>
                      <div class="col-sm-8">
                        <div class="pb-1 text-secondary">{email}</div>
                      </div>

                      <div class="col-sm-4">
                        <div class="pb-1">linkedin</div>
                      </div>
                      <div class="col-sm-8">
                        <div class="pb-1 text-secondary">{likedin}</div>
                      </div>

                      {/* <div class="col-sm-4">
                        <div class="pb-1">Phone</div>
                      </div>
                      <div class="col-sm-8">
                        <div class="pb-1 text-secondary">+0718-111-0011</div>
                      </div> */}
                      <div class="col-sm-4">
                        <div class="pb-1">Address</div>
                      </div>
                      <div class="col-sm-8">
                        <div class="pb-1 text-secondary">{address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class SkillSection extends React.Component {
  componentWillMount() {
    loadjs("scripts/bootstrap.bundle.min.js?ver=1.2.0");
    loadjs("scripts/aos.js?ver=1.2.0");
    loadjs("scripts/main.js?ver=1.2.0");
  }

  render() {
    console.log("@@@@@@@@@@@@");
    const {
      userLogo = { url: "" },
      about = "",
      email = "",
      firstName = "",
      lastName = "",
      address = "",
      skills = [],
    } = this.props.userData;

    let allSkills = skills.map((item) => {
      return (
        <div class="col-md-6">
          <div class="mb-2">
            <span>{item}</span>
            <div class="progress my-1">
              <div
                class="progress-bar bg-primary"
                role="progressbar"
                data-aos="zoom-in-right"
                data-aos-delay="100"
                data-aos-anchor=".skills-section"
                style={{ width: "90%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div id="top">
        <div class="page-content">
          <div class="container">
            <div class="cover shadow-lg bg-white">
              <div class="skills-section px-3 px-lg-4">
                <h2 class="h3 mb-3">Skills</h2>
                <div class="row">
                  {/* <div class="col-md-6"> */}
                  {allSkills}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class MapSection extends React.Component {
  componentWillMount() {
    loadjs("scripts/bootstrap.bundle.min.js?ver=1.2.0");
    loadjs("scripts/aos.js?ver=1.2.0");
    loadjs("scripts/main.js?ver=1.2.0");
  }

  render() {
    console.log("@@@@@@@@@@@@");
    const {
      userLogo = { url: "" },
      about = "",
      email = "",
      firstName = "",
      lastName = "",
      address = "",
      skills = [],
      location = {
        lat: 0,
        lng: 0,
      },
    } = this.props.userData;

    let allSkills = skills.map((item) => {
      return (
        <div class="col-md-6">
          <div class="mb-2">
            <span>{item}</span>
            <div class="progress my-1">
              <div
                class="progress-bar bg-primary"
                role="progressbar"
                data-aos="zoom-in-right"
                data-aos-delay="100"
                data-aos-anchor=".skills-section"
                style={{ width: "90%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div id="top">
        <div class="page-content">
          <div class="container">
            <div class="cover shadow-lg bg-white">
              <div className="single-page-section">
                <div
                  className="margin-bottom-30"
                  style={{ height: "340px", width: "100%" }}
                >
                  <GoogleMapReact
                    bootstrapURLKeys={d.key}
                    defaultCenter={{
                      lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                      lng: parseInt(location.lng) ? parseInt(location.lng) : 0,
                    }}
                    center={{
                      lat: parseInt(location.lat) ? parseInt(location.lat) : 0,
                      lng: parseInt(location.lng) ? parseInt(location.lng) : 0,
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
          </div>
        </div>
      </div>
    );
  }
}

export class SummarySection extends React.Component {
  componentWillMount() {
    loadjs("scripts/bootstrap.bundle.min.js?ver=1.2.0");
    loadjs("scripts/aos.js?ver=1.2.0");
    loadjs("scripts/main.js?ver=1.2.0");
  }

  render() {
    console.log("@@@@@@@@@@@@");
    const {
      userLogo = { url: "" },
      about = "",
      email = "",
      firstName = "",
      lastName = "",
      address = "",
      skills = [],
      currency = "",
      jobCategory = [],
      view = "",
      nationality = "",
      planType = "",
      avgRating = "",
    } = this.props.userData;

    let JobCategory = jobCategory.map((item, i) => {
      if (i === jobCategory.length - 1) return item;
      return item + ", ";
    });
    return (
      <div id="top">
        <div class="page-content">
          <div class="container">
            <div class="cover shadow-lg bg-white">
              <div class="contant-section px-3 px-lg-4 pb-4" id="contact">
                <h2 class="h3 text mb-3"></h2>
                <div class="row">
                  <div class="col-md-7 d-print-none">
                    <div class="my-2">
                      <div class="mt-2">
                        <h3 class="h6">Industry</h3>
                        <div class="pb-2 text-secondary">{JobCategory}</div>
                        <h3 class="h6">Currency</h3>
                        <div class="pb-2 text-secondary">{currency}</div>
                        <h3 class="h6">Views</h3>
                        <div class="pb-2 text-secondary">{view}</div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mt-2">
                      <h3 class="h6">nationality</h3>
                      <div class="pb-2 text-secondary">{nationality}</div>
                      <h3 class="h6">planType</h3>
                      <div class="pb-2 text-secondary">{planType}</div>
                      <h3 class="h6">avgRating</h3>
                      <div class="pb-2 text-secondary">{avgRating}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class DocumentsSection1 extends React.Component {
  componentWillMount() {
    loadjs("scripts/bootstrap.bundle.min.js?ver=1.2.0");
    loadjs("scripts/aos.js?ver=1.2.0");
    loadjs("scripts/main.js?ver=1.2.0");
  }

  render() {
    console.log("@@@@@@@@@@@@");
    const {
      userLogo = { url: "" },
      about = "",
      email = "",
      firstName = "",
      lastName = "",
      address = "",
      skills = [],
      currency = "",
      jobCategory = [],
      view = "",
      nationality = "",
      planType = "",
      avgRating = "",
      files,
    } = this.props.userData;

    let supportDoc = (files || []).map((item, i) => {
      return (
        <div style={{ margin: 5, padding: 5 }} class="mt-2">
          <div key={i} className="attachments-container">
            <a href={item.url} download class="attachment-box ripple-effect">
              <span>{item.fileName}</span>
            </a>
          </div>
        </div>
      );

      // return(
      //   <div class="col-md-6">
      //   <div style={{margin:5, padding:5}} class="mt-2"><div key={i} className='attachments-container'>
      //  <a href={item.url} download class="attachment-box ripple-effect">
      //  <span>{item.fileName}</span>
      //  </a>
      //  </div></div>

      // {/* </div> */}
      // </div>
      // )
    });
    return (
      <div id="top">
        <div class="page-content">
          <div class="container">
            <div class="cover shadow-lg bg-white">
              <div class="contant-section px-3 px-lg-4 pb-4" id="contact">
                <h2 class="h3 text mb-3"></h2>
                <div class="row">
                  <div class="col-md-7 d-print-none">
                    {/* <div class="my-2"> */}
                    {/* <div class="mt-2"> */}
                    {supportDoc}
                    {/* <div className='attachments-container'>
                    <a class="attachment-box ripple-effect">
                    <span>Cover Letter</span>
                    </a>
                    </div> */}

                    {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class DocumentsSection extends React.Component {
  componentWillMount() {
    loadjs("scripts/bootstrap.bundle.min.js?ver=1.2.0");
    loadjs("scripts/aos.js?ver=1.2.0");
    loadjs("scripts/main.js?ver=1.2.0");
  }

  render() {
    console.log("@@@@@@@@@@@@");
    const { files = [] } = this.props.userData;

    let allSkills = files.map((item, i) => {
      return (
        <div class="col-md-4">
          <div class="mb-2">
            {/* <div class="progress my-1"> */}
            <div
              style={{ margin: 5, padding: 5 }}
              key={i}
              className="attachments-container"
            >
              <a
                href={item.url}
                target="blank"
                download
                class="attachment-box ripple-effect"
              >
                <span>{item.fileName}</span>
              </a>
              {/* </div> */}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div id="top">
        <div class="page-content">
          <div class="container">
            <div class="cover shadow-lg bg-white">
              <div class="skills-section px-3 px-lg-4">
                {/* <h2 class="h3 mb-3">Skills</h2> */}
                <div class="row">
                  {/* <div class="col-md-6"> */}
                  {allSkills}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
