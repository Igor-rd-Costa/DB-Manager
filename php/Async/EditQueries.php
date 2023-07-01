<?php
include_once("../Functions.php");
include_once("../Classes/User.php");
session_start();
$User = $_SESSION["User"];
$User->Connect();
$Table = $User->Tables[$_SESSION["DisplayedTable"]];
if (isset($_POST["RenameTable"], $_SESSION["DisplayedTable"])) { // Rename table request
    if (isset($User->Tables[$_POST["RenameTable"]])) {
        print "A table with this name already exists.";
        return;
    }
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
else if (isset($_POST["RenameColumn"], $_POST["RenameTo"], $_SESSION["DisplayedTable"])) { // Rename column request
    if (!isset($Table->Columns[$_POST["RenameColumn"]])) {
        print "Could not find the requested column."; return;
    }
    if (isset($Table->Columns[$_POST["RenameTo"]])) {
        print "A column with this name already exists."; return;
    }
    $Column = $Table->Columns[$_POST["RenameColumn"]];
    $Type = strtoupper($Column->Type);
    $query = "ALTER TABLE $Table->TableName CHANGE COLUMN $_POST[RenameColumn] $_POST[RenameTo] $Type";
    if (!$Column->Nullable) $query .= " NOT";
    $query .= " NULL";
    if ($Column->Default != "None") $query .= " DEFAULT $Column->Default";
    if ($Column->Extra == "auto_increment") $query .= " AUTO_INCREMENT";
    if ($Column->Comment) $query .= " COMMENT '$Column->Comment'";
    $query .= ";";
    

    try {
        SQL_Query($User->Connection, $query);
    }
    catch (mysqli_sql_exception $e) {
        print $e->getMessage();
        print $query;
        return;
    }
    $User->FetchTables();
}
else if (isset($_SESSION["AlterColumn"], $_SESSION["DisplayedTable"])) { // Alter column structure request
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
    $query = "ALTER TABLE `$_SESSION[DisplayedTable]` CHANGE COLUMN `$_SESSION[AlterColumn]` `$newName` $newType($newLength) "."$newAttribs" . "$newNull" . "$newDefault" . $newAI . $newComment;
    if (!$User->Tables[$_SESSION["DisplayedTable"]]->Columns[$_SESSION["AlterColumn"]]->Key == "PRI") $query .= $newPrimKey;
    $query .= ";";
    try {
        SQL_Query($User->Connection, $query);
        unset($_SESSION["AlterColumn"]);
    }
    catch (mysqli_sql_exception $e) {
        print $e->getMessage();
    }
    $User->FetchTables();
}
else if (isset($_POST["AlterData"], $_POST["Column"], $_POST["PrimKey"])) {
    if (!$Table->PrimaryKey) {
        print "This table does not have a primary key.\nDelete and edit features for data are disabled.";
        return;
    }
    if ($Table->PrimaryKey == $_POST["Column"]) {
        print "$Table->PrimaryKey has the primary index and its data cannot be changed.";
        return;
    }
    $query = "UPDATE `$Table->TableName` SET `$_POST[Column]` = '$_POST[AlterData]' WHERE `$Table->TableName`.`$Table->PrimaryKey` = $_POST[PrimKey];"; 
    try {
        SQL_Query($User->Connection, $query);
    }
    catch (mysqli_sql_exception $e) {
        print $e->getMessage();
    }
}
else header('location: ../../pages/main.php');
?>