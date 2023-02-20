<?php
Class User {
    public $Connection;
    public $LoginStatus;
    public $LoginError;
    public $FirstName;
    public $LastName;
    public $Email;
    public $Username;
    protected $Password;

    function __construct($username, $password, $connectpassword)
    {   
        include "./config.php";

        try
        {
            $connection = SQL_Connect($Server_Hostname, $Server_User, $Server_Password, 'db_users');
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
                    $this->Connection = SQL_Connect($Server_Hostname, $username, $connectpassword, $this->Username);
                    $this->LoginStatus = true;
                    session_start();
                    $_SESSION["User"] = $this;
                }
                else 
                {
                    $this->LoginStatus = false;
                    $this->LoginError = "Password or Username is incorrect. <br> Please try again.";
                }
            }
        }
        else 
        {
            $this->LoginStatus = false;
            $this->LoginError = "Password or Username is incorrect. <br> Please try again.";

        }
    }

}