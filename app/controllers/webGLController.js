//webgl controller to change depending on song that is played
myApp.controller("webGLController", function($scope) {
	var canvas = document.getElementById("canvas");
	var gl = canvas.getContext("webgl");
	var buffer = gl.createBuffer();
	var texture = gl.createTexture();

	console.log(gl);
	console.log("status check");

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
	var h1 = document.querySelector("h1");
	var tag = document.querySelector("label");
	var h2 = document.querySelector("h2");

	h1.style.color = '#000';
	h2.style.color = '#000';
	tag.style.color = '#000';

	};

	var random = Math.random();
	$scope.colorChange1 = function(){
 		gl.clearColor(random, random, random, 1.0);
    	gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		console.log("colorChange1");
		var h1 = document.querySelector("h1");
		var tag = document.querySelector("label");
		var h2 = document.querySelector("h2");
		h1.style.color = '#fff';
		h2.style.color = '#fff';
		tag.style.color = '#fff';
	};

	$scope.colorChange2 = function(){
 		gl.clearColor(0.4, 0.3, 0.2, 0.7);
    	gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		console.log("colorChange1");
		var h1 = document.querySelector("h1");
		var tag = document.querySelector("label");
		var h2 = document.querySelector("h2");
		h1.style.color = '#fff';
		h2.style.color = '#fff';
		tag.style.color = '#fff';
	};

 function loadShaderFromDOM(id) {
            var shaderScript = document.getElementById(id);

            //if we don't find an element with the specified id
            //we do an early exit
            if(!shaderScript) {
                return null;
            }

            //loop through the children for the found DOM element and
            //build up the shader source code as a string.
            var shaderSource = "";
            var currentChild = shaderScript.firstChild;
            while(currentChild) {
                if(currentChild.nodeType == 3) {
                    //3 corresponds to TEXT_NODE
                    shaderSource += currentChild.textContent;
                }
                currentChild = currentChild.nextSibling;
            }

            var shader;
            if(shaderScript.type == "x-shader/x-fragment") {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            } else if(shaderScript.type == "x-shader/x-vertex") {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                return null;
            }

            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);

            if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }

            vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            var triangleVertices = [
                0.0, 0.5, 0.0,
                -0.5, -0.5, 0.0,
                0.5, -0.5, 0.0
            ];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
            vertexBuffer.itemSize = 3;
            vertexBuffer.numberOfItems = 3;
        



	var vertexShader = loadShaderFromDOM("shader-vs");
    var fragmentShader = loadShaderFromDOM("shader-fs");
        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, container, gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);



     function draw() {
            gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

            gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
     }

     // draw();



})



