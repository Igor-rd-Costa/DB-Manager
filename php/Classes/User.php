<?php
class User 
{
    public $Username;
    
    function __construct($name) 
    {
        $this->Username = $name;
    }

    function __destruct()
    {
        echo "Object destroyed";
    }

    function EchoUsername() {
        echo $this->Username;
    }
}