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
    
    $rowData = array();
    for ($x = 0; $x < sizeof($Data); $x++) {
        $Entry = $Data[$x];
        if ($Entry["Length"] == "") {
            $Entry["Length"] = 0;
        }
        $rowData[$x] = new StructureRowData($Entry["Name"], $Entry["Type"], $Entry["Length"], $Entry["Default"], $Entry["Attributes"], $Entry["Null"], $Entry["Index"], $Entry["AutoIncrement"], $Entry["Comment"]);
    }

    if(isset($_SESSION['CreateTableName'])) {
        $command = "CREATE TABLE `$User->DatabaseName`.`". $_SESSION['CreateTableName'] . "` (`" . $rowData[0]->Name . "` " . $rowData[0]->Type;
        if($rowData[0]->Length != 0) {
            $command .= "(" . $rowData[0]->Length . ")";
        }
        if($rowData[0]->Attributes != "") {
            $command .= " " . $rowData[0]->Attributes;
        }
        if(!$rowData[0]->Null) {
            $command .= " NOT";
        }
        $command .= " NULL";
        if($rowData[0]->Default != "None") {
            $command .= " DEFAULT " . $rowData[0]->Default;
        }
        if($rowData[0]->AutoIncrement) {
            $command .= " AUTO_INCREMENT";
        }
        if(str_replace(" ", "", $rowData[0]->Comment) != "") {
            $command .= " COMMENT '" . $rowData[0]->Comment . "'";
        }
        $command .= " ) ENGINE = InnoDB;";
        
        try {
            $User->Connect();
            $query = $User->Connection->prepare($command);
            $query->execute();
        }
        catch (mysqli_sql_exception $e) {
            print $e->getMessage();
        }
    }

?>