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
    else if (isset($_SESSION["DisplayedTable"])) {
        $Table = $User->Tables[$_SESSION["DisplayedTable"]];
    } 
    else {
        $User->FetchTables();
        $tableName = strtolower($_SESSION['CreateTableName']);
        $Table = $User->Tables[$tableName];
        $_SESSION["DisplayedTable"] = $tableName;
        unset($_SESSION['CreateTableName']);
    }

    print
    "<div id='table-display-wrapper'>
        <div id='display-table-menu' class='default-menu'>
            <div id='back-icon' backto=''>
                <img class='back-arrow' src='../img/Arrow.png'></img>
            </div>
            <div id='tbl-browse-opt' class='tbl-display-options opt-selected'>
                <img class='tbld-option-img' src='../img/TblDisplayBrowse.png'></img>
                <span class='tbld-option-text'>
                    Browse
                </span>
            </div>
            <div id='tbl-structure-opt' class='tbl-display-options'>
                <img class='tbld-option-img' src='../img/TblDisplayStructure.png'></img>
                <span class='tbld-option-text'>
                    Structure
                </span>
            </div>
        </div>
        <div id='table-menu'>
            <div id='tbl-title' class='content-editable'>$Table->TableName</div>
            <div id='tbl-options'>
                <div class='circle' id='circle1'></div>
                <div class='circle' id='circle2'></div>
                <div class='circle' id='circle3'></div> 
            </div>
            <ul id='tbl-option-list' class='options-ul'>
                <li class='options-li' id='tbl-new-entry'><span>New Entry</span></li>
                <li class='options-li' id='tbl-add-column'><span>Add Column</span></li>
                <li class='options-li' id='rename-table'><span>Rename</span></li>
                <li class='options-li' id='drop-table'><span>Drop Table</span></li>
            </ul>
        </div>
        <div id='tbl-display-content'>";
        $Table->DisplayTable();
    print "</div></div>  $@#$";
    $columnComments = array();
    foreach ($Table->Columns as $Column) {
        $columnComments[$Column->Name] = $Column->Comment;
    }
    print_r(json_encode($columnComments));
}
else header("location: ../../pages/main.php");
?>