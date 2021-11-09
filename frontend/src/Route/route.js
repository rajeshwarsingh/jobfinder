import React from 'react'
import { Route as DefaultRoute, Switch, Redirect } from 'react-router-dom'
import { LinkedInPopUp } from 'react-linkedin-login-oauth2'
import { ToastContainer, toast } from "react-toastify";

import { LandingPage, GestPostDetails, Posts, Services } from '../pages/guest'
import { getCookieByName } from '../utility/index'

// layout
import { HeaderHiremngr, HiremngrDashboardSidebar, FreelancerDashboardSidebar, Header, HeaderFreelancer } from '../Layout'

// user
import { UserLogin, UserForgot, UserLogout, UserRegister, UserAccount, UserAccountUpdate } from '../pages/user'
import  {BlockList} from '../Components/block/block_list'

// hirig manager
import {
  HiremngrDashboard, HiremngrPosts, HiremngrPostCreate, HiremngrPostClone, HiremngrPostUpdate, HiremngrPostDetails,
  HiremngrActivePost, HiremngrPostHistory, HiremngrManagePost, HiremngrManageBidders
} from '../pages/hiremngr'
import {HiremngrQuesionaireList} from '../pages/hiremngr/components/questionair_list'
import { HiremngrJobPostCreate, JobSearch, JobDetails, JobManage } from '../pages/jobs'

// freelancer
import {
  FreelancerHome, FreelancerDashboard, FreelancerSetting, FreelancerSearch, FreelancerSearchMapwise, FreelancerServiceCreate, FreelancerServiceView,
  FreelancerAppliedManagePost, FreelancerAppliedManageFl, FreelancerProfileView,
  FreelancerPostWishlist
} from '../pages/freelancer'

// freelancer post
import { FreelancerPosts, FreelancerPostsMapwise, FreelancerPostDetails, FreelancerPostHistory } from '../pages/freelancer/post'

// service
import {
  FreelancerServiceClone, FreelancerServiceEdit, ServiceDetails, ServiceSearch, ServiceSearchMapwise, ServiceListCreator, ServiceManageBidders, ServiceAppliedList,
  ServiceAppliedManageBid, FreelancerServiceFavourite
} from '../pages/freelancer/service'

// User
import { FreelancerProfileEdit, FreelancerSearchDetails, FreelancerUserFavourite,UserProfileResume } from '../pages/freelancer/user'

// import { ProtectedRoute } from './protected_routes'
// import { HiremngrSidebar } from '../Layout/hiremngr_sidebar'

// quiz
import { Quiz, ShowQuiz } from '../pages/quiz/index'

// appointment
import { EventsCalendar } from '../pages/freelancer/events'

import {AdoptivePaypal} from '../Components/payment/adoptivePaypal'
import { PayConfirmation } from '../Components/payment/pay_confirmation'
import { Invoice } from '../Components/payment/invoice/invoice'
import { AllRating } from '../Components/rating/allRating'
import ChatApp from '../Components/chat/App'
import PaypalButtonSubscrition from '../Components/payment/paypal_subscrition/App'
import {PricingPlan} from '../pages/plans'
import CreateQuiz from '../pages/quiz/creteQuiz/createQuiz'

const GuestLayout = ({ children }) => <>{children}</>

const GuestRoute = ({
  component: Component,
  layout: Layout = GuestLayout,
  ...rest
}) => {
  return (
    <DefaultRoute
      {...rest}
      render={props => (
        <>
          <Header />
          <Component {...props} />
        </>
      )}
    />
  )
}

const FreelancerLayout = ({ children }) => <>{children}</>

const FreelancerRoute = ({
  component: Component,
  layout: Layout = FreelancerLayout,
  type,
  ...rest
}) => {
  if (getCookieByName('verificationToken')) {
    if (type === 'freelancer') {
      return (
        <DefaultRoute
          {...rest}
          render={props => (
            <>
              <HeaderFreelancer {...props} />
              <div className='dashboard-container'>
                {/* dashboard sidebar component */}
                <FreelancerDashboardSidebar {...rest} />
                {/* dashboard content component */}
                <Component {...props} />
              </div>

            </>
          )}
        />
      )
    } else if (type === 'form') {
      return (
        <DefaultRoute
          {...rest}
          render={props => (
            <>
              <HeaderFreelancer {...props} />
              <Component {...props} />

            </>
          )}
        />
      )
    }

    return (
      <DefaultRoute
        {...rest}
        render={props => (
          <>
            <HeaderFreelancer {...props} />

            <Component {...props} />
          </>
        )}
      />
    )
  } else {
    return (
      <Redirect
        to={
            { pathname: '/logout' }
        }
      />
    )
  }
}

