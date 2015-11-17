//webgl controller to change depending on song that is played
myApp.controller("webGLController", function($scope) {
	var canvas = document.getElementById("canvas");
	var gl = canvas.getContext("webgl");
	var buffer = gl.createBuffer();
	var texture = gl.createTexture();

	
	var h1 = document.querySelector("h1");
	var tag = document.querySelector("label");
	var h2 = document.querySelector("h2");

	var color = gl.clearColor(.7, .4, .4, .4);
	var color1 =  gl.clearColor(.3, .8, .7, .6)
 		gl.clearColor(1, 1, 1, 1);
    	gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	$scope.colorChange = function(){
 		gl.clearColor(1, 1, 1, 1);
    	gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		console.log("colorChange1");
	
	};

	var random = Math.random();
	$scope.colorChange1 = function(){
 		gl.clearColor(random, random, random, 1.0);
    	gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		console.log("colorChange1");
	};

	$scope.colorChange2 = function(){
 		gl.clearColor(0.4, 0.3, 0.2, 0.7);
    	gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		console.log("colorChange1");
	};


    $scope.loadShaderFromDOM = function(id){
        
          
    }
})



