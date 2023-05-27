<?php
if(isset($_POST['TableName'])) {
    include_once "../Functions.php";
    include_once "../Classes/User.php";
    session_start();
    $User = $_SESSION['User'];
    $FoundTable = false;
    foreach ($User->Tables as $Table)
    {
        if($Table->TableName == $_POST['TableName'])
            $FoundTable = true;
    }
    if (!$FoundTable) return;

    $Table = $User->Tables[$_POST['TableName']];
    $User->Connect();
    $Table->Update($User->Connection);
    $_SESSION["DisplayedTable"] = $_POST['TableName']; 
    print
    "<div id='default-menu'>
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
        </div>
        <div id='tbl-display-content'>";
        $Table->DisplayTable();
    print "</div>";
}
else header("location: http://localhost/BancodeDados/");
?>