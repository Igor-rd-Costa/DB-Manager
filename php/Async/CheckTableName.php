<?php
if(isset($_POST["TableName"])) {

    include_once "../Classes/User.php";
    session_start();
    $User = $_SESSION['User'];
    
    if(isset($User->Tables)) {
        foreach($User->Tables as $Table) {
            if($Table->TableName == $_POST['TableName']) {
                echo "A table with this name already exists in your database!";
                break;
            }
        }
    }
}

?>