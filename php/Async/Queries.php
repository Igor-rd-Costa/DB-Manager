<?php
include_once("../Functions.php");
include_once("../Classes/User.php");
session_start();
$User = $_SESSION["User"];
if (isset($_POST["ColumnName"])) { // Returns data about a column
    header('Content-Type: application/json');

    if (isset($User->Tables[$_SESSION["DisplayedTable"]]->Columns[$_POST["ColumnName"]])) {
        print json_encode($User->Tables[$_SESSION["DisplayedTable"]]->Columns[$_POST["ColumnName"]]);
    }
    return;
}
else if (isset($_POST["GetPrimaryKey"])) { // Returns the primary key of the displayed table
    if($User->Tables[$_SESSION["DisplayedTable"]]->PrimaryKey){
        print $User->Tables[$_SESSION["DisplayedTable"]]->PrimaryKey;
    }
    else {
        http_response_code(400);
        print "Table does not have a primary key";
    }
}
else header('location: ../../pages/main.php');
?>