<?php 
class RegisterRequest
{
    protected $Connection;
    protected $FirstName;
    protected $LastName;
    protected $Email;
    protected $Username;
    protected $Password;
    
    function __construct(array $UserData)
    {
            $this->Connection = SQL_Connect('localhost', 'root', '', 'DB_Users');
            if(
            $this->ValidateEmail($UserData['emailRegister']) &&
            $this->ValidateUsername($UserData['usernameRegister']) &&
            $this->ValidatePassword($UserData['passwordRegister']) &&
            $this->ValidateNames($UserData["firstnameRegister"], $UserData["lastnameRegister"]))
            {
                $this->SendRegistrationRequest();
            }
    }
    
    private function ValidateUsername($Username)
    {
        if(!is_numeric($Username[0]) && !preg_match('/[^a-zA-Z0-9_]+/', $Username) && strlen($Username) >= 3)
        {
            $this->Username = $Username;
            return true;
        }
        else return false;
    }
    
    private function ValidatePassword($Password)
    {
        if(strlen($Password) >= 8)
        {
            $salt = sprintf('$2y$%02d$', 10) . bin2hex(random_bytes(32));
            $Password = crypt($Password, $salt) . "@" . $salt;
            $this->Password = $Password;
            return true;
        }
        else return false;
    }
    
    private function ValidateEmail($Email)
    {
        if(substr($Email, -strlen(".com")) === ".com" && strpos($Email, "@") != 0)
        {
            $this->Email = mysqli_real_escape_string($this->Connection, $Email);
            return true;
        }
        else { return false; }
    }

    private function ValidateNames($FirstName, $LastName)
    {
        if(!is_numeric($FirstName[0]) && !is_numeric($LastName[0]))
        {
            $this->FirstName = $FirstName;
            $this->LastName = $LastName;
            return true;
        }
        else return false;
    }

    private function SendRegistrationRequest()
    {
        $query = "INSERT INTO users (UserID, FirstName, LastName, Email, Username, Password) 
        VALUES (" . random_int(1, 999999999) . ", '$this->FirstName', '$this->LastName', '$this->Email', '$this->Username', '$this->Password');";
        mysqli_query($this->Connection, $query);
    }
}
?>