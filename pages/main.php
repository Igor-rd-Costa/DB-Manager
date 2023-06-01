<?php
include_once "../php/Functions.php";
include_once "../php/Classes/User.php";
include_once "../Config.php";
session_start(); 
if(!$User = $_SESSION['User'])
{
    header('Location: ../');
} 
$User->Connect();
$User->FetchTables();
if(isset($_SESSION["DisplayedTable"])) {
    unset($_SESSION["DisplayedTable"]);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/Forms.css"/>
    <link rel="stylesheet" href="../css/CreateTableForm.css"/>
    <link rel="stylesheet" href="../css/TableStructureForm.css"/>
    <link rel="stylesheet" href="../css/AddColumnForm.css"/>
    <link rel="stylesheet" href="../css/Main.css"/>
    <link rel="stylesheet" href="../css/TableList.css"/>
    <link rel="stylesheet" href="../css/TableDisplay.css"/>
    <link rel="stylesheet" href="../css/NewEntryForm.css"/>
    <link rel="stylesheet" href="../css/InsertColumnForm.css"/>
    <script src="../scripts/functions.js"></script>
    <script src="../scripts/script.js"></script>
    <script src="../scripts/FormsScript.js"></script>
    <title>DB Manager</title>
</head>
<body>
    <div id='comment-box'>
        <span>This is a comment</span>
    </div>
    <div id="form">
        <div id="form-header">
            <div id="menu-title"></div>
            <div id="close-menu">X</div>
        </div>
        <div id="formwrapper">
        <form id="create-table" method="post">
            <label for="table-name">Table Name</label>
            <input type="text" name="table-name" id="table-name" required=""/>
            <label for="column-amount">Number of columns</label>
            <input type="number" name="column-amount" id="column-amount" required=""/>
            <button type="submit" class="submit create form-button">Create</button>
        </form>
        <form id="add-columns" method="post">
            <label for="columns">Number of columns</label>
            <input type="number" name="columns" id="columns" required=""/>
            <button type="submit" class="submit create form-button">Add</button>
        </form>
        <form id="insert-columns" method="post">
            <span>Insert</span>
            <input id="amount-of-columns" type="number"></input>
            <span>Columns</span>
            <select id="insert-option">
                <option>Last</option>
                <option>First</option>
                <option>After:</option>
            </select>
            <select id="table-columns" disabled></select>
            <button type="submit" class="submit form-button" id="insert-column-button">Go</button>
        </form>
        </div>
    </div>
    <header id="header">
    <div id="profilewrapper">
        <span id="username"><?php print $User->Username;?></span>
        <img id="user-img" src="../img/User.png" alt="Profile"/>
            <ul id="pr-options" class="options-ul">
                <li id="pr-logout" class="options-li"><a href="../?logoutRequest=true">Logout</a></li>
                <?php if ($User->Username == CONFIG_INFO::$AdminUsername) : ?>
                <li class="options-li"><a href="test.php">Test Page</a></li>
                <?php endif; ?>
            </ul>
    </div>
    </header>
    <section id="side-menu" style="color: var(--TextColor);">
    </section>
    <main id="tablewrapper" class="tableCards">
        <?php
        $TableDisplays = 0;
        if(isset($User->Tables)) {
        $TableDisplays = sizeof($User->Tables);

        foreach ($User->Tables as $Table)
        {
            if($Table->Index == 6 && $TableDisplays > 7)
            {
                echo 
                "<div id='tbl-list-display' class='table' id='table". $TableDisplays + 1 ."'>
                <div id='tbl-list-icon'>
                <div class='tbl-list-img' id='tbl-list-icon1'></div>
                <div class='tbl-list-img' id='tbl-list-icon2'></div>
                <div class='tbl-list-img' id='tbl-list-icon3'></div>
                </div>
                </div>";
                break;
            }
            $Table->DisplayTableCard();
        }}
        ?>
        <div class="table" id="addTable">
            <div id="horz-line"></div><div id="vert-line"></div>
        </div>
    </main>
    <?php if(isset($_SESSION["Info"])) {
        print $_SESSION["Info"];
    } ?>
</body>
</html>