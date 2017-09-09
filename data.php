<?php

	$arrLines = file('Mnemonics.txt');
	
	$outtext = "";

	foreach ($arrLines as $line) {
		
		$arrAttributes = explode("\t", $line);
		
		foreach ($arrAttributes as $attribute) {
			echo $attribute . "|";
		}	
		
		echo "||";
		
	}

?>