<?php
	//Include basic functionality to interact with sessions 
	include('PHP/verify.php');
	
	//Check if logged in, else redirect to login page
	if (!isLoggedIn())
		header("location:login.php");
		
//	session_unset();
?>
<!doctype html>
<html>
<head>
	<script type="text/javascript" data-main="js/main" src="js/libs/require/require.js"></script>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>TodoSaurus</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<script type="text/javascript" src="js/general/js_header.js"></script>
	<script type="text/javascript" src="js/general/jq_general.js"></script>
	<script type="text/javascript" src="js/general/jquery-ui-1.9.2.custom.js"></script>
	<noscript><meta http-equiv="refresh" content="0; url=/noscript"></noscript>
	<link rel="stylesheet" type="text/css" href="css/index.css"/>
	<link rel="shortcut icon" href="favicon.ico" />
</head>
<body>

	<div id="wrapper">
		<div id="top-issue">
			<div id="top-pixels"></div>
			<div id="header">
				<div id="head-logoside">
					<div id="head-logo" onclick="window.location='#'"> TodoSaurus </div>
					<div id="opt">
						
					</div>
				</div>
			</div>

		</div> <!-- End of Top-Issue -->
		<div id="content-issue">
			<div id="sidebar" >
				<div id="searchbar"><input type="text"></div>
				<div id="precontent">
					
				</div>
				<div id="footer">
					<div id="fcons">
						<div>TodoSaurus &copy 2013</div>
					</div>
				</div>
			</div>
		</div>
		<div id="contentbox">
			<div id="contentboxwrap">
				<!-- Begin Middle portion -->
				<div id="tdleft">
					<div id="createTaskView">
					</div>
					<div id="taskView">
					</div>
				</div>
				<!-- End middle portion -->
			</div>
		</div>					
	</div> <!-- End of Wrapper -->
</body>
</html>
