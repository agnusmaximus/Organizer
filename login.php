<?php
	//Include functions to provide login features
	include('PHP/verify.php');
	
	//If a user is logged in, redirect to the main app
	if (isLoggedIn())
		header("location: index.php");
		
	$registering = false;
	$errMssg = "";
	$successMssg = "";

	//Handle logins
	if ($_POST['type'] == 'login') {
		//Default error message
		$errMssg = "- Both Email and Password must be entered";

		//User is attempting to login if POST variables email and pass are not empty
		if (!empty($_POST['email']) && !empty($_POST['pass'])) {
		
			//Check for a successful login
			if (login($_POST['email'], $_POST['pass'])) {
				header("location: index.php");
			}
			else {
				$errMssg = "- Invalid Email or Password";
			}
		}
	}

	//Handle registers
	if ($_POST['type'] == 'register') {
	
		$errMssg = "- All forms must be filled";
	
		//User is attempting to login if Post variables
		//firstname, lastname, email, email2, pass and pass2
		//are not empty
		if (!empty($_POST['firstname']) &&
			!empty($_POST['lastname']) &&
			!empty($_POST['email']) &&
			!empty($_POST['email2']) &&
			!empty($_POST['pass']) &&
			!empty($_POST['pass2'])) {
			
			//A flag to track errors
			$flag = 0;
			
			//Check for successful register
			if (($flag = register($_POST['firstname'], $_POST['lastname'],
						 		  $_POST['email'], $_POST['email2'],
						 		  $_POST['pass'], $_POST['pass2'])) == 0) {
				header("location: login.php?success=1");
			}
			else if ($flag == $EMAIL_DIFF) {
				$errMssg = "- Emails must match";
			}
			else if ($flag == $PASS_DIFF) {
				$errMssg = "- Passwords must match";
			}
			else if ($flag == $EMAIL_DUP) {
				$errMssg = "- That email is taken";
			}
		}
		$registering = true;
	}
	
	if ($_GET['success'] == 1) 
		$successMssg = "You have successfully made an account";
?>

<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Organizer</title>
	<meta name="viewport" content="width=device-width, initial-width=1, maximum-scale=1">
	<script type="text/javascript" src="js/general/js_header.js"></script>
	<noscript><meta http-equiv="refresh" content="0; url=/noscript"></noscript>
	<link rel="stylesheet" type="text/css" href="css/login.css"/>
	<link rel="shortcut icon" href="/favicon.ico" />
</head>
<body>

