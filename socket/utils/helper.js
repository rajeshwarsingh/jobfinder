/*
* Showing online User using Nodejs and Socket.io
* @author Shashank Tiwari
*/

'use strict';

class Helper{

	constructor(){
		this.Mongodb = require("./db");
	}

	/*
	* Name of the Method : userNameCheck
	* Description : To check if the username is available or not.
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/
	userNameCheck(data,callback){
		this.Mongodb.onConnect( (db,ObjectID,client) => {
			const collection = db.collection('User');
			collection.find(data).count( (err, result) => {
				client.close();
				callback(result);
			});
		});
	}

	/*
	* Name of the Method : login
	* Description : login the user.
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/
	login(data,callback){
		console.log(data);
		this.Mongodb.onConnect( (db,ObjectID,client) => {
			const collection = db.collection('User');
			collection.findAndModify( data ,[], {$set: {'online': 'Y'}},{},(err, result) => {
				client.close();
				callback(err,result.value);
			});
		});
	}

	/*
	* Name of the Method : registerUser
	* Description : register the User
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/
	registerUser(data,callback){
		this.Mongodb.onConnect( (db,ObjectID,client) => {
			const collection = db.collection('User');
			collection.insertOne(data, (err, result) =>{
				client.close();
				callback(err,result);
			});
		});
	}

	/*
	* Name of the Method : userSessionCheck
	* Description : to check if user is online or not.
	* Parameter : 
	*		1) data query object for MongDB
	*		2) callback function
	* Return : callback 
	*/
	userSessionCheck(data,callback){
		this.Mongodb.onConnect( (db,ObjectID,client) => {
			const collection = db.collection('User');
			collection.findOne( { _id : (data.userId) , online : 'Y'}, (err, result) => {
				client.close();
				callback(err,result);
			});
		});
	}


	/*
	* Name of the Method : getUserInfo
	* Description : to get information of single user.
	* Parameter : 
	*		1) userId of the user
	*		2) callback function
	* Return : callback 
	*/
	getUserInfo(userId,callback){
		this.Mongodb.onConnect( (db,ObjectID,client) => {
			const collection = db.collection('User');
			collection.findOne( { _id : (userId)}, (err, result) => {
				client.close();
				callback(err,result);
			});
		});
	}

	/*
	* Name of the Method : addSocketId
	* Description : Updates the socket id of single user.
	* Parameter : 
	*		1) userId of the user
	*		2) callback function
	* Return : callback 
	*/
	addSocketId(data,callback){
		this.Mongodb.onConnect( (db,ObjectID,client,) => {
			const collection = db.collection('User');
			// console.log('***************User',data)
			collection.update( { _id : (data.id)}, data.value ,(err, result) => {
				// console.log('check here:',err,result)
				client.close();
				callback(err,result.result);
			});
		});
	}

		
	/*
	* Name of the Method : logout
	* Description : To logout the loggedin user.
	* Parameter : 
	*		1) userID
	*		2) callback function
	* Return : callback 
	*/
	logout(userID,callback){
		
		const data = {
  			$set :{
  				online : 'N'
  			}
  		};
		this.Mongodb.onConnect( (db,ObjectID,client) => {
			const collection = db.collection('User');			
			collection.update( {_id : (userID)}, data ,(err, result) => {
				client.close();
				callback(err,result.result);
			});
		});
	}
	
	/*
	* Name of the Method : getChatList
	* Description : To get the list of online user.
	* Parameter : 
	*		1) userId (socket id) of the user
	*		2) callback function
	* Return : callback 
	*/
	getChatList(userId,callback){		
		this.Mongodb.onConnect((db,ObjectID,client) => {
			console.log(userId);
			const collection = db.collection('User');
			collection.find({_id:{ 
							$ne:(userId)
						}
					},{ username:1,online: 1,socketId:1}).toArray((error, result) => {
				collection.find({
					_id:{ 
							$ne:(userId)
						}
					},{socketId: 1}).toArray((error, queryResult) => { 
					client.close();
					callback(error,{
						User : result,
						socketIds : queryResult
					});
				});
			});
		});
	}

	isUserLoggedOut(userSocketId,callback){
		this.Mongodb.onConnect( (db,ObjectID,client) => {
			const collection = db.collection('User');
			collection.findAndModify( { socketId: userSocketId} ,[], {$set: {'online': 'N'}},{},(error, result) => {
			//db.collection('User').findOne({ socketId: userSocketId},(error, result) => {
				client.close();
				if (error) {
					callback({loggedOut:true});
				}else{
					if (result===null) {
						callback({loggedOut:true});
					}else{
						if (result.online === 'Y') {
							callback({loggedOut:false});
						}else{
							callback({loggedOut:true});
						}
					}					
				}
			});
		});
	}
}

module.exports = new Helper();