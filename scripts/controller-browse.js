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
		$scope.task = task;
		var addthis = task;
		fbTasks.$add(addthis);
		
		
	}
	$scope.team = function() {
		
	}
	
});