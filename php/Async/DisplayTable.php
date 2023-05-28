<?php
if(isset($_POST['TableName']) || isset($_SESSION["DisplayedTable"])) {
    include_once "../Functions.php";
    include_once "../Classes/User.php";
    session_start();
    $User = $_SESSION['User'];
    $User->Connect();
    $FoundTable = false;
    foreach ($User->Tables as $Table)
    {
        if($Table->TableName == $_POST['TableName'])
            $FoundTable = true;
    }
    if(isset($_SESSION['DisplayedTable']) || isset($_SESSION['CreateTableName'])) $FoundTable = true;
    if (!$FoundTable) return;

    if($_POST['TableName'] != "") {
        $Table = $User->Tables[$_POST['TableName']];
        $_SESSION["DisplayedTable"] = $_POST['TableName'];
        $Table->Update($User->Connection);
    }
    else {
        if(isset($_SESSION["DisplayedTable"])) $Table = $User->Tables[$_SESSION["DisplayedTable"]];
        else {
            $User->FetchTables();
            $Table = $User->Tables[$_SESSION['CreateTableName']];
            $_SESSION["DisplayedTable"] = $_SESSION['CreateTableName'];
            unset($_SESSION['CreateTableName']);
        }
    }

    print
    "<div id='table-display-wrapper'>
    <div id='default-menu'>
            <div id='back-icon' backto='main'>
                <img class='back-arrow' src='http://localhost/BancodeDados/img/Arrow.png'></img>
            </div>
            <div id='title'>" .
                $Table->TableName . 
            "</div>
            <div id='tbl-options'>
                <div class='circle' id='circle1'></div>
                <div class='circle' id='circle2'></div>
                <div class='circle' id='circle3'></div>
            </div>
            <ul id='tbl-option-list' class='options-ul'>
                <li class='options-li' id='tbl-new-entry'>New Entry</li>
                <li class='options-li' id='tbl-add-column'>Add Column</li>
            </ul>
        </div>
        <div id='tbl-display-content'>";
        $Table->DisplayTable();
    print "</div></div>";
}
else header("location: http://localhost/BancodeDados/");
?>