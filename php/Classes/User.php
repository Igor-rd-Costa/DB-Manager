<?php
include_once "Connection.php";
include_once "UserTable.php";
Class User extends Connection {
    public bool $LoginStatus;
    public string $LoginError;
    public string $FirstName;
    public string $LastName;
    public string $Username;
    public string $DatabaseName;
    private string $Email;
    private string $Password;
    public $Tables;
    public array $Test;

    function __construct($username, $password)
    {   
        include_once "../../Config.php";
        $ServerHostname = CONFIG_INFO::$ServerHostname;
        $ServerUser = CONFIG_INFO::$ServerUser;
        $ServerPassword = CONFIG_INFO::$ServerPassword;
        $AdminUsername = CONFIG_INFO::$AdminUsername;
        $AdminDatabase = CONFIG_INFO::$AdminDatabaseName;

        try
        {
            $connection = SQL_Connect($ServerHostname, $ServerUser, $ServerPassword, $AdminDatabase);
        }
        catch(Exception $e)
        {
            $this->LoginStatus = false;
            $this->LoginError = $e->getMessage();
        }

        $selectquery = $connection->prepare("SELECT * FROM users WHERE BINARY Username = ?;");
        $selectquery->bind_param("s", $username);
        $selectquery->execute();
        $result = $selectquery->get_result();
        if($result->num_rows != 0)
        {
            while($row = $result->fetch_assoc())
            {
                $typed_password = $password;
                $fetched_password = preg_split('/@/', $row["Password"]);
                $typed_password = crypt($typed_password, $fetched_password[1]);
                if($typed_password === $fetched_password[0])
                {
                    $this->FirstName = $row["FirstName"];
                    $this->LastName = $row["LastName"];
                    $this->Email = $row["Email"];
                    $this->Username = $row["Username"];
                    $this->Password = $row["Password"];
                    $this->ConnectionInfo["username"] = $username;

                    if($username == $AdminUsername)
                    {
                        $this->DatabaseName = $AdminDatabase;
                        $this->ConnectionInfo["database"] = $AdminDatabase;
                    }    
                    else
                    {
                        $this->DatabaseName = $username;
                        $this->ConnectionInfo["database"] = $username;
                    } 

                    $this->ConnectionInfo["password"] = $password;
                    $this->Connect();
                    $this->FetchTables();
                    $this->LoginStatus = true;
                    session_start();
                    $_SESSION["User"] = $this;
                }
                else 
                {
                    $this->LoginStatus = false;
                    $this->LoginError = "Password or Username are incorrect. <br> Please try again.";
                }
            }
        }
        else 
        {
            $this->LoginStatus = false;
            $this->LoginError = "Password or Username are incorrect. <br> Please try again.";

        }
    }

    public function FetchTables()
    {
            $gettables = $this->Connection->prepare("SHOW TABLES;");
            $gettables->execute();
            $return = $gettables->get_result();
            $tables = array();
            while($row = $return->fetch_assoc())
            {
                $string = "Tables_in_" . strtolower($this->DatabaseName);
                $tables[] = $row[$string];
                
            }
            $this->Tables = NULL;
            for($x = 0; $x < sizeof($tables); $x++)
            {
                $this->Tables[$tables[$x]] = new Table($this->Connection, $this->DatabaseName, $tables[$x], $x);
                $this->Test[$x] = $this->Tables[$tables[$x]]->Index;
            }
    }

    public function CheckTableName(string $TableName) {
        foreach($this->Tables as $Table) {
            if($Table->TableName == $TableName) {
                return true;
            }
        }
        return false;
    }
}