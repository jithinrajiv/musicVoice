myApp.controller("mainController", function($scope, $firebaseArray) {
  var ref = new Firebase("https://musicwebgl.firebaseIO.com");
	// download the data into a local object
	$scope.messages = $firebaseArray(ref);
  // add new items to the array
  // the message is automatically added to our Firebase database!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText
    });
  };

  $scope.search = function() {
    $scope.messages.$search({
      text: $scope.newMessageText
    });
  };

});
