<?php

if(isset($_POST["Request"])) {
    include_once "../Functions.php";
    include_once "../Classes/User.php";
    session_start();
    $User = $_SESSION["User"];
    $User->Connect();
    $Table = $User->Tables[$_SESSION["DisplayedTable"]];
    $Table->Update($User->Connection);

    switch ($_POST["Request"]) {
        case "Browse": {
            $Table->DisplayTable();
        } break;
        case "Structure": {
            $Table->DisplayStructure();
        } break;
    }
}
else header('location: ../../pages/main.php');
?>