<div id="superwrap">
	<div id="wrap">
		<div style="padding:0px 20px;">
			<span id="logotitle"></span>
		</div>
		<div id="box">
			<div id="autriwrap"><div id="autriangle"></div><div id="auytriangle"></div><div id="auotriangle"></div><div id="auotriangle2"></div></div>
			<span class="boxtitle" id="tlogin">Login</span>
			<span class="boxtitle" id="thelp" style="display:none">Signup</span>
			<div class="incontent">
				<div style="margin-top:20px;margin-bottom:-20px;text-align:center;font-size:11px;color:red">
					<?php 
						if (!empty($errMssg)) {
							echo '<div style="margin-top:20px;margin-bottom:-20px;text-align:center;font-size:11px;color:red">';
							echo $errMssg;
							echo '</div>';
						}
					    else {
					    	echo '<div style="margin-top:20px;margin-bottom:-20px;text-align:center;font-size:11px;color:green">';
					    	echo $successMssg; 
					    	echo '</div>';
					    }
					?>
				</div>
				<div id="login">
					<form name="loginForm" method="post" action="login.php">
						<div style="height:15px;"></div>
						<div class="preinput"><div>Email</div><input value="<?php echo $_POST['email'] ?>" type="email" id="email"  name="email" onkeydown="if (event.keyCode == 13) { this.form.submit(); return false; }"></div>
						<div style="height:30px;"></div>
						<div class="preinput"><div>Password</div><input type="password" id="pass" name="pass" onkeydown="if (event.keyCode == 13) { this.form.submit(); return false; }"></div>
						<div style="height:10px;"></div>
						<input name="type" value="login" style="display:none">
						<!-- <div style="text-align:right;font-size:11px;"><a>Forgot Password?</a></div> -->
					</form>
				</div>
				<div id="help" style="display:none;">
					<form name="signupForm" method="post" action="login.php">
						<div style="height:15px;"></div>
						<div>
							<div class="preinput"><div>First Name</div><input type="text" id="firstname"  name="firstname" onKeyPress="if (event.keyCode == 13) { this.form.submit(); return false; }" value="<?php echo $_POST['firstname'] ?>"></div>
							<div style="height:10px;"></div>
							<div class="preinput"><div>Last Name</div><input type="text" id="lastname" name="lastname" onKeyPress="if (event.keyCode == 13) { this.form.submit(); return false; }" value="<?php echo $_POST['lastname'] ?>"></div>
						</div>
						<div style="height:10px;"></div>
						<div style="padding-left:97px;padding-right:12px;font-size:12px;color:#AAA">Only letters, dashes and spaces are allowed.</div>
						<div style="height:20px;"></div>
						<div>
							<div class="preinput"><div>Email</div><input type="email" id="email"  name="email" onKeyPress="if (event.keyCode == 13) { this.form.submit(); return false; }" value="<?php echo $_POST['email'] ?>"></div>
							<div style="height:10px;"></div>
							<div class="preinput"><div>Confirm</div><input type="email" id="email2"  name="email2" onKeyPress="if (event.keyCode == 13) { this.form.submit(); return false; }" value="<?php echo $_POST['email2'] ?>"></div>
						</div>
						<div style="height:10px;"></div>
						<div style="padding-left:97px;padding-right:12px;font-size:12px;color:#AAA">Enter a valid email you frequently use. Letters, numbers, at, dashes, periods, and plus symbols allowed.</div>
						<div style="height:20px;"></div>
						<div>
							<div class="preinput"><div>Password</div><input type="password" id="pass" name="pass" onKeyPress="if (event.keyCode == 13) { this.form.submit(); return false; }"></div>
							<div style="height:10px;"></div>
							<div class="preinput"><div>Confirm</div><input type="password" id="pass2" name="pass2" onKeyPress="if (event.keyCode == 13) { this.form.submit(); return false; }"></div>
						</div>
						<div style="height:10px;"></div>
						<div style="padding-left:97px;padding-right:12px;font-size:12px;color:#AAA">Enter a secure password you can remember. All characters and symbols are allowed. This field is case-sensitive.</div>
						<div style="height:20px;"></div>
						<div style="font-size:13px;text-align:center;text-decoration:underline;">By clicking Sign Up, you agree to our Terms</div>
						<div style="height:15px;"></div>
						<input name="type" value="register" style="display:none">
					</form>
				</div>
			</div>
			<div class="subsystem">
				<div id="blogin">
					<div class="cbutton" style="width:55px;" id="loginb" onClick="document.loginForm.submit()">Login</div>
					<div class="cbutton" style="width:60px;filter:alpha(opacity=70);" id="helpb">Signup</div>
				</div>
				<div id="bhelp" style="display:none;">
					<div class="cbutton" style="width:60px;" id="loginb" onClick="document.signupForm.submit()">Register</div>
					<div class="cbutton" style="width:60px;filter:alpha(opacity=70);" id="lbackb">Cancel</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="js/general/jq_login.js"></script>
</body>
</html>
<?php
	//Make php embed javascript that changes the login form
	//to the register form
	if ($registering) {
		echo '<script type="text/javascript">';
		echo '$("#tlogin").css("display","none");';
		echo '$("#thelp").css("display","block");';
		echo '$("#login").css("display","none");';
		echo '$("#help").css("display","block");';
		echo '$("#blogin").css("display","none");';
		echo '$("#bhelp").css("display","block");';
		echo '$(".incontent").animate({scrollTop:0}, 0);';
		echo '$("#user").focus();';
		echo '</script>';
	}
?>