<?php
include_once "../Functions.php";
include_once "../Classes/User.php";
include_once "../Classes/StructureRowData.php";
session_start();
if(isset($_SESSION["DisplayedTable"], $_SESSION["InsertColumn"])) {
    $User = $_SESSION["User"];
    $User->Connect();
    $User->FetchTables();
    
    $inputData = file_get_contents("php://input");
    $Data = json_decode($inputData, true);
    
    $ColumnName = $_SESSION["InsertColumn"]["ColumnName"];
    $Option = $_SESSION["InsertColumn"]["InsertOption"];

    if(!$User->CheckTableName($_SESSION["DisplayedTable"])){
        print "[Server Error]Targeted table $_SESSION[DisplayedTable] not found.";
        return;
    }
    $Table = $User->Tables[$_SESSION["DisplayedTable"]];
    
    $rowData = array();
    for ($x = 0; $x < sizeof($Data); $x++) {
        $Entry = $Data[$x];
        if ($Entry["Length"] == "") {
            $Entry["Length"] = 0;
        }
        $rowData[$x] = new StructureRowData($Entry["Name"], $Entry["Type"], $Entry["Length"], $Entry["Default"], $Entry["Attributes"], $Entry["Null"], $Entry["Index"], $Entry["AutoIncrement"], $Entry["Comment"]);
    }
    $command = "ALTER TABLE `$Table->TableName`";
    $ErrorMsg = null;
    $AutoIncrement = false;
    $PrimaryKey = null;
    for ($x = 0; $x < sizeof($rowData); $x++) {
        $command .= " ADD COLUMN `" . $rowData[$x]->Name . "` " . $rowData[$x]->Type;
        if($rowData[$x]->Length != 0) {
            $command .= "(" . $rowData[$x]->Length . ")";
        }
        if($rowData[$x]->Attributes != "") {
            $command .= " " . $rowData[$x]->Attributes;
        }
        if(!$rowData[$x]->Null) {
            $command .= " NOT";
        }
        $command .= " NULL";
        if($rowData[$x]->Default != "None") {
            $command .= " DEFAULT " . $rowData[$x]->Default;
        }
        if($rowData[$x]->AutoIncrement) {
            if (!$AutoIncrement) {
                $command .= " AUTO_INCREMENT";
                $AutoIncrement = true;
                if ($rowData[$x]->Index == "---") $ErrorMsg = "[Query Error]There can be only one auto column and it must be defined as a key.";
            }
            else $ErrorMsg = "[Query Error]There can be only one auto column and it must be defined as a key.";
        }
        if(str_replace(" ", "", $rowData[$x]->Comment) != "") {
            $command .= " COMMENT '" . $rowData[$x]->Comment . "'";
        }
        if ($Option == "FIRST") $command .= " $Option";
        if ($Option == "AFTER") $command .= " $Option `$ColumnName`";
        if($x != (sizeof($rowData) - 1)) $command .= ",";
        
        if($Option == "FIRST") $Option = "AFTER"; //subsequent columns will be added after the first column which was added at the front;
        $ColumnName = $rowData[$x]->Name;
    }
    $command .= ";";
    if($ErrorMsg) {
        print $ErrorMsg;
        return;
    }
    try { 
        //$command = mysqli_real_escape_string($User->Connection, $command);
        SQL_Query($User->Connection, $command); }
    catch (mysqli_sql_exception $e) { 
        print $e->getMessage(); 
        print "\n" . $command;
    }
    $User->FetchTables();
}
else header("location: ../../pages/main.php");
?>