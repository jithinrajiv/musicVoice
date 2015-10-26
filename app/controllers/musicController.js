myApp.controller("musicController", function($scope) {  

  $scope.said = '...';

  $scope.helloWorld = function() {
    $scope.said = "Hello world!";
  }

  $scope.turnon = function() {
    $scope.said = "turn on";
  }

  $scope.commands = {
    'hello (world)': function() {
      if (typeof console !== "undefined") console.log('hello world!')
      $scope.$apply($scope.helloWorld);
    },
    'hey': function() {
      if (typeof console !== "undefined") console.log('hey!')
      $scope.$apply($scope.helloWorld);
    },
    'turn on': function() {
      if (typeof console !== "undefined") console.log('Turn on')
      $scope.$apply($scope.turnon);
    }
  };

  $scope.said = $scope.commandText;

  annyang.debug();
  annyang.init($scope.commands);
  annyang.start();

});