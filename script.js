/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Main

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// Make canvas size of window
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;

var canvasDimensions = {
		width: window.innerWidth,
		mid_x: window.innerWidth/2,
		mid_y: window.innerHeight/2,
		height: window.innerHeight
	};

var segmentLength = 18; // How long each segment of a horison is
var segmentCount = Math.ceil(canvasDimensions.width/segmentLength); // Determine how many segments fit on screen
var horizonCount = 12;
var horizonStartY = canvasDimensions.mid_y;
var staticHorizonStartY = canvasDimensions.mid_y;
var horizonStartX = 0;
var horizonChangeMax = 15; // Amount by which points on horizon can vary +/- vertically
var horizonDeltaY = 10; // Amount by which different horizons differ vertically
var horizonSmootheningFactor = 4; // Amount by which nearer horizons become smoother
var horizonNeareningFactor = 1; // Amount by which nearer horizons get lower

drawSky();
drawHills();
getHeuristic();

// ******************************************************************************
//                              FUNCTIONS
// ******************************************************************************

function drawSky() {
	
	context.beginPath();
	var sky = context.createLinearGradient(0, 0, 0, canvasDimensions.height/2);
	sky.addColorStop(0, "#3366ff");
	sky.addColorStop(0.7, "#ffd1b3");
	sky.addColorStop(1, "orange");
	context.fillStyle = sky;
	context.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height*2/3);
	
}

function drawHills() {
	
	for (h = 0; h < horizonCount; h++) {
		
		drawHorizon();
		
		// Set / reset parameters for next horizon
		horizonStartY = staticHorizonStartY + (h * horizonDeltaY) + (Math.ceil(Math.random()*2*horizonDeltaY)) - horizonDeltaY; // Make next horizon lower down
		horizonStartX = 0; // Start back at left hand end
		segmentLength = segmentLength + horizonSmootheningFactor; // Make closer horizons smoother
		horizonDeltaY = horizonDeltaY + horizonNeareningFactor;

	}	
	
}

function drawHorizon() {
    
	context.beginPath();
	context.moveTo(horizonStartX, horizonStartY);
	for (s = 0; s < segmentCount; s++) {
		
		horizonStartX = horizonStartX + segmentLength;
		horizonStartY = horizonStartY + (Math.ceil(Math.random()*2*horizonChangeMax)) - horizonChangeMax;
		
		context.lineTo(horizonStartX, horizonStartY); // Draw segment
		
	}
	
	// Draw bottom corners
	context.lineTo(canvasDimensions.width, canvasDimensions.height); // Bottom right
	context.lineTo(0, canvasDimensions.height); // Bottom left
	
	context.closePath();
	
	context.fillStyle = generateSegmentColor(h);
		
	context.fill();
     
}

function generateSegmentColor(horizonCount) {
    
	// Generates a slowly darkening gray color hex string

	var value = 14 - horizonCount;
    color = "#" + value.toString(16) + value.toString(16) + value.toString(16);
    return color;
    
}

function getHeuristic() {
	
	allHeuristics = document.getElementById("content").innerHTML;
	arrLines = allHeuristics.split("\n");
	countLines = arrLines.length;
	countLines = countLines - 1;
	console.log("Total Lines: " + countLines);
	
	var title = "";
	var description = "";
	var mnemonic = "";
	var author = "";
	var url = "";
	
	while (title == "" || description == "" || mnemonic == "" || author == "" || url == "") {
		
		randomLine = Math.ceil(Math.random()*countLines);
		console.log("Selected Line Number: " + randomLine);

		selectedLine = arrLines[randomLine];
		console.log("Selected Line Text: " + selectedLine);
		
		selectedLineParts = selectedLine.split("\t");
		
		title = selectedLineParts[0];
		console.log("Title: " + title);
		
		description = selectedLineParts[1];
		if (description && description != "" && description.substring(0, 1) == "\"") {
			description = description.substring(1, (description.length) - 1);
		}
		console.log("Description: " + description);
		
		mnemonic = selectedLineParts[2];
		console.log("Mnemonic: " + mnemonic);
		
		author = selectedLineParts[3];
		console.log("Author: " + author);
		
		url = selectedLineParts[4];
		console.log("URL: " + url);
	}
	
	drawItAll(title, description, mnemonic, author, url);
	
}

function drawItAll(titleText,descriptionText,mnemonic,author,url) {
	
	layerStyle = document.getElementById("title").style;
	
	layerStyle.position = "absolute";
	layerStyle.left = "25%";
	layerStyle.width = "50%";
	layerStyle.top = "20%";
	
	document.getElementById('title').innerHTML = "<font face='Georgia' size='7' color=#333>" + titleText + "</font><p><font face='Georgia' size='5' color=#555>" + descriptionText + "</font><p><div align=right width=100%><font face='Georgia' size='4' color=#555><a href=" + url + " target='_blank'>" + mnemonic + "</a> | " + author + "</font></div>";	
	
}
