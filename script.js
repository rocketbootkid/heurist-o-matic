getHeuristic();
drawBraces();
drawFooterText();
drawNextArrow();
drawAllLink();

function getHeuristic(data) {
	
	var data = document.getElementById("content").innerHTML;
	
	var arrLines = data.split("|||");
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
		
		selectedLineParts = selectedLine.split("|");
		
		title = selectedLineParts[0];
		console.log("Title: " + title);
		title = title.trim();
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
	
	lctrimmedMnemonic = squishMnemonic(mnemonic);
	
	
	document.getElementById('title').innerHTML = "<font face='Georgia' size='7' color=#333>" + titleText + "</font><p><font face='Georgia' size='5' color=#555>" + descriptionText + "</font><p><div align=right width=100%><font face='Georgia' size='4' color=#333>" + category + " | <a href='mnemonic.html?=" + lctrimmedMnemonic + "' target='_blank' title='Open source article'>" + mnemonic + "</a> | " + author + "</font></div>";	
	
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

function drawNextArrow() {
	
	nextLayer = document.getElementById("next").style;
	
	nextLayer.position = "absolute";
	leftCoord = Math.ceil(0.75 * window.innerWidth) + 100;
	nextLayer.left = leftCoord + "px";
	topCoord = Math.ceil(0.20 * window.innerHeight) + (document.getElementById("title").clientHeight)/2 - 28;
	nextLayer.top = topCoord + "px";
	nextLayer.height = "50px";
	
	document.getElementById("next").innerHTML = "<a href='' alt='Show me another random Heuristic' title='Show me another random Heuristic'><font face='Georgia' size='7' color='#333'><strong>></strong></font></a>";
	
}

function drawAllLink() {
	
	nextLayer = document.getElementById("all").style;
	
	nextLayer.position = "absolute";
	leftCoord = Math.ceil(0.25 * window.innerWidth) - 120;
	nextLayer.left = leftCoord + "px";
	topCoord = Math.ceil(0.20 * window.innerHeight) + (document.getElementById("title").clientHeight)/2 - 28;
	nextLayer.top = topCoord + "px";
	nextLayer.height = "50px";

	document.getElementById("all").innerHTML = "<a href='mnemonics' alt='Show me all Mnemonics' title='Show me all Mnemonics'><font face='Georgia' size='7' color='#333'><strong><</strong></font></a>";	
	
}

function squishMnemonic(mnemonic) {
	mnemonic = mnemonic.replace(/ /g, ''); // Remove spaces
	mnemonic = mnemonic.replace(/\//g, ''); // Remove forward slash
	mnemonic = mnemonic.replace(/&amp;/g, ''); // Remove ampersand
	mnemonic = mnemonic.replace(/\./g, ''); // Remove full stop
	
	return mnemonic.toLowerCase();
	
}
