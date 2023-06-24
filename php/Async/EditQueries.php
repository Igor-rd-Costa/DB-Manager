<?php
include_once("../Functions.php");
include_once("../Classes/User.php");
session_start();

if (isset($_POST["RenameTable"], $_SESSION["DisplayedTable"])) { // Rename table request
    $User = $_SESSION["User"];
    $User->Connect();
    if (isset($User->Tables[$_POST["RenameTable"]])) {
        print "A table with this name already exists.";
        return;
    }
    $Table = $User->Tables[$_SESSION["DisplayedTable"]];
    try {
        SQL_Query($User->Connection, "RENAME TABLE $Table->TableName TO $_POST[RenameTable]");
    }
    catch (mysqli_sql_exception $e) {
        print $e->getMessage();
        return;
    }
    $_SESSION["DisplayedTable"] = $_POST["RenameTable"];
    $User->FetchTables();
}
else if (isset($_SESSION["AlterColumn"], $_SESSION["DisplayedTable"])) { // Alter column request
    $User = $_SESSION["User"];
    $User->Connect();
    $AlterColumns = file_get_contents("php://input");
    $AlterColumns = json_decode($AlterColumns);
    $newName = $AlterColumns[0]->Name;
    $newType = $AlterColumns[0]->Type;
    $newLength = $AlterColumns[0]->Length;
    $newNull ="NOT NULL ";
    if ($AlterColumns[0]->Null) $newNull = "NULL ";
    $newAttribs = "";
    if ($AlterColumns[0]->Attributes) $newAttribs = $AlterColumns[0]->Attributes." "; 
    $newDefault = "";
    if ($AlterColumns[0]->Default != "None") $newDefault = "DEFAULT " . $AlterColumns[0]->Default . " ";
    $newAI = "";
    $newPrimKey = "";
    if ($AlterColumns[0]->AutoIncrement) {
        $newAI = "AUTO_INCREMENT ";
        $newPrimKey = ", ADD PRIMARY KEY (`$newName`)";
    } 
    $newComment = "";
    if ($AlterColumns[0]->Comment) $newComment = "COMMENT '" . $AlterColumns[0]->Comment . "'";
    $query = "ALTER TABLE `$_SESSION[DisplayedTable]` CHANGE COLUMN `$_SESSION[AlterColumn]` `$newName` $newType($newLength) "."$newAttribs" . "$newNull" . "$newDefault" . $newAI . $newComment . $newPrimKey . ";";
    try {
        SQL_Query($User->Connection, $query);
    }
    catch (mysqli_sql_exception $e) {
        print $e->getMessage();
    }
    unset($_SESSION["AlterColumn"]);
}
else header('location: ../../pages/main.php');
?>