var myApp = angular.module('myApp', ['ngRoute','ngAnimate','ui.bootstrap','ngProgress']);

myApp.config(['$interpolateProvider', function($interpolateProvider){
  // $interpolateProvider used to differentiate uses for angular from express
  $interpolateProvider.startSymbol('{[{'); 
  $interpolateProvider.endSymbol('}]}'); 
}])

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : '/signin.handlebars',
				controller  : 'mainController'
			})
			.when('/signup', {
				templateUrl : '/signup.handlebars',
				controller  : 'mainController'
			})
			.when('/rubric', {
				templateUrl : '/rubric.handlebars',
				controller  : 'rubricController'

			});
	});

	// create the controller and inject Angular's $scope
	myApp.controller('signinController', function($scope){

	});
	myApp.controller('formController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});
