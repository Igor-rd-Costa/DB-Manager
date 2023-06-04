<?php
Class Connection {
    public $Connection;
    protected $ConnectionInfo = array("username" => "", "password" => "", "database" => "");

    public function Connect()
    {
        $this->Connection = SQL_Connect("localhost", $this->ConnectionInfo['username'], $this->ConnectionInfo['password'], $this->ConnectionInfo["database"]);
    }
}
?>