const HiremngrLayout = ({ children }) => <>{children}</>

const HiremngrRoute = ({
  component: Component,
  type,
  layout: Layout = HiremngrLayout,
  ...rest
}) => {
  if (getCookieByName('verificationToken')) {
    console.log('check type :', type)
    if (type === 'dashboard') {
      return (
        <DefaultRoute
          {...rest}
          render={props => (
            <>
              <HeaderHiremngr {...props}/>
              <div className='dashboard-container'>
                {/* dashboard sidebar component */}
                <HiremngrDashboardSidebar {...rest} />
                {/* dashboard content component */}
                <Component {...props} />
              </div>

            </>
          )}
        />
      )
    } else if (type === 'form') {
      return (
        <DefaultRoute
          {...rest}
          render={props => (
            <>
              <HeaderHiremngr {...props}/>
              <div className='dashboard-container'>
                <Component {...props} />
              </div>

            </>
          )}
        />
      )
    }

    return (
      <DefaultRoute
        {...rest}
        render={props => (
          <>
            <HeaderHiremngr {...props}/>
            <Component {...props} />
          </>
        )}
      />
    )
  } else {
    return (
      <Redirect
        to={
            { pathname: '/logout' }
        }
      />
    )
  }
}

function RouteHandler () {
  return (
    <div>
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
            {/* <ToastContainer /> */}
      <Switch>
        <GuestRoute exact path='/' component={LandingPage} layout={GuestLayout} />
        {/* Guest home page */}
        {/* <GuestRoute exact path='/' component={LandingPage}/> */}
        {/* <ProtectedRoute exact path='/homepage' component={Home}/>  */}

        <GuestRoute exact path='/login' component={UserLogin} />
        <GuestRoute exact path='/forgot_password' component={UserForgot} />
        <GuestRoute exact path='/register' component={UserRegister} />
        <GuestRoute exact path='/linkedin' component={LinkedInPopUp} />
        <GuestRoute exact path='/user/account/view' component={UserAccount} />
        <GuestRoute exact path='/user/account/update/:userId' component={UserAccountUpdate} />

        <GuestRoute exact path='/posts' component={Posts} />
        <GuestRoute exact path='/services' component={Services} />
        {/* <GuestRoute exact path='/' component={Posts} /> */}
        <GuestRoute exact path='/post/:postId' component={GestPostDetails} />

        <FreelancerRoute exact path='/hiremngr/posts' type='freelancer' component={HiremngrPosts} layout={FreelancerLayout}  />
        <FreelancerRoute exact path='/hiremngr/post/create' type='form' component={HiremngrPostCreate} />
        <FreelancerRoute exact path='/hiremngr/post/clone/:postId' type='form' component={HiremngrPostClone} />
        <FreelancerRoute exact path='/hiremngr/post/update/:postId' component={HiremngrPostUpdate} />
        <FreelancerRoute exact path='/hiremngr/post/:postId' component={HiremngrPostDetails} />
        <FreelancerRoute exact path='/hiremngr/post_history' type='form' component={HiremngrPostHistory} />

        <FreelancerRoute exact path='/hiremngr/job_post/create' component={HiremngrJobPostCreate} />

        <FreelancerRoute exact path='/hiremngr/dashboard' type='freelancer' component={HiremngrDashboard} />
        <FreelancerRoute exact path='/hiremngr/post_manage_post' type='freelancer' component={HiremngrManagePost} />
        <FreelancerRoute exact path='/hiremngr/post_active_post' type='freelancer' component={HiremngrActivePost} />
        <FreelancerRoute exact path='/hiremngr/post_manage_bidders/:postId' type='freelancer' component={HiremngrManageBidders} />
        <FreelancerRoute exact path='/hiremngr/post_questionaire_list/:postId' type='freelancer' component={HiremngrQuesionaireList} />

        <FreelancerRoute exact path='/Home' component={FreelancerHome} />
        <FreelancerRoute exact path='/freelancer/dashboard' type='freelancer' component={FreelancerDashboard} layout={FreelancerLayout} />
        <FreelancerRoute exact path='/freelancer/setting' type='freelancer' component={FreelancerSetting} layout={FreelancerLayout} />
        <FreelancerRoute exact path='/freelancer/profile_view' type='freelancer' component={FreelancerProfileView} />

        {/* freelancer post */}
        <FreelancerRoute exact path='/freelancer/posts' component={FreelancerPosts} />
        <FreelancerRoute exact path='/freelancer/posts_mapwise' component={FreelancerPostsMapwise} />
        <FreelancerRoute exact path='/freelancer/post/:postId' component={FreelancerPostDetails} />
        <FreelancerRoute exact path='/freelancer/post_history' component={FreelancerPostHistory} />
        <FreelancerRoute exact path='/freelancer/user_profile_resume' component={UserProfileResume} />
        

        <FreelancerRoute exact path='/freelancer/service_view' type='freelancer' component={FreelancerServiceView} />
        <FreelancerRoute exact path='/freelancer/service_list' type='freelancer' component={ServiceListCreator} />
        <FreelancerRoute exact path='/freelancer/service_search' component={ServiceSearch} />
        <FreelancerRoute exact path='/freelancer/service_search_mapwise' component={ServiceSearchMapwise} />
        <FreelancerRoute exact path='/freelancer/service/create' type='form' component={FreelancerServiceCreate} />
        <FreelancerRoute exact path='/freelancer/service/clone/:serviceId' type='form' component={FreelancerServiceClone} />
        <FreelancerRoute exact path='/freelancer/service/edit/:serviceId' type='form' component={FreelancerServiceEdit} />
        <FreelancerRoute exact path='/freelancer/service/:serviceId' component={ServiceDetails} />
        <FreelancerRoute exact path='/freelancer/service_manage_bidders/:serviceId' type='freelancer' component={ServiceManageBidders} />
        <FreelancerRoute exact path='/freelancer/service_applied_manage_bid/:serviceId' type='freelancer' component={ServiceAppliedManageBid} />
        <FreelancerRoute exact path='/freelancer/service_applied_list' type='freelancer' component={ServiceAppliedList} />
        <FreelancerRoute exact path='/blocks' type='freelancer' component={BlockList} />
        
        <FreelancerRoute exact path='/freelancer/post_applied_manage_post' type='freelancer' component={FreelancerAppliedManagePost} />
        <FreelancerRoute exact path='/freelancer/post_applied_manage_fl' component={FreelancerAppliedManageFl} />

        <FreelancerRoute exact path='/freelancer/profile_edit' component={FreelancerProfileEdit} />
        <FreelancerRoute exact path='/freelancer/wishlist' type='freelancer' component={FreelancerPostWishlist} />
        <FreelancerRoute exact path='/freelancer/favourite' type='freelancer' component={FreelancerServiceFavourite} />
        <FreelancerRoute exact path='/freelancer/user_favourite' type='freelancer' component={FreelancerUserFavourite} />
        <FreelancerRoute exact path='/allrating/:ratingTypeId' component={AllRating} />

        {/* <FreelancerRoute exact path='/freelancer/wishlist' component={FreelancerPostWishlist} /> */}

        <FreelancerRoute exact path='/freelancer/search' component={FreelancerSearch} />
        <FreelancerRoute exact path='/freelancer/search_mapwise' component={FreelancerSearchMapwise} />
        <FreelancerRoute exact path='/freelancer/search_details/:userId' component={FreelancerSearchDetails} />

        {/* jobs */}
        <FreelancerRoute exact path='/freelancer/job_search' component={JobSearch} />
        <FreelancerRoute exact path='/freelancer/job_details/:jobId' component={JobDetails} />
        <HiremngrRoute exact path='/hiremngr/job_manage' type='freelancer' component={JobManage} />
        <FreelancerRoute exact path='/quiz/:postId' component={Quiz} />
        <FreelancerRoute exact path='/showQuiz/:proposalId' component={ShowQuiz} />
        <FreelancerRoute exact path='/create_quiz/:postId' component={CreateQuiz} />

        <FreelancerRoute exact path='/appointment/:userId' component={EventsCalendar} />

        <FreelancerRoute exact path='/payConfirmation' component={PayConfirmation} />
        <FreelancerRoute exact path='/pricingPlan' component={PricingPlan} />
        
        <DefaultRoute exact path='/invoice/:invoiceId' component={Invoice} />
        <DefaultRoute exact path='/chatapp' component={ChatApp} />

        <DefaultRoute exact path='/logout' component={UserLogout} />
        <DefaultRoute exact path='/paypal' component={PaypalButtonSubscrition} />
        <DefaultRoute exact path='/pay' component={AdoptivePaypal} />
        

        <GuestRoute path='*' component={Error} />
      </Switch>

    </div>
  )
}

function Error () {
  return (
    <div>Page Not Found!</div>
  )
}

export default RouteHandler
