<?php
class User 
{
    public $Username;
    
    function __construct($name) 
    {
        $this->Username = $name;
    }

    function EchoUsername() {
        echo $this->Username;
    }
}