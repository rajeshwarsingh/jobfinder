'use strict';

const helper = require('./helper');

class Routes{

	constructor(app){
		this.app = app;
	}

	appRoutes(){
		this.app.get('/', (request,response) => {
			response.render('index');
		});

		this.app.get('/home/:userId', (request,response) => {
			let userId = request.params.userId;			
			if (userId == '') {
				response.redirect('/');
			}else{
	           	helper.userSessionCheck( { 
	           		userId : userId,
	           	}, (error,result)=>{	           		
	           		if (error || result === null) {
	           			response.redirect('/');
	           		}else{
	           			response.render('home');
	           		}
				});
	        }
		});

		this.app.post('/usernameCheck',(request,response) =>{

			if (request.body.username === "") {
				response.status(412).json({
					error : true,
					message : `username cant be empty.`
				});
			} else {
				helper.userNameCheck( {
					username : request.body.username.toLowerCase()
				}, (count)=>{

					let result = {};
					
					if (count > 0) {
						result.error = true;
						result.message = 'This username is alreday taken.';
						response.status(401).json(result);
					} else {
						result.error = false;
						result.message = 'This username is available.';
						response.status(200).json(result);
					}
				});
			}
		});

		this.app.post('/registerUser',(request,response) =>{

			const data = {
				username : (request.body.username).toLowerCase(),
				password : request.body.password
			};

			let registrationResponse = {}

			if(data.username === '') {

	            registrationResponse.error = true;
	            registrationResponse.message = `username cant be empty.`;
	            response.status(412).json(registrationResponse);

	        }else if(data.password === ''){
				            
	            registrationResponse.error = true;
	            registrationResponse.message = `password cant be empty.`;
	            response.status(412).json(registrationResponse);

	        }else{
	        	
	        	data.timestamp = Math.floor(new Date() / 1000);
				data.online = 'Y' ;
				data.socketId = '' ;

	           	helper.registerUser( data, (error,result)=>{

	           		if (error) {

           				registrationResponse.error = true;
	            		registrationResponse.message = `User registration unsuccessful,try after some time.`;
	           			response.status(417).json(registrationResponse);
	           		}else{

	           			registrationResponse.error = false;
	           			registrationResponse.userId = result.insertedId;
	            		registrationResponse.message = `User registration successful.`;
	           			response.status(200).json(registrationResponse);
	           		}
				});
	        }
		});

		this.app.post('/login',(request,response) =>{

			const data = {
				username : (request.body.username).toLowerCase(),
				password : request.body.password
			};

			let loginResponse = {}

			if(data.username === '' || data.username === null) {

	            loginResponse.error = true;
	            loginResponse.message = `username cant be empty.`;
	            response.status(412).json(loginResponse);

	        }else if(data.password === '' || data.password === null){
				            
	            loginResponse.error = true;
	            loginResponse.message = `password cant be empty.`;
	            response.status(412).json(loginResponse);

	        }else{

	           	helper.login( data, (error,result)=>{

	           		if (error || result === null) {

	           			loginResponse.error = true;
	            		loginResponse.message = `Invalid username and password combination.`;
	           			response.status(401).json(loginResponse);
	           		}else{
	           			loginResponse.error = false;
	           			loginResponse.userId = result._id;
	            		loginResponse.message = `User logged in.`;
	           			response.status(200).json(loginResponse);
	           		}
				});
	        }
		});

		this.app.post('/userSessionCheck',(request,response) =>{

			let userId = request.body.userId;
			let sessionCheckResponse = {}
			
			if (userId == '') {

				sessionCheckResponse.error = true;
	            sessionCheckResponse.message = `User Id cant be empty.`;
	            response.status(412).json(sessionCheckResponse);

			}else{

	           	helper.userSessionCheck( { 
	           		userId : userId,
	           	}, (error,result)=>{
	           		
	           		if (error || result === null) {

	           			sessionCheckResponse.error = true;
	            		sessionCheckResponse.message = `User is not logged in.`;
	           			response.status(401).json(sessionCheckResponse);
	           		}else{

	           			sessionCheckResponse.error = false;
	           			sessionCheckResponse.username = result.username;
	            		sessionCheckResponse.message = `User logged in.`;
	           			response.status(200).json(sessionCheckResponse);
	           		}
				});
	        }
		});
		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;