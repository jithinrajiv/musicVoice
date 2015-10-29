//webgl controller to change depending on song that is played
myApp.controller("webGLController", function($scope) {
	var canvas = document.getElementById("canvas");
	var gl = canvas.getContext("webgl");
	console.log(gl);
	// gl.clearColor(0, 0, 0, 1);
	// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	console.log("status check");

	// gl.clearColor(4, 3, 4, 3); white

	// var colorChange = function(){
	// 	setTimeout(function(){
	// 		gl.clearColor(1, 0, 0, 1);
	// 		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

 // 			}, 3000);
	// }
	// colorChange();
})



