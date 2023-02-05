<?php 
class RegisterRequest
{
    protected $FirstName;
    protected $LastName;
    protected $Email;
    protected $Username;
    protected $Password;

    private function ValidateData($Email, $Username, $Password)
    {
        if(substr($Email, -strlen(".com")) === ".com" && strpos($Email, "@") != 0)
        {
            $this->Email = $Email;
        }
        else return null;
        
        if(!is_numeric($Username[0]) && !preg_match('/[^a-zA-Z0-9_]+/', $Username))
        {
            $this->Username = $Username;
        }
        else return null;

        if(strlen($Password) >= 8)
        {
            $salt = sprintf('$2y$%02d$', 10) . bin2hex(random_bytes(32));
            $this->Password = crypt($Password, $salt) . "@" . $salt;
        }
        else return null;

        return true;
    }
    
    public function EchoInfo()
    {

        echo "First name is: " . $this->FirstName;
        echo "<br>Last name is: " . $this->LastName;
        echo "<br>Email is: " . $this->Email;
        echo "<br>Username is: " . $this->Username;
        echo "<br>Password is: " . $this->Password;
    }

    function __construct(array $UserData)
    {
        if($this->ValidateData($UserData['emailRegister'], $UserData['usernameRegister'], $UserData['passwordRegister']))
        {
            $this->FirstName = $UserData["firstnameRegister"];
            $this->LastName = $UserData["lastnameRegister"];
            echo "Registered Successfully"; 
        }
        else echo "Failed to Register";
    }

}


?>