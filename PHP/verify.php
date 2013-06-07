<?php

session_start();

include(dirname(__FILE__) . '/../../../dbaccess.php');

//Flags for registering errors
$EMAIL_DIFF = 1;
$PASS_DIFF = 2;
$EMAIL_DUP = 3;

//Generates a random string of default length 10
function generateRandomString($length = 10) {    
    return substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);
}
    
//Checks if a user is logged in, returning true on success and false
//on failure
function isLoggedIn() {
    
    if (!isset($_SESSION['uname']))
		return false;
    return true;
}

//Connects to database
function connectToDb() {
	global $host, $username, $password, $db_name;

	//Connect to database and table
	$db = mysql_connect("$host", "$username", "$password") or die("cannot connect"); 
	mysql_select_db("$db_name") or die("cannot select DB");
}

//Connects to the mysql database, cleans uname and pword input, and then
//creates a valid session if uname and pword correspond to a valid entry in the
//User table. Returns true on success, false on failure
function login($uname, $pword) {

	global $user_tbl;

	//Connect to db
	connectToDb();

	//Clean input
	$uname = clean($uname);
	$pword = clean($pword);
	
	//Query
	$sql = "SELECT * FROM $user_tbl WHERE Email = '$uname' AND Password = SHA(CONCAT('$pword', `Salt`))";
	$result = mysql_query($sql);
	
	//Register a session if there is a valid entry corresponding to 
	//uname and pword
	$count = mysql_num_rows($result);
	if ($count == 1) {
		//Register the user's username (email) and password
		$_SESSION['uname'] = $uname;
		
		//Register other values like ID, firstname, lastname
		while ($r = mysql_fetch_assoc($result)) {
			$_SESSION['id'] = $r['UserID'];
			$_SESSION['firstname'] = $r['FirstName'];
			$_SESSION['lastname'] = $r['LastName'];
		}
		
		return true;
	}
	return false;
}

//Cleans input by stripping slashes and escaping strings.
//Assumes connected to mysql database
function clean($str) {
	$str = stripslashes($str);
	$str = mysql_real_escape_string($str);
	return $str;
}

//Registers user given firstname, lastname, email, email2, pass and pass2.
//Returns 0 on success, and a select flag on failure.
//Flag values:
//$EMAIL_DIFF = 1
//$PASS_DIFF = 2
//$EMAIL_DUP = 3
function register($fname, $lname, $email, $email2, $pass, $pass2) {
	global $host, $username, $password, $db_name, $user_tbl;
	global $EMAIL_DIFF, $PASS_DIFF, $EMAIL_DUP;

	//Connect to database and table
	$db = mysql_connect("$host", "$username", "$password") or die("cannot connect"); 
	mysql_select_db("$db_name") or die("cannot select DB");
	
	//Make sure there is no difference between email and email2, and pass
	//and pass2
	if ($email != $email2) return $EMAIL_DIFF;
	if ($pass != $pass2) return $PASS_DIFF;
	
	//Clean input
	$fname = clean($fname);
	$lname = clean($lname);
	$email = clean($email);
	$email2 = clean($email2);
	$pass = clean($pass);
	$pass2 = clean($pass2);
	
	//Get salt
	$salt = generateRandomString(20);
	$pass = $pass.$salt;
	
	//Query
	$sql = "INSERT INTO User (FirstName, LastName, Email, Password, Salt) ".
		   "VALUES ('$fname', '$lname', '$email', SHA('$pass'), '$salt')";
		
	$result = mysql_query($sql);
	
	//If result is true, everything went fine.
	//Otherwise, there was a duplicate email
	if ($result) return 0;
	return $EMAIL_DUP;
}

?>
