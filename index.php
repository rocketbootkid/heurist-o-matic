<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Heurist-o-matic | Random Software Testing Heuristics</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<style>
			div#content { display:none; }
			a { text-decoration:none; }
		</style>
    </head>
    <body>
		<div id="title"></div>
		<div id="next"></div>
		<div id="content">
			<?php include ('fileloader.php'); ?>
		</div>
		
		<canvas id="myCanvas" width="2000" height="1000"></canvas>
		<script src="script.js"></script>
    </body>
</html>
