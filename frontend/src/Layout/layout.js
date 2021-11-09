import React, { Component, Suspense } from 'react';  
// import Leftside from './Leftside';  
import Header from './header'  
import Footer from './footer'  
// import Home from '../Home'  
import {  
    Route, Switch, Redirect  
} from 'react-router-dom';  
export class Layout extends Component {  
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>  
    render() {  
        return (  
            <div>  
                <div id="wrapper" className="mm-page mm-slideout">
                <Header />
                {/* <Footer />   */}
                </div>  
            </div>  
        )  
    }  
}  
  
export default Layout 