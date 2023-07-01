<?php
    include_once "../Functions.php";
    include_once "../Classes/User.php";
    include_once "../Classes/StructureRowData.php";
    session_start();
    $User = $_SESSION["User"];
    $User->Connect();

    $inputData = file_get_contents("php://input");
    $Data = json_decode($inputData, true);
    
    if($Data) {
    if($User->CheckTableName($Data["TableName"])) {
        print "A table with this name already exists in your database!";
        return;
    }
    
    $rowData = array();
    for ($x = 0; $x < sizeof($Data["Data"]); $x++) {
        $Entry = $Data["Data"][$x];
        if ($Entry["Length"] == "") {
            $Entry["Length"] = 0;
        }
        $rowData[$x] = new StructureRowData($Entry["Name"], $Entry["Type"], $Entry["Length"], $Entry["Default"], $Entry["Attributes"], $Entry["Null"], $Entry["Index"], $Entry["AutoIncrement"], $Entry["Comment"]);
    }
    $command = "CREATE TABLE `$User->DatabaseName`.`". $Data["TableName"] . "` (";
    $ErrorMsg = null;
    $AutoIncrement = false;
    $PrimaryKey = null;
    for ($x = 0; $x < sizeof($rowData); $x++) {
        $command .= "`" . $rowData[$x]->Name . "` " . $rowData[$x]->Type;
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
                if ($rowData[$x]->Index == "---") $ErrorMsg = "There can be only one auto column and it must be defined as a key.";
            }
            else $ErrorMsg = "There can be only one auto column and it must be defined as a key.";
        }
        if(str_replace(" ", "", $rowData[$x]->Comment) != "") {
            $command .= " COMMENT '" . $rowData[$x]->Comment . "'";
        }
        if($rowData[$x]->Index != "---") {
            switch ($rowData[$x]->Index) {
                case "PRIMARY": if($PrimaryKey == null) $PrimaryKey = $rowData[$x]->Name;
                break;
                }
            }
            
            if ($x != (sizeof($rowData) - 1)) $command .= ", ";
        }
        if($PrimaryKey) {
            $command .= ", PRIMARY KEY (`$PrimaryKey`)";
        }
        
        $command .= ") ENGINE = InnoDB;";
        
        if ($ErrorMsg) {
            print $ErrorMsg;
        }
        else {
            try {
                SQL_Query($User->Connection, $command);
            }
            catch (mysqli_sql_exception $e) {
                print $e->getMessage();
            }
        }
        $_SESSION["CreateTableName"] = $Data["TableName"];
        $User->FetchTables();
    }
    else header('location: ../../pages/main.php');
?>