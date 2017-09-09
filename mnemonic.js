var query = window.location.search;
mnemonic = query.substring(2).toUpperCase();
//console.log(mnemonic);

document.title = "Heurist-o-matic | " + mnemonic;

displayMnemonics(mnemonic);
offset = moveBackground();
//drawBraces(offset);
drawNextArrow()

function displayMnemonics(mnemonic) {
	
	output = "";
	data = document.getElementById("content").innerHTML;
	arrLines = data.split("|||");
	//console.log(arrLines.length);
	
	for (l = 0; l < arrLines.length; l++) {
		components = arrLines[l].split("|");
		
		component = components[2].replace(/ /g, ''); // Remove spaces
		component = component.replace(/\//g, ''); // Remove forward slash
		component = component.replace(/&amp;/g, ''); // Remove ampersand
		component = component.replace(/\./g, ''); // Remove full stop
		//console.log(component);
		
		if (component == mnemonic) {
			output += "<font face='Georgia' size='4' color=black><strong>" + components[0] + "</strong></font> <font face='Georgia' size='4' color=#333>" + components[1] + "</font><p/>";
			title = components[2];
			author = components[3];
			category = components[5];
			url = components[4];
			
		}		
	}
	
	if (output != "") {
	
		// Set layer contents
		document.getElementById("output").innerHTML = "<div align=center><font face='Georgia' size='7' color=black><a href='" + url + "'>" + title + "</a></font><p><font face='Georgia' size='5' color=black>" + author + " | " + category + "</font><p></div>"
		document.getElementById("output").innerHTML += "<div>" + output + "</div>";
		
		// Position Layer
		layerStyle = document.getElementById("output").style;
		layerStyle.position = "absolute";
		width = document.getElementById("output").clientWidth;
		if (width > window.innerWidth - 200) {
			leftCoord = Math.ceil(0.1 * window.innerWidth);
			layerStyle.left = leftCoord + "px";
			widthCoord = Math.ceil(0.8 * window.innerWidth);
			layerStyle.width = widthCoord + "px";
		} else {
			leftCoord = Math.ceil((window.innerWidth - width)/2);
			layerStyle.left = leftCoord + "px";		
		}
		topCoord = Math.ceil(0.05 * window.innerHeight);
		layerStyle.top = topCoord + "px";
	
	} else { // 
		
		document.getElementById("output").innerHTML = "<div align=center><font face='Georgia' size='6' color=black>Oops, there was a problem. <a href='mnemonics'>Try another mnemonic?</a></font><p></div>"
		topCoord = Math.ceil(0.25 * window.innerHeight);
		leftCoord = Math.ceil(0.25 * window.innerWidth);
		widthCoord = Math.ceil(0.5 * window.innerWidth);
		document.getElementById("output").style.width = widthCoord + "px";
		document.getElementById("output").style.left = leftCoord + "px";
		document.getElementById("output").style.position = "absolute";
		document.getElementById("output").style.top = topCoord + "px";
		
	}
	
}

function moveBackground() {
	
	// if height of text means it goes off the bottom of the page, or is lost in the dark horizons, need to move the canvas down.
	
	// Get Y pos and height of Div, and same from canvas
	contentYPos = document.getElementById("output").style.top; 
	contentYPos = contentYPos.substring(0, 2); // Remove the px
	contentHeight = document.getElementById("output").clientHeight;
	total = parseInt(contentYPos) + parseInt(contentHeight);
	
	canvasHeight = window.innerHeight;
	offset = total - (parseInt(canvasHeight)/2);
	
	if (offset < 0) {
		offset = 8;
	}
	offset = offset.toString() + "px";
	
	document.getElementById("myCanvas").style.position = "absolute";
	document.getElementById("myCanvas").style.top = offset;
	document.getElementById("myCanvas").style.zIndex = -100;
	
	return offset;
	
	
}

function drawBraces() {
	
	size = 92;
	top_left_x = Math.ceil(window.innerWidth/2 - 400);
	top_left_y = Math.ceil(0.05 * window.innerHeight);
	top_right_x = Math.ceil(window.innerWidth/2 + 400);
	console.log("Top B: " + top_left_y);

	// Left Brace
	context.beginPath();
	context.fillStyle = "#444";
	context.font = size + "px Georgia";
	context.fillText("{", top_left_x, top_left_y - offset, 50);
	
	// Right Brace
	context.beginPath();
	context.fillStyle = "#444";
	context.font = size + "px Georgia";
	context.fillText("}", top_right_x, top_left_y - offset, 50);
	
}

function drawNextArrow() {
	
	nextLayer = document.getElementById("next").style;
	
	nextLayer.position = "absolute";
	leftCoord = Math.ceil(window.innerWidth/2 + 400) + 60;
	nextLayer.left = leftCoord + "px";
	topCoord = Math.ceil(0.05 * window.innerHeight) + 22;
	nextLayer.top = topCoord + "px";
	nextLayer.height = "50px";
	
	document.getElementById("next").innerHTML = "<a href='mnemonics' alt='Show me a random Heuristic' title='Show me a random Heuristic'><font face='Georgia' size='7' color='#333'><strong>></strong></font></a>";
	
}