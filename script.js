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

for (h = 0; h < horizonCount; h++) {
	//console.log("Horizon " + h + " Start Y: " + horizonStartY);
	drawHorizon();
	
	// Set / reset parameters for next horizon
	horizonStartY = staticHorizonStartY + (h * horizonDeltaY) + (Math.ceil(Math.random()*2*horizonDeltaY)) - horizonDeltaY; // Make next horizon lower down
	horizonStartX = 0; // Start back at left hand end
	segmentLength = segmentLength + horizonSmootheningFactor; // Make closer horizons smoother
	horizonDeltaY = horizonDeltaY + horizonNeareningFactor;

}

drawItAll("External Platform Software", "Software components and configurations that are not a part of the shipping product, but are required (or optional) in order for the product to work: operating systems, concurrently executing applications, drivers, fonts, etc.", "SFDiPOT","James Bach","http://www.satisfice.com/tools/htsm.pdf");

//drawTitle("External Platform Software");
//drawDescription("Software components and configurations that are not a part of the shipping product, but are required (or optional) in order for the product to work: operating systems, concurrently executing applications, drivers, fonts, etc.");
//drawStrapline("SFDiPOT","James Bach","http://www.satisfice.com/tools/htsm.pdf");

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

    console.log("Segment Color: " + color);

    return color;
    
}

function drawItAll(titleText,descriptionText,mnemonic,author,url) {
	
	layerStyle = document.getElementById("title").style;
	
	layerStyle.position = "absolute";
	layerStyle.left = "25%";
	layerStyle.width = "50%";
	layerStyle.top = "20%";
	
	document.getElementById('title').innerHTML = "<font face='Georgia' size='7' color=#333>" + titleText + "</font><p><font face='Georgia' size='5' color=#555>" + descriptionText + "</font><p><div align=right width=100%><font face='Georgia' size='4' color=#555><a href=" + url + " target='_blank'>" + mnemonic + "</a> | " + author + "</font></div>";	
	
}

function drawTitle(titleText) {

	document.getElementById("title").style.position = "absolute";
	document.getElementById("title").style.left = "25%";
	document.getElementById("title").style.width = "50%";
	document.getElementById("title").style.top = "20%";
	
	document.getElementById('title').innerHTML = "<font face='Georgia' size='7' color=#333>" + titleText + "</font>";

}

function drawDescription(descriptionText) {
	
	document.getElementById("description").style.position = "absolute";
	document.getElementById("description").style.left = "25%";
	document.getElementById("description").style.width = "50%";
	document.getElementById("description").style.top = "27%";
	
	document.getElementById('description').innerHTML = "<font face='Georgia' size='5' color=#555>" + descriptionText + "</font>";
	
}

function drawStrapline(mnemonic,author,url) {
	
	document.getElementById("footer").style.position = "absolute";
	document.getElementById("footer").style.left = "25%";
	document.getElementById("footer").style.width = "50%";
	document.getElementById("footer").style.top = "50%";
	document.getElementById("footer").style.textAlign = "right";
	
	document.getElementById('footer').innerHTML = "<font face='Georgia' size='5' color=#555><a href=" + url + " target='_blank'>" + mnemonic + "</a> | " + author + "</font>";	
	
	
}
