<?php
$inputData = file_get_contents("php://input");
$Data = json_decode($inputData, true);
if ($Data) {
    class NewEntryData {
        public string $Name;
        public string $Type;
        public bool $Null;
        public $Data;

        public function __construct(string $Name, string $Type, bool $Null, $Data)
        {
            $this->Name = $Name;
            $this->Type = $Type;
            $this->Null = $Null;
            $this->Data = $Data;
        }
    }

    function ProccessData($connection, $entry) {
        if($entry->Data == "") return "NULL";
        switch (explode("(", $entry->Type)[0]) {
            case "INT": {
                return $entry->Data;
            }break;
            case "VARCHAR": {
                return "'" . mysqli_real_escape_string($connection, $entry->Data) . "'";
            }
        }
    }

    include_once "../Functions.php";
    include_once "../Classes/User.php";
    session_start();
    $User = $_SESSION["User"];
    $Entry = array();
    foreach ($Data as $Row) {
        $Entry[] = new NewEntryData($Row["Name"], $Row["Type"], $Row["Null"], $Row["Data"]);
    }
    $User->Connect();
    $Test = $Entry[0]->Name;
    $Command = "INSERT INTO `$_SESSION[DisplayedTable]` (";
    for ($x = 0; $x < sizeof($Entry); $x++) {
        $Command .= "`" . $Entry[$x]->Name . "`";
        if($x != (sizeof($Entry) - 1)) $Command .= ", ";
        else $Command .= ") ";
    }
    $Command .= "VALUES (";
    
    for ($x = 0; $x < sizeof($Entry); $x++) {
        $Command .= ProccessData($User->Connection, $Entry[$x]);
        if($x != (sizeof($Entry) - 1)) $Command .= ", ";
        else $Command .= ")";
    }
    try {
        SQL_Query($User->Connection,$Command);
    }
    catch (mysqli_sql_exception $e) {
        print $e->getMessage();
    }
    $User->FetchTables();
}
else header('location: ../../pages/main.php');
?> 