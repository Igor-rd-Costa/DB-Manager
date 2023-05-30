<?php
    include_once "../Functions.php";
    include_once "../Classes/User.php";
    session_start();
    $User = $_SESSION["User"];

    class StructureRowData {
        public string $Name;
        public string $Type;
        public int $Length;
        public string $Default;
        public string $Attributes;
        public bool $Null;
        public string $Index;
        public bool $AutoIncrement;
        public string $Comment;

        function __construct($name, $type, $length, $default, $attributes, $null, $index, $autoIncrement, $comment)
        {
            $this->Name = $name;
            $this->Type = $type;
            $this->Length = $length;
            $this->Default = $default;
            $this->Attributes = $attributes;
            $this->Null = $null;
            $this->Index = $index;
            $this->AutoIncrement = $autoIncrement;
            $this->Comment = $comment;
        }
    };

    $inputData = file_get_contents("php://input");
    $Data = json_decode($inputData, true);

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
    $_SESSION['CreateTableName'] = $Data["TableName"];
    if(isset($_SESSION['CreateTableName'])) {
        $command = "CREATE TABLE `$User->DatabaseName`.`". $_SESSION['CreateTableName'] . "` (";
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
                    if ($rowData[$x]->Index == "---") $ErrorMsg = "[Query Error]There can be only one auto column and it must be defined as a key.";
                }
                else $ErrorMsg = "[Query Error]There can be only one auto column and it must be defined as a key.";
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
                $User->Connect();
                $query = $User->Connection->prepare($command);
                $query->execute();
            }
            catch (mysqli_sql_exception $e) {
                print $e->getMessage();
            }
        }
    }

?>