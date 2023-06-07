<?php

function BuildNewTableEntryInput(Column $ColumnStructure) {
    $DataType = strtoupper($ColumnStructure->DataType);
    $Length = intval(explode("(", $ColumnStructure->Type)[1]);
    $Required = "required";

    if($ColumnStructure->Extra == "auto_increment" || $ColumnStructure->Nullable) $Required = "";
    
    $Input["Null"] = "";
    if($ColumnStructure->Nullable) 
        $Input["Null"] = "<input type='checkbox' checked='true'></input>";

    $Type = "";
    switch ($DataType) {
        case "INT": {
            $Type = "type='number'";
            $Input["Element"] = "<input $Type maxlength='$Length' $Required></input:";
        } break;
        case "VARCHAR": {
            $Type = "type='text'";
            if ($Length <= 50) {
                $Input["Element"] = "<input $Type maxlength='$Length' $Required></input>"; 
            }
            else {                                                       
                $Input["Element"] = "<textarea maxlength='$Length' $Required></textarea>";
            }
        } break;
    }
    $Input["DataType"] = strtoupper($ColumnStructure->Type);
    return $Input;
}

include_once "../Classes/User.php";
session_start();
if(isset($_SESSION["DisplayedTable"])) {

$User = $_SESSION["User"];
$Table = $User->Tables[$_SESSION["DisplayedTable"]];
print 
"<div class='default-menu'>
    <div id='back-icon' backto='$_SESSION[DisplayedTable]'>
        <img class='back-arrow' src='../img/Arrow.png'></img>
    </div>
    <div id='title'> 
        Add Entry
    </div>
</div>
<div id='new-entry-form-wrapper'>
    <form id='add-entry' method='post'>
        <div class='table-wrapper'>
        <table id='add-entry-table'>
        <tr>
            <th>Column Name</th>
            <th>Type</th>
            <th>Null</th>
            <th>Value</th>
        </tr>";
        foreach($Table->ColumnNames as $ColumnName) {
            $Input = BuildNewTableEntryInput($Table->Columns[$ColumnName]);
            print "<tr class='newEntryRow'>
                <th class='addEntryName'><span>$ColumnName</span></th>
                <td class='addEntryType'><span>$Input[DataType]</span></td>
                <td class='addEntryNull'>$Input[Null]</td>
                <td class='addEntryData'>$Input[Element]</td>
                </tr>";
        }
        print
        "</table>
        </div>
        <div id='entry-form-footer' class='form-footer'>
            <button type='submit' id='newEntry' class='submit form-button'>Submit</button>
        </div>
    </form>
</div>";
}
?>