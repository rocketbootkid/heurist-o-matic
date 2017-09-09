drawItAll();
drawBraces();
drawNextArrow();

function drawItAll(titleText,descriptionText,mnemonic,author,url,category) {
	
	layerStyle = document.getElementById("title").style;
	
	layerStyle.textAlign = "center";
	layerStyle.position = "absolute";
	leftCoord = Math.ceil(0.25 * window.innerWidth);
	layerStyle.left = leftCoord + "px";
	widthCoord = Math.ceil(0.5 * window.innerWidth);
	layerStyle.width = widthCoord + "px";
	topCoord = Math.ceil(0.20 * window.innerHeight);
	layerStyle.top = topCoord + "px";
	
	content = "<font face='Georgia' size='6' color=#333>";
	content += "<a href='../mnemonic.html?=aacid' title='View Mnemonic'>AACID</a> | ";
	content += "<a href='../mnemonic.html?=ccdiseari' title='View Mnemonic'>CCD IS EARI</a> | ";
	content += "<a href='../mnemonic.html?=cidtestd' title='View Mnemonic'>CIDTESTD</a> | ";
	content += "<a href='../mnemonic.html?=crusspicstmpl' title='View Mnemonic'>CRUSSPIC SMTPL</a> | ";
	content += "<a href='../mnemonic.html?=duffsscra' title='View Mnemonic'>DUFFSSCRA</a> | ";
	content += "<a href='../mnemonic.html?=failure' title='View Mnemonic'>FAILURE</a> | ";
	content += "<a href='../mnemonic.html?=fcccutsvids' title='View Mnemonic'>FCC CUTS VIDS</a> | ";
	content += "<a href='../mnemonic.html?=fewhiccupps' title='View Mnemonic'>FEW HICCUPPS</a> | ";
	content += "<a href='../mnemonic.html?=fiblots' title='View Mnemonic'>FIBLOTS</a> | ";
	content += "<a href='../mnemonic.html?=islicedupfun' title='View Mnemonic'>I SLICED UP FUN</a> | ";
	content += "<a href='../mnemonic.html?=mcoaster' title='View Mnemonic'>MCOASTER</a> | ";
	content += "<a href='../mnemonic.html?=mutii' title='View Mnemonic'>MUTII</a> | ";
	content += "<a href='../mnemonic.html?=mrqcompgrabcrr' title='View Mnemonic'>MR.Q COMP GRABC R&R</a> | ";
	content += "<a href='../mnemonic.html?=paolo' title='View Mnemonic'>PAOLO</a> | ";
	content += "<a href='../mnemonic.html?=proofla' title='View Mnemonic'>PROOFLA</a> | ";
	content += "<a href='../mnemonic.html?=rcrcrc' title='View Mnemonic'>RCRCRC</a> | ";
	content += "<a href='../mnemonic.html?=rimgea' title='View Mnemonic'>RIMGEA</a> | ";
	content += "<a href='../mnemonic.html?=rstllll' title='View Mnemonic'>RSTLLLL</a> | ";
	content += "<a href='../mnemonic.html?=sackedcows' title='View Mnemonic'>SACKED COWS</a> | ";
	content += "<a href='../mnemonic.html?=slime' title='View Mnemonic'>SLIME</a> | ";
	content += "<a href='../mnemonic.html?=sfdpot' title='View Mnemonic'>SFDPOT</a> | ";
	content += "<a href='../mnemonic.html?=spies' title='View Mnemonic'>SPIES</a> | ";
	content += "<a href='../mnemonic.html?=vvvvvvvvvv' title='View Mnemonic'>VVVVVVVVVV</a> | ";
	content += "<a href='../mnemonic.html?=wwwwwhke' title='View Mnemonic'>WWWWWH/KE</a>";
	content += "</font></div>";	
	
	document.getElementById('title').innerHTML = content;
	
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
	
	document.getElementById("next").innerHTML = "<a href='..' alt='Show me a random Heuristic' title='Show me a random Heuristic'><font face='Georgia' size='7' color='#333'><strong>></strong></font></a>";
	
}