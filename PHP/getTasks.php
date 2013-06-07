<?php

//Include basic database functionalities
include('verify.php');

//Get the dates of the tasks
$m = $_POST['month'];
$d = $_POST['day'];
$y = $_POST['year'];
$uid = $_SESSION['id'];

//Connect to database
connectToDb();

global $tasks_tbl;

//Make a query
$query = "SELECT * FROM $tasks_tbl WHERE UserID = $uid AND Month = $m AND Day = $d AND Year = $y";

$result = mysql_query($query);

$returnObject;
$index = 0;

while ($r = mysql_fetch_assoc($result)) {
    $returnObject[$index]['TaskID'] = $r['TaskID'];
    $returnObject[$index]['Done'] = $r['Done'];
    $returnObject[$index]['Title'] = $r['Title'];
    $returnObject[$index]['Description'] = $r['Description'];
    $index++;
}

echo json_encode($returnObject);

?>
