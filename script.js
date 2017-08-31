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
context.canvas.width = window.innerWidth - 20;
context.canvas.height = window.innerHeight - 20;

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
drawBraces();
drawFooterText();
drawNextArrow();

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
	var category = "";
	
	while (title == "" || description == "" || mnemonic == "" || author == "" || url == "" || category == "") {
		
		randomLine = Math.ceil(Math.random()*countLines);
		console.log("Selected Line Number: " + randomLine);

		selectedLine = arrLines[randomLine];
		console.log("Selected Line Text: " + selectedLine);
		
		selectedLineParts = selectedLine.split("\t");
		
		title = selectedLineParts[0];
		console.log("Title: " + title);
		title = "<strong>" + title.substring(0,1) + "</strong>" + title.substring(1,title.length);
		
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
		
		category = selectedLineParts[5];
		console.log("Category: " + category);
	}
	
	drawItAll(title, description, mnemonic, author, url, category);
	
}

function drawItAll(titleText,descriptionText,mnemonic,author,url,category) {
	
	layerStyle = document.getElementById("title").style;
	
	layerStyle.position = "absolute";
	leftCoord = Math.ceil(0.25 * window.innerWidth);
	layerStyle.left = leftCoord + "px";
	widthCoord = Math.ceil(0.5 * window.innerWidth);
	layerStyle.width = widthCoord + "px";
	topCoord = Math.ceil(0.20 * window.innerHeight);
	layerStyle.top = topCoord + "px";
	
	
	document.getElementById('title').innerHTML = "<font face='Georgia' size='7' color=#333>" + titleText + "</font><p><font face='Georgia' size='5' color=#555>" + descriptionText + "</font><p><div align=right width=100%><font face='Georgia' size='4' color=#333>" + category + " | <a href=" + url + " target='_blank'>" + mnemonic + "</a> | " + author + "</font></div>";	
	
}

function drawBraces() {
	
	size = document.getElementById("title").clientHeight;
	top_left_x = Math.ceil(0.25 * window.innerWidth);
	top_left_y = Math.ceil(0.20 * window.innerHeight);
	top_right_x = Math.ceil(0.75 * window.innerWidth);

	// Left Brace
	context.beginPath();
	context.fillStyle = "#444";
	context.font = size + "px Georgia";
	context.fillText("{", top_left_x - 80, top_left_y + (0.77*size), 50);
	
	// Right Brace
	context.beginPath();
	context.fillStyle = "#444";
	context.font = size + "px Georgia";
	context.fillText("}", top_right_x + 30, top_left_y + (0.77*size), 50);
	
}

function drawFooterText() {
	
	mnemonicCount = countMnemonics();
	
	context.beginPath();
	context.fillStyle = "white";
	context.font = "16px Georgia";
	context.fillText("Displaying " + mnemonicCount[0] + " heuristics from " + mnemonicCount[1] + " mnemonics. 'Heurist-o-matic' created by RocketBootKid. All rights and kudos to the mnemonics' original authors.", canvasDimensions.mid_x - 400, canvasDimensions.height - 50, 800);
	
}

function drawNextArrow() {
	
	nextLayer = document.getElementById("next").style;
	
	nextLayer.position = "absolute";
	leftCoord = Math.ceil(0.75 * window.innerWidth) + 100;
	nextLayer.left = leftCoord + "px";
	topCoord = Math.ceil(0.20 * window.innerHeight) + (document.getElementById("title").clientHeight)/2 - 28;
	nextLayer.top = topCoord + "px";
	nextLayer.height = "50px";
	
	document.getElementById("next").innerHTML = "<a href='' alt='Random Heuristic' title='Random Heuristic'><font face='Georgia' size='7' color='#333'><strong>></strong></font></a>";
}

function countMnemonics() {
	
	allHeuristics = document.getElementById("content").innerHTML;
	arrLines = allHeuristics.split("\n");
	countLines = arrLines.length;
	
	currentMnemonic = "";
	mnemonicCount = 0;
	
	for (l = 0; l < countLines; l++) {
		
		lineText = arrLines[l];
		selectedLineParts = lineText.split("\t");
		mnemonic = selectedLineParts[2];
		
		if (mnemonic != currentMnemonic) {
			currentMnemonic = mnemonic;
			mnemonicCount++;
		}
	}
	
	return [countLines, mnemonicCount];
	
}