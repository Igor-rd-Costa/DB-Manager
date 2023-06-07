<?php
if(isset($_POST["LoadTables"])) {

    include_once "../Functions.php";
    include_once "../Classes/User.php";
    session_start();
    $User = $_SESSION['User'];
    $User->Connect();
    $User->FetchTables();

    if (isset($_SESSION["DisplayedTable"])) unset($_SESSION["DisplayedTable"]);
    print 
    "<div class='default-menu'>
    <div id='back-icon' backto='main'>
        <img class='back-arrow' src='../img/Arrow.png'></img>
    </div>
    <div id='tbl-list-info'>" .
        sizeof($User->Tables) . " table";
        if(sizeof($User->Tables) != 1) print "s"; 
    print " found. 
    </div>
    <div class='add-icon-wrapper' id='add-table'>
        <img class='add-icon' src='../img/Add.png'></img>
    </div>
    </div>
    <div id='list-wrapper'>";
    foreach ($User->Tables as $Table)
    {
        $Table->DisplayTableListItem();
    }
    print "</div>";
}
else header("location: ../../pages/main.php");
?>