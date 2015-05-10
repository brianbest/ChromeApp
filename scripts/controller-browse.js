'use strict';

app.controller('BrowseController', function($scope,Auth){
	
	if(Auth.signedIn){
		
		$('#modal-login').modal('show');
		
	}
	
	$scope.regNew = false;
	$scope.login = function(user){
		if($scope.regNew){
			console.log('registering new user');
			Auth.register(user).then(function(){
				$('#modal-login').toggle();
			},function(err) {
				alert(err);
			});
		}else{
			console.log('loging in user');
		 	Auth.login(user).then(function(){
				$('#modal-login').toggle();
			},function(err) {
				alert(err);
			});
		}
	}
	
});