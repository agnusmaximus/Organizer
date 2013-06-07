<?php

include('verify.php');

$uid = $_SESSION['id'];
$taskId = $_POST['TaskID'];
$done = $_POST['Done'];
$description = $_POST['Description'];
$title = $_POST['Title'];

connectToDb();

global $tasks_tble;

$query = "UPDATE $tasks_tbl SET Done = $done";
$query .= " AND Description = '$description'";
$query .= " AND Title = '$title'";
$query .= " WHERE TaskID = $taskId AND UserID = $uid";
$result = mysql_query($query);

?>