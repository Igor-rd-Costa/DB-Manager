<?php
class User 
{
    public $LoginStatus;
    public $Username;
    public $Email;
    protected $Password;
    
    function __construct(array $Info) 
    {
        $connection = SQL_Connect('db_users');
        $query = "SELECT * from users";
        $result = mysqli_query($connection, $query);
        $is_login_correct = false;
        
        while($row = mysqli_fetch_assoc($result))
        {
            $typedpassword = $Info['passwordLogin'];
            $password = preg_split('/@/', $row['Password']);
            $typedpassword = crypt($typedpassword, $password[1]);
            if( $row['Username'] === $Info['usernameLogin'] && $typedpassword === $password[0])
            {
                    $this->Username = $row["Username"];
                    $this->Email = $row["Email"];
                    $this->Password = $row["Password"];
                    $this->LoginStatus = true;
            }
            else
            {
                $this->LoginStatus = false;
            }
        }
    }
}