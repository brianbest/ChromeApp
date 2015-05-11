'use strict';

app.controller('BrowseController', function($scope,Auth,FURL,$firebaseAuth,$firebase){
	$scope.task = 0;
	var ref = new Firebase(FURL);
    var auth = $firebaseAuth(ref);
	
	var fbTasks = $firebase(ref.child('tasks')).$asArray();
	
	if(Auth.signedIn){
		
		$('#modal-login').modal('show');
		
	}
	
	$scope.regNew = false;
	$scope.team = [];
	$scope.login = function(user){
		if($scope.regNew){
			console.log('registering new user');
			Auth.register(user).then(function(){
				$('#modal-login').modal('hide');
			},function(err) {
				alert(err);
			});
		}else{
			console.log('loging in user');
		 	Auth.login(user).then(function(){
				$('#modal-login').modal('hide');
			},function(err) {
				alert(err);
			});
		}
	};
	
	$scope.addTask = function(task) {
		console.log(Auth.user);
		//Get username
		task.user = Auth.user.uid;
		//Get task
		//Get current time
		task.time = new Date().getTime();
		//Add to firebase
		var profileRef = $firebase(ref.child('task'));
        profileRef.$set(task.user,task);
		//Add task to scope
		$scope.task = task;
		
		
		
	}
	$scope.teamActions = function() {
		//Get all team members	
		// Attach an asynchronous callback to read the data at our posts reference
		
		
		
		//Use the UID to get the latest tasks 
		
		//save to scope
	}
	
	ref.on("value", function(snapshot) {
		$scope.team = [];
		  console.log(snapshot.val());
		  var db = snapshot.val();
		  var userID = Object.keys(db.profile);
		  console.log(userID);
		  for(var y = 0; y < userID.length; y++){
			  console.log('looping');
			  console.log(db.task[userID[y]]);
			  if(db.task[userID[y]]){
				  console.log('got a match');
				  var obj = {
					  name : db.profile[userID[y]].name,
					 task : db.task[userID[y]].name,
					 time : db.task[userID[y]].time,
					 gravatar : db.profile[userID[y]].gravatar
				  }
				  console.log('pushing');
				  $scope.team.push(obj);
				  console.log($scope.team);
			  }
		  }
		  
		  
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
	
	$scope.teamActions();
	
});