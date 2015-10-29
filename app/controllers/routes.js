var myApp = angular.module('myApp', ['ngRoute','ngAnimate','ui.bootstrap','firebase','spotify']);
myApp.config(['$interpolateProvider','SpotifyProvider', function($interpolateProvider,SpotifyProvider){
  // $interpolateProvider used to differentiate uses for angular from express
  $interpolateProvider.startSymbol('{[{'); 
  $interpolateProvider.endSymbol('}]}'); 

  SpotifyProvider.setClientId('c8ada474be85485eb7ea62ce64f2ac63');
  SpotifyProvider.setRedirectUri('http://localhost:3000/#/music');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // If you already have an auth token
  SpotifyProvider.setAuthToken('zoasliu1248sdfuiknuha7882iu4rnuwehifskmkiuwhjg23');
}])

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : '/signin.handlebars',
				controller  : 'authController'
			})
			.when('/main', {
				templateUrl : '/message.handlebars',
				controller  : 'mainController'
			})
			.when('/signup', {
				templateUrl : '/signup.handlebars',
				controller  : 'signupController'
			})
			.when('/music', {
				templateUrl : '/music.handlebars',
				controller  : 'musicController'
			});

	});

	// create the controller and inject Angular's $scope
	myApp.controller('mainController', function($scope){

	});
	myApp.controller('formController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});
