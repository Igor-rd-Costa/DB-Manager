<?php
Class RegisterRequest {
    protected $FirstName;
    protected $LastName;
    protected $Email;
    protected $Username;
    private $Password;
    protected $Connection;
    public $RegisterStatus;
    public $LoginRequest;
    public $RegisterError;


    function __construct($firstname, $lastname, $email, $username, $password)
    {
        try
        {
        include "./config.php";
        $this->Connection = SQL_Connect($Server_Hostname, $Server_User, $Server_Password, 'db_users');
        $this->LoginRequest = array("usernameLogin" => $username, "passwordLogin" => $password);
        $this->ValidateFirstName($firstname);
        $this->ValidateLastName($lastname);
        $this->ValidateEmail($email);
        $this->ValidateUsername($username);
        $this->ValidatePassword($password);
        $this->SendRegistrationRequest($password);
        $this->RegisterStatus = true;
        }
        catch(Exception $e)
        {
            $this->RegisterStatus = false;
            $this->RegisterError = $e->getMessage();
        }
    }

    function ValidateFirstName($firstname)
    {
        if(strlen($firstname) < 3)
        {
            throw new Exception("First name is too short");
        }
        else if(preg_match("/[^a-zA-Z]/", $firstname))
        {
            throw new Exception("First Name field contains invalid characters");
        }
        else
        {
            $this->FirstName = mysqli_real_escape_string($this->Connection, $firstname);
        }
    }
    
    function ValidateLastName($lastname)
    {
        if(strlen($lastname) < 3)
        {
            throw new Exception("Last name is too short");
        }
        else if(preg_match("/[^a-zA-Z]/", $lastname))
        {
            throw new Exception("Last Name field contains invalid characters");
        }
        else
        {
            $this->LastName = mysqli_real_escape_string($this->Connection, $lastname);
        }
    }

    function ValidateEmail($email)
    {
        if(filter_var($email, FILTER_VALIDATE_EMAIL))
        {
            $this->Email = mysqli_real_escape_string($this->Connection, $email);
        }
        else
        {
            throw new Exception("Email address is invalid");
        }
    }

    function ValidateUsername($username)
    {
        if(strlen($username) < 3)
        {
            throw new Exception("Username is too short");
        }
        else if(is_numeric($username[0]))
        {
            throw new Exception("username field may not have a number as its first character");
        }
        else if(preg_match("/[^a-zA-Z0-9_]/", $username))
        {
            throw new Exception("Username contains invalid characters");
        }
        else
        {
            $this->Username = mysqli_real_escape_string($this->Connection, $username);
        }
    }

    function ValidatePassword($password)
    {
        if(strlen($password) < 8)
        {
            throw new Exception("Password is too short");
        }
        else if(!preg_match("/[A-Z]/", $password) || !preg_match("/[0-9]/", $password) || !preg_match("/[!@#$%&+\\-=\\^_`|~]/", $password))
        {
            throw new Exception("Password must contain at least one uper case letter, one number and one special symbol");
        }
        else
        {
            $salt = sprintf('$2y$%02d$', 10) . bin2hex(random_bytes(32));
            $password = crypt($password, $salt) . "@" . $salt;
            $this->Password = mysqli_real_escape_string($this->Connection, $password);
        }
    }

    function SendRegistrationRequest($userpassword)
    {
        try
        {
        $stmt = $this->Connection->prepare("INSERT INTO users (FirstName, LastName, Email, Username, Password) 
        VALUES (?, ?, ?, ?, ?);");
        $stmt->bind_param("sssss", $this->FirstName, $this->LastName, $this->Email, $this->Username, $this->Password);
        $stmt->execute();
        $usercreation_stmt = $this->Connection->prepare("CREATE USER '$this->Username'@'localhost' IDENTIFIED BY '$userpassword';");
        $usercreation_stmt->execute();
        $dbcreation = $this->Connection->prepare("CREATE DATABASE $this->Username;");
        $dbcreation->execute();
        $setpermissions = $this->Connection->prepare("GRANT SELECT, INSERT, UPDATE, DELETE ON $this->Username.* to $this->Username@'localhost';");
        $setpermissions->execute();
        }
        catch(Exception $e)
        {
            throw $e;
        }
    }
}