'use strict';

app.controller('BrowseController', function($scope,Auth){
	$scope.task = 0;
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
		//Get username
		task.user = Auth.user;
		//Get task
		//Get current time
		task.time = new Date().getTime();
		//Add to firebase
		$scope.task = task;
		
		
	}
	$scope.team = function() {
		
	}
	
});