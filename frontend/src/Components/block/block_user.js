import React from 'react'
import ls from 'local-storage'
import { getUserById,patchUser, patchService,getServices, getPosts, patchPost, setUserDetails } from '../../Actions'
import { ToastContainer, toast } from 'react-toastify';

export class BlockUser extends React.Component {
    constructor() {
        super();
        this.state = {
            userData: {},
            wishlistId: '',
            isWishlisted: false
        }
        this.handleBlock = this.handleBlock.bind(this);
        this.blockServices = this.blockServices.bind(this)
        this.blockPosts = this.blockPosts.bind(this)
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

    blockPosts(){
        let { userId } = this.props.userData
        const filter ={
            where:{
                userId
            }
        }
        getPosts(filter,(err,res)=>{
            if(err){
                alert('something went wrong!')
                return
            }

            for(let i=0;i<=res.length-1;i++){
                let block = res[i].block?res[i].block:[]
                block.push(ls.get('userId'))
                patchPost(res[i].postId,{block},()=>{} )
            }
        })
    }

    blockServices(){
        let { userId } = this.props.userData
        const filter ={
            where:{
                userId
            }
        }
        getServices(filter,(err,res)=>{
            if(err){
                return alert('something went wrong!')
                
            }

            for(let i=0;i<=res.length-1;i++){
                let block = res[i].block?res[i].block:[]
                block.push(ls.get('userId'))
                patchService(res[i].serviceId,{block},()=>{} )
            }
        })
    }

    handleBlock() {
        let { userId } = this.props.userData

        getUserById(ls.get('userId'),{},(err,user)=>{
            if(err || !user){
                alert('Unable to block, Try again later!')
            }

            const block = user.block?user.block:[]
            block.push(userId)

            patchUser(ls.get('userId'),{block},(err,pdata)=>{
                if(err){
                    console.log('something went wrong!')
                    this.notifyErr('something went wrong!')
                    return
                }
                this.notifySucc('blocked successfully')
                setUserDetails(userId,()=>{
                    
                })
                setTimeout(()=>{this.props.history.push('/freelancer/service_search')},2000) 
            })


        })

        let userprofile =  JSON.parse(ls.get('userProfile'))
        let block = userprofile.block?userprofile.block:[]
        // this.blockServices()
        // this.blockPosts()
        // if(Array.isArray(block)){
        //     block.push(ls.get('userId'))
        //     patchUser(userId,{block},(err,pdata)=>{
        //         if(err){
        //             console.log('something went wrong!')
        //             this.notifyErr('something went wrong!')
        //             return
        //         }
        //         this.notifySucc('blocked successfully')
        //         setUserDetails(ls.get('userId'),()=>{
                    
        //         })
        //         setTimeout(()=>{this.props.history.push('/freelancer/service_search')},2000) 
        //     })

        //     this.blockPosts()
        //     this.blockServices()
        
        // }else{
        //     return this.notifyErr('something went wrong!')
            
        // }
    }

    render() {
        
        return (
            <div>
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
                <h3>Block User</h3>

                {/* <!-- Bookmark Button --> */}
                <button onClick={this.handleBlock} className="bookmark-button margin-bottom-25">
                    
                    <span className="bookmark-text">Block</span>
                    <span className="bookmarked-text">Block</span>
                </button>
            </div>
        )
    }
}

