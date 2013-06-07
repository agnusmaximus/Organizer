<?php
include('verify.php');

connectToDb();

global $tasks_tbl;

$id = $_SESSION['id'];
$m = $_POST['month'];
$d = $_POST['day'];
$y = $_POST['year'];
$title = $_POST['title'];
$description = $_POST['description'];

$query = "INSERT INTO $tasks_tbl (UserID, Month, Day, Year, Done, Title, Description) ";
$query .= "VALUES ($id, $m, $d, $y, 0, '$title', '$description')";

$result = mysql_query($query);

echo $query;
?>