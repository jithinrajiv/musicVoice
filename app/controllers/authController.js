myApp.controller("authController", function($scope,$firebaseAuth,$firebaseArray,$firebaseObject,$location) {
  var ref = new Firebase("https://musicwebgl.firebaseIO.com");
  // create an instance of the authentication service
  var auth = $firebaseAuth(ref);
  $scope.authObj = $firebaseAuth(ref);
  var obj = $firebaseObject(ref);

  var authData = $scope.authObj.$getAuth();

  if (authData) {
    console.log("Logged in as:", authData.uid);
  } else {
    console.log("Logged out");
  }
  $scope.fName = ',' + " " + authData.facebook.displayName;

  $scope.logout = function() {
    console.log("check")
    $scope.authObj.$unauth()
    console.log("logedout")
    $location.path('/');
  }

// login with Facebook =========================
  $scope.fLogin = function() {
  auth.$authWithOAuthPopup("facebook").then(function(authData) {
    console.log("Logged in as:", authData.uid);
    $location.path('/music');
  }).catch(function(error) {
    console.log("Authentication failed:", error);
  });
}

  $scope.login = function() {
    $scope.authObj.$authWithPassword({
      email: $scope.email,
      password: $scope.password
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
      $location.path('/music');
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }


  myApp.factory('facebookService', function($q) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }


    }
});
});