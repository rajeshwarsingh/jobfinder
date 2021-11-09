import ls from 'local-storage'
import React from 'react'
import { Link } from 'react-router-dom'
import {Table} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getUserById,patchUser,getProposalByPost, blockUsers } from '../../Actions'
import config from '../../config'
const { displayNameSettings } = config

export class BlockList extends React.Component {

    constructor() {
        super()
        this.state = {
            blockUsers: []
        }
        this.getUserData = this.getUserData.bind(this)
        this.handleUnblock = this.handleUnblock.bind(this)
    }

    notifyErr = (msg) => toast.error(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    notifySucc = (msg) => toast.success(msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    handleUnblock(userId) {
        getUserById(ls.get('userId'),{},(err,user)=>{
            if(err || !user){
                alert('Unable to block, Try again later!')
            }

            const block = user.block?user.block:[]
            const updateBlock = user.block.filter((item)=>item!==userId)

            patchUser(ls.get('userId'),{block:updateBlock},(err,pdata)=>{
                if(err){
                    console.log('something went wrong!')
                    this.notifyErr('something went wrong!')
                    return
                }
                this.notifySucc('unblocked successfully')
                setTimeout(()=>{
                    return window.location.reload(false)
                },2000) 
            })


        })
    }

    getUserData() {
        blockUsers(ls.get('userId'), {}, (err, users) => {
            console.log('users: ', err, users)
            if (users) this.setState({ blockUsers: users ? users : [] })
        })
    }

    componentDidMount() {
        this.getUserData()
    }

    render() {

        const users = this.state.blockUsers.map((item, i) => {
            return <tr>
                <th>{i + 1}</th>
                <th>{item.user}</th>
                <th><button onClick={()=>this.handleUnblock(item.id)} style={{ textAlign: 'left' }} class="button big ripple-effect">unblock</button></th>

            </tr>
        })
        return (
            <>
                {/* <!-- Dashboard Content================================================== --> */}
                <div className='dashboard-content-container' data-simplebar>
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
                    <ToastContainer />
                    <div className='dashboard-content-inner'>

                        {/* <!-- Dashboard Headline --> */}
                        <div className='dashboard-headline'>
                            <h3>Block list</h3>

                            {/* <!-- Breadcrumbs --> */}
                            <nav id='breadcrumbs' className='dark'>
                                <ul>
                                    <li><a href='#'>Home</a></li>
                                    <li><a href='#'>Dashboard</a></li>
                                    <li>Block list</li>
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
                                        <div style={{ display: "inline-block", width: "100%" }}>
                                            <div style={{ float: "left" }}>
                                                <h3 style={{ display: "inline-block" }}><i className='icon-material-outline-assignment' /> Block list <strong><u>{ }</u></strong></h3>
                                            </div>
                                            <div style={{ float: "right" }}>
                                                <button className="button dark ripple-effect" onClick={() => this.props.history.goBack()}><i className="icon-material-outline-arrow-back"></i> back</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Show all posts */}
                                    <div className='content'>
                                        <ul className='dashboard-box-list'>
                                            <Table striped bordered hover>
                                                <thead>

                                                    <tr>
                                                        <th>SrNo</th>
                                                        <th>Name</th>
                                                        <th></th>

                                                    </tr>
                                                    {users}
                                                </thead>
                                                <tbody>
                                                    {/* {questRow} */}

                                                </tbody>
                                            </Table>
                                        </ul>
                                    </div>
                                </div>
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
