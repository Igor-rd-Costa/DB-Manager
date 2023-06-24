<?php
include_once "../Functions.php";
include_once "../Classes/User.php";
session_start();

$jsonData = file_get_contents("php://input");
$jsonData = json_decode($jsonData, true);
if($jsonData && isset($_SESSION["DisplayedTable"])) {

    $User = $_SESSION["User"];
    $User->Connect();
    $Table = $User->Tables[$_SESSION["DisplayedTable"]];
    

    $index = 0;
    foreach ($Table->ColumnNames as $ColumnName) {
        $Data[$ColumnName] = $jsonData[$index];
        $index++; 
    }

    $Query = "DELETE FROM `$Table->TableName` WHERE";

    if($Table->PrimaryKey) {
        $data = $Data[$Table->PrimaryKey];
        $Query .= " `$Table->PrimaryKey` = ";
        switch ($Table->Columns[$Table->PrimaryKey]->DataType) {
            case "int": { $Query .= "$data";
            } break;
            case "varchar" : { $Query .= "'$data'";
            } break;
        }
    }
    else {
        $x = 0;
        foreach ($Table->ColumnNames as $ColumnName) { 
            $Query .= " `$ColumnName` = ";
            switch ($Table->Columns[$ColumnName]->DataType) {
                case "int": { $Query .= "$Data[$ColumnName]";
                } break;
                case "varchar" : { $Query .= "'$Data[$ColumnName]'";
                } break;
            }
            if($x != (sizeof($Data) - 1)) $Query .= " AND";
            $x++;
        }
    }
    $Query .= ";";
    
    try {
        SQL_Query($User->Connection, $Query);
    }
    catch (mysqli_sql_exception $e) {
        print $e->getMessage();
    }
    $User->FetchTables();
}
else header("location: ../../pages/main.php");
?>