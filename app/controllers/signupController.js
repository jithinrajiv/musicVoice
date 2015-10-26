myApp.controller("signupController", function($scope, $firebaseAuth,$firebaseObject,$location) {
	var ref = new Firebase("https://musicwebgl.firebaseIO.com");
	// create an instance of the authentication service
	$scope.authObj = $firebaseAuth(ref);
	var obj = $firebaseObject(ref);

	$scope.addPerson = function() {

		$scope.authObj.$createUser({
		  email: $scope.email,
		  password: $scope.password
		}).then(function(userData) {
		  console.log("User " + userData.uid + " created successfully!");

		  return $scope.authObj.$authWithPassword({
		    email: $scope.email,
		    password: $scope.password
		  });
		}).then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		}).catch(function(error) {
		  console.error("Error: ", error);
		});

	}

})